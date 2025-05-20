// admin.jsx
import { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [articles, setArticles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            const snapshot = await getDocs(collection(db, "users"));
            setUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };

        const fetchArticles = async () => {
            const snapshot = await getDocs(collection(db, "articles"));
            setArticles(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };

        Promise.all([fetchUsers(), fetchArticles()]).then(() => setLoading(false));
    }, []);

    const changeRole = async (id, newRole) => {
        await updateDoc(doc(db, "users", id), { isrole: newRole });
        setUsers(prev => prev.map(user => user.id === id ? { ...user, isrole: newRole } : user));
    };

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "articles", id));
        setArticles(prev => prev.filter(article => article.id !== id));
    };

    const handleEdit = (id) => {
        navigate(`/articles/edit/${id}`);
    };

    return (
        <div className="min-h-screen bg-[#f8f9fa] p-6">
            <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-12">
                <div>
                    <h1 className="text-2xl font-bold mb-6">Gestion des utilisateurs</h1>
                    {loading ? <p>Chargement...</p> : (
                        <table className="w-full table-auto text-left border">
                            <thead>
                            <tr className="bg-gray-100">
                                <th className="p-2">Nom</th>
                                <th className="p-2">Email</th>
                                <th className="p-2">Rôle</th>
                                <th className="p-2">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {users.map(user => (
                                <tr key={user.id} className="border-t">
                                    <td className="p-2">{user.username}</td>
                                    <td className="p-2">{user.email}</td>
                                    <td className="p-2">{user.isrole}</td>
                                    <td className="p-2 space-x-2">
                                        <Button onClick={() => changeRole(user.id, "admin")}>Admin</Button>
                                        <Button onClick={() => changeRole(user.id, "moderator")} variant="outline">Modérateur</Button>
                                        <Button onClick={() => changeRole(user.id, "user")} variant="ghost">Utilisateur</Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
                </div>

                <div>
                    <h2 className="text-2xl font-bold mb-6">Articles publiés</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {articles.map(article => (
                            <div
                                key={article.id}
                                className="rounded-xl border bg-white shadow-sm overflow-hidden transition-transform hover:scale-[1.01]"
                            >
                                {article.cover && (
                                    <img
                                        src={article.cover}
                                        alt={article.title}
                                        className="w-full h-48 object-cover border-b"
                                    />
                                )}
                                <div className="p-4 space-y-2">
                                    <p className="text-sm text-muted-foreground">
                                        🕒 {article.date?.toDate().toLocaleDateString("fr-FR") ?? "Inconnue"}
                                    </p>
                                    <h3 className="text-lg font-semibold text-gray-900">{article.title}</h3>
                                    <div className="flex justify-end gap-2 pt-4">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleEdit(article.id)}
                                            className="text-[#E03C31] border-[#E03C31] hover:bg-[#E03C31]/10"
                                        >
                                            ✏️ Modifier
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => handleDelete(article.id)}
                                        >
                                            🗑️ Supprimer
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
