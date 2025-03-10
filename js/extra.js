// STORING old code blocks that might be useful later


let topBoder = 25;
        let bottomBorder = 450;
        let leftBorder = 25;
        let rightBorder = 950;


if (event.key.startsWith("ArrowUp")) {
    if (window.canvasInterop.snake.y >= topBoder) {
        window.canvasInterop.snake.moveUp();
    }
}
if (event.key.startsWith("ArrowDown")) {
    if (window.canvasInterop.snake.y <=  bottomBorder) {
        window.canvasInterop.snake.moveDown();
    }
}
if (event.key.startsWith("ArrowLeft")) {
    if (window.canvasInterop.snake.x >=  leftBorder) {
        window.canvasInterop.snake.moveLeft();
    }
}
if (event.key.startsWith("ArrowRight")) {
    if (window.canvasInterop.snake.x <=  rightBorder) {
        window.canvasInterop.snake.moveRight();
    }
}




// 

// runCheck: function () {
//         console.log("Working______________________________________________________");
//     }