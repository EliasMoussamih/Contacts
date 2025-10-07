import express from "express";
import { inscription, connexion } from "../controlleur/authControlleur.js";

const routeurAuthentification = express.Router();

/**
 * @swagger
 * /authentification/inscription:
 *   post:
 *     summary: Crée un nouvel utilisateur
 *     tags:
 *       - Authentification
 */
routeurAuthentification.post("/inscription", inscription);

/**
 * @swagger
 * /authentification/connexion:
 *   post:
 *     summary: Connecte un utilisateur et renvoie un JWT
 *     tags:
 *       - Authentification
 */
routeurAuthentification.post("/connexion", connexion);

export default routeurAuthentification;
