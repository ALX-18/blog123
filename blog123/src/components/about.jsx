import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "./ui/button.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.jsx";

const teamMembers = [
    {
        name: "Malagouen Shemsedine",
        role: "CEO & Fondateur",
        description: "Passionné de technologie et d'innovation",
        image: "https://media.discordapp.net/attachments/1288423855270137900/1344256277836071023/image.jpg?ex=67c03fb7&is=67beee37&hm=3909ec4e4655be8bdf50069b7aef2c0cfcc8fdaf446165374093a4275dfdeddb&=&format=webp&width=523&height=930"
    },
    {
        name: "Makouya Brenn",
        role: "Rédactrice en Chef",
        description: "Experte en contenu éditorial",
        image: "https://media.discordapp.net/attachments/1288423855270137900/1344257043116068966/IMG_1336.png?ex=67c0406e&is=67beeeee&hm=747c23a6a2cfa034df461635d09a657e65ff7c98300d5dc6378da18216b23b15&=&format=webp&quality=lossless&width=764&height=755"
    },
    {
        name: "Redaud Alexis",
        role: "Développeur Full-Stack",
        description: "Spécialiste React et Node.js",
        image: "https://cdn.discordapp.com/attachments/1288423855270137900/1344261149440606271/image.png?ex=67c04441&is=67bef2c1&hm=9135a577b1f22cb538274353066bcd45f5dfaf3b1c2c55c14431f508b48efde2&"
    },
    {
        name: "Fontana Alexan",
        role: "Designer UI/UX",
        description: "Créative et minutieuse",
        image: "https://cdn.discordapp.com/attachments/1288423855270137900/1344260854803337236/image.png?ex=67c043fa&is=67bef27a&hm=37e2fcab288fc8b25dc7b58c8a5e3a1a75453770e4de1ea560df3ed35f261b6b&"
    },
    {
        name: "Leynaert Lena",
        role: "Responsable Marketing",
        description: "Expert en stratégie digitale",
        image: "https://media.licdn.com/dms/image/v2/D4E03AQGK5RbhGQ7BXQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1691744474898?e=1746057600&v=beta&t=8XN4Ph5jDlsjppl-WwufOCXuhH_8oSGFG43iRg8_kEI"
    },
    {
        name: "Mardinli Guillaume",
        role: "Community Manager",
        description: "Spécialiste des réseaux sociaux",
        image: "https://media.licdn.com/dms/image/v2/D4E03AQF24gJSusSLEg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1727360127781?e=1746057600&v=beta&t=69X2IlAxqgIMkTDUu0H0XGItfk7rb0OgM9G7VE1k-us"
    },
    {
        name: "Nedjari Ryan",
        role: "Développeur Backend",
        description: "Expert en architecture système",
        image: "https://i.postimg.cc/R0Bb1MkJ/ryan.jpg"
    }
];

export default function About() {
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
                        <div className="grid gap-12 md:grid-cols-2">
                            <Card className="p-6">
                                <CardHeader>
                                    <CardTitle className="text-2xl font-bold text-[#E03C31]">Notre Histoire</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        Fondé en 2024, BLOG123 est né de la passion pour le partage de connaissances et d'expériences dans le domaine du sport. Notre plateforme a débuté comme un simple blog et s'est développée pour devenir une référence dans le domaine du sport.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="p-6">
                                <CardHeader>
                                    <CardTitle className="text-2xl font-bold text-[#E03C31]">Notre Mission</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        Notre mission est de rendre l'apprentissage de la programmation accessible à tous. Nous nous engageons à fournir un contenu de qualité, des tutoriels pratiques et des ressources pertinentes pour aider chacun à progresser dans le domaine du développement web.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <h2 className="text-3xl font-bold text-center mb-12">Notre Équipe</h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {teamMembers.map((member, index) => (
                                <Card key={index} className="overflow-hidden">
                                    <div className="flex justify-center pt-6">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-32 h-32 rounded-full object-cover"
                                        />
                                    </div>
                                    <CardHeader>
                                        <CardTitle className="text-center">{member.name}</CardTitle>
                                        <p className="text-[#E03C31] font-medium text-center">{member.role}</p>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground text-center">{member.description}</p>
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