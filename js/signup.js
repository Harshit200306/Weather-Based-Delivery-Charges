import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import { getAuth, createUserWithEmailAndPassword }
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { getFirestore, setDoc, doc }
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDiWMZV1DEgLUAZHDb6CumMzUC8xeQh3_c",
    authDomain: "food-delivery-project-26f9e.firebaseapp.com",
    projectId: "food-delivery-project-26f9e",
    storageBucket: "food-delivery-project-26f9e.firebasestorage.app",
    messagingSenderId: "426440369700",
    appId: "1:426440369700:web:116fe1dbf3c62bfec75ab1"

};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

window.signup = function(){

let name = document.getElementById("name").value;
let email = document.getElementById("email").value;
let password = document.getElementById("password").value;

createUserWithEmailAndPassword(auth, email, password)
.then(async (userCredential) => {

let user = userCredential.user;

await setDoc(doc(db, "users", user.uid), {
  name: name,
  email: email
});

document.getElementById("success").innerText="Registered Successfully"
setTimeout(function(){
    window.location.href="login.html"
}, 1000);
 


})
.catch((error) => {

let code = error.code;

if(code === "auth/invalid-email"){
document.getElementById("emailError").innerText = "Invalid Email";
}

else if(code === "auth/user-not-found"){
document.getElementById("emailError").innerText = "Email not registered";
}

else if(code === "auth/weak-password"){
document.getElementById("passError").innerText = "Password should be atleast 6 letters";
}

});

}