let appointments = [];
let messages = [];
let currentUser = null;

function bookAppointment() {
    const userName = document.getElementById('userName').value;
    const userPhone = document.getElementById('userPhone').value;
    const timeSlot = document.getElementById('timeSlot').value;

    if (userName && userPhone && timeSlot) {
        appointments.push({ user: userName, phone: userPhone, time: timeSlot });
        alert(`Запись успешна: ${userName} на ${timeSlot}`);
        document.getElementById('userName').value = '';
        document.getElementById('userPhone').value = '';
        document.getElementById('timeSlot').value = '';
        updateUI();
    } else {
        alert("Пожалуйста, заполните все поля.");
    }
}

function contactAdmin() {
    document.getElementById('contact-form').classList.remove('hidden');
}

function hideContactForm() {
    document.getElementById('contact-form').classList.add('hidden');
}

function sendMessage() {
    const messageText = document.getElementById('userMessage').value;
    if (messageText) {
        messages.push({ from: 'Клиент', text: messageText });
        alert("Сообщение отправлено администратору.");
        document.getElementById('userMessage').value = '';
        hideContactForm();
        updateUI();
    } else {
        alert("Введите сообщение.");
    }
}

function loginUser() {
    const login = document.getElementById('adminLogin').value;
    const password = document.getElementById('adminPassword').value;

    if (login === 'K.i.r.a_0429' && password === 'kirill0429') {
        currentUser = { role: 'admin', name: 'Кирилл' };
        alert("Добро пожаловать, Кирилл!");
    } else if (login === 'I.r.i.n.a' && password === 'irina1504') {
        currentUser = { role: 'owner', name: 'Ирина' };
        alert("Добро пожаловать, Ирина!");
    } else {
        alert("Неверный логин или пароль.");
        return;
    }
    updateUI();
}

function logoutUser() {
    currentUser = null;
    updateUI();
}

function updateUI() {
    const bookingForm = document.getElementById('booking-form');
    const contactForm = document.getElementById('contact-form');
    const adminLoginForm = document.getElementById('admin-login-form');
    const adminPanel = document.getElementById('admin-panel');
    const ownerPanel = document.getElementById('owner-panel');

    if (currentUser) {
        bookingForm.classList.add('hidden');
        adminLoginForm.classList.add('hidden');
        contactForm.classList.add('hidden');

        if (currentUser.role === 'admin') {
            adminPanel.classList.remove('hidden');
            ownerPanel.classList.add('hidden');
            displayAppointments('admin-appointments');
            displayMessages('admin-messages');
        } else if (currentUser.role === 'owner') {
            ownerPanel.classList.remove('hidden');
            adminPanel.classList.add('hidden');
            displayAppointments('owner-appointments');
            displayMessages('owner-messages');
        }
    } else {
        bookingForm.classList.remove('hidden');
        adminLoginForm.classList.remove('hidden');
        adminPanel.classList.add('hidden');
        ownerPanel.classList.add('hidden');
    }
}

function displayAppointments(panelId) {
    const appointmentsList = document.getElementById(panelId);
    appointmentsList.innerHTML = '';

    if (appointments.length > 0) {
        appointments.forEach(appointment => {
            const li = document.createElement('li');
            li.innerText = `${appointment.user} (${appointment.phone}): ${appointment.time}`;
            appointmentsList.appendChild(li);
        });
    } else {
        appointmentsList.innerHTML = '<li>Нет записей.</li>';
    }
}

function displayMessages(panelId) {
    const messagesList = document.getElementById(panelId);
    messagesList.innerHTML = '';

    if (messages.length > 0) {
        messages.forEach(message => {
            const li = document.createElement('li');
            li.innerText = `${message.from}: ${message.text}`;
            messagesList.appendChild(li);
        });
    } else {
        messagesList.innerHTML = '<li>Нет сообщений.</li>';
    }
}

window.onload = () => {
    updateUI();
};
