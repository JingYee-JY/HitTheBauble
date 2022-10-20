const start = document.querySelector(".start");
const startButton = document.querySelector(".startButton");
const selection = document.querySelector(".selection");
const startGameButton = document.querySelector(".startGame");
const game = document.querySelector(".game");
const ball = document.querySelector(".ball");
const ready = document.querySelector(".ready");
const timerCount = document.querySelector(".timer-count");
const final= document.querySelector(".final");
const background = document.querySelector(".background");
const text = document.querySelector(".text");
const show = document.querySelector(".show");
const homeButton = document.querySelector(".home")
const playAgain = document.querySelector(".playAgain")

const clickSound = document.getElementById("click")
const completed = document.getElementById("completed")
const lose = document.getElementById("lose")

let startGame = false;
let time;
let touch;
let currentHit;
Lowhit = 3
Mediumhit = 3.5
fall = 2.5
leftRight = 2.5
let hitforce
let direction
let ballWidth


startButton.addEventListener("click", () => {
    //playClickSound()
    //let delay = setTimeout(() => {
        start.classList.add("hide")
        selection.classList.remove("hide")
    //}, 200);
})
startGameButton.addEventListener("click", () => {
    //playClickSound()
    //let delay = setTimeout(() => {
        selection.classList.add("hide")
        game.classList.remove("hide")
        time = 30
        timerCount.innerHTML = `${time}`;
        began()
        touch = false
    //}, 200);
})
playAgain.addEventListener("click", () => {
    //playClickSound()
    //let delay = setTimeout(() => {
        final.classList.add("hide")
        start.classList.remove("hide")
    //}, 200);
})
function began(){
    startGame = true
    spawnBall()
    beganFalling()
}

ball.addEventListener("click", () => {
    if(startGame == true && touch == false){
        //playClickSound()
        touch = true;
        hitforce = Math.random() > 0.5 ? 1 : 2
        direction = Math.random() > 0.5 ? 1 : 2
    }
})
function beganFalling(){
    if(startGame == true){
        direction = Math.random() > 0.5 ? 1 : 2
        window.requestAnimationFrame(fallingBall);
    }
}

function spawnBall(){
    let border = game.getBoundingClientRect();
    ball.y = 0
    ball.x = Math.floor(border.width /4);
    if(border.width > 768){
        ballWidth = 400
        Lowhit = 5
        Mediumhit = 5.5
        fall = 4.5
        leftRight = 4.5
    }
    if(border.width < 768){
        ballWidth = 200
        Lowhit = 3
        Mediumhit = 3.5
        fall = 2.5
        leftRight = 2.5
    }
    ball.style.width = ballWidth + "px";
    ball.style.height = (ballWidth + 50) + "px";
    ball.style.top = ball.y + 'px';
    ball.style.left = ball.x + 'px';
}

function fallingBall(){
    if(startGame){
        moveBall()
        window.requestAnimationFrame(fallingBall);
    }
}
function moveBall(){
    let border = background.getBoundingClientRect();
    if(direction == 1){
        ball.x = ball.x - leftRight
        ball.style.left = ball.x + 'px';
        if(ball.x < 0){
            direction = 2
        }
    }
    if(direction == 2){
        ball.x = ball.x + leftRight
        ball.style.left = ball.x + 'px';
        if(ball.x > Math.floor(border.width - ballWidth)){
            direction = 1
        }
    }
    if(touch == true){
        if(hitforce == 1){
            ball.y = ball.y - Lowhit
            ball.style.top = ball.y + "px"
            if(ball.y < 0){
                touch = false
            }
            return
        }    
        if(hitforce == 2){
            ball.y = ball.y - Mediumhit
            ball.style.top = ball.y + "px"
            if(ball.y < 0){
                touch = false
            }
            return
        }      
    }
    if(ball.y > border.height){
        final.style.backgroundImage = "url('./img/loseBackground.png')"
        text.src = "./img/loseText.png"
        show.src = "./img/lose.png"
        startGame = false
        game.classList.add("hide")
        final.classList.remove("hide")
        return
    }
    ball.y = ball.y + fall
    ball.style.top = ball.y + "px"
}

function updateCountDown(){
    if(startGame == true){
        timerCount.innerHTML = `${time}`;
        if(time == 0){
            startGame = false
            final.style.backgroundImage = "url('./img/winBackground.png')"
            text.src = "./img/winText.png"
            show.src = "./img/win.png"
            game.classList.add("hide")
            final.classList.remove("hide")
        }
        time--;
    }
}

setInterval(updateCountDown, 1000)

/*function playClickSound(){
    console.log(clickSound)
    clickSound.currentTime = 0
    clickSound.play()
}*/

/*prevent double tag zoom*/
document.addEventListener('dblclick', function(event) {
event.preventDefault();
}, { passive: false });