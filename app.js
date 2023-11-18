const socket = io();

let score = 0;

socket.on('newDot', (data) => {
    createDot(data.x, data.y);
});

function createDot(x, y) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;

    dot.addEventListener('mouseover', () => {
        socket.emit('dotClicked');
        dot.remove();
    });

    document.getElementById('game-container').appendChild(dot);
}

socket.on('updateScore', (newScore) => {
    score = newScore;
    document.getElementById('score').textContent = `ALLO: ${score}`;
});
