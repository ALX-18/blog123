// components/PrivateRouteAdmin.jsx
import { Navigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

export default function PrivateRouteAdmin({ children }) {
  const [allowed, setAllowed] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      setAllowed(false);
      return;
    }

    const checkRole = async () => {
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const snapshot = await getDocs(q);
      const docData = snapshot.docs[0]?.data();
      setAllowed(docData?.isrole === "admin");
    };

    checkRole();
  }, []);

  if (allowed === null) return null; // ou un loader

  return allowed ? children : <Navigate to="/" replace />;
}
