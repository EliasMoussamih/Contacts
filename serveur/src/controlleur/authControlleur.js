import Utilisateur from "../model/User.js";
import jwt from "jsonwebtoken";

/**
 * Contrôleur pour l'inscription d'un utilisateur
 */
export const inscription = async (req, res) => {
  const { email, motDePasse } = req.body;

  if (!email || !motDePasse) {
    return res.status(400).json({ message: "Email et mot de passe requis" });
  }

  try {
    const utilisateurExistant = await Utilisateur.findOne({ email });
    if (utilisateurExistant) {
      return res.status(400).json({ message: "Cet email est déjà utilisé" });
    }

    const nouvelUtilisateur = new Utilisateur({ email, password: motDePasse });
    await nouvelUtilisateur.save();

    res.status(201).json({ message: "Utilisateur créé avec succès" });
  } catch (erreur) {
    console.error(erreur);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

/**
 * Contrôleur pour la connexion d'un utilisateur
 */
export const connexion = async (req, res) => {
  const { email, motDePasse } = req.body;

  if (!email || !motDePasse) {
    return res.status(400).json({ message: "Email et mot de passe requis" });
  }

  try {
    const utilisateur = await Utilisateur.findOne({ email });
    if (!utilisateur) {
      return res.status(400).json({ message: "Email ou mot de passe incorrect" });
    }

    const motDePasseCorrect = await utilisateur.verifierMotDePasse(motDePasse);
    if (!motDePasseCorrect) {
      return res.status(400).json({ message: "Email ou mot de passe incorrect" });
    }

    const token = jwt.sign(
      { id: utilisateur._id, email: utilisateur.email },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Connexion réussie", token });
  } catch (erreur) {
    console.error("Erreur lors de la connexion :", erreur);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
