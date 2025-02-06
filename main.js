document.addEventListener("DOMContentLoaded", () => {
    const retour = document.querySelector('.returnDiv');
    const mainGame = document.querySelector('#mainGame');
    const overlayST = document.querySelector('.overlay-start-game');
    const overlayGame = document.querySelector('.overlayGame');
    const cpu = document.querySelector('.CPU');
    const double = document.querySelector('.DOUBLE');
    const boxes = document.querySelectorAll('.box');
    const turnImage = document.querySelector('.imgTurn');
    const divX = document.querySelector('.divX');
    const divCercle = document.querySelector('.divCercle');
    const imgDivX = document.querySelector('.imgDivX');
    const imgDivCercle = document.querySelector('.imgDivCercle');
    const goFirst = document.querySelector('.goFirst');
    const scoreX = document.querySelector('.win');
    const scoreTie = document.querySelector('.egal');
    const scoreO = document.querySelector('.loose');

    let currentPlayer = 'O';
    let gameActive = true;
    let isCPU = false;
    const boardState = Array(9).fill(null);

    let xWins = 0;
    let oWins = 0;
    let ties = 0;

    const playerXImg = 'assets/Combined Shape Copy 2.svg';
    const playerOImg = 'assets/Oval Copy white.svg';    
    const playerXImgG = 'assets/Combined Shape Copy 2B.png';
    const playerOImgG = 'assets/Oval CopyJ.png'; 

    divX.addEventListener('click', () => {
        divX.style.backgroundColor = '#A8BFC9';
        divCercle.style.backgroundColor = 'transparent';
        imgDivX.src = "assets/Combined Shape Copy 2 black.svg";
        imgDivCercle.src = "assets/Oval Copy white.svg";
        goFirst.textContent = 'X';
        currentPlayer = 'X';
        turnImage.src = playerXImg;
    });

    divCercle.addEventListener('click', () => {
        divCercle.style.backgroundColor = '#A8BFC9';
        divX.style.backgroundColor = 'transparent';
        imgDivX.src = "assets/Combined Shape Copy 2.svg";
        imgDivCercle.src = "assets/Oval Copy.svg";
        goFirst.textContent = 'O';
        currentPlayer = 'O';
        turnImage.src = playerOImg;
    });

    cpu.addEventListener('click', () => {
        isCPU = true;
        overlayST.style.display = 'none';
        overlayGame.style.display = 'block';
        turnImage.src = currentPlayer === 'X' ? playerXImg : playerOImg;
        startGame();
    });

    double.addEventListener('click', () => {
        isCPU = false;
        overlayST.style.display = 'none';
        overlayGame.style.display = 'block';
        turnImage.src = currentPlayer === 'X' ? playerXImg : playerOImg;
        startGame();
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

        document.querySelector('.quit').addEventListener('click', () => {
            resetScores();
            window.location.href = 'index.html';
        });

        document.querySelector('.nextR').addEventListener('click', () => {
            resetGame();
        });
    }

    function resetGame() {
        document.querySelector('.overlay').remove();
        boardState.fill(null);
        boxes.forEach(box => {
            box.innerHTML = '';
            box.addEventListener('click', handlePlayerMove);
        });

        currentPlayer = 'O';
        turnImage.src = playerOImg;

        gameActive = true;
    }

    function startGame() {
        gameActive = true;
        boardState.fill(null);
        boxes.forEach(box => {
            box.innerHTML = '';
            box.addEventListener('click', handlePlayerMove);
        });

        turnImage.src = currentPlayer === 'X' ? playerXImg : playerOImg;

        if (isCPU && currentPlayer === 'O') {
            disableBoard();
            setTimeout(cpuMove, 500);
        }
    }

    function disableBoard() {
        boxes.forEach(box => {
            box.removeEventListener('click', handlePlayerMove);
        });
    }

    function enableBoard() {
        boxes.forEach(box => box.addEventListener('click', handlePlayerMove));
    }

    function cpuMove() {
        const availableMoves = boardState.map((val, index) => val === null ? index : null).filter(val => val !== null);
        const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        boardState[randomMove] = 'O';
        boxes[randomMove].innerHTML = `<img src="${playerOImgG}" alt="O">`;

        const winner = checkWinner();
        if (winner) {
            gameActive = false;
            updateScore(winner);
            displayPopup(winner === 'TIE' ? 'ROUND TIED!' : `${winner} WINS!`);
            return;
        }

        currentPlayer = 'X';
        turnImage.src = playerXImg;
        enableBoard();
    }

    function handlePlayerMove(event) {
        const index = Array.from(boxes).indexOf(event.target);
        if (!gameActive || boardState[index]) return;

        boardState[index] = currentPlayer;
        event.target.innerHTML = `<img src="${currentPlayer === 'X' ? playerXImgG : playerOImgG}" alt="${currentPlayer}">`;

        const winner = checkWinner();
        if (winner) {
            gameActive = false;
            updateScore(winner);
            displayPopup(winner === 'TIE' ? 'ROUND TIED!' : `${winner} WINS!`);
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        turnImage.src = currentPlayer === 'X' ? playerXImg : playerOImg;

        if (isCPU && currentPlayer === 'O') {
            disableBoard();
            setTimeout(cpuMove, 500);
        }
    }

    function updateScore(winner) {
        if (winner === 'X') {
            xWins++;
            scoreX.textContent = xWins;
        } else if (winner === 'O') {
            oWins++;
            scoreO.textContent = oWins;
        } else if (winner === 'TIE') {
            ties++;
            scoreTie.textContent = ties;
        }
    }

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

        document.querySelector('.cancelBtn').addEventListener('click', () => window.location.href = 'index.html');
        document.querySelector('.restartBtn').addEventListener('click', () => {
            document.querySelector('.overlay').remove();
            startGame();
        });
    });

    function resetScores() {
        xWins = 0;
        oWins = 0;
        ties = 0;
        scoreX.textContent = xWins;
        scoreO.textContent = oWins;
        scoreTie.textContent = ties;
    }

    turnImage.src = currentPlayer === 'X' ? playerXImg : playerOImg;
});
