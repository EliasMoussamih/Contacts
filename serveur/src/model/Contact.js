import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  utilisateurId: { type: mongoose.Schema.Types.ObjectId, ref: "Utilisateur", required: true },
  prenom: { type: String, required: true },
  nom: { type: String, required: true },
  telephone: { type: String, required: true, minlength: 10, maxlength: 20 },
  email: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;
