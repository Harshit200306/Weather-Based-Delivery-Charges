import { auth } from "./firebase.js";

import { signInWithEmailAndPassword }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


async function login(){

let email=document.getElementById("email").value


let pass=document.getElementById("pass").value

try{

await signInWithEmailAndPassword(auth,email,pass)


window.location="home.html"

}

catch(error){

document.getElementById("invalid").innerText="Invalid Login"

}

}

window.login = login;