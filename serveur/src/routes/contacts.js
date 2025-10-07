import express from "express";
import requireAuth from "../middlewares/requireAuth.js";
import {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
} from "../controlleur/contactControlleur.js";

const routeurContacts = express.Router();

routeurContacts.use(requireAuth);

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Récupère tous les contacts de l'utilisateur
 *     tags:
 *       - Contacts
 */
routeurContacts.get("/", getContacts);

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Ajoute un nouveau contact
 *     tags:
 *       - Contacts
 */
routeurContacts.post("/", createContact);

/**
 * @swagger
 * /contacts/{id}:
 *   patch:
 *     summary: Met à jour un contact existant
 *     tags:
 *       - Contacts
 */
routeurContacts.patch("/:id", updateContact);

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Supprime un contact
 *     tags:
 *       - Contacts
 */
routeurContacts.delete("/:id", deleteContact);

export default routeurContacts;
