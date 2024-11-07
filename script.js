let appointments = [];
let messages = [];
let currentUser = null;

function bookAppointment() {
    const userName = document.getElementById('userName').value;
    const userPhone = document.getElementById('userPhone').value;
    const service = document.getElementById('service').value;
    const timeSlot = document.getElementById('userTime').value;

    // Проверка, что все поля заполнены
    if (!userName || !userPhone || !service || !timeSlot) {
        alert("Пожалуйста, заполните все поля.");
        return;
    }

    // Проверка корректности формата времени
    const timePattern = /^([0-9]{2}):([0-9]{2})$/;
    if (!timePattern.test(timeSlot)) {
        alert("Введите время в формате чч:мм.");
        return;
    }

    // Определяем длительность услуги
    let duration;
    if (service === 'manicure') {
        duration = 3 * 60; // Маникюр - 3 часа
    } else if (service === 'pedicure') {
        duration = 2.5 * 60; // Педикюр - 2.5 часа
    } else if (service === 'both') {
        duration = 5.5 * 60; // Маникюр и педикюр - 5.5 часов
    }

    const startTime = new Date(`1970-01-01T${timeSlot}:00`);
    const endTime = new Date(startTime.getTime() + duration * 60000);

    // Проверка на занятость времени
    const isTimeAvailable = appointments.every(app => {
        const appStartTime = new Date(`1970-01-01T${app.time}:00`);
        const appEndTime = new Date(appStartTime.getTime() + app.duration * 60000);

        return endTime <= appStartTime || startTime >= appEndTime;
    });

    if (!isTimeAvailable) {
        // Найти ближайшее доступное время
        let closestTime = new Date(endTime);
        let conflict = true;

        while (conflict) {
            conflict = appointments.some(app => {
                const appStartTime = new Date(`1970-01-01T${app.time}:00`);
                const appEndTime = new Date(appStartTime.getTime() + app.duration * 60000);
                return closestTime >= appStartTime && closestTime < appEndTime;
            });

            if (conflict) closestTime = new Date(closestTime.getTime() + 15 * 60000); // Добавляем 15 минут
        }

        alert(`В выбранное время процедура уже запланирована. Ближайшее доступное окно: ${closestTime.toTimeString().slice(0, 5)}`);
        return;
    }

    // Если время доступно, добавляем запись
    appointments.push({ user: userName, phone: userPhone, service: service, time: timeSlot, duration });
    alert(`Запись успешна: ${userName} на ${service} в ${timeSlot}`);

    // Очистка полей формы
    document.getElementById('userName').value = '';
    document.getElementById('userPhone').value = '';
    document.getElementById('service').value = '';
    document.getElementById('userTime').value = '';
    updateUI();
}

function contactAdmin() {
    document.getElementById('contact-form').classList.remove('hidden');
}

function hideContactForm() {
    document.getElementById('contact-form').classList.add('hidden');
}

function sendMessage() {
    const contactName = document.getElementById('contactName').value;
    const contactPhone = document.getElementById('contactPhone').value;
    const contactMessage = document.getElementById('contactMessage').value;

    // Проверка, что имя, телефон и сообщение заполнены
    if (!contactName || !contactPhone || !contactMessage) {
        alert("Введите ваше имя, номер телефона и сообщение.");
        return;
    }

    // Добавление сообщения
    messages.push({ from: contactName, phone: contactPhone, text: contactMessage });
    alert("Сообщение отправлено администратору.");

    // Очистка полей формы
    document.getElementById('contactName').value = '';
    document.getElementById('contactPhone').value = '';
    document.getElementById('contactMessage').value = '';
    hideContactForm();
    updateUI();
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
            li.innerText = `${appointment.user} (${appointment.phone}): ${appointment.service} в ${appointment.time}`;
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
            li.innerText = `${message.from} (Телефон: ${message.phone}): ${message.text}`;
            messagesList.appendChild(li);
        });
    } else {
        messagesList.innerHTML = '<li>Нет сообщений.</li>';
    }
}

window.onload = () => {
    updateUI();
};
