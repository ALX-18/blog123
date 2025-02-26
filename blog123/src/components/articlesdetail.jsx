import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import {Button} from "./ui/button.jsx";
import { Link } from "react-router-dom";

export function ArticleDetails() {
    const {id} = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const docRef = doc(db, "articles", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setArticle({
                        ...data,
                        img: data.img || "",
                        tags: Array.isArray(data.tags)
                            ? data.tags
                            : typeof data.tags === "string"
                                ? data.tags.split(",").map((tag) => tag.trim())
                                : [],
                    });
                } else {
                    console.log("Aucun article trouvé.");
                }
            } catch (error) {
                console.error("Erreur lors de la récupération de l'article :", error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [id]);

    if (loading) {
        return <p className="text-center mt-8">Chargement...</p>;
    }

    if (!article) {
        return <p className="text-center mt-8">Aucun article trouvé.</p>;
    }

    const isVideoFile = (url) => {
        const videoExtensions = [".mp4", ".webm", ".ogg"];
        return url && videoExtensions.some((ext) => url.toLowerCase().includes(ext));
    };


    const isYouTubeUrl = (url) => {
        return url && (url.includes("youtube.com") || url.includes("youtu.be"));
    };


    const getYouTubeEmbedUrl = (url) => {
        const videoIdMatch = url.match(/(?:youtube\.com\/.*v=|youtu\.be\/)([^&?]+)/);
        return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : null;
    };

    return (
        <div className="flex min-h-screen flex-col">
            {/* Header */}
            <header
                className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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

            {/* Main Content */}
            <main className="flex-1 py-12">
                <section className="container px-4 md:px-6">
                    <article className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
                        {/* Title */}
                        <h1 className="text-4xl font-bold text-[#E03C31] mb-4">{article.title || "Titre non défini"}</h1>

                        {/* Publication Date */}
                        <p className="text-gray-600 text-sm mb-4">
                            Publié le : {article.createdAt?.toDate().toLocaleDateString() || "Date non disponible"}
                        </p>
                        <p className="text-gray-600 text-sm mb-4">
                            Par: {article.author}
                        </p>
                        {/* Media Content */}
                        {isVideoFile(article.img) ? (
                            <video
                                controls
                                src={article.img}
                                className="w-full h-auto rounded-lg shadow-lg mb-6"
                            >
                                Votre navigateur ne supporte pas les vidéos.
                            </video>
                        ) : isYouTubeUrl(article.img) ? (
                            <iframe
                                src={getYouTubeEmbedUrl(article.img)}
                                title={article.title || "Vidéo"}
                                className="w-full h-64 md:h-96 rounded-lg shadow-lg mb-6"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <img
                                src={article.image || "https://via.placeholder.com/800x400"}
                                alt={article.title || "Image"}
                                className="w-full h-auto rounded-lg shadow-lg mb-6"
                            />
                        )}

                        {/* Article Content */}
                        <p className="text-lg text-gray-800 mb-6">{article.content || "Pas de contenu disponible."}</p>

                        {/* Tags */}
                        <p className="text-sm text-gray-500">
                            Tags : {article.tags?.length > 0 ? article.tags.join(", ") : "Aucun tag disponible"}
                        </p>
                    </article>
                </section>
            </main>

            {/* Footer */}
            <footer className="w-full border-t py-6">
                <div className="container flex flex-col items-center gap-4">
                    <p className="text-center text-sm text-muted-foreground">
                        © 2024 BLOG123. Tous droits réservés.
                    </p>
                </div>
            </footer>
        </div>
    );
}
