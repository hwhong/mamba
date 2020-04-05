const SIZE = 24;
const ROW_TEMPLATE = '<input type="checkbox"/>'.repeat(SIZE);

let game = document.getElementById("game");
let canvas = document.getElementById("game-canvas");

let rows;

let yCoordinate = 0;
let xCoordinate = 0;

let snake;
let head = { yCoordinate: 12, xCoordinate: 12 };
let currentLength = 5;

let xRing = 5;
let yRing = 5;

document.onkeydown = event => {
  switch (event.keyCode) {
    // left arrow
    case 37:
      yCoordinate = 0;
      xCoordinate = -1;
      break;
    case 38:
      // up arrow
      yCoordinate = 1;
      xCoordinate = 0;
      break;
    case 39:
      // right arrow
      yCoordinate = 0;
      xCoordinate = 1;
      break;
    case 40:
      // down arrow
      yCoordinate = -1;
      xCoordinate = 0;
      break;
  }
};

setInterval(paint, 1000 / 15);
build();

function build() {
  rows = [];
  snake = [head];
  canvas.innerHTML = "";

  for (let i = 0; i < 24; i++) {
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

  // move the snake
  snake.push({ yCoordinate: head.yCoordinate, xCoordinate: head.xCoordinate });
  while (snake.length > currentLength) {
    snake.shift();
  }

  // check if snake head is at ring
  if (head.xCoordinate === xRing && head.yCoordinate === yRing) {
    xRing = Math.floor(Math.random() * SIZE);
    yRing = Math.floor(Math.random() * SIZE);
    rows[xRing][yRing].checked = true;
    currentLength++;
  }
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
