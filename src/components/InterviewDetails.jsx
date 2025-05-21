import {Link, useParams} from "react-router-dom"
import React, { useEffect, useState } from "react"
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore"
import { db } from "../config/firebase"
import Logo from "@/assets/images/blog123.svg";
import {Button} from "@/components/ui/button.jsx";
import {User} from "lucide-react";

export default function InterviewDetails() {
    const { id } = useParams()
    const [interview, setInterview] = useState(null)
    const [loading, setLoading] = useState(true)
    const [authorData, setAuthorData] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
        setIsLoggedIn(!!token);
    }, []);
    useEffect(() => {
        const fetchInterview = async () => {
            try {
                const docRef = doc(db, "interview", id)
                const docSnap = await getDoc(docRef)

                if (docSnap.exists()) {
                    const interviewData = docSnap.data()
                    setInterview(interviewData)

                    // 🔍 Récupérer les données de l'auteur dynamiquement via UID
                    if (interviewData.authorUid) {
                        const q = query(collection(db, "users"), where("uid", "==", interviewData.authorUid))
                        const querySnapshot = await getDocs(q)
                        if (!querySnapshot.empty) {
                            setAuthorData(querySnapshot.docs[0].data())
                        }
                    }
                }
            } catch (error) {
                console.error("Erreur lors du chargement :", error)
            } finally {
                setLoading(false)
            }
        }

        fetchInterview()
    }, [id])

    // 🔧 Convertir lien Youtube en lien d'intégration
    const getYouTubeEmbedUrl = (url) => {
        const match = url.match(/(?:youtube\.com\/.*v=|youtu\.be\/)([^&?]+)/)
        return match ? `https://www.youtube.com/embed/${match[1]}` : null
    }

    if (loading) return <p className="text-center py-10">Chargement de l'interview...</p>
    if (!interview) return <p className="text-center py-10">Interview introuvable.</p>

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/90">
                <div className="container flex h-16 items-center justify-between px-6 mx-auto">
                    <Link to="/" className="flex items-center space-x-2">
                        <img src={Logo || "/placeholder.svg"} alt="Logo" className="h-12 w-auto" />
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

            <main className="max-w-4xl mx-auto p-6">
                <h1 className="text-3xl font-bold text-[#E03C31] mb-2">{interview.title}</h1>

                <p className="text-gray-700 mb-2">
                    Interview de{" "}
                    <span className="font-semibold">
          {authorData?.username || interview.author || "Auteur inconnu"}
        </span>
                </p>

                {authorData?.avatar && (
                    <div className="mb-6">
                        <img
                            src={authorData.avatar}
                            alt={`Portrait de ${authorData.username}`}
                            className="w-16 h-16 rounded-full object-cover border"
                            onError={(e) => (e.target.style.display = "none")}
                        />
                    </div>
                )}

                {interview.urlvideo && getYouTubeEmbedUrl(interview.urlvideo) ? (
                    <div className="aspect-w-16 aspect-h-9 mb-8">
                        <iframe
                            src={getYouTubeEmbedUrl(interview.urlvideo)}
                            title="Interview vidéo"
                            allowFullScreen
                            className="w-full h-96 rounded border"
                        />
                    </div>
                ) : (
                    <p className="text-gray-500">Vidéo indisponible ou URL invalide.</p>
                )}
            </main>
        </>
    )
}