import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { db } from "../config/firebase"
import { collection, query, where, getDocs } from "firebase/firestore"

export default function PrivateRouteCreate({ children }) {
    const [authorized, setAuthorized] = useState(null) // null = loading, false = refused, true = granted

    useEffect(() => {
        const auth = getAuth()

        onAuthStateChanged(auth, async (user) => {
            if (!user) {
                setAuthorized(false)
                return
            }

            const q = query(collection(db, "users"), where("uid", "==", user.uid))
            const snapshot = await getDocs(q)

            if (snapshot.empty) {
                setAuthorized(false)
                return
            }

            const data = snapshot.docs[0].data()
            const role = data.isrole

            if (role === "redactor") {
                setAuthorized(true)
            } else {
                setAuthorized(false)
            }
        })
    }, [])

    if (authorized === null) {
        return <div className="p-4 text-center">Chargement...</div>
    }

    if (!authorized) {
        return <Navigate to="/" />
    }

    return children
}
