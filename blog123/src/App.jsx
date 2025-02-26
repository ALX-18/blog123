import { Auth } from "./components/auth";
import Acceuil from "./components/acceuil"; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react';
import './index.css';
import CreateArticle from "./components/CreateArticle.jsx";
import CreateArticles from "./components/CreateArticles.jsx";
import Interview from "./components/interview";
import Sports from "./components/sports";
import Articles from "./components/articles";
import Login from "./components/login";
import ForgotPassword from "./components/ForgotPassword.jsx";
import CreateAccount from "./components/CreateAccount.jsx";
import {ArticleDetails} from "./components/articlesdetail.jsx";
import About from "./components/about.jsx";

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
                    <Route path="/articles/:id" element={<ArticleDetails />} />
                    <Route path="/login"element={<Login />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/register" element={<CreateAccount />} />
                    <Route path="/create" element={<CreateArticles/>} />
                    <Route path="/about" element={<About/>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;