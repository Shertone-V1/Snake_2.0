class Snake {
    constructor(ctx, x, y, size = 20, color = "lime", borderWidth = 6) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.borderWidth = borderWidth;
    }
    draw() {
        this.ctx.beginPath();
        this.ctx.lineWidth = this.borderWidth;
        this.ctx.strokeStyle = this.color;
        this.ctx.rect(this.x, this.y, this.size, this.size);
        this.ctx.stroke();
    }
    moveUp() {
        this.y -= this.size;
        this.ctx.clearRect(0, 0, 1000, 500);
        this.draw();
    }
    moveDown() {
        this.y += this.size;
        this.ctx.clearRect(0, 0, 1000, 500);
        this.draw();
    }
    moveLeft() {
        this.x -= this.size;
        this.ctx.clearRect(0, 0, 1000, 500);
        this.draw();
    }
    moveRight() {
        this.x += this.size;
        this.ctx.clearRect(0, 0, 1000, 500);
        this.draw();
    }
}

window.canvasInterop = {

    snake: null,

    setupCanvas: function () {
        // SETUP RESOLUTION
        let canvas = document.getElementById("mainCanvas");
        let ctx = canvas.getContext("2d");
        let canvasWidth = 1000;
        let canvasHeight = 500;
        
        canvas.width = canvasWidth; 
        canvas.height = canvasHeight;

        // SETUP SNAKE HEAD
        window.canvasInterop.snake = new Snake(ctx, 490, 240, 20);
        window.canvasInterop.snake.draw();
    },

    restartGame: function () {
        let canvas = document.getElementById("mainCanvas");
        let ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, 1000, 500);
        window.canvasInterop.snake = new Snake(ctx, 490, 240, 20);
        window.canvasInterop.snake.draw();

        if (window.canvasInterop.gameLoop) {
            clearInterval(window.canvasInterop.gameLoop);
            window.canvasInterop.gameLoop = null;
        }
        window.canvasInterop.gamePause = true;
        window.canvasInterop.direction = 1;
        window.canvasInterop.lastDirection = 1;
    },

    registerKeyPressHandler: function () {
        window.canvasInterop.gameLoop = null;
        window.canvasInterop.gamePause = true;
        window.canvasInterop.direction = 0;
        window.canvasInterop.lastDirection = 0;

        document.addEventListener("keydown", function (event) {
            if (event.key.startsWith("Arrow") || event.key === " ") {

                switch (event.key) {
                    case "ArrowUp":
                        if (window.canvasInterop.lastDirection !== 2) window.canvasInterop.direction = 1;
                        break;
                    case "ArrowDown":
                        if (window.canvasInterop.lastDirection !== 1) window.canvasInterop.direction = 2;
                        break;
                    case "ArrowLeft":
                        if (window.canvasInterop.lastDirection !== 4) window.canvasInterop.direction = 3;
                        break;
                    case "ArrowRight":
                        if (window.canvasInterop.lastDirection !== 3) window.canvasInterop.direction = 4;
                        break;
                    case " ":
                        if (window.canvasInterop.gamePause) {
                            window.canvasInterop.gameLoop = setInterval(moveSnake, 200);
                            window.canvasInterop.gamePause = false;
                            console.log("Game PLAYING");
                            document.getElementById("infoLabel").innerHTML = "PLAYING";
                        } else {
                            clearInterval(window.canvasInterop.gameLoop);
                            window.canvasInterop.gameLoop = null;
                            window.canvasInterop.gamePause = true;
                            console.log("Game PAUSED");
                            document.getElementById("infoLabel").innerHTML = "PAUSED";
                        }
                        return;
                }

                if (window.canvasInterop.gamePause) {
                    window.canvasInterop.gameLoop = setInterval(moveSnake, 200);
                    window.canvasInterop.gamePause = false;
                    console.log("Game PLAYING");
                    document.getElementById("infoLabel").innerHTML = "PLAYING";
                }
            }

            function moveSnake() {
                if (window.canvasInterop.direction === 1 && window.canvasInterop.snake.y >= 25) {
                    window.canvasInterop.snake.moveUp();
                } else if (window.canvasInterop.direction === 2 && window.canvasInterop.snake.y <= 450) {
                    window.canvasInterop.snake.moveDown();
                } else if (window.canvasInterop.direction === 3 && window.canvasInterop.snake.x >= 25) {
                    window.canvasInterop.snake.moveLeft();
                } else if (window.canvasInterop.direction === 4 && window.canvasInterop.snake.x <= 950) {
                    window.canvasInterop.snake.moveRight();
                } else {
                    clearInterval(window.canvasInterop.gameLoop);
                    window.canvasInterop.gameLoop = null;
                    window.canvasInterop.direction = 0;
                    window.canvasInterop.lastDirection = 0;
                    console.log("Game Over");
                    document.getElementById("infoLabel").innerHTML = "Game Over";
                    window.canvasInterop.restartGame();
                }
                window.canvasInterop.lastDirection = window.canvasInterop.direction;
            }
        });
    }
};