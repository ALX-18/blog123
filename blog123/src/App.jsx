import { Auth } from "./components/auth";
import Acceuil from "./components/acceuil"; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react';
import './index.css';
import Interview from "./components/interview";
import Sports from "./components/sports";
import Articles from "./components/articles";

import CreateArticle from "./components/CreateArticle.jsx";
function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/" element={<Acceuil />} />
                    <Route path="/interview" element={<Interview />} />
                    <Route path="/sports" element={<Sports />} />
                    <Route path="/articles" element={<Articles />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;