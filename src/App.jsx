import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import "./App.css";
import TimeSlotSelector from "../components/TimeSlotSelector";
import "./App";

const App = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    clientType: "particulier",
    selectedDate: null,
    selectedTime: "",
    selectedCourse: "",
  });

  const timeSlots = ["10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];
  const courses = ["IA Starter", "IA Performer", "IA Master"];

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:5000/appointments", formData);
      alert(response.data.message);
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de la création du rendez-vous.");
    }
  };
  
  

  return (
    <div className="container">
      <h2>Prise de rendez-vous</h2>
      <form onSubmit={handleSubmit}>
        <div className="section">
    <div className="form-row">
      <div className="form-group">
        <label htmlFor="firstName">Prénom :</label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleFormChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="lastName">Nom :</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleFormChange}
          required
        />
      </div>
    </div>

    <div className="form-row">
      <div className="form-group">
        <label htmlFor="email">Email :</label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleFormChange}
          required
        />
      </div>

    <div className="form-group">
      <label htmlFor="phone">Numéro de téléphone :</label>
      <input
        id="phone"
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleFormChange}
        required
      />
    </div>
  </div>
</div>

<div className="section">
      <label htmlFor="clientType">Type de client :</label>
      <div className="toggle-group">
        <label className="custom-radio">
          <input
            type="radio"
            name="clientType"
            value="particulier"
            checked={formData.clientType === "particulier"}
            onChange={handleFormChange}
          />
          Particulier
        </label>
        <label className="custom-radio">
          <input
            type="radio"
            name="clientType"
            value="professionnel"
            checked={formData.clientType === "professionnel"}
            onChange={handleFormChange}
          />
          Professionnel
        </label>
      </div>
    </div>

        <div className="section">
          <label htmlFor="date">Date :</label>
          <DatePicker
            id="date"
            selected={formData.selectedDate}
            onChange={(date) => setFormData({ ...formData, selectedDate: date })}
            placeholderText="Choisissez une date"
            required
          />
        </div>

        <div className="section">
          <label>Horaires disponibles :</label>
          <TimeSlotSelector
            timeSlots={timeSlots}
            selectedTime={formData.selectedTime}
            onTimeSelect={(time) => setFormData({ ...formData, selectedTime: time })}
          />
        </div>

        <div className="section">
          <label htmlFor="course">Formation :</label>
          <select
            id="course"
            name="selectedCourse"
            value={formData.selectedCourse}
            onChange={handleFormChange}
            required
          >
            <option value="">Choisissez une formation</option>
            {courses.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="button glow-effect">
          Confirmer le rendez-vous
          <svg class="glow-container">
            <rect pathLength="100" stroke-linecap="round" class="glow-blur"></rect>
            <rect pathLength="100" stroke-linecap="round" class="glow-line"></rect>
          </svg>
        </button>
      </form>
    </div>
  );
};


export default App;
