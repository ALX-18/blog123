import { Auth } from "./components/auth";
import Acceuil from "./components/Acceuil"; // Assurez-vous que le fichier est bien nommé Acceuil.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react';
import './index.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/" element={<Acceuil />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;