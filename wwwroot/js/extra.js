// STORING old code blocks that might be useful later


// let topBoder = 25;
//         let bottomBorder = 450;
//         let leftBorder = 25;
//         let rightBorder = 950;


// if (event.key.startsWith("ArrowUp")) {
//     if (window.canvasInterop.snake.y >= topBoder) {
//         window.canvasInterop.snake.moveUp();
//     }
// }
// if (event.key.startsWith("ArrowDown")) {
//     if (window.canvasInterop.snake.y <=  bottomBorder) {
//         window.canvasInterop.snake.moveDown();
//     }
// }
// if (event.key.startsWith("ArrowLeft")) {
//     if (window.canvasInterop.snake.x >=  leftBorder) {
//         window.canvasInterop.snake.moveLeft();
//     }
// }
// if (event.key.startsWith("ArrowRight")) {
//     if (window.canvasInterop.snake.x <=  rightBorder) {
//         window.canvasInterop.snake.moveRight();
//     }
// }




// 

// runCheck: function () {
//         console.log("Checking");
//     }


// for (let i = 0; i < 1000; i++) {
//     window.canvasInterop.foodX = possibleX[Math.floor(Math.random() * possibleX.length)] + 10;
//     window.canvasInterop.foodY = possibleY[Math.floor(Math.random() * possibleY.length)];
//     let food = new Food(ctx, window.canvasInterop.foodX, window.canvasInterop.foodY);
//     food.draw();
// }




//______________________________________________________________________________________________________________________________________________________________________________________





// class Snake {
//     constructor(ctx, x, y, size = 20, color = "lime", borderWidth = 6) {
//         this.ctx = ctx;
//         this.x = x;
//         this.y = y;
//         this.size = size;
//         this.color = color;
//         this.borderWidth = borderWidth;
//     }
//     draw() {
//         this.ctx.beginPath();
//         this.ctx.lineWidth = this.borderWidth;
//         this.ctx.strokeStyle = this.color;
//         this.ctx.rect(this.x, this.y, this.size, this.size);
//         this.ctx.stroke();
//     }
//     clear(){
//         this.ctx.clearRect(0, 0, 1000, 500);
//     }
//     moveUp() {
//         this.y -= this.size;
//         this.clear();
//         this.draw();
//     }
//     moveDown() {
//         this.y += this.size;
//         this.clear();
//         this.draw();
//     }
//     moveLeft() {
//         this.x -= this.size;
//         this.clear();
//         this.draw();
//     }
//     moveRight() {
//         this.x += this.size;
//         this.clear();
//         this.draw();
//     }
// }
// class Food{
//     constructor(ctx, x, y, size = 7, color = "green", borderWidth = 3) {
//         this.ctx = ctx;
//         this.x = x;
//         this.y = y;
//         this.size = size;
//         this.color = color;
//         this.borderWidth = borderWidth;
//     }
//     draw() {
//         this.ctx.beginPath();
//         this.ctx.arc(this.x, this.y, this.size, 0, this.size * Math.PI);
//         this.ctx.fillStyle = this.color;
//         this.ctx.fill();
//     }
// }

// window.canvasInterop = {

//     snake: null,
//     food: null,
//     foodX: 500,  
//     foodY: 210,
//     score: 0,

//     setupCanvas: function () {
//         // SETUP RESOLUTION
//         let canvas = document.getElementById("mainCanvas");
//         let ctx = canvas.getContext("2d");
//         let canvasWidth = 1000;
//         let canvasHeight = 500;
        
//         canvas.width = canvasWidth; 
//         canvas.height = canvasHeight;

//         // SETUP SNAKE HEAD
//         window.canvasInterop.snake = new Snake(ctx, 490, 240);
//         window.canvasInterop.snake.draw();

//         // SETUP FOOD
//         window.canvasInterop.food = new Food(ctx, window.canvasInterop.foodX, window.canvasInterop.foodY);
//         window.canvasInterop.food.draw();
//     },

//     restartGame: function () {
//         let canvas = document.getElementById("mainCanvas");
//         let ctx = canvas.getContext("2d");

//         window.canvasInterop.score = 0;
//         document.getElementById("scoreLabel").innerHTML = "Score: " + 0;

//         ctx.clearRect(0, 0, 1000, 500);
//         window.canvasInterop.snake = new Snake(ctx, 490, 240, 20);
//         window.canvasInterop.snake.draw();

//         window.canvasInterop.food = new Food(ctx, window.canvasInterop.foodX, window.canvasInterop.foodY);
//         window.canvasInterop.food.draw();

//         if (window.canvasInterop.gameLoop) {
//             clearInterval(window.canvasInterop.gameLoop);
//             window.canvasInterop.gameLoop = null;
//         }
//         window.canvasInterop.gamePause = true;
//         window.canvasInterop.direction = 1;
//         window.canvasInterop.lastDirection = 1;
//     },

//      checkFood: function() {
//         let canvas = document.getElementById("mainCanvas");
//         let ctx = canvas.getContext("2d");

//         let possibleX = [];
//         let possibleY = [];
//         for (let x = 10; x <= 970; x += 20) {
//             possibleX.push(x);
//         }
//         for (let y = 30; y <= 480; y += 20) {
//             possibleY.push(y);
//         }

//         if (window.canvasInterop.snake.x+10 === window.canvasInterop.foodX && window.canvasInterop.snake.y+10 === window.canvasInterop.foodY) {

//             window.canvasInterop.foodX = possibleX[Math.floor(Math.random() * possibleX.length)] + 10;
//             window.canvasInterop.foodY = possibleY[Math.floor(Math.random() * possibleY.length)];
//             let food = new Food(ctx, window.canvasInterop.foodX, window.canvasInterop.foodY);
//             food.draw();

//             console.log("New food at: " + window.canvasInterop.foodX + ", " + window.canvasInterop.foodY);
//             window.canvasInterop.food = new Food(ctx, window.canvasInterop.foodX, window.canvasInterop.foodY);
//             window.canvasInterop.food.draw();
//             window.canvasInterop.score++;
//             document.getElementById("scoreLabel").innerHTML = "Score: " + window.canvasInterop.score;
//         }
//         else{
//             window.canvasInterop.food.draw(window.canvasInterop.foodX, window.canvasInterop.foodY);
//         }

//     },

//     registerKeyPressHandler: function () {
//         window.canvasInterop.gameLoop = null;
//         window.canvasInterop.gamePause = true;
//         window.canvasInterop.direction = 0;
//         window.canvasInterop.lastDirection = 0;

//         document.addEventListener("keydown", function (event) {
//             if (event.key.startsWith("Arrow") || event.key === " ") {

//                 switch (event.key) {
//                     case "ArrowUp":
//                         if (window.canvasInterop.lastDirection !== 2) window.canvasInterop.direction = 1;
//                         break;
//                     case "ArrowDown":
//                         if (window.canvasInterop.lastDirection !== 1) window.canvasInterop.direction = 2;
//                         break;
//                     case "ArrowLeft":
//                         if (window.canvasInterop.lastDirection !== 4) window.canvasInterop.direction = 3;
//                         break;
//                     case "ArrowRight":
//                         if (window.canvasInterop.lastDirection !== 3) window.canvasInterop.direction = 4;
//                         break;
//                     case " ":
//                         if (window.canvasInterop.gamePause) {
//                             window.canvasInterop.gameLoop = setInterval(moveSnake, 200);
//                             window.canvasInterop.gamePause = false;
//                             console.log("Game PLAYING");
//                             document.getElementById("infoLabel").innerHTML = "PLAYING";
//                         } else {
//                             clearInterval(window.canvasInterop.gameLoop);
//                             window.canvasInterop.gameLoop = null;
//                             window.canvasInterop.gamePause = true;
//                             console.log("Game PAUSED");
//                             document.getElementById("infoLabel").innerHTML = "PAUSED";
//                         }
//                         return;
//                 }

//                 if (window.canvasInterop.gamePause) {
//                     window.canvasInterop.gameLoop = setInterval(moveSnake, 200);
//                     window.canvasInterop.gamePause = false;
//                     console.log("Game PLAYING");
//                     document.getElementById("infoLabel").innerHTML = "PLAYING";
//                 }
//             }
//             function moveSnake() {
//                 if (window.canvasInterop.direction === 1 && window.canvasInterop.snake.y >= 30) {
//                     window.canvasInterop.snake.moveUp();
//                     window.canvasInterop.checkFood();
//                 } else if (window.canvasInterop.direction === 2 && window.canvasInterop.snake.y <= 450) {
//                     window.canvasInterop.snake.moveDown();
//                     window.canvasInterop.checkFood();
//                 } else if (window.canvasInterop.direction === 3 && window.canvasInterop.snake.x >= 30) {
//                     window.canvasInterop.snake.moveLeft();
//                     window.canvasInterop.checkFood();
//                 } else if (window.canvasInterop.direction === 4 && window.canvasInterop.snake.x <= 950) {
//                     window.canvasInterop.snake.moveRight();
//                     window.canvasInterop.checkFood();
//                 } else {
//                     clearInterval(window.canvasInterop.gameLoop);
//                     window.canvasInterop.gameLoop = null;
//                     window.canvasInterop.direction = 0;
//                     window.canvasInterop.lastDirection = 0;
//                     console.log("Game Over");
//                     document.getElementById("infoLabel").innerHTML = "Game Over";
//                     window.canvasInterop.restartGame();
//                 }
//                 window.canvasInterop.lastDirection = window.canvasInterop.direction;
//             console.log("Snake at: " + window.canvasInterop.snake.x + ", " + window.canvasInterop.snake.y);
//             };
            
//         }
//     );
//     }
// };





//______________________________________________________________________________________________________________________________________________________________________________________






