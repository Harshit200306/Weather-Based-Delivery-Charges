// Import firebase libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



const firebaseConfig = {

apiKey: "AIzaSyDiWMZV1DEgLUAZHDb6CumMzUC8xeQh3_c",
    authDomain: "food-delivery-project-26f9e.firebaseapp.com",
    projectId: "food-delivery-project-26f9e",
    storageBucket: "food-delivery-project-26f9e.firebasestorage.app",
    messagingSenderId: "426440369700",
    appId: "1:426440369700:web:116fe1dbf3c62bfec75ab1"

};


// Initialize firebase
const app = initializeApp(firebaseConfig);


// Authentication
const auth = getAuth(app);


// Database
const db = getFirestore(app);


// Export
export { auth, db };