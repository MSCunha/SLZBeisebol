
const recoverpsw=document.getElementById('recoverpsw');
const login=document.getElementById('login');
const registrar=document.getElementById('registrar');
const loginform=document.getElementById('loginform');
const regfom=document.getElementById('regform');

document.getElementById('registrar').addEventListener('click', function() {
	document.getElementById('loginform').style.display = 'none';
	document.getElementById('regform').style.display = 'flex';
});

document.getElementById('retornar').addEventListener('click', function() {
	document.getElementById('loginform').style.display = 'flex';
	document.getElementById('regform').style.display = 'none';
});

document.getElementById('menuToggle').addEventListener('click', function() {
		const sidebar = document.getElementById('sidebar');
		if (sidebar.style.left === '-200px') {
				sidebar.style.left = '0';
				document.querySelector('.content').style.marginLeft = '200px';
		} else {
				sidebar.style.left = '-200px';
				document.querySelector('.content').style.marginLeft = '0';
		}
});

recoverpsw.addEventListener('click', function(){
	//RECUPERAR SENHA
});

login.addEventListener('click', function(){
	//LOGIN
});
														
function redirectHome(){
	loginform.classList.add('fade-out');
	setTimeout(function(){
		window.location.href = 'home.html';
	}, 1000);
}

