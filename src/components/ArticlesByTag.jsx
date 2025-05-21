import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../config/firebase";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";
import Logo from "@/assets/images/blog123.svg";
import { Button } from "@/components/ui/button";
import { User, ArrowRight, Clock, Bookmark } from "lucide-react";

export default function ArticlesByTag() {
    const [articles, setArticles] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [searchParams] = useSearchParams();
    const tag = searchParams.get("sport");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
        setIsLoggedIn(!!token);
    }, []);

    useEffect(() => {
        const fetchArticles = async () => {
            const q = query(collection(db, "articles"));
            const snapshot = await getDocs(q);
            const all = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setArticles(all);
        };
        fetchArticles();
    }, []);

    useEffect(() => {
        if (!tag || articles.length === 0) return;
        const lowerTag = tag.toLowerCase();
        const results = articles.filter((a) => {
            const normalizedTags = Array.isArray(a.tags)
                ? a.tags
                : typeof a.tags === "string"
                    ? a.tags.split(",").map((t) => t.trim().toLowerCase())
                    : [];
            return normalizedTags.includes(lowerTag);
        });
        setFiltered(results);
    }, [tag, articles]);

    return (
        <div className="min-h-screen bg-[#f8f9fa]">
            {/* HEADER */}
            <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
                <div className="container flex h-16 items-center justify-between px-4">
                    <Link to="/" className="flex items-center space-x-2">
                        <img src={Logo || "/placeholder.svg"} alt="Logo" className="h-12 w-auto" />
                    </Link>
                    <nav className="hidden md:flex space-x-6 text-sm font-medium">
                        <Link to="/Interview" className="hover:text-[#E03C31]">Interviews</Link>
                        <Link to="/articles" className="hover:text-[#E03C31]">Articles</Link>
                        <Link to="/sports" className="hover:text-[#E03C31]">Sports</Link>
                        <Link to="/about" className="hover:text-[#E03C31]">À propos</Link>
                    </nav>
                    {isLoggedIn ? (
                        <Link to="/profile">
                            <Button className="bg-[#E03C31] text-white hover:bg-[#F6C54A] hover:text-[#E03C31] rounded-full">
                                <User className="h-4 w-4 mr-2" />
                                Profil
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

            {/* MAIN */}
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6 text-[#E03C31]">
                    Articles liés à "{tag}"
                </h1>

                {filtered.length === 0 ? (
                    <p className="text-muted-foreground">Aucun article trouvé pour ce sport.</p>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filtered.map((article) => (
                            <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow border-0 shadow-sm">
                                {article.image && article.image !== "/placeholder.svg" && (
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-48 object-cover"
                                        onError={(e) => { e.target.style.display = "none" }}
                                    />
                                )}
                                <CardHeader className="pb-2 border-b">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-xs text-muted-foreground">
                      {article.createdAt?.toDate().toLocaleDateString("fr-FR") || "Date inconnue"}
                    </span>
                                    </div>
                                    <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                                </CardHeader>

                                <CardContent className="pt-4">
                                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                                        {article.description || "Aucune description."}
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <Link to={`/articles/${article.id}`}>
                                            <Button variant="link" className="p-0 h-auto font-semibold text-[#E03C31] hover:text-[#F6C54A]">
                                                Lire l'article
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <Button variant="outline" className="rounded-full">
                                            <Bookmark className="h-4 w-4" />
                                            <span className="sr-only">Sauvegarder</span>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
