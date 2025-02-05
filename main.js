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

    divX.addEventListener('click', () => {
        divX.style.backgroundColor = '#A8BFC9';
        divCercle.style.backgroundColor = 'transparent';
        imgDivX.src = "assets/Combined Shape Copy 2 black.svg";
        imgDivCercle.src = "assets/Oval Copy white.svg";
        goFirst.textContent = 'X'
    });

    divCercle.addEventListener('click', () => {
        divCercle.style.backgroundColor = '#A8BFC9';
        divX.style.backgroundColor = 'transparent';
        imgDivX.src = "assets/Combined Shape Copy 2.svg";
        imgDivCercle.src = "assets/Oval Copy.svg";
        goFirst.textContent = 'O'
    });

    cpu.addEventListener('click', () => {
        overlayST.style.display = 'none';
        overlayGame.style.display = 'block';
    });

});
