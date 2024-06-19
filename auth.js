import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs//10.12.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, collection, addDoc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
	apiKey: "AIzaSyBDzwZ-7I8V7F0EA_WNxePoFTUYG2cybKA",
	authDomain: "slzbeisebolapp.firebaseapp.com",
	databaseURL: "https://slzbeisebolapp-default-rtdb.firebaseio.com",
	projectId: "slzbeisebolapp",
	storageBucket: "slzbeisebolapp.appspot.com",
	messagingSenderId: "425869276017",
	appId: "1:425869276017:web:a44c815f0e65a8b74d3cd0"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

function showMessage(message, divId){
		var messageDiv=document.getElementById(divId);
		messageDiv.style.display="block";
		messageDiv.innerHTML=message;
		messageDiv.style.opacity=1;
		setTimeout(function(){
			messageDiv.style.opacity=0;
		},5000);
}