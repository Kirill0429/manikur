let adminLogin = 'K.i.r.a_0429';
let adminPassword = 'kirill0429';
let creatorLogin = 'I.r.i.n.a';
let creatorPassword = 'irina1504';

function showLogin() {
    document.getElementById('startScreen').classList.add('hidden');
    document.getElementById('loginForm').classList.remove('hidden');
}

function showRegister() {
    document.getElementById('startScreen').classList.add('hidden');
    document.getElementById('registerForm').classList.remove('hidden');
}

function goBack() {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.add('hidden');
    document.getElementById('startScreen').classList.remove('hidden');
    document.getElementById('adminPanel').classList.add('hidden');
}

function login() {
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;
    
    if ((login === adminLogin && password === adminPassword) || (login === creatorLogin && password === creatorPassword)) {
        document.getElementById('loginForm').classList.add('hidden');
        document.getElementById('adminPanel').classList.remove('hidden');
    } else {
        alert('Неверный логин или пароль');
    }
}

function register() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const regLogin = document.getElementById('regLogin').value;
    const regPassword = document.getElementById('regPassword').value;
    
    if (!name || !phone || !regLogin || !regPassword) {
        alert('Заполните все поля');
    } else {
        alert('Регистрация прошла успешно');
        goBack();
    }
}
