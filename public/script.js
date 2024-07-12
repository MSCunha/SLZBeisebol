import firebase from "firebase/compat/app";

/*const recoverpsw=document.getElementById('recoverpsw');
const login=document.getElementById('login');
const registrar=document.getElementById('registrar');
const loginform=document.getElementById('loginform');
const regform=document.getElementById('regform');*/

document.addEventListener('DOMContentLoaded', function() {
	document.getElementById('registrarbtn').addEventListener('click', function() {
		form.loginform().style.display = 'none';
		form.regform().style.display = 'flex';
	});
	
	document.getElementById('retornar').addEventListener('click', function() {
		form.loginform().style.display = 'flex';
		form.regform().style.display = 'none';
	});
	
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

document.getElementById('recoverpsw').addEventListener('click', function(){
    showLoading();
    firebase.auth().sendPasswordResetEmail(form.email().value).then(()=>{
        hideLoading();
        alert("Email enviado com sucesso!");
    }).catch(error =>{
        hideLoading();
    })
});

function redirectHome(){
    form.loginform().classList.add('fade-out');
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
    email: () => document.getElementById('email'),
    password: () => document.getElementById('password'),
    loginbtn: () => document.getElementById('loginbtn'),
    recoverpsw: () => document.getElementById('recoverpsw'),
    registrarbtn: () => document.getElementById('registrarbtn'),
    loginform: () => document.getElementById('loginform'),
    regform: () => document.getElementById('regform'),
    menuToggle: () => document.getElementById('menuToggle'),
};

function showLoading(){
    document.querySelector('.loading').hidden = false;
}

function hideLoading(){
    document.querySelector('.loading').hidden = true;
}
