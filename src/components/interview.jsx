import { Link } from "react-router-dom";
import { Button } from "./ui/button.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.jsx";
import React, { useEffect, useState } from "react";
import { ArrowRight, User } from "lucide-react";
import { db } from "../config/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import Logo from "../assets/images/blog123.svg";

export default function Interview() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [interviews, setInterviews] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
        setIsLoggedIn(!!token);
    }, []);

    useEffect(() => {
        const fetchInterviews = async () => {
            try {
                const q = query(collection(db, "interview"), orderBy("createdAt", "desc"));
                const snapshot = await getDocs(q);
                const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setInterviews(data);
            } catch (err) {
                console.error("Erreur de chargement des interviews :", err);
            }
        };

        fetchInterviews();
    }, []);

    return (
        <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
                <div className="container flex h-16 items-center justify-between">
                    <Link to="/" className="flex items-center space-x-2 overflow-visible">
                        <img src={Logo || "/placeholder.svg"} alt="Logo" className="h-24 w-auto max-h-24 -my-4" style={{maxHeight:'96px'}} />
                    </Link>
                    <nav className="hidden md:flex space-x-6 text-sm font-medium">
                        <Link to="/Interview" className="transition-colors hover:text-[#E03C31]">Interviews</Link>
                        <Link to="/articles" className="transition-colors hover:text-[#E03C31]">Articles</Link>
                        <Link to="/sports" className="transition-colors hover:text-[#E03C31]">Sports</Link>
                        <Link to="/about" className="transition-colors hover:text-[#E03C31]">À propos</Link>
                    </nav>
                    {isLoggedIn ? (
                        <Link to="/profile">
                            <Button className="bg-[#E03C31] text-white hover:bg-[#F6C54A] hover:text-[#E03C31] rounded-full">
                                <User className="h-4 w-4 mr-2" /> Profil
                            </Button>
                        </Link>
                    ) : (
                        <Link to="/login">
                            <Button className="bg-[#E03C31] text-white hover:bg-[#F6C54A] hover:text-[#E03C31] rounded-full">
                                Connexion
                            </Button>
                        </Link>
                    )}
                </div>
            </header>

            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                                Interviews Inspirantes
                            </h1>
                            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                                Plongez dans les parcours captivants des athlètes, leur vision et leurs défis au quotidien.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter mb-8">Dernières Interviews</h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {interviews.map((interview) => (
                                <Card key={interview.id} className="overflow-hidden">
                                    {interview.urlphoto && interview.urlphoto !== "/placeholder.svg" && (
                                        <img
                                            src={interview.urlphoto}
                                            alt={interview.title}
                                            className="w-full h-48 object-cover"
                                            onError={(e) => e.target.style.display = "none"}
                                        />
                                    )}
                                    <CardHeader>
                                        <CardTitle>{interview.title || "Sans titre"}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground">
                                            {interview.author || interview.postedBy || "Auteur inconnu"}
                                        </p>
                                        <Link to={`/interview/${interview.id}`}>
                                            <Button
                                                variant="link"
                                                className="p-0 h-auto font-semibold text-[#E03C31] hover:text-[#F6C54A]"
                                            >
                                                Lire l'interview
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
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
