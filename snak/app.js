const gameBoard = document.getElementById('gameBoard');
const context = gameBoard.getContext('2d');
const scoreText = document.getElementById('scoreVal');
const playAgainBtn = document.getElementById('playAgainBtn');
const WIDTH = gameBoard.width;
const HEIGHT =gameBoard.height;
const UNIT = 25;
let score = 0;
let foodx;
let foody;
let active=true;
let started = false;
let isPaused = false;
let snake = [
    {x:UNIT*3,y:0},{x:UNIT*2,y:0},{x:UNIT,y:0},{x:0,y:0}
]
let xVel = 25;
let yVel = 0;
window.addEventListener('keydown',keyPress)
playAgainBtn.addEventListener('click', resetGame);

startGame();

function startGame(){
    context.fillStyle ='#212121';
    context.fillRect(0,0,WIDTH,HEIGHT)
    createFood();
    displayFood();
    drawSnake();
    // moveSnake();
    // clearBoard();
    // drawSnake();
    // nextTick();
}
function clearBoard(){
    context.fillStyle ='#212121';
    context.fillRect(0,0,WIDTH,HEIGHT)
}
function createFood(){
    foodx = Math.floor(Math.random()*WIDTH/UNIT)*UNIT;
    foody = Math.floor(Math.random()*HEIGHT/UNIT)*UNIT;

}
function displayFood(){
    context.fillStyle ='red'
    context.fillRect(foodx,foody,UNIT,UNIT)
}
function drawSnake(){
    context.fillStyle = 'aqua';
    context.strokeStyle = '#212121';
    snake.forEach((snakePart)=>{
        context.fillRect(snakePart.x,snakePart.y,UNIT,UNIT)
        context.strokeRect(snakePart.x,snakePart.y,UNIT,UNIT)
    })
}
function moveSnake(){
    const head = {x:snake[0].x+xVel,y:snake[0].y+yVel}
    snake.unshift(head)
    if(snake[0].x==foodx && snake[0].y==foody){
        score +=1;
        scoreText.textContent = score;
        createFood();
    }
    else
        snake.pop()
}

// function nextTick(){
//     if(!active || isPaused) { 
//         if(!active) {
//             clearBoard();
//             context.font = "bold 50px serif";
//             context.fillStyle = "white";
//             context.textAlign = "center";
//             context.fillText("Game Over!!", WIDTH/2, HEIGHT/2);
//         }
//         return;
//     }
    
//     setTimeout(()=>{
//         clearBoard();
//         displayFood();
//         moveSnake();
//         drawSnake();
//         checkGameOver();
//         nextTick();
//     }, 200);
// }
function keyPress(event){
    // active=true;
    if(!started){
        started=true;
        nextTick();
    }
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;
    const SPACEBAR = 32;

    if(event.keyCode === SPACEBAR) {
        isPaused = !isPaused; 
        if(!isPaused && active) { 
            nextTick(); 
        }
        return; 
    }
     if(!started && (event.keyCode === LEFT || event.keyCode === RIGHT || 
       event.keyCode === UP || event.keyCode === DOWN)) {
        started = true;
        nextTick();
    }

    if(isPaused) return; 

    switch(true){
        case(event.keyCode==LEFT  && xVel!=UNIT):
            xVel=-UNIT;
            yVel=0;
            break;
        case(event.keyCode==RIGHT && xVel!=-UNIT):
            xVel=UNIT;
            yVel=0;
            break;
        case(event.keyCode==UP && yVel!=UNIT):
            xVel=0;
            yVel=-UNIT;
            break;
        case(event.keyCode==DOWN && yVel!=-UNIT):
            xVel=0;
            yVel=UNIT;
            break;
    }
}
function checkGameOver(){
    switch(true){
        case(snake[0].x<0):
        case(snake[0].x>=WIDTH):
        case(snake[0].y<0):
        case(snake[0].y>=HEIGHT):
            active=false;
            displayGameOver();
            break;
    }
}
function displayGameOver() {
    clearBoard();
    
    // Game Over text
    context.font = "bold 50px 'Gill Sans', sans-serif";
    context.fillStyle = "white";
    context.textAlign = "center";
    context.fillText("Game Over!!", WIDTH/2, HEIGHT/2 - 30);
    
    // Position the button
    playAgainBtn.style.display = "block";
    playAgainBtn.style.left = `${gameBoard.offsetLeft + WIDTH/2}px`;
    playAgainBtn.style.top = `${gameBoard.offsetTop + HEIGHT/2 + 50}px`;
}

function resetGame() {
    // Hide the button
    playAgainBtn.style.display = "none";
    
    // Reset game state
    score = 0;
    scoreText.textContent = score;
    active = true;
    started = false;
    isPaused = false;
    snake = [
        {x:UNIT*3,y:0}, {x:UNIT*2,y:0}, {x:UNIT,y:0}, {x:0,y:0}
    ];
    xVel = 25;
    yVel = 0;
    
    // Start new game
    startGame();
}
function nextTick(){
    if(!active || isPaused) { 
        if(!active) {
            displayGameOver();
        }
        return;
    }
    
    setTimeout(()=>{
        clearBoard();
        displayFood();
        moveSnake();
        drawSnake();
        checkGameOver();
        nextTick();
    }, 200);
}