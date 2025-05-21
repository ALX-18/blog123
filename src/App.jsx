import { Auth } from "./components/auth.jsx";
import Acceuil from "./components/acceuil.jsx"; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react';
import './index.css';
import CreateArticles from "./components/CreateArticles.jsx";
import Interview from "./components/interview.jsx";
import Sports from "./components/sports.jsx";
import Articles from "./components/articles.jsx";
import Login from "./components/login.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import CreateAccount from "./components/CreateAccount.jsx";
import {ArticleDetails} from "./components/articlesdetail.jsx";
import About from "./components/about.jsx";
import Profil from "./components/Profil.jsx";
import AdminPanel from "./components/AdminPanel.jsx";
import PrivateRouteAdmin from "./components/PrivateRouteAdmin";
import EditArticle from "./components/EditArticle"
import PrivateRouteCreate from "./components/PrivateRouteCreate"
import SearchResults from "./components/SearchResults";
import ArticlesByTag from "./components/ArticlesByTag";
import CreateInterview from "./components/CreateInterview.jsx";
import InterviewDetails from "./components/InterviewDetails.jsx";

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
                    <Route path="/profile" element={<Profil />} />
                    <Route path="/admin" element={
                        <PrivateRouteAdmin>
                            <AdminPanel />
                        </PrivateRouteAdmin>
                    } />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/register" element={<CreateAccount />} />
                    <Route path="/create" element={
                        <PrivateRouteCreate>
                            <CreateArticles />
                        </PrivateRouteCreate>
                    } />
                    <Route path="/about" element={<About/>} />
                    <Route path="/articles/edit/:id" element={<EditArticle />} />
                    <Route path="/recherche" element={<SearchResults />} />
                    <Route path="/articles-by-tag" element={<ArticlesByTag />} />
                    <Route path="/create-interview" element={<CreateInterview />} />
                    <Route path="/interview/:id" element={<InterviewDetails />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;