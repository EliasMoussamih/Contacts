import React, { useEffect, useState } from "react";
import api from "../api";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ prenom: "", nom: "", telephone: "", email: "" });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };


  const fetchContacts = async () => {
    try {
      const res = await api.get("/contacts", config);
      setContacts(res.data);
    } catch (err) {
      console.error(err);
      setMessage("Erreur lors du chargement des contacts");
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.patch(`/contacts/${editingId}`, form, config);
        setMessage("Contact modifié !");
      } else {
        await api.post("/contacts", form, config);
        setMessage("Contact ajouté !");
      }
      setForm({ prenom: "", nom: "", telephone: "", email: "" });
      setEditingId(null);
      fetchContacts();
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Erreur serveur");
    }
  };

  // Supprimer un contact
  const handleDelete = async (id) => {
    try {
      await api.delete(`/contacts/${id}`, config);
      setMessage("Contact supprimé !");
      fetchContacts();
    } catch (err) {
      console.error(err);
      setMessage("Erreur lors de la suppression");
    }
  };


  const handleEdit = (contact) => {
    setForm({
      prenom: contact.prenom,
      nom: contact.nom,
      telephone: contact.telephone,
      email: contact.email || "",
    });
    setEditingId(contact._id);
  };

  return (
    <div className="contacts-container">
      <h2>Contacts</h2>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Prénom"
          value={form.prenom}
          onChange={(e) => setForm({ ...form, prenom: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Nom"
          value={form.nom}
          onChange={(e) => setForm({ ...form, nom: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Téléphone"
          value={form.telephone}
          onChange={(e) => setForm({ ...form, telephone: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <button type="submit">{editingId ? "Modifier" : "Ajouter"}</button>
      </form>

      <ul>
        {contacts.map((c) => (
          <li key={c._id}>
            {c.prenom} {c.nom} - {c.telephone} {c.email && `(${c.email})`}
            <button onClick={() => handleEdit(c)}>Modifier</button>
            <button onClick={() => handleDelete(c._id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
