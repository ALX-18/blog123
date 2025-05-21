import { Link } from "react-router-dom"; // React Router
import { Button } from "./ui/button.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.jsx";
import { Input } from "./ui/input.jsx";
import React, { useEffect, useState } from "react";
import { Search, ArrowRight, Trophy, Calendar, Star, TrendingUp, Users, Bookmark, User } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../config/firebase";
// Image imports
import leaMartin from "../assets/images/Accueil/lea-martin.png";
import thomasDubois from "../assets/images/Accueil/thomas-dubois.png";
import sophieLeroux from "../assets/images/Accueil/sophie-leroux.png";
import Logo from "../assets/images/blog123.svg";
import olympicsImage from "../assets/images/Accueil/olympics.png";
 
export default function Acceuil() {
    const sports = [
        {
            name: "Football",
            icon: <Trophy className="h-8 w-8 text-[#E03C31] mb-2" />
        },
        {
            name: "Rugby",
            icon: <Users className="h-8 w-8 text-[#E03C31] mb-2" />
        },
        {
            name: "Tennis",
            icon: <TrendingUp className="h-8 w-8 text-[#E03C31] mb-2" />
        },
        {
            name: "Natation",
            icon: <Star className="h-8 w-8 text-[#E03C31] mb-2" />
        }
    ];



    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState("");
    // Authentication state management
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const checkAuth = () => {
        const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
        setIsLoggedIn(!!token);
    };
 
    useEffect(() => {
        checkAuth(); // Vérifie dès le montage
 
        // Écoute l’événement personnalisé "authChanged"
        window.addEventListener('authChanged', checkAuth);
 
        // Nettoyage
        return () => {
            window.removeEventListener('authChanged', checkAuth);
        };
    }, []);
 
    const [featuredArticle, setFeaturedArticle] = useState(null);
    const [recentArticles, setRecentArticles] = useState([]);
    const [recentInterviews, setRecentInterviews] = useState([]);
 
    useEffect(() => {
        // Fetch latest article for "À la une"
        const fetchFeaturedArticle = async () => {
            try {
                const articlesQuery = query(collection(db, "articles"), orderBy("createdAt", "desc"), limit(1));
                const querySnapshot = await getDocs(articlesQuery);
                if (!querySnapshot.empty) {
                    const doc = querySnapshot.docs[0];
                    setFeaturedArticle({ id: doc.id, ...doc.data() });
                }
            } catch (error) {
                console.error("Erreur lors de la récupération de l'article à la une:", error);
            }
        };
        fetchFeaturedArticle();
    }, []);
 
    useEffect(() => {
        // Fetch recent articles (except the featured one)
        const fetchRecentArticles = async () => {
            try {
                const articlesQuery = query(collection(db, "articles"), orderBy("createdAt", "desc"), limit(4));
                const querySnapshot = await getDocs(articlesQuery);
                const articlesData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setRecentArticles(articlesData);
            } catch (error) {
                console.error("Erreur lors de la récupération des articles récents:", error);
            }
        };
        fetchRecentArticles();
    }, []);
 
    useEffect(() => {
        // Fetch recent interviews
        const fetchRecentInterviews = async () => {
            try {
                const interviewsQuery = query(collection(db, "interview"), orderBy("createdAt", "desc"), limit(3));
                const querySnapshot = await getDocs(interviewsQuery);
                console.log("Fetched interviews:", querySnapshot.docs); // 👈 debug ici

                const interviewsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setRecentInterviews(interviewsData);
            } catch (error) {
                console.error("Erreur lors de la récupération des interviews récentes:", error);
            }
        };
        fetchRecentInterviews();
    }, []);
 
    return (
        <div className="flex min-h-screen flex-col bg-[#f8f9fa]">
            {/* Modernized Header - Reduced height */}
            <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/90">
                <div className="container flex h-16 items-center justify-between">
                    <Link to="/" className="flex items-center space-x-2">
                        <img src={Logo || "/placeholder.svg"} alt="Logo" className="h-24 w-auto max-h-24 -my-4" style={{maxHeight:'96px'}} />
                    </Link>
                    <nav className="hidden md:flex space-x-6 text-sm font-medium">
                        <Link to="/Interview" className="transition-colors hover:text-[#E03C31] rounded-md px-3 py-2 hover:bg-[#E03C31]/5">Interviews</Link>
                        <Link to="/articles" className="transition-colors hover:text-[#E03C31] rounded-md px-3 py-2 hover:bg-[#E03C31]/5">Articles</Link>
                        <Link to="/sports" className="transition-colors hover:text-[#E03C31] rounded-md px-3 py-2 hover:bg-[#E03C31]/5">Sports</Link>
                        <Link to="/about" className="transition-colors hover:text-[#E03C31] rounded-md px-3 py-2 hover:bg-[#E03C31]/5">À propos</Link>
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

            <main className="flex-1">
                {/* Hero Section with Background Pattern */}
                <section className="relative w-full py-16 md:py-24 lg:py-32 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#f8f9fa] via-white to-[#f1f3f5] z-0"></div>
                    <div
                        className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmOGY5ZmEiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30 z-0"></div>
                    <div className="container relative z-10 px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-6 text-center">
                            <div
                                className="inline-block rounded-full bg-[#E03C31]/10 px-3 py-1 text-sm font-medium text-[#E03C31] mb-2">
                                Le meilleur du sport en Occitanie
                            </div>
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-[#E03C31] to-[#F6C54A] bg-clip-text text-transparent">
                                Découvrez les Stars du Sport
                            </h1>
                            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                                Interviews exclusives, articles passionnants et histoires inspirantes de sportifs
                                professionnels et espoirs.
                            </p>
                            <div className="w-full max-w-md space-y-2">
                                <form
                                    className="flex space-x-2"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        if (searchValue.trim() !== "") {
                                            navigate(`/recherche?q=${encodeURIComponent(searchValue.trim())}`);
                                        }
                                    }}
                                >
                                    <Input
                                        className="flex-1 shadow-sm border-2 focus:border-[#E03C31] rounded-full pl-4"
                                        placeholder="Rechercher un athlète, un sport..."
                                        type="search"
                                        value={searchValue}
                                        onChange={(e) => setSearchValue(e.target.value)}
                                    />
                                    <Button
                                        type="submit"
                                        className="bg-[#E03C31] text-white hover:bg-[#F6C54A] hover:text-[#E03C31] shadow-md rounded-full"
                                    >
                                        <Search className="h-4 w-4"/>
                                        <span className="sr-only">Rechercher</span>
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div
                        className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#f8f9fa] to-transparent"></div>
                </section>

                {/* Featured Categories */}
                <section className="w-full py-12 bg-white">
                    <div className="container px-4 md:px-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {sports.map((sport, index) => (
                                <Link
                                    to={`/articles-by-tag?sport=${sport.name.toLowerCase()}`}
                                    key={index}
                                    className="flex flex-col items-center p-4 text-center rounded-xl bg-[#f8f9fa] hover:bg-[#E03C31]/5 transition-colors shadow-sm hover:shadow"
                                >
                                    {sport.icon}

                                    <h3 className="font-medium">{sport.name}</h3>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Latest Interviews with Enhanced Cards */}
                <section className="w-full py-12 bg-white">
                    <div className="container px-4 md:px-6">
                        <div className="relative overflow-hidden rounded-2xl bg-[#E03C31]">
                            <div
                                className="absolute inset-0 bg-[url('data:image/svg+xml;base64,...')] opacity-20 z-0"></div>

                            <div className="grid md:grid-cols-2 gap-6 p-6 md:p-10 relative z-10">
                                {recentInterviews.length > 0 ? (
                                    <>
                                        <div className="flex flex-col justify-center text-white space-y-4">
                                            <span
                                                className="inline-block bg-white/20 px-3 py-1 rounded-full text-sm font-medium">Interview à la une</span>
                                            <h2 className="text-2xl md:text-3xl font-bold">{recentInterviews[0].title}</h2>
                                            <p className="text-white/80">{recentInterviews[0].quote || "Découvrez cette interview exclusive !"}</p>
                                            <div className="flex items-center space-x-4">
                                                <Link to={`/interview/${recentInterviews[0].id}`}>
                                                    <Button
                                                        type="button"
                                                        className="bg-white text-[#E03C31] hover:bg-[#F6C54A] hover:text-[#E03C31] w-fit rounded-full"
                                                    >
                                                        Lire l'interview complète
                                                    </Button>
                                                </Link>
                                                <Link
                                                    to="/interview"
                                                    className="text-white underline hover:text-[#F6C54A] text-sm"
                                                >
                                                    Voir toutes
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-center">
                                            <img
                                                src={recentInterviews[0].image || recentInterviews[0].urlphoto || "/placeholder.svg"}
                                                alt={recentInterviews[0].title}
                                                className="rounded-xl shadow-lg max-w-full h-auto"
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <div
                                        className="col-span-2 flex justify-center items-center min-h-[200px] text-white/80">
                                        Aucune interview disponible
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>


                {/* Featured Article */}
                <section className="w-full py-12 bg-white">
                    <div className="container px-4 md:px-6">
                        <div className="relative overflow-hidden rounded-2xl bg-[#E03C31]">
                            <div
                                className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1zbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
                            <div className="grid md:grid-cols-2 gap-6 p-6 md:p-10 relative z-10">
                                {featuredArticle ? (
                                    <>
                                        <div className="flex flex-col justify-center text-white space-y-4">
                                            <span
                                                className="inline-block bg-white/20 px-3 py-1 rounded-full text-sm font-medium">À la une</span>
                                            <h2 className="text-2xl md:text-3xl font-bold">{featuredArticle.title}</h2>
                                            <p className="text-white/80">{featuredArticle.description || featuredArticle.excerpt || ''}</p>
                                            <Link
                                                to={featuredArticle && featuredArticle.id ? `/articles/${featuredArticle.id}` : "#"}>
                                                <Button type="button"
                                                        className="bg-white text-[#E03C31] hover:bg-[#F6C54A] hover:text-[#E03C31] w-fit rounded-full">
                                                    Lire l'article complet
                                                </Button>
                                            </Link>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <img
                                                src={featuredArticle.image || featuredArticle.img || "/placeholder.svg"}
                                                alt={featuredArticle.title}
                                                className="rounded-xl shadow-lg max-w-full h-auto"
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <div
                                        className="col-span-2 flex justify-center items-center min-h-[200px] text-white/80">Aucun
                                        article à la une</div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Recent Articles with Enhanced Cards */}
                <section className="w-full py-12 md:py-24 bg-[#f8f9fa]">
                    <div className="container px-4 md:px-6">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-bold tracking-tighter">Articles Récents</h2>
                            <Link to="/articles"
                                  className="text-[#E03C31] hover:text-[#F6C54A] font-medium flex items-center rounded-full px-4 py-1 hover:bg-[#E03C31]/5 transition-colors">
                                Tous les articles <ArrowRight className="ml-1 h-4 w-4"/>
                            </Link>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {recentArticles.filter(a => a.id !== (featuredArticle && featuredArticle.id)).map((article, index) => (
                                <Card key={article.id}
                                      className="overflow-hidden hover:shadow-lg transition-shadow border-0 shadow-sm rounded-xl">
                                    {article.image && article.image !== "/placeholder.svg" && (
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="w-full h-48 object-cover"
                                            onError={e => {
                                                e.target.style.display = "none";
                                            }}
                                        />
                                    )}
                                    <CardHeader className="pb-2 border-b">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span
                                                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#E03C31]/10 text-[#E03C31]">
                                                <TrendingUp className="h-5 w-5"/>
                                            </span>
                                            <span className="text-xs font-medium text-muted-foreground">
                                                {article.category || article.categorie || "Sport"}
                                            </span>
                                        </div>
                                        <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-4">
                                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{article.description || article.excerpt || article.content?.slice(0, 120) || "Aucune description."}</p>
                                        <div className="flex justify-between items-center">
                                            <span
                                                className="text-xs text-muted-foreground">{article.createdAt && article.createdAt.toDate ? article.createdAt.toDate().toLocaleDateString("fr-FR") : "Date inconnue"}</span>
                                            <Link to={`/articles/${article.id}`}>
                                                <Button variant="link"
                                                        className="p-0 h-auto font-semibold text-[#E03C31] hover:text-[#F6C54A]">
                                                    Lire l'article
                                                    <ArrowRight className="ml-2 h-4 w-4"/>
                                                </Button>
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Newsletter Section */}
                <section className="w-full py-12 bg-white">
                    <div className="container px-4 md:px-6">
                        <div className="rounded-2xl bg-gradient-to-r from-[#E03C31] to-[#F6C54A] p-6 md:p-10 shadow-lg">
                            <div className="grid md:grid-cols-2 gap-6 items-center">
                                <div className="space-y-4">
                                    <h2 className="text-2xl md:text-3xl font-bold text-white">Restez informé</h2>
                                    <p className="text-white/90">Recevez nos dernières interviews et articles
                                        directement dans votre boîte mail.</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                    <form className="flex flex-col sm:flex-row gap-3">
                                        <Input
                                            className="flex-1 bg-white/80 border-0 placeholder:text-gray-500 rounded-full pl-4"
                                            placeholder="Votre adresse email"
                                            type="email"
                                        />
                                        <Button
                                            className="bg-white text-[#E03C31] hover:bg-[#F6C54A] hover:text-[#E03C31] rounded-full">
                                            S'abonner
                                        </Button>
                                    </form>
                                    <p className="text-xs text-white/70 mt-2">
                                        En vous inscrivant, vous acceptez notre politique de confidentialité.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="w-full border-t py-8 bg-white">
                <div className="container px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <Link to="/" className="flex items-center space-x-2 mb-4">
                                <img src={Logo || "/placeholder.svg"} alt="Logo" className="h-8 w-auto"/>
                            </Link>
                            <p className="text-sm text-muted-foreground">
                                Le blog de référence pour suivre l'actualité sportive en Occitanie et au-delà.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-medium mb-4">Liens rapides</h3>
                            <nav className="flex flex-col space-y-2">
                                <Link to="/interviews"
                                      className="text-sm text-muted-foreground hover:text-[#E03C31]">Interviews</Link>
                                <Link to="/articles"
                                      className="text-sm text-muted-foreground hover:text-[#E03C31]">Articles</Link>
                                <Link to="/sports"
                                      className="text-sm text-muted-foreground hover:text-[#E03C31]">Sports</Link>
                                <Link to="/about" className="text-sm text-muted-foreground hover:text-[#E03C31]">À
                                    propos</Link>
                            </nav>
                        </div>
                        <div>
                            <h3 className="font-medium mb-4">Légal</h3>
                            <nav className="flex flex-col space-y-2">
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
                    </div>
                    <div className="border-t mt-8 pt-6">
                        <p className="text-center text-sm text-muted-foreground">
                            © 2024 BLOG123. Tous droits réservés.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}