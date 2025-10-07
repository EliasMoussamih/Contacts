import request from "supertest";
import app from "../../server.js";
import mongoose from "mongoose";

let server;
let token;
let createdContactId;

beforeAll(async () => {
  server = app.listen(6001);

  const user = {
    email: `contacttest${Date.now()}@mail.com`,
    motDePasse: "123456",
  };

  await request(app).post("/authentification/inscription").send(user);
  const res = await request(app).post("/authentification/connexion").send(user);
  token = res.body.token;
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.close();
});

describe("📇 Tests Contacts", () => {
  it("➡️ Devrait créer un contact", async () => {
    const contact = {
      prenom: "John",
      nom: "Doe",
      telephone: "0606060606",
      email: "john.doe@mail.com",
    };

    const res = await request(app)
      .post("/contacts")
      .set("Authorization", `Bearer ${token}`)
      .send(contact);

    expect(res.statusCode).toBe(201);
    createdContactId = res.body._id;
  });

  it("➡️ Devrait récupérer la liste des contacts", async () => {
    const res = await request(app)
      .get("/contacts")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("➡️ Devrait modifier un contact", async () => {
    const res = await request(app)
      .patch(`/contacts/${createdContactId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ telephone: "0707070707" });

    expect(res.statusCode).toBe(200);
    expect(res.body.telephone).toBe("0707070707");
  });

  it("➡️ Devrait supprimer un contact", async () => {
    const res = await request(app)
      .delete(`/contacts/${createdContactId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });
});
