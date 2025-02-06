document.addEventListener("DOMContentLoaded", () => {
    const retour = document.querySelector('.returnDiv');
    const mainGame = document.querySelector('#mainGame');
    const overlayST = document.querySelector('.overlay-start-game');
    const overlayGame = document.querySelector('.overlayGame');
    const cpu = document.querySelector('.CPU');
    const boxes = document.querySelectorAll('.box');
    const turnDisplay = document.querySelector('.pTurn');
    const divX = document.querySelector('.divX');
    const divCercle = document.querySelector('.divCercle');
    const imgDivX = document.querySelector('.imgDivX');
    const imgDivCercle = document.querySelector('.imgDivCercle');
    const goFirst = document.querySelector('.goFirst');

    let currentPlayer = 'O'; // Par défaut, O commence
    let gameActive = true;
    const boardState = Array(9).fill(null);
    
    const playerXImg = 'assets/Combined Shape Copy 2B.png';
    const playerOImg = 'assets/Oval CopyJ.png';    

    divX.addEventListener('click', () => {
        divX.style.backgroundColor = '#A8BFC9';
        divCercle.style.backgroundColor = 'transparent';
        imgDivX.src = "assets/Combined Shape Copy 2 black.svg";
        imgDivCercle.src = "assets/Oval Copy white.svg";
        goFirst.textContent = 'X';
        currentPlayer = 'X';
    });

    divCercle.addEventListener('click', () => {
        divCercle.style.backgroundColor = '#A8BFC9';
        divX.style.backgroundColor = 'transparent';
        imgDivX.src = "assets/Combined Shape Copy 2.svg";
        imgDivCercle.src = "assets/Oval Copy.svg";
        goFirst.textContent = 'O';
        currentPlayer = 'O';
    });

    cpu.addEventListener('click', () => {
        overlayST.style.display = 'none';
        overlayGame.style.display = 'block';
        turnDisplay.textContent = `${currentPlayer}'s TURN`;
    });

    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6],
    ];

    function checkWinner() {
        for (const condition of winConditions) {
            const [a, b, c] = condition;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                return boardState[a];
            }
        }
        return boardState.includes(null) ? null : 'TIE';
    }

    function displayPopup(message) {
        const popUp = `
            <div class="overlay">
                <div class="popUp">
                    <h2>${message}</h2>
                    <section class="secBtn">
                        <button class="quit">QUIT</button>
                        <button class="nextR">RESTART</button>
                    </section>
                </div>
            </div>`;
        mainGame.innerHTML += popUp;

        document.querySelector('.quit').addEventListener('click', () => window.location.href = 'index.html');
        document.querySelector('.nextR').addEventListener('click', () => window.location.reload());
    }

    boxes.forEach((box, index) => {
        box.addEventListener('click', () => {
            if (!gameActive || boardState[index]) return;

            boardState[index] = currentPlayer;
            box.innerHTML = `<img src="${currentPlayer === 'X' ? playerXImg : playerOImg}" alt="${currentPlayer}">`;

            const winner = checkWinner();
            if (winner) {
                gameActive = false;
                displayPopup(winner === 'TIE' ? 'ROUND TIED!' : `${winner} WINS!`);
                return;
            }

            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            turnDisplay.textContent = `${currentPlayer}'s TURN`;
        });
    });

    retour.addEventListener('click', () => {
        const popUpRetour = `
            <div class="overlay">
                <div class="popUp">
                    <h2>RESTART GAME?</h2>
                    <section class="secBtn">
                        <button class="quit cancelBtn">NO, CANCEL</button>
                        <button class="nextR restartBtn">YES, RESTART</button>
                    </section>
                </div>
            </div>`;
        mainGame.innerHTML += popUpRetour;

        document.querySelector('.cancelBtn').addEventListener('click', () => document.querySelector('.overlay').remove());
        document.querySelector('.restartBtn').addEventListener('click', () => window.location.reload());
    });

    turnDisplay.textContent = `${currentPlayer}'s TURN`;
});
