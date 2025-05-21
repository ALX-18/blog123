"use client"

import { Link, useNavigate } from "react-router-dom"
import { Card, CardContent } from "./ui/card"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useState } from "react"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { db } from "../config/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { Mail, Lock, User, ChevronRight, ChevronLeft, Trophy, Check } from "lucide-react"

export default function CreateAccount() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    isrole: "user",
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setError("")
  }

  const validateStep = () => {
    switch (step) {
      case 1:
        if (!formData.email) {
          setError("L'adresse email est requise")
          return false
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
          setError("L'adresse email n'est pas valide")
          return false
        }
        break
      case 2:
        if (!formData.password) {
          setError("Le mot de passe est requis")
          return false
        }
        if (formData.password.length < 6) {
          setError("Le mot de passe doit contenir au moins 6 caractères")
          return false
        }
        if (formData.password !== formData.confirmPassword) {
          setError("Les mots de passe ne correspondent pas")
          return false
        }
        break
      case 3:
        if (!formData.username) {
          setError("Le nom d'utilisateur est requis")
          return false
        }
        break
    }
    return true
  }

  const handleNext = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    setStep((prev) => prev - 1)
    setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.role) {
      setError("Veuillez sélectionner un rôle")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password)

      await addDoc(collection(db, "users"), {
        username: formData.username,
        email: formData.email,
        role: formData.role,        // ← "Athlète", "Fan", etc.
        isrole: formData.isrole,    // ← "user" par défaut, ou "admin"/"moderator"
        createdAt: serverTimestamp(),
        uid: userCredential.user.uid,
      });

      setStep(5) // Afficher l'écran de succès
    } catch (error) {
      console.error("Erreur lors de l'enregistrement:", error)
      if (error.code === "auth/email-already-in-use") {
        setError("Cette adresse email est déjà utilisée")
      } else {
        setError("Une erreur est survenue lors de la création du compte")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">Bienvenue sur BLOG123</h2>
              <p className="text-gray-500">Commencez par entrer votre adresse email</p>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="vous@exemple.com"
                  className="pl-10"
                  required
                />
              </div>
              <Button
                onClick={handleNext}
                className="w-full bg-[#E03C31] text-white hover:bg-[#F6C54A] hover:text-[#E03C31]"
              >
                Continuer
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">Créez votre mot de passe</h2>
              <p className="text-gray-500">Utilisez au moins 6 caractères</p>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Votre mot de passe"
                  className="pl-10"
                  required
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirmez votre mot de passe"
                  className="pl-10"
                  required
                />
              </div>
              <div className="flex gap-3">
                <Button onClick={handleBack} variant="outline" className="flex-1">
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Retour
                </Button>
                <Button
                  onClick={handleNext}
                  className="flex-1 bg-[#E03C31] text-white hover:bg-[#F6C54A] hover:text-[#E03C31]"
                >
                  Continuer
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">Choisissez votre nom d'utilisateur</h2>
              <p className="text-gray-500">C'est ainsi que les autres vous verront sur BLOG123</p>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Votre nom d'utilisateur"
                  className="pl-10"
                  required
                />
              </div>
              <div className="flex gap-3">
                <Button onClick={handleBack} variant="outline" className="flex-1">
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Retour
                </Button>
                <Button
                  onClick={handleNext}
                  className="flex-1 bg-[#E03C31] text-white hover:bg-[#F6C54A] hover:text-[#E03C31]"
                >
                  Continuer
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )
      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">Quel est votre rôle ?</h2>
              <p className="text-gray-500">Sélectionnez le rôle qui vous correspond le mieux</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {["Athlète", "Fan", "Coach", "Club"].map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, role }))}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    formData.role === role
                      ? "border-[#E03C31] bg-[#E03C31]/5"
                      : "border-gray-200 hover:border-[#E03C31]"
                  }`}
                >
                  <Trophy
                    className={`h-6 w-6 mx-auto mb-2 ${formData.role === role ? "text-[#E03C31]" : "text-gray-400"}`}
                  />
                  <span className={formData.role === role ? "text-[#E03C31]" : "text-gray-600"}>{role}</span>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <Button onClick={handleBack} variant="outline" className="flex-1">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Retour
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex-1 bg-[#E03C31] text-white hover:bg-[#F6C54A] hover:text-[#E03C31]"
              >
                {isLoading ? "Création..." : "Terminer"}
              </Button>
            </div>
          </div>
        )
      case 5:
        return (
          <div className="space-y-6 text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#E03C31]/10 mx-auto">
              <Check className="h-8 w-8 text-[#E03C31]" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">Compte créé avec succès !</h2>
              <p className="text-gray-500">Bienvenue dans la communauté BLOG123</p>
            </div>
            <Button
              onClick={() => navigate("/")}
              className="w-full bg-[#E03C31] text-white hover:bg-[#F6C54A] hover:text-[#E03C31]"
            >
              Commencer
            </Button>
          </div>
        )
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f8f9fa]">
      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-[#E03C31]">BLOG123</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            {/* Progress Steps */}
            <div className="flex justify-between mb-8">
              {[1, 2, 3, 4].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div className={`h-2 w-2 rounded-full ${step >= stepNumber ? "bg-[#E03C31]" : "bg-gray-200"}`} />
                  {stepNumber < 4 && (
                    <div className={`w-full h-0.5 ${step > stepNumber ? "bg-[#E03C31]" : "bg-gray-200"}`} />
                  )}
                </div>
              ))}
            </div>

            {/* Error Message */}
            {error && <div className="mb-6 p-3 text-sm text-red-600 bg-red-50 rounded-lg">{error}</div>}

            {/* Step Content */}
            {renderStep()}
          </CardContent>
        </Card>
      </main>

      <footer className="py-6 border-t bg-white">
        <div className="container px-4 md:px-6">
          <p className="text-center text-sm text-gray-500">© 2024 BLOG123. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  )
}

