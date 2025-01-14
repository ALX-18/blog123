import { Link, useNavigate } from "react-router-dom"; // React Router
import { Button } from "./ui/button.jsx";
import { Input } from "./ui/input.jsx";
import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const auth = getAuth();

        try {
            // Connexion utilisateur avec Firebase Authentication
            await signInWithEmailAndPassword(auth, email, password);
            alert("Connexion réussie !");
            navigate("/"); // Rediriger après connexion
        } catch (err) {
            setError("Adresse e-mail ou mot de passe incorrect.");
            console.error("Erreur lors de la connexion :", err);
        }
    };

    return (
        <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 items-center justify-between">
                    <Link to="/" className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-[#E03C31]">BLOG123</span>
                    </Link>
                    <nav className="hidden md:flex space-x-6 text-sm font-medium">
                        <Link to="/Interview" className="transition-colors hover:text-[#E03C31]">Interviews</Link>
                        <Link to="/articles" className="transition-colors hover:text-[#E03C31]">Articles</Link>
                        <Link to="/sports" className="transition-colors hover:text-[#E03C31]">Sports</Link>
                        <Link to="/about" className="transition-colors hover:text-[#E03C31]">À propos</Link>
                    </nav>
                    <Button className="bg-[#E03C31] text-white hover:bg-[#F6C54A] hover:text-[#E03C31]">
                        S'abonner
                    </Button>
                </div>
            </header>

            <main className="flex flex-1 items-center justify-center bg-muted">
                <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
                    <h1 className="text-2xl font-bold text-center text-[#E03C31]">Connexion</h1>
                    {error && <p className="text-center text-red-500">{error}</p>}
                    <form className="space-y-4" onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-muted-foreground">
                                Adresse e-mail
                            </label>
                            <Input
                                type="email"
                                id="email"
                                placeholder="Entrez votre e-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full mt-1"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-muted-foreground">
                                Mot de passe
                            </label>
                            <Input
                                type="password"
                                id="password"
                                placeholder="Entrez votre mot de passe"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full mt-1"
                                required
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <label className="flex items-center text-sm text-muted-foreground">
                                <input type="checkbox" className="mr-2" />
                                Se souvenir de moi
                            </label>
                            <Link to="/forgot-password" className="text-sm text-[#E03C31] hover:text-[#F6C54A]">
                                Mot de passe oublié ?
                            </Link>
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-[#E03C31] text-white hover:bg-[#F6C54A] hover:text-[#E03C31]"
                        >
                            Se connecter
                        </Button>
                    </form>
                    <p className="text-center text-sm text-muted-foreground">
                        Pas encore inscrit ?
                        <Link to="/register" className="ml-1 text-[#E03C31] hover:text-[#F6C54A]">
                            Créez un compte
                        </Link>
                    </p>
                </div>
            </main>

            <footer className="w-full border-t py-6 md:py-0">
                <div className="container flex flex-col gap-4 md:h-24 md:flex-row md:items-center">
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        © 2024 BLOG123. Tous droits réservés.
                    </p>
                    <nav className="flex items-center justify-center gap-4 md:ml-auto md:gap-6 md:justify-end">
                        <Link to="/privacy" className="text-sm text-muted-foreground hover:text-[#E03C31]">
                            Politique de confidentialité
                        </Link>
                        <Link to="/terms" className="text-sm text-muted-foreground hover:text-[#E03C31]">
                            Conditions d'utilisation
                        </Link>
                        <Link to="/contact" className="text-sm text-muted-foreground hover:text-[#E03C31]">
                            Contact
                        </Link>
                    </nav>
                </div>
            </footer>
        </div>
    );
}
