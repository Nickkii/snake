const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

class SnakePart {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

let snakePart = []
let snakeLength = 2

let speed = 7
let pixelCount = 20
let pixelSize = canvas.width / pixelCount - 2

let xVelocity = 0
let yVelocity = 0

let headX = 10
let headY = 10

let appleX = 5
let appleY = 5

let score = 0


let start = document.getElementById('start')
let repeat = document.getElementById('repeat')



function drawGame() {
    changeSnakePosition()
    let result = isGameOver()
    if (result) return
    clearScreen()
    drawSnake()
    drawApple()
    appleEat()
    drawScore()
    TopDrawScore()
    level()
    var snd = new Audio('telephone.mp3');
    snd.play();
    setTimeout(drawGame, 1000 / speed)

}

function clearScreen() {
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

function drawSnake() {
    let imageSnake = new Image(20, 20);
    imageSnake.src = './snake.png';
    imageSnake.onload = function() {
        ctx.drawImage(this, headX * pixelCount, headY * pixelCount, 20, 20);
    }
    ctx.fillStyle = 'transparent'
    ctx.fillRect(headX * pixelCount, headY * pixelCount, pixelSize, pixelSize)
    ctx.fillStyle = 'green'
    snakePart.forEach(e => {
        ctx.fillRect(e.x * pixelCount, e.y * pixelCount, pixelSize, pixelSize)
    })
    snakePart.push(new SnakePart(headX, headY))
    if (snakePart.length > snakeLength) {
        snakePart.shift()
    }
}

document.body.addEventListener('keydown', keyDown)

function keyDown(e) {
    console.log(e)
    if (e.keyCode == 38) {
        if (yVelocity == 1) return
        yVelocity = -1
        xVelocity = 0
    }
    if (e.keyCode == 40) {
        if (yVelocity == -1) return
        yVelocity = 1
        xVelocity = 0
    }
    if (e.keyCode == 37) {
        if (xVelocity == 1) return
        yVelocity = 0
        xVelocity = -1
    }
    if (e.keyCode == 39) {
        if (xVelocity == -1) return
        yVelocity = 0
        xVelocity = 1
    }
}

function changeSnakePosition() {
    headX = headX + xVelocity
    headY = headY + yVelocity
}

function drawApple() {
    let imageApple = new Image(20, 20);
    imageApple.src = 'https://img.icons8.com/doodle/20/000000/apple.png';
    imageApple.onload = function() {
        ctx.drawImage(this, appleX * pixelCount, appleY * pixelCount, 20, 20);
    }
    ctx.fillStyle = 'transparent'
    ctx.fillRect(appleX * pixelCount, appleY * pixelCount, pixelSize, pixelSize)
}

function appleEat() {
    if (appleX == headX && appleY == headY) {
        appleX = Math.floor(Math.random() * pixelCount)
        appleY = Math.floor(Math.random() * pixelCount)
        snakeLength++
        score++
        eat.play()
    }
}

const eat = new Audio('audio_eat.mp3')

function isGameOver() {
    let gameOver = false
    if (yVelocity == 0 && xVelocity == 0) {
        return false
    }
    if (headX < 0 || headX == pixelCount || headY < 0 || headY == pixelCount) {
        gameOver = true
    }
    snakePart.forEach(e => {
        if (e.x == headX && e.y == headY) {
            gameOver = true
        }
    })
    if (gameOver) {
        ctx.fillStyle = 'white'
        ctx.font = '22px Arial'
        ctx.fillText('Game Over! Ваш счёт: ' + score, canvas.width / 4.4, canvas.height / 2)
        new Audio('hit.wav').play()

    }
    return gameOver

}

function level() {
    let level = 1
    ctx.fillStyle = 'white'
    if (score > 0 || score < 2) {
        ctx.fillText('Ваш уровень: ' + level, canvas.width - 380, 20)
        speed = 5
    }
    if (score > 2) {
        ctx.fillText('Ваш уровень: ' + ++level, canvas.width - 380, 20)
        speed = 10
    }
    if (score > 10) {
        ctx.fillText('Ваш уровень: ' + ++level, canvas.width - 380, 20)
        speed = 13
    }
    if (score > 18) {
        ctx.fillText('Ваш уровень: ' + ++level, canvas.width - 380, 20)
        speed = 15
    }
    if (score > 22) {
        ctx.fillText('Ваш уровень: ' + ++level, canvas.width - 380, 20)
        speed = 18
    }
}

function drawScore() {
    ctx.fillStyle = 'white'
    ctx.font = '16px Arial'
    let scoreD = ctx.fillText('Score: ' + score, canvas.width - 70, 20)
}

function TopDrawScore() {
    ctx.fillStyle = 'red'
    ctx.font = '16px Arial'
    let serialObj = JSON.stringify(score);
    localStorage.setItem("topScore", serialObj);
    let returnObj = JSON.parse(localStorage.getItem("topScore"))

    if (Number(localStorage.getItem('topScore')) > Number(score)) {} else localStorage.setItem('topScore', score)
    ctx.fillText('Top score: ' + returnObj, canvas.width - 200, 20)
}


drawGame()