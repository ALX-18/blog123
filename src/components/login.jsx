import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Mail, Lock } from 'lucide-react';
import { auth, googleProvider, facebookProvider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { collection, query, where, getDocs, addDoc, serverTimestamp } from "firebase/firestore"
import { db } from "../config/firebase"




export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const auth = getAuth();
            await signInWithEmailAndPassword(auth, email, password);
            localStorage.setItem('authToken', "true"); // ou utilise un vrai token si tu en as un
            window.dispatchEvent(new Event('authChanged')); // pour mettre à jour le bouton
            console.log("Connexion réussie");
            navigate("/"); // Redirect to home page after successful login
        } catch (err) {
            setError("Email ou mot de passe incorrect");
            console.error("Erreur de connexion:", err);
        } finally {
            setIsLoading(false);
        }
    };
    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            // Vérifie si l'utilisateur existe déjà dans Firestore
            const q = query(collection(db, "users"), where("uid", "==", user.uid));
            const snapshot = await getDocs(q);

            if (snapshot.empty) {
                // Crée un nouvel utilisateur
                await addDoc(collection(db, "users"), {
                    uid: user.uid,
                    email: user.email,
                    username: user.displayName || "Utilisateur",
                    url: user.photoURL || "/placeholder-avatar.png",
                    isrole: "reader",
                    createdAt: serverTimestamp()
                });
                console.log("👤 Nouvel utilisateur enregistré !");
            }

            localStorage.setItem('authToken', "true");
            window.dispatchEvent(new Event('authChanged'));
            navigate("/");
        } catch (error) {
            console.error("Erreur Google :", error);
            setError("Erreur lors de la connexion avec Google.");
        }
    }

    const handleFacebookLogin = async () => {
        try {
            facebookProvider.addScope('email');

            const result = await signInWithPopup(auth, facebookProvider);
            const user = result.user;

            // Vérifie si l'utilisateur existe déjà dans Firestore
            const q = query(collection(db, "users"), where("uid", "==", user.uid));
            const snapshot = await getDocs(q);

            if (snapshot.empty) {
                // Crée un nouvel utilisateur Firestore
                await addDoc(collection(db, "users"), {
                    uid: user.uid,
                    email: user.email,
                    username: user.displayName || "Utilisateur Facebook",
                    url: user.photoURL || "/placeholder-avatar.png",
                    isrole: "reader", // Rôle par défaut
                    createdAt: serverTimestamp()
                });
                console.log("👤 Nouvel utilisateur Facebook enregistré !");
            }

            localStorage.setItem('authToken', "true");
            window.dispatchEvent(new Event('authChanged'));
            navigate("/");
        } catch (error) {
            console.error("Erreur Facebook :", error);
            setError("Erreur lors de la connexion avec Facebook.");
        }
    };

    return (
        <div className="flex min-h-screen flex-col bg-[#f8f9fa]">
            <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
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
                </div>
            </header>

            <main className="flex-1 flex items-center justify-center py-12 px-4">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900">Connexion</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Bienvenue sur BLOG123
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="mt-8 space-y-6">
                        {error && (
                            <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Adresse email
                                </label>
                                <div className="mt-1 relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        className="pl-10"
                                        placeholder="vous@exemple.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Mot de passe
                                </label>
                                <div className="mt-1 relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        className="pl-10"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-[#E03C31] focus:ring-[#E03C31]"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                    Se souvenir de moi
                                </label>
                            </div>

                            <Link
                                to="/forgot-password"
                                className="text-sm font-medium text-[#E03C31] hover:text-[#F6C54A]"
                            >
                                Mot de passe oublié ?
                            </Link>
                        </div>

                        <div className="space-y-4">
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-[#E03C31] text-white hover:bg-[#F6C54A] hover:text-[#E03C31]"
                            >
                                {isLoading ? "Connexion..." : "Se connecter"}
                            </Button>
                            <div className="flex flex-col space-y-3">
                                <Button
                                    type="button"
                                    onClick={handleGoogleLogin}
                                    className="w-full bg-white text-gray-800 border border-gray-300 hover:bg-gray-100"
                                >
                                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google"
                                         className="w-5 h-5 mr-2"/>
                                    Continuer avec Google
                                </Button>

                            </div>

                            <div className="text-center">
                                <span className="text-sm text-gray-500">
                                    Pas encore de compte ?{" "}
                                    <Link
                                        to="/register"
                                        className="font-medium text-[#E03C31] hover:text-[#F6C54A]"
                                    >
                                        S'inscrire
                                    </Link>
                                </span>
                            </div>
                        </div>
                    </form>
                </div>
            </main>

            <footer className="py-6 border-t bg-white">
                <div className="container px-4 md:px-6">
                    <p className="text-center text-sm text-gray-500">
                        © 2024 BLOG123. Tous droits réservés.
                    </p>
                </div>
            </footer>
        </div>
    );
}
