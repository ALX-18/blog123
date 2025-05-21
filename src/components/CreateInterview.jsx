import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Card } from "./ui/card"
import {
    Bold, Italic, List, LinkIcon,
    ImageIcon, AlignLeft, AlignCenter, AlignRight
} from "lucide-react"
import { db } from "../config/firebase"
import { getAuth } from "firebase/auth"
import {
    collection, addDoc, serverTimestamp, query, where, getDocs
} from "firebase/firestore"

export default function CreateInterview() {
    const navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [urlphoto, setUrlPhoto] = useState("")
    const [urlvideo, setUrlVideo] = useState("")
    const [tags, setTags] = useState("")
    const [isUploading, setIsUploading] = useState(false)
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            const auth = getAuth()
            const user = auth.currentUser
            if (!user) return

            const q = query(collection(db, "users"), where("uid", "==", user.uid))
            const snapshot = await getDocs(q)
            if (!snapshot.empty) {
                setUserData(snapshot.docs[0].data())
            }
        }

        fetchUser()
    }, [])

    const handleCreateInterview = async (e) => {
        e.preventDefault()
        setIsUploading(true)

        if (!userData) {
            alert("Vous devez être connecté pour publier une interview.")
            setIsUploading(false)
            return
        }

        const interviewData = {
            author: userData.username || "Anonyme",
            title,
            urlphoto: urlphoto || "/placeholder.svg",
            urlvideo,
            authorUid: userData.uid,
            createdAt: serverTimestamp(),
            tags: tags.split(",").map((tag) => tag.trim().toLowerCase()),
        }

        try {
            await addDoc(collection(db, "interview"), interviewData)
            alert("Interview publiée avec succès !")
            navigate("/Interview")
        } catch (error) {
            console.error("Erreur lors de la création de l'interview :", error)
            alert("Une erreur est survenue.")
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <div className="flex min-h-screen flex-col bg-[#f8f9fa]">
            <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
                <div className="container flex h-16 items-center justify-between">
                    <Link to="/" className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-[#E03C31]">BLOG123</span>
                    </Link>
                    <nav className="hidden md:flex space-x-6 text-sm font-medium">
                        <Link to="/Interview" className="hover:text-[#E03C31]">Interviews</Link>
                        <Link to="/articles" className="hover:text-[#E03C31]">Articles</Link>
                        <Link to="/sports" className="hover:text-[#E03C31]">Sports</Link>
                        <Link to="/about" className="hover:text-[#E03C31]">À propos</Link>
                    </nav>
                </div>
            </header>

            <main className="flex-1 py-12">
                <div className="container px-4 md:px-6">
                    <Card className="max-w-4xl mx-auto p-6">
                        <h1 className="text-3xl font-bold mb-8">Créer une Interview</h1>
                        <form onSubmit={handleCreateInterview} className="space-y-6">
                            <Input
                                type="text"
                                placeholder="Titre"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="text-xl font-medium border px-3 py-2"
                            />

                            <Input
                                type="text"
                                placeholder="Tags séparés par des virgules (ex: football, féminin)"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                className="border px-3 py-2"
                            />

                            <div className="flex items-center gap-2 border-y py-2">
                                <Button type="button" variant="ghost" size="sm"><Bold className="h-4 w-4" /></Button>
                                <Button type="button" variant="ghost" size="sm"><Italic className="h-4 w-4" /></Button>
                                <div className="w-px h-4 bg-gray-200 mx-2" />
                                <Button type="button" variant="ghost" size="sm"><AlignLeft className="h-4 w-4" /></Button>
                                <Button type="button" variant="ghost" size="sm"><AlignCenter className="h-4 w-4" /></Button>
                                <Button type="button" variant="ghost" size="sm"><AlignRight className="h-4 w-4" /></Button>
                                <div className="w-px h-4 bg-gray-200 mx-2" />
                                <Button type="button" variant="ghost" size="sm"><List className="h-4 w-4" /></Button>
                                <Button type="button" variant="ghost" size="sm"><LinkIcon className="h-4 w-4" /></Button>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="flex items-center gap-2"
                                        onClick={() => document.getElementById("interview-image-upload").click()}
                                    >
                                        <ImageIcon className="h-4 w-4" /> Upload Photo
                                    </Button>
                                    <span className="text-sm text-muted-foreground">ou</span>
                                    <Input
                                        type="text"
                                        placeholder="URL de la photo"
                                        value={urlphoto}
                                        onChange={(e) => setUrlPhoto(e.target.value)}
                                        className="flex-1"
                                    />
                                    <input
                                        id="interview-image-upload"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => console.log(e.target.files[0])}
                                    />
                                </div>
                                {urlphoto && (
                                    <div className="mt-4">
                                        <img
                                            src={urlphoto}
                                            alt="Aperçu"
                                            className="max-h-[300px] rounded-lg object-cover"
                                        />
                                    </div>
                                )}
                            </div>

                            <Input
                                type="text"
                                placeholder="URL de la vidéo (YouTube)"
                                value={urlvideo}
                                onChange={(e) => setUrlVideo(e.target.value)}
                                className="border px-3 py-2"
                                required
                            />

                            <div className="flex justify-end gap-4">
                                <Button type="button" variant="outline" onClick={() => navigate("/Interview")}>
                                    Annuler
                                </Button>
                                <Button
                                    type="submit"
                                    className="bg-[#E03C31] text-white hover:bg-[#F6C54A] hover:text-[#E03C31]"
                                    disabled={isUploading}
                                >
                                    {isUploading ? "Publication..." : "Publier l'interview"}
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            </main>

            <footer className="w-full border-t py-6 bg-white">
                <div className="container px-4 md:px-6">
                    <p className="text-center text-sm text-muted-foreground">
                        © 2024 BLOG123. Tous droits réservés.
                    </p>
                </div>
            </footer>
        </div>
    )
}
