import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.jsx";
import { Input } from "./ui/input.jsx";
import { ArrowRight } from 'lucide-react';
import { db } from "../config/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function ArticlesAndCreate() {
    const [articles, setArticles] = useState([
        { title: "L'Impact de la Technologie dans le Sport", description: "Découvrez comment la technologie change la donne dans le monde sportif", image: "/placeholder.svg?height=400&width=600" },
        { title: "Les Bienfaits du Sport pour la Santé", description: "Un aperçu des raisons pour lesquelles le sport est vital pour le bien-être", image: "/placeholder.svg?height=400&width=600" },
        { title: "Top 10 des Sports à Suivre en 2024", description: "Un classement des sports qui promettent de captiver l'attention cette année", image: "/placeholder.svg?height=400&width=600" },
        { title: "Les Femmes dans le Sport", description: "Mettre en lumière les succès des femmes athlètes à travers le monde", image: "/placeholder.svg?height=400&width=600" },
        { title: "L'Économie du Sport", description: "Analyse de l'impact économique des grands événements sportifs", image: "/placeholder.svg?height=400&width=600" },
        { title: "La Durabilité dans le Sport", description: "Comment le sport contribue à un avenir durable", image: "/placeholder.svg?height=400&width=600" },
    ]);

    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newImage, setNewImage] = useState("");

    const handleCreateArticle = async (e) => {
        e.preventDefault();

        try {
            // Ajouter un nouvel article dans la base de données Firestore
            await addDoc(collection(db, "articles"), {
                title: newTitle,
                description: newDescription,
                image: newImage,
                createdAt: serverTimestamp(),
            });

            alert("Article créé avec succès !");
            setNewTitle("");
            setNewDescription("");
            setNewImage("");
        } catch (error) {
            console.error("Erreur lors de la création de l'article :", error);
            alert("Une erreur est survenue. Veuillez réessayer.");
        }
    };

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

            <main className="flex-1 py-12">
                <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                                Découvrez Nos Articles
                            </h1>
                            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                                Explorez des articles inspirants et informatifs sur une variété de sujets captivants.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter mb-8">Articles Récents</h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {articles.map((article, index) => (
                                <Card key={index} className="overflow-hidden">
                                    <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
                                    <CardHeader>
                                        <CardTitle>{article.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground mb-4">{article.description}</p>
                                        <Link to={`/article/${article.title.toLowerCase().replace(/\s+/g, '-')}`}>
                                            <Button variant="link" className="p-0 h-auto font-semibold text-[#E03C31] hover:text-[#F6C54A]">
                                                Lire l'article
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
                    <div className="container px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter mb-8">Créer un Nouvel Article</h2>
                        <form className="space-y-4" onSubmit={handleCreateArticle}>
                            <Input
                                type="text"
                                placeholder="Titre de l'article"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                required
                            />
                            <Input
                                type="text"
                                placeholder="URL de l'image"
                                value={newImage}
                                onChange={(e) => setNewImage(e.target.value)}
                                required
                            />
                            <textarea
                                placeholder="Description de l'article"
                                value={newDescription}
                                onChange={(e) => setNewDescription(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#E03C31]"
                                rows="5"
                                required
                            ></textarea>
                            <Button
                                type="submit"
                                className="w-full bg-[#E03C31] text-white hover:bg-[#F6C54A] hover:text-[#E03C31]"
                            >
                                Créer l'article
                            </Button>
                        </form>
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
