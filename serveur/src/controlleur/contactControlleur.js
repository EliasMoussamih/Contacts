import Contact from "../model/Contact.js";

/** 🔹 Récupérer tous les contacts */
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ utilisateurId: req.user.id });
    res.json(contacts);
  } catch (erreur) {
    console.error(erreur);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

/** 🔹 Créer un nouveau contact */
export const createContact = async (req, res) => {
  const { prenom, nom, telephone, email } = req.body;

  if (!prenom || !nom || !telephone)
    return res.status(400).json({ message: "Champs obligatoires manquants" });

  if (email && !/^\S+@\S+\.\S+$/.test(email))
    return res.status(400).json({ message: "Format du mail non valide" });

  if (telephone.length < 9 || telephone.length > 20)
    return res.status(400).json({ message: "Format du numéro de téléphone non valide" });

  try {
    const nouveauContact = new Contact({
      utilisateurId: req.user.id,
      prenom,
      nom,
      telephone,
      email,
    });

    await nouveauContact.save();
    res.status(201).json(nouveauContact);
  } catch (erreur) {
    console.error(erreur);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

/** 🔹 Mettre à jour un contact */
export const updateContact = async (req, res) => {
  const { id } = req.params;
  const misesAJour = req.body;

  if (misesAJour.email && !/^\S+@\S+\.\S+$/.test(misesAJour.email))
    return res.status(400).json({ message: "Format du mail non valide" });

  if (misesAJour.telephone && (misesAJour.telephone.length < 9 || misesAJour.telephone.length > 20))
    return res.status(400).json({ message: "Format du numéro de téléphone non valide" });

  try {
    const contact = await Contact.findOneAndUpdate(
      { _id: id, utilisateurId: req.user.id },
      misesAJour,
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({ message: "Contact non trouvé" });
    }

    res.json(contact);
  } catch (erreur) {
    console.error(erreur);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

/** 🔹 Supprimer un contact */
export const deleteContact = async (req, res) => {
  const { id } = req.params;

  try {
    const contactSupprime = await Contact.findOneAndDelete({
      _id: id,
      utilisateurId: req.user.id,
    });

    if (!contactSupprime) {
      return res.status(404).json({ message: "Contact non trouvé" });
    }

    res.json({ message: "Contact supprimé avec succès" });
  } catch (erreur) {
    console.error(erreur);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
