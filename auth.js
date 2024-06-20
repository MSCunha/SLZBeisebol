import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs//10.12.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, collection, addDoc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { onAuthStateChanged } from "firebase/auth";

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

const signUp=document.getElementById('submitSignUp');
signUp.addEventListener('click', (event)=>{
	event.preventDefault();
	const email=document.getElementById(email).value;
	const password=document.getElementById(password).value;
	const name=document.getElementById(name).value;
	const id=document.getElementById(id).value;
	const auth = getAuth();
	const db = getFirestore();
})

createUserWithEmailAndPassword(auth, email, password)
.then((userCredential)=>{
	const user=userCredential.user;
	const userData={
		email: email,
		name: name,
		id: id
	};
	showMessage('cadastrado com sucesso!', 'signupMessage');
	const docRef=doc(db, "users", user.uid);
	setDoc(docRef,userData)
	.then(()=>{
		window.location.href='index.html';
	})
	.catch((error)=>{
		console.error("erro escrita doc", error);
	});
})
.catch((error)=>{
	const errorCode=error.code;
	if(errorCode=='auth/email-already-in-use'){
		showMessage('endereço de email ja existe!', 'signUpMessage');
	}else{
		showMessage('não possivel criar usuario', 'signUpMessage');
	}
	})

onAuthStateChanged(auth, (user)=>{
	const loggedInUserId=localStorage.getItem('loggedInUserId');
	if(loggedInUserId){
		console.log(user);
		const docRef = doc(db, "Users", loggedInUserId);
		getDoc(docRef)
		.then((docSnap)=>{
			if(docSnap.exists()){
				const userData=docSnap.data();
				document.getElementById('loggedUserName').innerText=userData.name;
				document.getElementById('loggedUserEmail').innerText=userData.email;
			}else{
				console.log("no doc found matching id")
			}
		})
		.catch((error)=>{
			console.log("error getting doc");
		})
	}
	else{
		console.log("user not found in local storage")
	}
})

const signIn=document.getElementById('submitSignIn');
signIn.addEventListener('click', (event)=>{
	event.preventDefault():
	const email=document.getElementById('email').value;
	const password=document.getElementById('password').value;
	const auth=getAuth();
	signInWithEmailAndPassword(auth, email,password)
	.then((userCredential)=>{
		showMessage('logado com sucesso!', 'signInMessage');
		const user=userCredential.user;
		localStorage.setItem('loggedInUserId', user.uid);
		window.location.href='home.html';
	})
	.catch((error)=>{
		const errorCode=error.code;
		if(errorCode==='auth/invalid-credential'){
			showMessage('Senha/Email incorretos', 'signInMessage');
		}else{
			showMessage('conta nao existe!', 'signInMessage');
		}
	})
})

const logoutButton=document.getElementById('logout');
logoutButton.addEventListener('click',()=>{
	localStorage.removeItem('loggedInUserId');
	signOut(auth)
	.then(()=>{
		window.location.href='index.html';
	})
	.catch((error)=>{
		console.error('Error Signing out:', error);
	})
})

