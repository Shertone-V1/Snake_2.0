class Snake {
    constructor(ctx, x, y, size = 20, color = "lime", borderWidth = 6) {
        this.ctx = ctx;
        this.size = size;
        this.color = color;
        this.borderWidth = borderWidth;
        this.body = [{ x, y }];
    }

    draw() {
        this.ctx.lineWidth = this.borderWidth;
        this.ctx.strokeStyle = this.color;
        
        this.body.forEach(segment => {
            this.ctx.beginPath();
            this.ctx.rect(segment.x, segment.y, this.size, this.size);
            this.ctx.stroke();
        });
    }

    clear() {
        this.ctx.clearRect(0, 0, 1000, 500);
    }

    move(direction) {
        let head = { ...this.body[0] };

        switch (direction) {
            case 1: head.y -= this.size; break;
            case 2: head.y += this.size; break;
            case 3: head.x -= this.size; break;
            case 4: head.x += this.size; break;
        }

        this.body.unshift(head);

        if (!window.canvasInterop.ateFood) {
            this.body.pop();
        } else {
            window.canvasInterop.ateFood = false;
        }

        this.clear();
        this.draw();
    }

    checkSelfCollision() {
        let head = this.body[0];
        for (let i = 1; i < this.body.length; i++) {
            if (this.body[i].x === head.x && this.body[i].y === head.y) {
                return true;
            }
        }
        return false;
    }
}

class Food {
    constructor(ctx, x, y, size = 7, color = "green", borderWidth = 3) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.borderWidth = borderWidth;
    }
    
    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
}

window.canvasInterop = {
    snake: null,
    food: null,
    foodX: 500,
    foodY: 210,
    score: 0,
    ateFood: false,

    setupCanvas: function () {
        let canvas = document.getElementById("mainCanvas");
        let ctx = canvas.getContext("2d");
        canvas.width = 1000;
        canvas.height = 500;

        window.canvasInterop.snake = new Snake(ctx, 490, 240);
        window.canvasInterop.snake.draw();

        window.canvasInterop.food = new Food(ctx, window.canvasInterop.foodX, window.canvasInterop.foodY);
        window.canvasInterop.food.draw();
    },

    restartGame: function () {
        let canvas = document.getElementById("mainCanvas");
        let ctx = canvas.getContext("2d");

        window.canvasInterop.score = 0;
        document.getElementById("scoreLabel").innerHTML = "Score: " + 0;

        ctx.clearRect(0, 0, 1000, 500);
        window.canvasInterop.snake = new Snake(ctx, 490, 240, 20);
        window.canvasInterop.snake.draw();

        window.canvasInterop.food = new Food(ctx, window.canvasInterop.foodX, window.canvasInterop.foodY);
        window.canvasInterop.food.draw();

        if (window.canvasInterop.gameLoop) {
            clearInterval(window.canvasInterop.gameLoop);
            window.canvasInterop.gameLoop = null;
        }
        window.canvasInterop.gamePause = true;
        window.canvasInterop.direction = 1;
        window.canvasInterop.lastDirection = 1;
    },

    checkFood: function () {
        let head = window.canvasInterop.snake.body[0];

        if (head.x + 10 === window.canvasInterop.foodX && head.y + 10 === window.canvasInterop.foodY) {
            window.canvasInterop.ateFood = true;
            window.canvasInterop.score++;
            document.getElementById("scoreLabel").innerHTML = "Score: " + window.canvasInterop.score;

            let possibleX = [];
            let possibleY = [];
            for (let x = 10; x <= 970; x += 20) {
                possibleX.push(x);
            }
            for (let y = 30; y <= 480; y += 20) {
                possibleY.push(y);
            }

            window.canvasInterop.foodX = possibleX[Math.floor(Math.random() * possibleX.length)] + 10;
            window.canvasInterop.foodY = possibleY[Math.floor(Math.random() * possibleY.length)];

            let canvas = document.getElementById("mainCanvas");
            let ctx = canvas.getContext("2d");
            window.canvasInterop.food = new Food(ctx, window.canvasInterop.foodX, window.canvasInterop.foodY);
        }
        window.canvasInterop.food.draw();
    },

    moveSnake: function () {
        let head = window.canvasInterop.snake.body[0];
        if ((window.canvasInterop.direction === 1 && head.y >= 30) ||
            (window.canvasInterop.direction === 2 && head.y <= 450) ||
            (window.canvasInterop.direction === 3 && head.x >= 30) ||
            (window.canvasInterop.direction === 4 && head.x <= 950)) {
            
            window.canvasInterop.snake.move(window.canvasInterop.direction);
            window.canvasInterop.checkFood();
            if (window.canvasInterop.snake.checkSelfCollision()) {
                clearInterval(window.canvasInterop.gameLoop);
                console.log("Game Over");
                document.getElementById("infoLabel").innerHTML = "Game Over";
                window.canvasInterop.restartGame();
            }
        }else
        {
            clearInterval(window.canvasInterop.gameLoop);
            console.log("Game Over");
            document.getElementById("infoLabel").innerHTML = "Game Over";
            window.canvasInterop.restartGame();
        }
    },



    registerKeyPressHandler: function () {
        window.canvasInterop.gameLoop = null;
        window.canvasInterop.gamePause = true;
        window.canvasInterop.direction = 0;
        window.canvasInterop.lastDirection = 0;

        document.addEventListener("keydown", function (event) {
            if (event.key.startsWith("Arrow") || event.key === " ") {
                switch (event.key) {
                    case "ArrowUp": if (window.canvasInterop.lastDirection !== 2) { window.canvasInterop.direction = 1; window.canvasInterop.lastDirection = 1; } break;
                    case "ArrowDown": if (window.canvasInterop.lastDirection !== 1) { window.canvasInterop.direction = 2; window.canvasInterop.lastDirection = 2; } break;
                    case "ArrowLeft": if (window.canvasInterop.lastDirection !== 4) { window.canvasInterop.direction = 3; window.canvasInterop.lastDirection = 3; } break;
                    case "ArrowRight": if (window.canvasInterop.lastDirection !== 3) { window.canvasInterop.direction = 4; window.canvasInterop.lastDirection = 4; } break;
                    case " ":
                        if (window.canvasInterop.gamePause) {
                            window.canvasInterop.gameLoop = setInterval(window.canvasInterop.moveSnake, 200);
                            window.canvasInterop.gamePause = false;
                            document.getElementById("infoLabel").innerHTML = "PLAYING";
                        } else {
                            clearInterval(window.canvasInterop.gameLoop);
                            window.canvasInterop.gameLoop = null;
                            window.canvasInterop.gamePause = true;
                            document.getElementById("infoLabel").innerHTML = "PAUSED";
                        }
                        return;
                }

                if (window.canvasInterop.gamePause) {
                    window.canvasInterop.gameLoop = setInterval(window.canvasInterop.moveSnake, 200);
                    window.canvasInterop.gamePause = false;
                    document.getElementById("infoLabel").innerHTML = "PLAYING";
                }
            }
        });
    }
};
