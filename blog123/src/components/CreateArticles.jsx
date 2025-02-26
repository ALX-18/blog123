"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Card } from "./ui/card"
import { Bold, Italic, List, LinkIcon, ImageIcon, AlignLeft, AlignCenter, AlignRight } from "lucide-react"
import { db } from "../config/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

export default function CreateArticle() {
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [isUploading, setIsUploading] = useState(false)

  const handleCreateArticle = async (e) => {
    e.preventDefault()
    setIsUploading(true)

    try {
      const articleData = {
        title,
        content,
        image: imageUrl || "/placeholder.svg?height=400&width=600",
        createdAt: serverTimestamp(),
        author: "Admin", // À remplacer par l'utilisateur connecté
        category: "Sport",
        tags: ["sport", "actualité"],
        statut: "publié",
      }

      await addDoc(collection(db, "articles"), articleData)
      alert("Article créé avec succès !")
      navigate("/articles") // Redirection vers la page des articles
    } catch (error) {
      console.error("Erreur lors de la création de l'article :", error)
      alert("Une erreur est survenue. Veuillez réessayer.")
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
            <Link to="/Interview" className="transition-colors hover:text-[#E03C31]">
              Interviews
            </Link>
            <Link to="/articles" className="transition-colors hover:text-[#E03C31]">
              Articles
            </Link>
            <Link to="/sports" className="transition-colors hover:text-[#E03C31]">
              Sports
            </Link>
            <Link to="/about" className="transition-colors hover:text-[#E03C31]">
              À propos
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <Card className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8">Créer un Nouvel Article</h1>
            <form onSubmit={handleCreateArticle} className="space-y-6">
              {/* Titre */}
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Titre de l'article..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-2xl font-bold border-none px-0 focus-visible:ring-0"
                  required
                />
              </div>

              {/* Barre d'outils de formatage */}
              <div className="flex items-center gap-2 border-y py-2">
                <Button type="button" variant="ghost" size="sm" className="w-9 h-9 p-0">
                  <Bold className="h-4 w-4" />
                </Button>
                <Button type="button" variant="ghost" size="sm" className="w-9 h-9 p-0">
                  <Italic className="h-4 w-4" />
                </Button>
                <div className="w-px h-4 bg-gray-200 mx-2" />
                <Button type="button" variant="ghost" size="sm" className="w-9 h-9 p-0">
                  <AlignLeft className="h-4 w-4" />
                </Button>
                <Button type="button" variant="ghost" size="sm" className="w-9 h-9 p-0">
                  <AlignCenter className="h-4 w-4" />
                </Button>
                <Button type="button" variant="ghost" size="sm" className="w-9 h-9 p-0">
                  <AlignRight className="h-4 w-4" />
                </Button>
                <div className="w-px h-4 bg-gray-200 mx-2" />
                <Button type="button" variant="ghost" size="sm" className="w-9 h-9 p-0">
                  <List className="h-4 w-4" />
                </Button>
                <Button type="button" variant="ghost" size="sm" className="w-9 h-9 p-0">
                  <LinkIcon className="h-4 w-4" />
                </Button>
              </div>

              {/* Zone d'upload d'image */}
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => document.getElementById("image-upload").click()}
                  >
                    <ImageIcon className="h-4 w-4" />
                    Upload Photo
                  </Button>
                  <span className="text-sm text-muted-foreground">ou</span>
                  <Input
                    type="text"
                    placeholder="URL de l'image"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="flex-1"
                  />
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      // Gérer l'upload d'image ici
                      console.log(e.target.files[0])
                    }}
                  />
                </div>
                {imageUrl && (
                  <div className="mt-4">
                    <img
                      src={imageUrl || "/placeholder.svg"}
                      alt="Preview"
                      className="max-h-[300px] rounded-lg object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Éditeur de contenu */}
              <div className="space-y-2">
                <textarea
                  placeholder="Racontez votre histoire..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full min-h-[400px] p-4 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E03C31] resize-none"
                  required
                />
              </div>

              {/* Boutons d'action */}
              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => navigate("/articles")}>
                  Annuler
                </Button>
                <Button
                  type="submit"
                  className="bg-[#E03C31] text-white hover:bg-[#F6C54A] hover:text-[#E03C31]"
                  disabled={isUploading}
                >
                  {isUploading ? "Publication..." : "Publier l'article"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </main>

      <footer className="w-full border-t py-6 bg-white">
        <div className="container px-4 md:px-6">
          <p className="text-center text-sm text-muted-foreground">© 2024 BLOG123. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  )
}

