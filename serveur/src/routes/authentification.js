import express from "express";
import Utilisateur from "../model/User.js";

const routeurAuthentification = express.Router();

/**
 * @swagger
 * /authentification/inscription:
 *   post:
 *     summary: Crée un nouvel utilisateur
 *     tags:
 *       - Authentification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@exemple.com
 *               motDePasse:
 *                 type: string
 *                 example: monMotDePasse123
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Email déjà utilisé ou champs manquants
 *       500:
 *         description: Erreur serveur
 */
routeurAuthentification.post("/inscription", async (req, res) => {
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
});

/**
 * @swagger
 * /authentification/connexion:
 *   post:
 *     summary: Connecte un utilisateur et renvoie un JWT
 *     tags:
 *       - Authentification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@exemple.com
 *               motDePasse:
 *                 type: string
 *                 example: monMotDePasse123
 *     responses:
 *       200:
 *         description: Connexion réussie, renvoie un token JWT
 *       400:
 *         description: Email ou mot de passe incorrect
 *       500:
 *         description: Erreur serveur
 */

import jwt from "jsonwebtoken"; // en haut du fichier

routeurAuthentification.post("/connexion", async (req, res) => {
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
});


export default routeurAuthentification;
