// Входные данные пользователей
const users = [
    { login: 'sysadmin', password: 'sysadmin123', role: 'sysadmin' },
    { login: 'creator', password: 'creator123', role: 'creator' }
];

// Список записей (для администратора и пользователей)
let appointments = [];

// Показать начальный экран
function backToMain() {
    document.getElementById('mainScreen').classList.remove('hidden');
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registrationForm').classList.add('hidden');
    document.getElementById('userPanel').classList.add('hidden');
    document.getElementById('adminPanel').classList.add('hidden');
}

// Показать форму для входа
function showLogin() {
    document.getElementById('mainScreen').classList.add('hidden');
    document.getElementById('loginForm').classList.remove('hidden');
}

// Показать форму для регистрации
function showRegistration() {
    document.getElementById('mainScreen').classList.add('hidden');
    document.getElementById('registrationForm').classList.remove('hidden');
}

// Вход в систему
function login() {
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;

    const user = users.find(user => user.login === login && user.password === password);
    
    if (user) {
        if (user.role === 'sysadmin') {
            // Панель администратора
            document.getElementById('loginForm').classList.add('hidden');
            document.getElementById('adminPanel').classList.remove('hidden');
            displayAdminAppointments();
        } else {
            // Панель пользователя
            document.getElementById('loginForm').classList.add('hidden');
            document.getElementById('userPanel').classList.remove('hidden');
            displayUserAppointments();
        }
    } else {
        alert('Неверный логин или пароль');
    }
}

// Регистрация пользователя
function register() {
    const regName = document.getElementById('regName').value;
    const regPhone = document.getElementById('regPhone').value;
    const regEmail = document.getElementById('regEmail').value;
    const regPassword = document.getElementById('regPassword').value;

    users.push({
        login: regEmail,
        password: regPassword,
        role: 'user'
    });

    alert('Регистрация прошла успешно!');
    backToMain();
}

// Добавление записи
function addAppointment() {
    const name = prompt('Введите имя:');
    const phone = prompt('Введите номер телефона:');
    const date = prompt('Выберите дату (например, 2024-11-07):');

    if (name && phone && date) {
        appointments.push({ name, phone, date });
        alert('Запись успешно добавлена!');
        displayUserAppointments();
    } else {
        alert('Заполните все поля!');
    }
}

// Отображение записей пользователя
function displayUserAppointments() {
    const appointmentsList = document.getElementById('appointmentsList');
    appointmentsList.innerHTML = '';
    appointments.forEach((appointment, index) => {
        appointmentsList.innerHTML += `
            <div>Имя: ${appointment.name}, Телефон: ${appointment.phone}, Дата: ${appointment.date}</div>
        `;
    });
}

// Отображение записей для админа
function displayAdminAppointments() {
    const appointmentsAdminList = document.getElementById('appointmentsAdminList');
    appointmentsAdminList.innerHTML = '';
    appointments.forEach((appointment, index) => {
        appointmentsAdminList.innerHTML += `
            <div>Имя: ${appointment.name}, Телефон: ${appointment.phone}, Дата: ${appointment.date}</div>
        `;
    });
}

// Отправка уведомлений
function sendMessage() {
    const message = document.getElementById('userMessage').value;
    
    if (message) {
        const notificationList = document.getElementById('notificationsList');
        const notification = document.createElement('div');
        notification.innerText = `Новое сообщение: ${message}`;
        notificationList.appendChild(notification);

        // Очистка поля сообщения
        document.getElementById('userMessage').value = '';
    } else {
        alert('Пожалуйста, введите сообщение');
    }
}
