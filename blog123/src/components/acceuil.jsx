import { Link } from "react-router-dom"; // si vous utilisez React Router
import { Button } from "./ui/button.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.jsx";
import { Input } from "./ui/input.jsx";
import React from "react";
import { Search, ArrowRight } from "lucide-react";

export default function Acceuil() {
    return (
        <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-[#E03C31]">BLOG123</span>
                    </Link>
                    <nav className="hidden md:flex space-x-6 text-sm font-medium">
                        <Link href="/interviews" className="transition-colors hover:text-[#E03C31]">Interviews</Link>
                        <Link href="/articles" className="transition-colors hover:text-[#E03C31]">Articles</Link>
                        <Link href="/sports" className="transition-colors hover:text-[#E03C31]">Sports</Link>
                        <Link href="/about" className="transition-colors hover:text-[#E03C31]">À propos</Link>
                    </nav>
                    <Button className="bg-[#E03C31] text-white hover:bg-[#F6C54A] hover:text-[#E03C31]">
                        S'abonner
                    </Button>
                </div>
            </header>

            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                                Découvrez les Stars du Sport
                            </h1>
                            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                                Interviews exclusives, articles passionnants et histoires inspirantes de sportifs professionnels et espoirs.
                            </p>
                            <div className="w-full max-w-sm space-y-2">
                                <form className="flex space-x-2">
                                    <Input className="flex-1" placeholder="Rechercher un athlète, un sport..." type="search" />
                                    <Button type="submit" className="bg-[#E03C31] text-white hover:bg-[#F6C54A] hover:text-[#E03C31]">
                                        <Search className="h-4 w-4" />
                                        <span className="sr-only">Rechercher</span>
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter mb-8">Dernières Interviews</h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {[
                                { name: "Léa Martin", sport: "Tennis", image: "/placeholder.svg?height=400&width=600" },
                                { name: "Thomas Dubois", sport: "Football", image: "/placeholder.svg?height=400&width=600" },
                                { name: "Sophie Leroux", sport: "Natation", image: "/placeholder.svg?height=400&width=600" },
                            ].map((interview, index) => (
                                <Card key={index} className="overflow-hidden">
                                    <img src={interview.image} alt={interview.name} className="w-full h-48 object-cover" />
                                    <CardHeader>
                                        <CardTitle>{interview.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground">{interview.sport}</p>
                                        <Button variant="link" className="p-0 h-auto font-semibold text-[#E03C31] hover:text-[#F6C54A]">
                                            Lire l'interview
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
                    <div className="container px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter mb-8">Articles Récents</h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {[
                                { title: "L'impact de la technologie dans le sport moderne", category: "Technologie" },
                                { title: "Les défis de la reconversion des athlètes professionnels", category: "Carrière" },
                                { title: "Nutrition sportive : mythes et réalités", category: "Santé" },
                            ].map((article, index) => (
                                <Card key={index}>
                                    <CardHeader>
                                        <CardTitle>{article.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground mb-4">{article.category}</p>
                                        <Button variant="outline" className="w-full">Lire l'article</Button>
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
                        <Link href="/privacy" className="text-sm text-muted-foreground hover:text-[#E03C31]">
                            Politique de confidentialité
                        </Link>
                        <Link href="/terms" className="text-sm text-muted-foreground hover:text-[#E03C31]">
                            Conditions d'utilisation
                        </Link>
                        <Link href="/contact" className="text-sm text-muted-foreground hover:text-[#E03C31]">
                            Contact
                        </Link>
                    </nav>
                </div>
            </footer>
        </div>
    );
}