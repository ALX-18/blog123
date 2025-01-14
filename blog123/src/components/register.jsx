import { db } from "../config/firebase";
import { collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {useState} from "react";


export const Register =() =>{
    const[username,setUsername] =useState("");
    const[mail,setMail] =useState("");
    const[password,setPassword]=useState("");
    const [role,setRole]=useState("");


}
