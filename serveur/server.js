import express from "express";
import dotenv from "dotenv";
import connecterBD from "./src/config/bd.js"; 
import routeurAuthentification from "./src/routes/authentification.js";

// Swagger
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

dotenv.config();       
connecterBD();         

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware pour lire le body JSON
app.use(express.json());

// Route racine
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Brancher les routes avant app.listen
app.use("/authentification", routeurAuthentification);

// Swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API MyContacts",
      version: "1.0.0",
      description: "Documentation des endpoints de l'application MyContacts"
    }
  },
  apis: ["./src/routes/*.js"], 
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Le serveur tourne sur : http://localhost:${PORT}`);
});
