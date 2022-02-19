let ballX;
let ballY;
let ballDiameter = 60;
let ballRadius = 30;
let ballXSpeed;
let ballYSpeed;

let paddleX;
let paddleY;
let paddleHeight = 20;
let paddleWidth = 200;

let gameStarted = false;
let score;
let speedMultiplier;

function setup() {
    createCanvas(windowWidth, windowHeight);
    ballX = windowWidth / 2;
    ballY = windowHeight / 2;
    paddleX = windowWidth / 2 - paddleWidth / 2;
    paddleY = windowHeight - 20 - paddleHeight;
    ballXSpeed = 0;
    ballYSpeed = 5;
    score = 0;
    speedMultiplier = 5;
}

function draw() {
    background("#222");
    fill("#bdbdbd");
    noStroke();
    ellipse(ballX, ballY, ballDiameter, ballDiameter);

    ballX += ballXSpeed;
    ballY += ballYSpeed;

    if (ballX > windowWidth - ballDiameter / 2 || ballX < ballDiameter / 2) {
        ballXSpeed *= -1;
    }
    if (ballY > windowHeight - ballDiameter / 2) {
        score = 0;
        ballYSpeed *= -1;
    }
    if (ballY < ballDiameter / 2) {
        ballYSpeed *= -1;
    }

    ballHitPaddle();

    if (gameStarted == false) {
        fill("#07C");
        textSize(50);
        textAlign(CENTER);
        text("Press Space to Start", windowWidth / 2, windowHeight / 2);

        if (keyIsDown(32)) {
            gameStarted = true;
        }
    } else {
        fill("#07C");
        textSize(40);
        text("Score: " + score, 100, 60);
        movePaddle();
    }

    fill("#07C");
    noStroke();
    rect(paddleX, paddleY, paddleWidth, paddleHeight);
}

function movePaddle() {
    if (keyIsDown(LEFT_ARROW)) {
        if (paddleX - 10 > 0) {
            paddleX -= 10;
        }
    }
    if (keyIsDown(RIGHT_ARROW)) {
        if (paddleX + 10 + paddleWidth < windowWidth) {
            paddleX += 10;
        }
    }
}

function ballHitPaddle() {
    if (
        ballX + ballRadius > paddleX &&
        ballX < paddleX + paddleWidth &&
        ballY + ballRadius > paddleY &&
        ballY < paddleY + paddleHeight
    ) {
        if (ballY + ballRadius > paddleY) {
            let diff = ballX - (paddleX + paddleWidth / 2);
            let angle = map(
                diff,
                -paddleWidth / 2,
                paddleWidth / 2,
                -radians(135),
                -radians(45)
            );
            ballXSpeed = speedMultiplier * cos(angle);
            ballYSpeed = speedMultiplier * sin(angle);
            ballY = paddleY - ballRadius;
            if (gameStarted) {
                score++;
                speedMultiplier = 5 + (score / 10) * 0.5;
            }
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
