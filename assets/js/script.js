import mockUsers from './mock.js';
import mockNumbers from './mockNumbers.js';

document.addEventListener('DOMContentLoaded', function () {
    const entrarButton = document.getElementById('entrarButton');
    if (entrarButton) {
        entrarButton.addEventListener('click', entrar);
    }

    const welcomeMessage = document.getElementById('welcomeMessage');
    if (welcomeMessage) {
        verificarAutenticacao();
    }

    const canvas = document.getElementById('canvas');
    if (canvas) {
        iniciarCanvasMatrix(canvas);
    }

    const sequencesDiv = document.getElementById('sequences');
    const filterNumberInput = document.getElementById('filterNumber');
    if (sequencesDiv && filterNumberInput) {
        configurarFiltroDeNumeros(sequencesDiv, filterNumberInput);
    }
});

function entrar() {
    const usernameInput = document.getElementById('username');
    const enteredUsername = usernameInput.value.trim();

    const authenticatedUser = mockUsers.find(user => user.user === enteredUsername);

    if (authenticatedUser) {
        localStorage.setItem('username', authenticatedUser.name);
        window.location.href = 'home.html';
    } else {
        alert('Usuário não encontrado. Tente novamente.');
    }
}

function verificarAutenticacao() {
    const username = localStorage.getItem('username');
    if (username) {
        const welcomeMessage = document.getElementById('welcomeMessage');
        welcomeMessage.textContent = `Olá, ${username}!`;
    } else {
        alert('Você não está autenticado. Redirecionando para a página de login.');
        window.location.href = 'index.html';
    }
}

function iniciarCanvasMatrix(canvas) {
    const context = canvas.getContext('2d');
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;

    const fontSize = 16;
    const columns = Math.floor(W / fontSize);
    const drops = Array(columns).fill(0);
    const str = "1234567890";

    function draw() {
        context.fillStyle = "rgba(0, 0, 0, 0.05)";
        context.fillRect(0, 0, W, H);

        context.font = `${fontSize}px monospace`;
        context.fillStyle = "#00cc33";

        for (let i = 0; i < columns; i++) {
            const char = str[Math.floor(Math.random() * str.length)];
            const x = i * fontSize;
            const y = drops[i] * fontSize;

            context.fillText(char, x, y);

            if (y >= H && Math.random() > 0.99) drops[i] = 0;
            drops[i]++;
        }
        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', () => {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
        drops.fill(0);
    });

    draw();
}

function configurarFiltroDeNumeros(sequencesDiv, filterNumberInput) {
    const filterListDiv = document.getElementById('filterList');
    const filtros = new Set();

    document.querySelector('button').addEventListener('click', () => {
        const filterNumber = filterNumberInput.value.trim();

        if (filterNumber && !filtros.has(filterNumber)) {
            filtros.add(filterNumber);
            exibirFiltros(filterListDiv, filtros);
            filtrarSequencias(sequencesDiv, filtros);
        } else if (filtros.has(filterNumber)) {
            alert('Número já adicionado ao filtro.');
        } else {
            alert('Por favor, insira um número válido.');
        }

        filterNumberInput.value = '';
    });

    function exibirFiltros(filterListDiv, filtros) {
        filterListDiv.innerHTML = `<strong>Números no Filtro:</strong> ${Array.from(filtros).join(', ')}`;
    }

    function filtrarSequencias(sequencesDiv, filtros) {
        sequencesDiv.innerHTML = '';

        mockNumbers.forEach(sequence => {
            if (filtros.size === 0 || verificarSequencia(sequence, filtros)) {
                const sequenceDiv = document.createElement('div');
                sequence.forEach(number => {
                    const numberParagraph = document.createElement('p');
                    numberParagraph.textContent = number;
                    sequenceDiv.appendChild(numberParagraph);
                });
                sequencesDiv.appendChild(sequenceDiv);
            }
        });
    }

    function verificarSequencia(sequence, filtros) {
        return Array.from(filtros).every(filter => sequence.includes(filter));
    }

    filtrarSequencias(sequencesDiv, filtros);
}
