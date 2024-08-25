let score = 0;
let highScore = 0;
let cross = true;
let gameOver = false;
let gameStarted = false; // Flag to check if the game has started
let start = new Audio("music.mp3");
let over = new Audio("gameover.mp3");

document.onkeydown = function (e) {
    if (gameStarted && !gameOver) {  // Only allow movement if the game is started and not over
        console.log("Key code is: ", e.keyCode)
        if (e.keyCode == 38 || e.keyCode == 87) {
            dino = document.querySelector('.dino');
            dino.classList.add('animateDino');
            setTimeout(() => {
                dino.classList.remove('animateDino')
            }, 700);
        }
        if (e.keyCode == 39 || e.keyCode == 68) {
            dino = document.querySelector('.dino');
            dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
            dino.style.left = dinoX + 112 + "px";
        }
        if (e.keyCode == 37 || e.keyCode == 65) {
            dino = document.querySelector('.dino');
            dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
            dino.style.left = (dinoX - 112) + "px";
        }
    }
}

setInterval(() => {
    if (gameStarted && !gameOver) {  // Only check for collisions and update the score if the game is started and not over
        const dino = document.querySelector('.dino');
        const gameover = document.querySelector('.gameover');
        const dragon = document.querySelector('.dragon');

        const dix = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        const diy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));
        const drx = parseInt(window.getComputedStyle(dragon, null).getPropertyValue('left'));
        const dry = parseInt(window.getComputedStyle(dragon, null).getPropertyValue('top'));

        const offsetX = Math.abs(dix - drx);
        const offsetY = Math.abs(diy - dry);

        if (offsetX < 75 && offsetY < 55) {  // Collision detected
            dragon.classList.remove('obstacleAnimation');
            gameOver = true;  // Set the game over flag to true to stop further scoring
            if(score > highScore){
                setTimeout(()=>{
                    // gameover.style.visibility = 'visible';
                    congo.style.visibility = 'hidden';
                },1500)
            }
            gameover.style.visibility = 'visible';
            over.currentTime = 0;
            over.play();
            start.pause();
            showRestartButton();  // Show the restart button when game is over
        } else if (offsetX < 50 && cross) {
            score += 1;
            updateScore(score);
            cross = false;
            setTimeout(() => {
                cross = true;
            }, 1000);
        }
    }
}, 10);

function updateScore(score) {
    const scoreCont = document.querySelector('.scoreCont');
    scoreCont.innerHTML = "Your Score: " + score;
}

function startGame() {
    over.pause();
    start.play();
    gameStarted = true;
    gameOver = false;
    score = 0;
    updateScore(score);
    
    const dino = document.querySelector('.dino');
    const dragon = document.querySelector('.dragon');
    const gameover = document.querySelector('.gameover');
    const playButton = document.getElementById('playButton');
    const restartButton = document.getElementById('restartButton');
    
    dino.style.display = 'block';
    dragon.style.display = 'block';
    gameover.style.visibility = 'hidden';
    dragon.classList.add('obstacleAnimation');
    
    playButton.style.display = 'none'; // Hide the play button after starting the game
    restartButton.style.display = 'none'; // Hide the restart button after starting the game
}

function showRestartButton() {
    if(score > highScore){
        congo = document.querySelector('.congo');
        congo.style.visibility = 'visible';
        congo.style.animation = 'congoAnimation 1.5s ease-in-out forwards';
        highScore = score;
    }
    let newHighScore = document.querySelector('.highScore');
    newHighScore.innerHTML = "High Score : " + highScore;
    const restartButton = document.getElementById('restartButton');
    restartButton.style.display = 'block'; // Show the restart button when the game is over
}

function restartGame() {
    start.currentTime = 0;
    start.play();
    over.pause();
    gameOver = false;
    score = 0;
    updateScore(score);
    
    const dino = document.querySelector('.dino');
    const dragon = document.querySelector('.dragon');
    const gameover = document.querySelector('.gameover');
    const restartButton = document.getElementById('restartButton');
    
    dino.style.left = '10vw'; // Reset dino position
    dragon.style.right = '-10vw'; // Reset dragon position
    dragon.classList.add('obstacleAnimation'); // Restart dragon animation
    
    // congo.style.visibility = 'hidden'
    gameover.style.visibility = 'hidden';
    restartButton.style.display = 'none'; // Hide the restart button after the game is restarted
}
