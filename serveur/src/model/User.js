import mongoose from "mongoose";
import bcrypt from "bcrypt";

const utilisateurSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Veuillez entrer un email valide"] 
  },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

utilisateurSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const sel = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, sel);
    next();
  } catch (erreur) {
    next(erreur);
  }
});

utilisateurSchema.methods.verifierMotDePasse = async function (motDePasseSaisi) {
  return await bcrypt.compare(motDePasseSaisi, this.password);
};

const Utilisateur = mongoose.model("Utilisateur", utilisateurSchema);

export default Utilisateur;
