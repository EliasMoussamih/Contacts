📇 Gestion de Contacts – Application FullStack (MERN)
Une application complète de gestion de contacts permettant à un utilisateur de créer un compte, se connecter et gérer ses contacts personnels (ajout, modification, suppression, affichage).

🚀 Fonctionnalités principales
👤 Authentification
Création de compte (inscription)
Connexion sécurisée avec JWT
Accès protégé aux routes par token
📞 Gestion des contacts
Affichage de la liste de contacts personnels
Ajout, modification et suppression
Validation automatique des champs (email, téléphone)
Chaque utilisateur ne voit que ses propres contacts
💻 Interface utilisateur
Frontend développé en React
Pages :
Connexion
Inscription
Liste de contacts (CRUD)
Design simple et moderne
⚙️ Architecture
Frontend : React + Axios + React Router
Backend : Node.js + Express + MongoDB (via Mongoose)
Sécurité : JWT + bcrypt
Documentation : Swagger
Organisation : Modèle MVC (Models, Controllers, Routes)
🧩 Architecture des dossiers
⚙️ Installation locale
🧱 Prérequis
Node.js (v18+)
MongoDB (local ou MongoDB Atlas)
npm ou yarn
🔧 Étapes
Cloner le projet :
git clone https://github.com/<ton-nom-utilisateur>/contacts-app.git
cd contacts-app
npm install cd client npm install

Lancer le serveur : Back : Dans le dossier serveur -> npm start Front : Dans le dossier client -> npm start

Accéder à l’application : Frontend : http://localhost:3000 Backend : http://localhost:5000 Documentation Swagger : http://localhost:5000/api-docs
