const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 5000; // Port sur lequel le serveur va écouter

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configuration de la connexion MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",        // Utilisateur de la base de données MySQL
  password: "root",        // Mot de passe pour l'utilisateur
  database: "appointments_db", // Nom de la base de données
});

// Connexion à la base de données MySQL
db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données:", err);
    return;
  }
  console.log("Connecté à la base de données MySQL");
});

// Route pour enregistrer un rendez-vous
app.post("/appointments", (req, res) => {
  const { firstName, lastName, email, phone, clientType, selectedDate, selectedTime, selectedCourse } = req.body;

  const query = `
    INSERT INTO appointments (first_name, last_name, email, phone, client_type, appointment_date, appointment_time, selected_course)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.execute(query, [firstName, lastName, email, phone, clientType, selectedDate, selectedTime, selectedCourse], (err, result) => {
    if (err) {
      console.error("Erreur lors de l'insertion:", err);
      res.status(500).json({ error: "Erreur lors de la création du rendez-vous." });
      return;
    }
    res.status(200).json({ message: "Rendez-vous créé avec succès." });
  });
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
