const canvas = document.getElementById('snake');
const ctx = canvas.getContext('2d');
let newImage = new Image();
newImage.src = 'https://replit-docs-images.util.repl.co/images/tutorials/21-snake-kaboom/background.png';
let newApple = new Image();
newApple.src = 'https://preview.redd.it/bxcbiiu1wxa71.png?auto=webp&s=709c4efa8fc567e9f16aeda1008ccd5b700c3052';

class SnakePart{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }
}

let speed = 7;

let tileCount = 20;
let tileSize = canvas.width/tileCount - 2;
let  headX = 10;
let  headY = 10;
const snakeParts = [];
let tailLength = 2;

let appleX = 5;
let appleY = 5;

let xVelocity = 0;
let yVelocity = 0;

let score = 0;

function drawGame(){
    changeSnakePosition();
    let gameOver = isGameOver(); 
    if (gameOver){
        ctx.fillStyle = "red";
        ctx.font = "60px Fantasy"
        ctx.fillText("Game Over", canvas.width -330, 220);
        return;
    }
    clearScreen();
    checkAppleCollision();
    drawApple();
    drawSnake();
    drawscore();
    setTimeout(drawGame, 500/speed)
}

function isGameOver(){
    let gameOv = false;

    if(yVelocity === 0 && xVelocity === 0){
        return false;
    }

    if(headX < 0||headX>=20){
        gameOv = true;
    }
    
    if (headY< 0||headY>=20){
        gameOv = true;
    }
 
    for (let x=0;x<snakeParts.length;x++){
        let part = snakeParts[x];
        if(part.x === headX && part.y === headY)
        {
            gameOv = true;
            break;
        }
    }
    return gameOv;
}

function drawscore(){
    ctx.fillStyle = "white";
    ctx.font = "15px Fantasy"
    ctx.fillText("Score: " + score, canvas.width - 60, 18);
}

function clearScreen(){
    ctx.drawImage(newImage, 0, 0, 400, 400);
}

function drawSnake(){
    
    ctx.fillStyle = 'yellow';
    for (let i =0;i<snakeParts.length;i++){
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }

    snakeParts.push(new SnakePart(headX, headY));
    if(snakeParts.length > tailLength){
        snakeParts.shift();
    }
    ctx.fillStyle = 'darkred';
    ctx.fillRect(headX * tileCount, headY * tileCount,tileSize, tileSize);
}

function changeSnakePosition(){
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

function drawApple(){
    ctx.drawImage(newApple,appleX*tileCount, appleY*tileCount, tileSize+5, tileSize+5);

}

function checkAppleCollision(){
    if (appleX== headX && appleY == headY)
    {
        appleX = Math.floor(Math.random()*tileCount);
        appleY = Math.floor(Math.random()*tileCount);
        tailLength++;
        score++;
    }
}

document.body.addEventListener('keydown', keyDown);

function keyDown(event){
    if(event.keyCode==38){ //up
        if(yVelocity==1)
            return;
        yVelocity = -1;
        xVelocity = 0;
    }
    if(event.keyCode==40){ //down
        if(yVelocity==-1)
            return;
        yVelocity = 1;
        xVelocity = 0;
    }
    if(event.keyCode==37){ //left
        if(xVelocity==1)
            return;
        yVelocity = 0;
        xVelocity = -1;
    }
    if(event.keyCode==39){ //right
        if(xVelocity==-1)
            return;
        yVelocity = 0;
        xVelocity = 1;
    }
    
}

drawGame();