document.addEventListener('DOMContentLoaded', function () {
    // Recuperar o nome do usuário do localStorage
    const username = localStorage.getItem('username');

    // Exibir mensagem de boas-vindas
    if (username) {
        const welcomeMessage = document.getElementById('welcomeMessage');
        welcomeMessage.textContent = `Bem-vindo, ${username}!`;
    } else {
        // Se não houver nome de usuário no localStorage, redirecionar de volta para a página de login
        window.location.href = 'index.html';
    }
});