import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

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

window.db = db;
window.auth = auth;
window.app = app;

function showMessage(message, divId) {
	var messageDiv = document.getElementById(divId);
	messageDiv.style.display = "block";
	messageDiv.innerHTML = message;
	messageDiv.style.opacity = 1;
	setTimeout(function () {
		messageDiv.style.opacity = 0;
	}, 5000);
}

document.getElementById('cadastrar').addEventListener('click', (event) => {
	event.preventDefault();
	const email = document.getElementById('email').value;
	const password = document.getElementById('regsenha').value;
	const name = document.getElementById('nome').value;
	const id = document.getElementById('id').value;

	createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			const user = userCredential.user;
			const userData = {
				email: email,
				name: name,
				id: id,
				senha: regsenha
			};
			showMessage('Cadastrado com sucesso!', 'signupMessage');
			const docRef = doc(db, "users", user.uid);
			setDoc(docRef, userData)
				.then(() => {
					window.location.href = 'home.html';
				})
				.catch((error) => {
					console.error("Erro ao escrever documento", error);
				});
		})
		.catch((error) => {
			const errorCode = error.code;
			if (errorCode === 'auth/email-already-in-use') {
				showMessage('Endereço de email já existe!', 'signupMessage');
			} else {
				showMessage('Não foi possível criar usuário', 'signupMessage');
			}
		});
});

document.getElementById('login').addEventListener('click', (event) => {
	event.preventDefault();
	const email = document.getElementById('email').value;
	const password = document.getElementById('senha').value;

	signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			showMessage('Logado com sucesso!', 'signInMessage');
			const user = userCredential.user;
			localStorage.setItem('loggedInUserId', user.uid);
			window.location.href = 'home.html';
		})
		.catch((error) => {
			const errorCode = error.code;
			if (errorCode === 'auth/invalid-credential') {
				showMessage('Senha/Email incorretos', 'signInMessage');
			} else {
				showMessage('Conta não existe!', 'signInMessage');
			}
		});
});

const logoutButton = document.getElementById('logout');
if (logoutButton) {
	logoutButton.addEventListener('click', () => {
		localStorage.removeItem('loggedInUserId');
		signOut(auth)
			.then(() => {
				window.location.href = 'index.html';
			})
			.catch((error) => {
				console.error('Error Signing out:', error);
			});
	});
}

onAuthStateChanged(auth, (user) => {
	const loggedInUserId = localStorage.getItem('loggedInUserId');
	if (loggedInUserId) {
		console.log(user);
		const docRef = doc(db, "users", loggedInUserId);
		getDoc(docRef)
			.then((docSnap) => {
				if (docSnap.exists()) {
					const userData = docSnap.data();
					document.getElementById('loggedUserName').innerText = userData.name;
					document.getElementById('loggedUserEmail').innerText = userData.email;
				} else {
					console.log("No document found matching ID");
				}
			})
			.catch((error) => {
				console.log("Error getting document", error);
			});
	} else {
		console.log("User not found in local storage");
	}
});
