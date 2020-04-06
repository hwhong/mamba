const SIZE = 24;
const ROW_TEMPLATE = '<input type="checkbox"/>'.repeat(SIZE);
const forbiddenInputPair = {
  37: 39,
  38: 40,
  40: 38,
  39: 37
};

let game = document.getElementById("game");
let canvas = document.getElementById("game-canvas");

let rows;
let lastInput;

let yCoordinate = 0;
let xCoordinate = 1;

let snake;
let head = { yCoordinate: 12, xCoordinate: 12 };
let currentLength = 5;

let xRing = 5;
let yRing = 5;

document.onkeydown = event => {
  if (forbiddenInputPair[event.keyCode] !== lastInput)
    switch (event.keyCode) {
      // left arrow
      case 37:
        yCoordinate = 0;
        xCoordinate = -1;
        lastInput = 37;
        break;
      case 38:
        // up arrow
        yCoordinate = 1;
        xCoordinate = 0;
        lastInput = 38;
        break;
      case 39:
        // right arrow
        yCoordinate = 0;
        xCoordinate = 1;
        lastInput = 39;
        break;
      case 40:
        // down arrow
        yCoordinate = -1;
        xCoordinate = 0;
        lastInput = 40;
        break;
    }
};

setInterval(paint, 1000 / 15);
buildCanvas();

function buildCanvas() {
  rows = [];
  snake = [head];
  canvas.innerHTML = "";

  for (let i = 0; i < SIZE; i++) {
    let row = document.createElement("div");
    row.className = "row";
    row.innerHTML = ROW_TEMPLATE;
    canvas.appendChild(row);

    // creates a new, shallow-copied Array instance from an array-like or iterable object.
    rows.unshift(Array.from(row.childNodes));
  }
}

function step() {
  // handle user direction inputs
  head.yCoordinate += yCoordinate;
  head.xCoordinate += xCoordinate;

  // handle out of bound
  if (head.yCoordinate < 0) {
    head.yCoordinate = SIZE - 1;
  }
  if (head.yCoordinate > SIZE - 1) {
    head.yCoordinate = 0;
  }
  if (head.xCoordinate < 0) {
    head.xCoordinate = SIZE - 1;
  }
  if (head.xCoordinate > SIZE - 1) {
    head.xCoordinate = 0;
  }

  // end game if snake eats itself
  if (
    snake.some(
      segment =>
        head.xCoordinate === segment.xCoordinate &&
        head.yCoordinate === segment.yCoordinate
    ) &&
    currentLength > 5
  ) {
    reset();
  }

  // move the snake
  snake.push({ yCoordinate: head.yCoordinate, xCoordinate: head.xCoordinate });
  while (snake.length > currentLength) {
    snake.shift();
  }

  // check if snake head is at ring
  if (head.yCoordinate === xRing && head.xCoordinate === yRing) {
    xRing = Math.floor(Math.random() * SIZE);
    yRing = Math.floor(Math.random() * SIZE);
    rows[xRing][yRing].checked = true;
    currentLength++;
  }
}

function reset() {
  alert("Game Over");
  head = { yCoordinate: 12, xCoordinate: 12 };
  snake = [head];
  currentLength = 5;
}

function paint() {
  step();
  selectSnakeSegments();
  rows[xRing][yRing].checked = true;
}

function selectSnakeSegments() {
  // row then column
  rows.forEach((row, j) => {
    row.forEach((box, i) => {
      box.checked = snake.some(
        segment => segment.yCoordinate === j && segment.xCoordinate === i
      );
    });
  });
}
