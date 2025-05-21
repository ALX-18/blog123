import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import {ArrowRight, Clock, Bookmark, User} from "lucide-react"
import { db } from "../config/firebase"
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { updateDoc, arrayUnion, doc } from "firebase/firestore"
export default function ArticlesPage() {
  const [articles, setArticles] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);
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
  const handleBookmark = async (articleId) => {
    try {
      const auth = getAuth()
      const user = auth.currentUser
      if (!user) {
        alert("Connectez-vous pour sauvegarder un article.")
        return
      }

      const userRef = doc(db, "users", user.uid)
      await updateDoc(userRef, {
        bookmarkedArticles: arrayUnion(articleId),
      })

      alert("Article enregistré dans votre profil.")
    } catch (error) {
      console.error("Erreur de sauvegarde :", error)
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
                      {/* Image uniquement si elle existe et est valide */}
                      {article.image && article.image !== "/placeholder.svg" && (
                          <img
                              src={article.image}
                              alt={article.title}
                              className="w-full h-48 object-cover"
                              onError={(e) => { e.target.style.display = "none" }}
                          />
                      )}

                      <CardHeader className="pb-2 border-b">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                        {article.createdAt?.toDate().toLocaleDateString("fr-FR") || "Date inconnue"}
                      </span>
                        </div>
                        <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                      </CardHeader>

                      <CardContent className="pt-4">
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                          {article.description || "Aucune description."}
                        </p>
                        <div className="flex justify-between items-center">
                          <Link to={`/articles/${article.id}`}>
                            <Button variant="link" className="p-0 h-auto font-semibold text-[#E03C31] hover:text-[#F6C54A]">
                              Lire l'article
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                          <Button
                              variant="outline"
                              className="rounded-full"
                              onClick={() => handleBookmark(article.id)}
                          >
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
