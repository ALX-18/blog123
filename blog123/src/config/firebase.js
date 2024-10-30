
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyDuEKZxybivnWlOyzSG-rEktlxlWjyeJ5I",
    authDomain: "blog123-b0179.firebaseapp.com",
    projectId: "blog123-b0179",
    storageBucket: "blog123-b0179.appspot.com",
    messagingSenderId: "841961213931",
    appId: "1:841961213931:web:7295c165f2322dc40cd3ae",
    measurementId: "G-JDJMD5TFD0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);