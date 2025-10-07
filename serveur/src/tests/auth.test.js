import request from "supertest";
import app from "../../server.js";
import mongoose from "mongoose";

let server;

beforeAll(async () => {
  server = app.listen(6000); 
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.close();
});

describe("🔐 Tests Authentification", () => {
  const user = {
    email: `test${Date.now()}@mail.com`,
    motDePasse: "123456",
  };

  it("➡️ Devrait créer un utilisateur", async () => {
    const res = await request(app)
      .post("/authentification/inscription")
      .send(user);

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Utilisateur créé avec succès");
  });

  it("➡️ Devrait connecter un utilisateur", async () => {
    const res = await request(app)
      .post("/authentification/connexion")
      .send(user);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
