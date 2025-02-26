"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { ArrowRight, Clock, Bookmark } from "lucide-react"
import { db } from "../config/firebase"
import { collection, getDocs, addDoc, serverTimestamp, query, orderBy } from "firebase/firestore"

export default function ArticlesPage() {
  const [articles, setArticles] = useState([])
  const [newTitle, setNewTitle] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [newImage, setNewImage] = useState("")

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articlesQuery = query(collection(db, "articles"), orderBy("createdAt", "desc"))
        const querySnapshot = await getDocs(articlesQuery)
        const articlesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setArticles(articlesData)
      } catch (error) {
        console.error("Erreur lors de la récupération des articles:", error)
      }
    }

    fetchArticles()
  }, [])

  const handleCreateArticle = async (e) => {
    e.preventDefault()

    try {
      await addDoc(collection(db, "articles"), {
        title: newTitle,
        description: newDescription,
        image: newImage || "/placeholder.svg?height=400&width=600",
        createdAt: serverTimestamp(),
      })

      alert("Article créé avec succès !")
      setNewTitle("")
      setNewDescription("")
      setNewImage("")
    } catch (error) {
      console.error("Erreur lors de la création de l'article :", error)
      alert("Une erreur est survenue. Veuillez réessayer.")
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
          <Button className="bg-[#E03C31] text-white hover:bg-[#F6C54A] hover:text-[#E03C31]">S'abonner</Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="inline-block rounded-full bg-[#E03C31]/10 px-3 py-1 text-sm font-medium text-[#E03C31] mb-2">
                Actualités & Analyses
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">Nos Articles</h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Découvrez nos derniers articles sur le sport en Occitanie et au-delà.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow border-0 shadow-sm">
                  <img
                    src={article.image || "/placeholder.svg?height=400&width=600"}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                  <CardHeader className="pb-2 border-b">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {article.createdAt?.toDate().toLocaleDateString()}
                      </span>
                    </div>
                    <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{article.description}</p>
                    <div className="flex justify-between items-center">
                      <Link to={`/articles/${article.id}`}>
                        <Button variant="link" className="p-0 h-auto font-semibold text-[#E03C31] hover:text-[#F6C54A]">
                          Lire l'article
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="outline" className="rounded-full">
                        <Bookmark className="h-4 w-4" />
                        <span className="sr-only">Sauvegarder</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter mb-8">Créer un Nouvel Article</h2>
            <form className="max-w-2xl mx-auto space-y-6" onSubmit={handleCreateArticle}>
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Titre de l'article"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full"
                  required
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="URL de l'image"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <textarea
                  placeholder="Description de l'article"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full p-3 border rounded-lg shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#E03C31] min-h-[150px]"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-[#E03C31] text-white hover:bg-[#F6C54A] hover:text-[#E03C31]">
                Créer l'article
              </Button>
            </form>
          </div>
        </section>
      </main>

      <footer className="w-full border-t py-6 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">© 2024 BLOG123. Tous droits réservés.</p>
            <nav className="flex items-center gap-4 md:gap-6">
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
      </footer>
    </div>
  )
}

