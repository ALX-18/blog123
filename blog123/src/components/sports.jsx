import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "./ui/button.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.jsx";
import { ArrowRight } from 'lucide-react';

export default function Sports() {
    const sports = [
        { name: "Football", description: "Le sport le plus populaire au monde", image: "/placeholder.svg?height=400&width=600" },
        { name: "Tennis", description: "Sport de raquette joué en simple ou en double", image: "/placeholder.svg?height=400&width=600" },
        { name: "Basketball", description: "Sport rapide et dynamique", image: "/placeholder.svg?height=400&width=600" },
        { name: "Athlétisme", description: "Comprend la course, le saut et le lancer", image: "/placeholder.svg?height=400&width=600" },
        { name: "Natation", description: "Sport aquatique avec plusieurs styles", image: "/placeholder.svg?height=400&width=600" },
        { name: "Cyclisme", description: "Sport d'endurance sur deux roues", image: "/placeholder.svg?height=400&width=600" },
    ];

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

            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                                Découvrez les Sports
                            </h1>
                            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                                Explorez une variété de sports et plongez dans l'univers passionnant de chaque discipline.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter mb-8">Sports Populaires</h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {sports.map((sport, index) => (
                                <Card key={index} className="overflow-hidden">
                                    <img src={sport.image} alt={sport.name} className="w-full h-48 object-cover" />
                                    <CardHeader>
                                        <CardTitle>{sport.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground mb-4">{sport.description}</p>
                                        <Link to={`/sport/${sport.name.toLowerCase()}`}>
                                            <Button variant="link" className="p-0 h-auto font-semibold text-[#E03C31] hover:text-[#F6C54A]">
                                                En savoir plus
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

