// EditArticle.jsx
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDoc, doc, updateDoc } from "firebase/firestore"
import { db } from "../config/firebase"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Card } from "./ui/card"
import { ImageIcon } from "lucide-react"

export default function EditArticle() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [isUpdating, setIsUpdating] = useState(false)

    useEffect(() => {
        const fetchArticle = async () => {
            const ref = doc(db, "articles", id)
            const snapshot = await getDoc(ref)

            if (snapshot.exists()) {
                const data = snapshot.data()
                setTitle(data.title)
                setContent(data.content)
                setImageUrl(data.image)
            } else {
                alert("Article introuvable.")
                navigate("/admin")
            }
        }

        fetchArticle()
    }, [id, navigate])

    const handleUpdate = async (e) => {
        e.preventDefault()
        setIsUpdating(true)

        try {
            await updateDoc(doc(db, "articles", id), {
                title,
                content,
                image: imageUrl,
            })
            alert("Article mis à jour avec succès.")
            navigate("/admin")
        } catch (error) {
            console.error("Erreur de mise à jour :", error)
            alert("Erreur lors de la mise à jour.")
        } finally {
            setIsUpdating(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <Card className="max-w-4xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">Modifier l'article</h1>
                <form onSubmit={handleUpdate} className="space-y-6">
                    <Input
                        type="text"
                        placeholder="Titre"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <textarea
                        className="w-full min-h-[300px] p-4 border rounded-lg focus:ring-2 focus:ring-[#E03C31] resize-none"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Contenu"
                        required
                    />
                    <div className="space-y-2">
                        <div className="flex items-center gap-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => document.getElementById("image-upload").click()}
                            >
                                <ImageIcon className="h-4 w-4 mr-1" /> Upload image
                            </Button>
                            <Input
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                placeholder="URL de l'image"
                            />
                            <input
                                id="image-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => console.log("TODO: upload file", e.target.files[0])}
                            />
                        </div>
                        {imageUrl && (
                            <img
                                src={imageUrl}
                                alt="Preview"
                                className="max-h-[300px] rounded-lg mt-4 object-cover"
                            />
                        )}
                    </div>
                    <div className="flex justify-between">
                        <Button type="button" variant="outline" onClick={() => navigate("/admin")}>
                            Retour
                        </Button>
                        <Button type="submit" disabled={isUpdating}>
                            {isUpdating ? "Mise à jour..." : "Mettre à jour"}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    )
}
