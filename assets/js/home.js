document.addEventListener('DOMContentLoaded', function () {
    const username = localStorage.getItem('username');

    if (username) {
        const welcomeMessage = document.getElementById('welcomeMessage');
        welcomeMessage.textContent = `Bem-vindo, ${username}!`;
    } else {
        window.location.href = 'index.html';
    }
});