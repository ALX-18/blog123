import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../config/firebase";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";
import {Search, User} from "lucide-react";
import Logo from "@/assets/images/blog123.svg";

export default function SearchResults() {
    const [articles, setArticles] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [searchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
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
        if (!searchTerm) return;

        const keyword = searchTerm.toLowerCase();


        const results = articles.filter((a) => {
            const normalizedTags = Array.isArray(a.tags)
                ? a.tags
                : typeof a.tags === "string"
                    ? a.tags.split(",").map((t) => t.trim())
                    : [];

            return normalizedTags.some((t) =>
                t.toLowerCase().includes(keyword)
            );
        });

        setFiltered(results);
    }, [searchTerm, articles]);


    return (

        <div className="min-h-screen bg-[#f8f9fa] p-6">
            <header
                className="sticky top-0 z-50 w-full border-b bg-white shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/90">
                <div className="container flex h-16 items-center justify-between">
                    <Link to="/" className="flex items-center space-x-2">
                        <img src={Logo || "/placeholder.svg"} alt="Logo" className="h-12 w-auto"/>
                    </Link>
                    <nav className="hidden md:flex space-x-6 text-sm font-medium">
                        <Link to="/Interview"
                              className="transition-colors hover:text-[#E03C31] rounded-md px-3 py-2 hover:bg-[#E03C31]/5">Interviews</Link>
                        <Link to="/articles"
                              className="transition-colors hover:text-[#E03C31] rounded-md px-3 py-2 hover:bg-[#E03C31]/5">Articles</Link>
                        <Link to="/sports"
                              className="transition-colors hover:text-[#E03C31] rounded-md px-3 py-2 hover:bg-[#E03C31]/5">Sports</Link>
                        <Link to="/about"
                              className="transition-colors hover:text-[#E03C31] rounded-md px-3 py-2 hover:bg-[#E03C31]/5">À
                            propos</Link>
                    </nav>
                    {isLoggedIn ? (
                        <Link to="/profile">
                            <Button
                                className="bg-[#E03C31] text-white hover:bg-[#F6C54A] hover:text-[#E03C31] rounded-full">
                                <User className="h-4 w-4 mr-2"/>
                                Profil
                            </Button>
                        </Link>
                    ) : (
                        <Link to="/login">
                            <Button
                                className="bg-[#E03C31] text-white hover:bg-[#F6C54A] hover:text-[#E03C31] rounded-full">
                                Connexion
                            </Button>
                        </Link>
                    )}
                </div>
            </header>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-[#E03C31] mb-6">Résultats pour "{searchTerm}"</h1>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const q = searchTerm.trim();
                        if (q) {
                            window.history.pushState({}, "", `?q=${q}`);
                            const filtered = articles.filter((a) =>
                                a.tags?.some((t) => t.toLowerCase().includes(q.toLowerCase()))
                            );
                            setFiltered(filtered);
                        }
                    }}
                    className="flex gap-2 mb-8"
                >
                    <Input
                        placeholder="Rechercher par tag..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1 rounded-full pl-4"
                    />
                    <Button type="submit" className="bg-[#E03C31] text-white hover:bg-[#F6C54A] hover:text-[#E03C31] rounded-full">
                        <Search className="h-4 w-4 mr-1"/>
                        Rechercher
                    </Button>
                </form>

                {filtered.length === 0 ? (
                    <p className="text-muted-foreground">Aucun article trouvé avec ce tag.</p>
                ) : (
                    <div className="grid gap-6">
                        {filtered.map((article) => (
                            <Card key={article.id} className="shadow-sm">
                                <CardHeader>
                                    <CardTitle>{article.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">
                                        Tags : {article.tags?.join(", ")}
                                    </p>
                                    <Link
                                        to={`/articles/${article.id}`}
                                        className="text-[#E03C31] font-medium hover:underline mt-2 inline-block"
                                    >
                                        Voir l'article →
                                    </Link>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
