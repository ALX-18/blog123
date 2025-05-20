import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase.jsx";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

// Avatars
import avatar1 from "../assets/images/avatar/avatar1.png";
import avatar2 from "../assets/images/avatar/avatar2.png";
import avatar3 from "../assets/images/avatar/avatar3.png";
import avatar4 from "../assets/images/avatar/avatar4.png";
import avatar5 from "../assets/images/avatar/avatar5.png";
import avatar6 from "../assets/images/avatar/avatar6.png";

const avatarOptions = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];

export default function Profil() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");

    const handleAvatarSelect = async (selectedAvatarUrl) => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) return;

        try {
            const q = query(collection(db, "users"), where("uid", "==", user.uid));
            const snapshot = await getDocs(q);

            if (!snapshot.empty) {
                const userDoc = snapshot.docs[0];
                await updateDoc(doc(db, "users", userDoc.id), {
                    url: selectedAvatarUrl,
                });
                console.log("✅ Avatar mis à jour :", selectedAvatarUrl);
                setPreviewUrl(selectedAvatarUrl);
                setUserData((prev) => ({ ...prev, url: selectedAvatarUrl }));
            }
        } catch (error) {
            console.error("❌ Erreur de mise à jour de l'avatar :", error);
        }
    };

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                console.warn("🔒 Utilisateur non connecté, redirection...");
                navigate("/login");
                return;
            }

            try {
                const q = query(collection(db, "users"), where("uid", "==", user.uid));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const docData = querySnapshot.docs[0].data();
                    setUserData(docData);
                    setPreviewUrl(docData.url);
                } else {
                    console.error("Aucune donnée trouvée pour cet utilisateur.");
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des données utilisateur :", error);
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        window.dispatchEvent(new Event("authChanged"));
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-[#f8f9fa] p-6">
            <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-[#E03C31]">Mon Profil</h2>
                    <Button variant="ghost" onClick={handleLogout} className="flex items-center gap-2 text-red-600">
                        <LogOut className="w-4 h-4" /> Déconnexion
                    </Button>
                </div>

                {userData ? (
                    <div className="space-y-4">
                        <div className="flex flex-col items-center">
                            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#E03C31] shadow">
                                <img
                                    src={previewUrl || "/placeholder.svg"}
                                    alt="Profil"
                                    className="object-cover w-full h-full"
                                />
                            </div>

                            <p className="mt-4 text-sm text-gray-600">Choisissez un avatar :</p>
                            <div className="grid grid-cols-3 gap-3 mt-2">
                                {avatarOptions.map((avatar, index) => (
                                    <img
                                        key={index}
                                        src={avatar}
                                        alt={`Avatar ${index + 1}`}
                                        onClick={() => handleAvatarSelect(avatar)}
                                        className={`w-16 h-16 rounded-full cursor-pointer border-2 transition-transform duration-200 ${
                                            (previewUrl || userData?.url) === avatar
                                                ? "border-[#E03C31] scale-105"
                                                : "border-transparent hover:scale-105"
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <p><strong>📧 Email :</strong> {userData.email}</p>
                            <p><strong>👤 Pseudo :</strong> {userData.username}</p>
                            <p>
                                <strong>📆 Date d'inscription :</strong>{" "}
                                {userData.createdAt?.toDate().toLocaleDateString("fr-FR") ?? "Non disponible"}
                            </p>
                        </div>

                        {/* Admin button */}
                        {userData.isrole === "admin" && (
                            <Button
                                className="mt-4 w-full bg-[#E03C31] text-white hover:bg-[#F6C54A] hover:text-[#E03C31]"
                                onClick={() => navigate("/admin")}
                            >
                                Accéder à la gestion des rôles 👑
                            </Button>
                        )}

                        {/* Moderator button */}
                        {userData.isrole === "moderator" && (
                            <Button
                                className="mt-4 w-full bg-[#E03C31] text-white hover:bg-[#F6C54A] hover:text-[#E03C31]"
                                onClick={() => navigate("/moderation")}
                            >
                                Voir les signalements 🛠️
                            </Button>
                        )}
                    </div>
                ) : (
                    <p className="text-gray-600 text-center">Chargement des informations...</p>
                )}
            </div>
        </div>
    );
}
