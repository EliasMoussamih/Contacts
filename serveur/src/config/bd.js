import mongoose from "mongoose";

const connecterBD = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connectée");
  } catch (erreur) {
    console.error("Échec de la connexion MongoDB :", erreur.message);
    process.exit(1); 
  }
};

export default connecterBD;
