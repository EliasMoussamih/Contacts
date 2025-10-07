import dotenv from "dotenv";
dotenv.config();


import express from "express";
import cors from "cors";
import connecterBD from "./src/config/bd.js";
import routeurAuthentification from "./src/routes/authentification.js";
import routeurContacts from "./src/routes/contacts.js";


import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";


console.log("MONGODB_URL =", process.env.MONGODB_URL);
connecterBD();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.json());


app.get("/", (req, res) => {
  res.send("Serveur MyContacts en ligne !");
});

// Routes
app.use("/authentification", routeurAuthentification);
app.use("/contacts", routeurContacts);

// Configuration de Swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API MyContacts",
      version: "1.0.0",
      description: "Documentation des endpoints de l'application MyContacts",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));


app.listen(PORT, () => {
  console.log(`Le serveur tourne sur : http://localhost:${PORT}`);
});

export default app;
