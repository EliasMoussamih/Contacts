import mongoose from "mongoose";

const connecterBD = async () => {
  try {
    // if ("") {
    //  throw new Error("MONGODB_URL non défini dans le fichier .env");
    // }
    await mongoose.connect("mongodb+srv://mycontact:user@cluster0.qnfv9w5.mongodb.net/contacts?retryWrites=true&w=majority&appName=Cluster0");
    console.log("MongoDB Connectée");
  } catch (erreur) {
    console.error("Échec de la connexion MongoDB :", erreur.message);
    process.exit(1);
  }
};

export default connecterBD;
