import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card.jsx";
import { Input } from "./ui/input.jsx";
import { Button } from "./ui/button.jsx";
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../config/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function CreateAccount() {
    const [username, setUsername] = useState("");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        const auth = getAuth();

        try {
            // Créer un utilisateur avec Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                mail,
                password
            );
            const user = userCredential.user;

            // Ajouter l'utilisateur dans Firestore avec le rôle par défaut "user"
            await addDoc(collection(db, "user"), {
                username,
                mail,
                role: "user", // Rôle par défaut
                createdAt: serverTimestamp(),
                uid: user.uid, // Ajouter l'UID généré par Firebase Auth
            });

            alert("Utilisateur enregistré avec succès !");
            setUsername("");
            setMail("");
            setPassword("");
        } catch (error) {
            console.error("Erreur lors de l'enregistrement de l'utilisateur :", error);
            alert("Une erreur est survenue. Veuillez réessayer.");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted">
            <Card className="max-w-md w-full p-6">
                <CardHeader>
                    <CardTitle className="text-2xl text-center font-bold text-[#E03C31]">Créer un compte</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4" onSubmit={handleRegister}>
                        <Input
                            type="text"
                            placeholder="Nom d'utilisateur"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <Input
                            type="email"
                            placeholder="Adresse e-mail"
                            value={mail}
                            onChange={(e) => setMail(e.target.value)}
                            required
                        />
                        <Input
                            type="password"
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <Button
                            type="submit"
                            className="w-full bg-[#E03C31] text-white hover:bg-[#F6C54A] hover:text-[#E03C31]"
                        >
                            Créer un compte
                        </Button>
                    </form>
                    <p className="mt-4 text-center">
                        Vous avez déjà un compte ?{" "}
                        <Link to="/login" className="font-medium text-[#E03C31] hover:underline">
                            Connexion
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
