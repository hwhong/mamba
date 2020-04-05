const SIZE = 18;
const ROW_TEMPLATE = '<input type="checkbox"/>'.repeat(SIZE);

let game = document.getElementById("game");
let canvas = document.getElementById("game-canvas");
let status = document.getElementById("game-status");
let score = document.getElementById("game-score");
let modeButton = document.getElementById("mode");
let restartButton = document.getElementById("restart");

let rows;

let yCoordinate = 0;
let xCoordinate = 0;

let snake;
let head = { yCoordinate: 5, xCoordinate: 5 };
let currentLength = 5;

let xRing;
let yRing;

// window.onresize = resize;
// restartButton.onmousedown = reset;
// modeButton.onmousedown = toggleMode;
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
  step();
};

// if ("ontouchstart" in window) {
//   window.ontouchstart = click;
// } else {
//   window.onmousedown = click;
// }

build();
paint();

function build() {
  let canvasHeight = canvas.offsetHeight;

  rows = [];
  snake = [head];
  canvas.innerHTML = "";

  let firstRow = generateRow();
  rowHeight = firstRow.offsetHeight;

  Array(Math.floor(canvasHeight / rowHeight) - 2)
    .fill()
    .map(generateRow);

  return true;
}

function generateRow() {
  let row = document.createElement("div");
  row.className = "row";
  row.innerHTML = ROW_TEMPLATE;
  canvas.appendChild(row);

  // creates a new, shallow-copied Array instance from an array-like or iterable object.
  rows.unshift(Array.from(row.childNodes));

  return row;
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
    // removes the first element in the array
    snake.shift();
  }

  // check if snake head is at ring
  if (head.xCoordinate === xRing && head.yCoordinate === yRing) {
    currentLength++;
    removeRing();
  }
}

function paint() {
  selectSnakeSegments();
  requestAnimationFrame(paint, 1 / 60);
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

function setRing() {
  rows[xRing][yRing].checked = true;
}

function removeRing() {
  rows[xRing][yRing].checked = true;
}
