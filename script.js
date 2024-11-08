function goBack() {
    hideAllForms();
    document.getElementById('mainMenu').classList.add('show');
}

function hideAllForms() {
    document.querySelectorAll('.card').forEach(card => card.classList.remove('show'));
}

function showLoginForm() {
    hideAllForms();
    document.getElementById('loginForm').classList.add('show');
}

function showRegisterForm() {
    hideAllForms();
    document.getElementById('registerForm').classList.add('show');
}

function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    if ((username === 'K.i.r.a_0429' && password === 'kirill0429') || (username === 'I.r.i.n.a' && password === 'irina1504')) {
        hideAllForms();
        document.getElementById('adminPanel').classList.add('show');
    } else {
        alert('Неверные учетные данные');
    }
}

function register() {
    alert('Регистрация прошла успешно');
    goBack();
}

function viewClientRecords() {
    alert('Здесь будут записи клиентов.');
}

function viewNotifications() {
    alert('Здесь будут уведомления.');
}

function showEditRecordForm() {
    hideAllForms();
    document.getElementById('editRecordForm').classList.add('show');
}

function editRecord() {
    const name = document.getElementById('editName').value;
    const date = document.getElementById('editDate').value;
    const phone = document.getElementById('editPhone').value;

    if (name && date && phone) {
        alert(`Изменяем запись пользователя: ${name}, Дата: ${date}, Телефон: ${phone}`);
        // Здесь можно добавить логику для поиска и изменения записи в базе данных
    } else {
        alert('Заполните все поля');
    }
}

function goBackToAdmin() {
    hideAllForms();
    document.getElementById('adminPanel').classList.add('show');
}

function logout() {
    goBack();
}
