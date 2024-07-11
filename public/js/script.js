
/*const recoverpsw=document.getElementById('recoverpsw');
const login=document.getElementById('login');
const registrar=document.getElementById('registrar');
const loginform=document.getElementById('loginform');
const regfom=document.getElementById('regform');*/

import firebase from "firebase/compat/app";

document.getElementById('registrar').addEventListener('click', function() {
	form.loginform().style.display = 'none';
	form.regform().style.display = 'flex';
});

document.getElementById('retornar').addEventListener('click', function() {
	form.loginform().style.display = 'flex';
	form.regform().style.display = 'none';
});

document.addEventListener('DOMContentLoaded', function() {
	form.menuToggle().addEventListener('click', function() {
			const sidebar = document.getElementById('sidebar');
			if (sidebar.style.left === '-200px') {
					sidebar.style.left = '0';
					document.querySelector('.content').style.marginLeft = '200px';
			} else {
					sidebar.style.left = '-200px';
					document.querySelector('.content').style.marginLeft = '0';
			}
	});
});

recoverpsw.addEventListener('click', function(){
	showLoading();
	firebase.auth().sendPasswordResetEmail(form.email().value).then(()=>{
		hideLoading();
		alert("Email enviado com sucesso!");
	}).catch(error =>{
		hideLoading();
	})
});
														
function redirectHome(){
	loginform.classList.add('fade-out');
	setTimeout(function(){
		window.location.href = 'home.html';
	}, 1000);
}

/*
function toggleBtnDisable(){
	const emailValid = validateEmail(email);
	const email = form.email().value;
	if (validateEmail(email)){
		form.login().disabled = !emailValid;
	}
}

function isEmailValid(){
	const email = form.email().value;
	if (!email){
		return false;
	}
	return validateEmail(email);
}

function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
	return re.test(String(email).toLowerCase());
} 
*/

const form = {
	email:() =>document.getElementById('email'),
	password:() =>document.getElementById('password'),
	login:() =>document.getElementById('login'),
	recoverpsw:() =>document.getElementById('recoverpsw'),
	registrar:() =>document.getElementById('registrar'),
	loginform:() =>document.getElementById('loginform'),
	regfom:() =>document.getElementById('regform'),
	menuToggle:() =>document.getElementById('menuToggle'),
}

function showLoading(){


}

function hideLoading(){

}