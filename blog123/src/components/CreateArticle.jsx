import React, { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const CreateArticle = () => {
    const [title, setTitle] = useState("");
    const [categories, setCategories] = useState([]);
    const [selectedCategorie, setSelectedCategorie] = useState("");
    const [content, setContent] = useState("");
    const [img, setImg] = useState(""); // Champ optionnel
    const [tags, setTags] = useState("");
    const [statut, setStatut] = useState("Brouillon"); // Valeur par défaut
    const [author, setAuthor] = useState("");

    // Récupérer les catégories depuis Firestore
    useEffect(() => {
        const fetchCategories = async () => {
            const categoriesSnapshot = await getDocs(collection(db, "categories"));
            const categoriesList = categoriesSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setCategories(categoriesList);
        };

        fetchCategories();
    }, []);

    // Récupérer l'utilisateur connecté
    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            setAuthor(user.displayName || user.email); // Utilisez le nom ou l'email de l'utilisateur
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page
        console.log("Le formulaire a été soumis");

        try {
            await addDoc(collection(db, "articles"), {
                title,
                author,
                categorie: selectedCategorie,
                content,
                createdAt: serverTimestamp(),
                tags: tags ? tags.split(",") : [], // Convertir les tags en tableau, sinon tableau vide
                statut,
                ...(img && { img }), // Inclure img seulement s'il est défini
            });

            alert("Article ajouté avec succès !");
            // Réinitialiser les champs du formulaire
            setTitle("");
            setSelectedCategorie("");
            setContent("");
            setImg("");
            setTags("");
            setStatut("Brouillon");
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'article :", error);
        }
    };

    return (
        <div>
            <h2>Ajouter un nouvel article</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Titre :</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Auteur :</label>
                    <input
                        type="text"
                        value={author}
                        readOnly
                        disabled
                    />
                </div>
                <div>
                    <label>Catégorie :</label>
                    <select
                        value={selectedCategorie}
                        onChange={(e) => setSelectedCategorie(e.target.value)}
                        required
                    >
                        <option value="">-- Sélectionner une catégorie --</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.name}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Contenu :</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Image (URL) : (Facultatif)</label>
                    <input
                        type="text"
                        value={img}
                        onChange={(e) => setImg(e.target.value)}
                    />
                </div>
                <div>
                    <label>Tags (séparés par des virgules) :</label>
                    <input
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                    />
                </div>
                <div>
                    <label>Statut :</label>
                    <select
                        value={statut}
                        onChange={(e) => setStatut(e.target.value)}
                    >
                        <option value="Brouillon">Brouillon</option>
                        <option value="Publié">Publié</option>
                        <option value="En révision">En révision</option>
                    </select>
                </div>
                <button type="submit">Ajouter l'article</button>
            </form>
        </div>
    );
};

export default CreateArticle;
