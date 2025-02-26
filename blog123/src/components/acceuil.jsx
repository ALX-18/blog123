import { Link } from "react-router-dom"; // React Router
import { Button } from "./ui/button.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.jsx";
import { Input } from "./ui/input.jsx";
import React from "react";
import { Search, ArrowRight, Trophy, Calendar, Star, TrendingUp, Users, Bookmark } from 'lucide-react';
import leaMartin from "../assets/images/Accueil/lea-martin.png"
import thomasDubois from "../assets/images/Accueil/thomas-dubois.png";
import sophieLeroux from "../assets/images/Accueil/sophie-leroux.png";

export default function Acceuil() {
    const isLoggedIn = false; // Simule l'état de connexion de l'utilisateur

    return (
        <div className="flex min-h-screen flex-col bg-[#f8f9fa]">
            <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/90">
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
                    {isLoggedIn ? (
                        <Button className="bg-[#E03C31] text-white hover:bg-[#F6C54A] hover:text-[#E03C31]">
                            S'abonner
                        </Button>
                    ) : (
                        <Link to="/login">
                            <Button className="bg-[#E03C31] text-white hover:bg-[#F6C54A] hover:text-[#E03C31]">
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
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmOGY5ZmEiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30 z-0"></div>
                    <div className="container relative z-10 px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-6 text-center">
                            <div className="inline-block rounded-full bg-[#E03C31]/10 px-3 py-1 text-sm font-medium text-[#E03C31] mb-2">
                                Le meilleur du sport en Occitanie
                            </div>
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-[#E03C31] to-[#F6C54A] bg-clip-text text-transparent">
                                Découvrez les Stars du Sport
                            </h1>
                            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                                Interviews exclusives, articles passionnants et histoires inspirantes de sportifs professionnels et espoirs.
                            </p>
                            <div className="w-full max-w-md space-y-2">
                                <form className="flex space-x-2">
                                    <Input 
                                        className="flex-1 shadow-sm border-2 focus:border-[#E03C31]" 
                                        placeholder="Rechercher un athlète, un sport..." 
                                        type="search" 
                                    />
                                    <Button 
                                        type="submit" 
                                        className="bg-[#E03C31] text-white hover:bg-[#F6C54A] hover:text-[#E03C31] shadow-md"
                                    >
                                        <Search className="h-4 w-4" />
                                        <span className="sr-only">Rechercher</span>
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#f8f9fa] to-transparent"></div>
                </section>

                {/* Featured Categories */}
                <section className="w-full py-12 bg-white">
                    <div className="container px-4 md:px-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="flex flex-col items-center p-4 text-center rounded-lg bg-[#f8f9fa] hover:bg-[#E03C31]/5 transition-colors">
                                <Trophy className="h-8 w-8 text-[#E03C31] mb-2" />
                                <h3 className="font-medium">Football</h3>
                            </div>
                            <div className="flex flex-col items-center p-4 text-center rounded-lg bg-[#f8f9fa] hover:bg-[#E03C31]/5 transition-colors">
                                <Users className="h-8 w-8 text-[#E03C31] mb-2" />
                                <h3 className="font-medium">Rugby</h3>
                            </div>
                            <div className="flex flex-col items-center p-4 text-center rounded-lg bg-[#f8f9fa] hover:bg-[#E03C31]/5 transition-colors">
                                <TrendingUp className="h-8 w-8 text-[#E03C31] mb-2" />
                                <h3 className="font-medium">Tennis</h3>
                            </div>
                            <div className="flex flex-col items-center p-4 text-center rounded-lg bg-[#f8f9fa] hover:bg-[#E03C31]/5 transition-colors">
                                <Star className="h-8 w-8 text-[#E03C31] mb-2" />
                                <h3 className="font-medium">Natation</h3>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Latest Interviews with Enhanced Cards */}
                <section className="w-full py-12 md:py-24 bg-[#f8f9fa]">
                    <div className="container px-4 md:px-6">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-bold tracking-tighter">Dernières Interviews</h2>
                            <Link to="/interviews" className="text-[#E03C31] hover:text-[#F6C54A] font-medium flex items-center">
                                Voir toutes <ArrowRight className="ml-1 h-4 w-4" />
                            </Link>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {[
                                { name: "Léa Martin", sport: "Tennis", image: leaMartin, quote: "Le mental est aussi important que la technique." },
                                { name: "Thomas Dubois", sport: "Football", image: thomasDubois, quote: "Chaque match est une nouvelle opportunité." },
                                { name: "Sophie Leroux", sport: "Natation", image: sophieLeroux, quote: "La discipline est la clé du succès." },
                            ].map((interview, index) => (
                                <Card key={index} className="overflow-hidden group hover:shadow-lg transition-shadow border-0 shadow-sm">
                                    <div className="relative">
                                        <img
                                            src={interview.image || "/placeholder.svg"}
                                            alt={interview.name}
                                            className="w-full h-56 object-cover transition-transform group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                                            <p className="text-white p-4 text-sm italic">"{interview.quote}"</p>
                                        </div>
                                    </div>
                                    <CardHeader className="pb-2">
                                        <CardTitle>{interview.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex justify-between items-center">
                                            <p className="text-sm text-muted-foreground">
                                                <span className="inline-block bg-[#E03C31]/10 text-[#E03C31] px-2 py-1 rounded-full text-xs font-medium">
                                                    {interview.sport}
                                                </span>
                                            </p>
                                            <Link to="/interviews">
                                                <Button
                                                    variant="link"
                                                    className="p-0 h-auto font-semibold text-[#E03C31] hover:text-[#F6C54A]"
                                                >
                                                    Lire l'interview
                                                    <ArrowRight className="ml-2 h-4 w-4" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Featured Article */}
                <section className="w-full py-12 bg-white">
                    <div className="container px-4 md:px-6">
                        <div className="relative overflow-hidden rounded-xl bg-[#E03C31]">
                            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
                            <div className="grid md:grid-cols-2 gap-6 p-6 md:p-10">
                                <div className="flex flex-col justify-center text-white space-y-4">
                                    <span className="inline-block bg-white/20 px-3 py-1 rounded-full text-sm font-medium">À la une</span>
                                    <h2 className="text-2xl md:text-3xl font-bold">Les Jeux Olympiques et l'héritage pour le sport régional</h2>
                                    <p className="text-white/80">Comment les JO de Paris 2024 vont influencer le développement du sport en Occitanie ?</p>
                                    <Button className="bg-white text-[#E03C31] hover:bg-[#F6C54A] hover:text-[#E03C31] w-fit">
                                        Lire l'article complet
                                    </Button>
                                </div>
                                <div className="flex items-center justify-center">
                                    <img 
                                        src="/placeholder.svg?height=300&width=400" 
                                        alt="Jeux Olympiques" 
                                        className="rounded-lg shadow-lg max-w-full h-auto"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Recent Articles with Enhanced Cards */}
                <section className="w-full py-12 md:py-24 bg-[#f8f9fa]">
                    <div className="container px-4 md:px-6">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-bold tracking-tighter">Articles Récents</h2>
                            <Link to="/articles" className="text-[#E03C31] hover:text-[#F6C54A] font-medium flex items-center">
                                Tous les articles <ArrowRight className="ml-1 h-4 w-4" />
                            </Link>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {[
                                { 
                                    title: "L'impact de la technologie dans le sport moderne", 
                                    category: "Technologie", 
                                    excerpt: "Comment les innovations technologiques transforment l'entraînement et la performance des athlètes.",
                                    icon: <TrendingUp className="h-5 w-5" />
                                },
                                { 
                                    title: "Les défis de la reconversion des athlètes professionnels", 
                                    category: "Carrière", 
                                    excerpt: "Quelles sont les options pour les sportifs après leur carrière professionnelle ?",
                                    icon: <Users className="h-5 w-5" />
                                },
                                { 
                                    title: "Nutrition sportive : mythes et réalités", 
                                    category: "Santé", 
                                    excerpt: "Démêler le vrai du faux concernant l'alimentation des sportifs de haut niveau.",
                                    icon: <Calendar className="h-5 w-5" />
                                },
                            ].map((article, index) => (
                                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow border-0 shadow-sm">
                                    <CardHeader className="pb-2 border-b">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#E03C31]/10 text-[#E03C31]">
                                                {article.icon}
                                            </span>
                                            <span className="text-xs font-medium text-muted-foreground">
                                                {article.category}
                                            </span>
                                        </div>
                                        <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-4">
                                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{article.excerpt}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-muted-foreground">5 min de lecture</span>
                                            <Button variant="outline" className="rounded-full">
                                                <Bookmark className="h-4 w-4 mr-2" />
                                                Sauvegarder
                                            </Button>
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
                        <div className="rounded-xl bg-gradient-to-r from-[#E03C31] to-[#F6C54A] p-6 md:p-10 shadow-lg">
                            <div className="grid md:grid-cols-2 gap-6 items-center">
                                <div className="space-y-4">
                                    <h2 className="text-2xl md:text-3xl font-bold text-white">Restez informé</h2>
                                    <p className="text-white/90">Recevez nos dernières interviews et articles directement dans votre boîte mail.</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                                    <form className="flex flex-col sm:flex-row gap-3">
                                        <Input 
                                            className="flex-1 bg-white/80 border-0 placeholder:text-gray-500" 
                                            placeholder="Votre adresse email" 
                                            type="email" 
                                        />
                                        <Button className="bg-white text-[#E03C31] hover:bg-[#F6C54A] hover:text-[#E03C31]">
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
                                <span className="text-xl font-bold text-[#E03C31]">BLOG123</span>
                            </Link>
                            <p className="text-sm text-muted-foreground">
                                Le blog de référence pour suivre l'actualité sportive en Occitanie et au-delà.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-medium mb-4">Liens rapides</h3>
                            <nav className="flex flex-col space-y-2">
                                <Link to="/interviews" className="text-sm text-muted-foreground hover:text-[#E03C31]">Interviews</Link>
                                <Link to="/articles" className="text-sm text-muted-foreground hover:text-[#E03C31]">Articles</Link>
                                <Link to="/sports" className="text-sm text-muted-foreground hover:text-[#E03C31]">Sports</Link>
                                <Link to="/about" className="text-sm text-muted-foreground hover:text-[#E03C31]">À propos</Link>
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