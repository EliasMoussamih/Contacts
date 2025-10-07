import React from "react";
import "./App.css"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contacts from "./pages/Contacts";

export default function App() {
  return (
    <Router>
      <nav>
        <Link to="/login">Connexion</Link>
        <Link to="/register">Inscription</Link>
        <Link to="/contacts">Contacts</Link>
      </nav>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
    </Router>
  );
}
