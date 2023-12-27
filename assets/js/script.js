import mockUsers from './mock.js';

document.addEventListener('DOMContentLoaded', function () {
    const entrarButton = document.getElementById('entrarButton');

    entrarButton.addEventListener('click', function () {
        entrar();
    });
});

function entrar() {
    const usernameInput = document.getElementById('username');
    const enteredUsername = usernameInput.value;

    // Verificar se o usuário está no mock
    const authenticatedUser = mockUsers.find(user => user.user === enteredUsername);

    if (authenticatedUser) {
        // Armazenar o nome do usuário no localStorage
        localStorage.setItem('username', authenticatedUser.name);

        // Redirecionar para a home
        window.location.href = 'home.html';
    } else {
        alert('Usuário não encontrado. Tente novamente.');
    }
}

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var W = window.innerWidth;
var H = window.innerHeight;

canvas.width = W;
canvas.height = H;

var fontSize = 26;
var columns = Math.floor(W / fontSize);
var drops = [];
for(var i=0; i<columns; i++){
    drops.push(0);
}
var str = "123456789";
function draw(){
    context.fillStyle = "rgba(0,0,0,0.05)";
    context.fillRect(0, 0, W, H);
    context.fontSize = "700 " + fontSize + "px";
    context.fillStyle = "#00cc33";
    for(var i=0; i<columns; i++){
        var index = Math.floor(Math.random()*str.length);
        var x = i * fontSize;
        var y = drops[i] * fontSize;
        context.fillText(str[index], x, y);
        if(y >= canvas.height && Math.random() > 0.99){
            drops[i] = 0;
        }
        drops[i]++;
    }
}
draw();
setInterval(draw, 65);

// ########################## HOME \/

document.addEventListener('DOMContentLoaded', function () {
    // Recuperar o nome do usuário do localStorage
    const username = localStorage.getItem('username');

    // Exibir mensagem de boas-vindas
    if (username) {
        const welcomeMessage = document.getElementById('welcomeMessage');
        welcomeMessage.textContent = `Olá, ${username}!`;
    } else {
        // Se não houver nome de usuário no localStorage, redirecionar de volta para a página de login
        window.location.href = 'index.html';
    }
});

// ##########################  NUMBERS \/

import mockNumbers from './mockNumbers.js';

document.addEventListener('DOMContentLoaded', function () {
    // Encontrar a div onde as sequências serão exibidas
    const sequencesDiv = document.getElementById('sequences');
    const filterNumberInput = document.getElementById('filterNumber');
    const filterListDiv = document.getElementById('filterList');

    // Array para armazenar os números filtrados
    let filtros = [];

    // Adicionar evento de clique ao botão de filtrar
    document.querySelector('button').addEventListener('click', adicionarFiltro);

    function adicionarFiltro() {
        const filterNumber = filterNumberInput.value;

        // Validar se o número já foi adicionado ao filtro
        if (!filtros.includes(filterNumber)) {
            // Adicionar o número ao filtro
            filtros.push(filterNumber);

            // Exibir os números filtrados
            exibirFiltros();

            // Filtrar e exibir sequências
            filtrarSequencias();
        } else {
            alert('Número já adicionado ao filtro.');
        }

        // Limpar o input
        filterNumberInput.value = '';
    }

    function exibirFiltros() {
        filterListDiv.innerHTML = '<strong>Números no Filtro:</strong> ' + filtros.join(', ');
    }

    function filtrarSequencias() {
        // Remover sequências anteriores
        sequencesDiv.innerHTML = '';

        // Se não houver filtros, mostrar todas as sequências
        if (filtros.length === 0) {
            mockNumbers.forEach((sequence, index) => {
                const sequenceText = document.createElement('div');


                sequence.forEach(number => {
                    const numberParagraph = document.createElement('p');
                    numberParagraph.textContent = number;
                    numberParagraph.id = `number_${number}`;

                    // Adicionar o número ao texto da sequência
                    sequenceText.appendChild(numberParagraph);
                });

                // Adicionar o texto da sequência à div
                sequencesDiv.appendChild(sequenceText);
            });
        } else {
            // Filtrar e exibir sequências
            mockNumbers.forEach((sequence, index) => {
                if (verificarSequencia(sequence)) {
                    const sequenceText = document.createElement('div');

                    sequence.forEach(number => {
                        const numberParagraph = document.createElement('p');
                        numberParagraph.textContent = number;
                        numberParagraph.id = `number_${number}`;

                        // Adicionar o número ao texto da sequência
                        sequenceText.appendChild(numberParagraph);
                    });

                    // Adicionar o texto da sequência à div
                    sequencesDiv.appendChild(sequenceText);
                }
            });
        }
    }

    function verificarSequencia(sequence) {
        // Verificar se todos os números do filtro estão presentes na sequência
        return filtros.every(filter => sequence.includes(filter));
    }

    // Inicialmente, exibir todas as sequências
    filtrarSequencias();
});