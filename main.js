document.addEventListener("DOMContentLoaded", () => {
    const retour = document.querySelector('.returnDiv');
    const cpuPlay = document.querySelector('.CPU');
    if (cpuPlay){
        cpuPlay.addEventListener('click', () => {
            window.location.href = 'games.html';
        });
    }

    if (retour) {
        retour.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }
});
