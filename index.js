const COLUMNS = 18;
const ROW_TEMPLATE = '<input type="checkbox"/>'.repeat(COLUMNS);

const easy = {
  currentScore: 0,
  currentRow: 1,
  currentMultiplier: 1,

  // time in ms to swing pendulum from side to the other
  currentSpeed: 1000,

  // initial width of the pendulum
  currentWidth: 6
};

const hard = {
  ...easy,
  currentMultiplier: 3,
  currentSpeed: 600,
  currentWidth: 4
};

let currentSettings = easy;

let game = document.getElementById("game");
let canvas = document.getElementById("game-canvas");
let status = document.getElementById("game-status");
let score = document.getElementById("game-score");
let modeButton = document.getElementById("mode");
let restartButton = document.getElementById("restart");

let rows;
let rowHeight;
let state;

let startTime;

let xCoordinate = 0;
let yCoordinate = 0;

let snake;
let head = { xCoordinate: 5, yCoordinate: 5 };
let tail = 5;

// window.onresize = resize;
// restartButton.onmousedown = reset;
// modeButton.onmousedown = toggleMode;
document.onkeydown = event => {
  switch (event.keyCode) {
    // left arrow
    case 37:
      xCoordinate = 0;
      yCoordinate = -1;
      break;
    case 38:
      // up arrow
      xCoordinate = 1;
      yCoordinate = 0;
      break;
    case 39:
      // right arrow
      xCoordinate = 0;
      yCoordinate = 1;
      break;
    case 40:
      // down arrow
      xCoordinate = -1;
      yCoordinate = 0;
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
// reset();
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

// function reset() {
//   setState("playing");

//   // rows.forEach(row => row.forEach(box => (box.checked = false)));

//   startTime = Date.now();

//   ({
//     currentRow,
//     currentSpeed,
//     currentWidth,
//     currentScore,
//     currentMultiplier
//   } = currentSettings);

//   selectSnakeSegments();

//   score.innerHTML = "score <em>" + currentScore + "</em>";
// }

// function resize() {
//   if (build()) reset();
// }

// function click(event) {
//   if (!event.type.startsWith("key") && event.target.matches("a, button"))
//     return;

//   event.preventDefault();

//   if (state === "playing") {
//     step();
//   } else {
//     reset();
//   }
// }

// function setState(value) {
//   state = value;

//   if (state === "playing") status.textContent = "press space or tap";
//   else if (state === "won") status.textContent = "🏅you rock ✌️🦄";
//   else if (state === "lost") status.textContent = "checkmate 💥";
// }

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
  head.xCoordinate += xCoordinate;
  head.yCoordinate += yCoordinate;

  let rowLength = row[0].length;

  if (head.xCoordinate < 0) {
    head.xCoordinate = rowLength - 1;
  }
  if (head.xCoordinate > rowLength - 1) {
    head.xCoordinate = 0;
  }
  if (head.yCoordinate < 0) {
    head.yCoordinate = rowHeight - 1;
  }
  if (head.yCoordinate > rowsLength - 1) {
    head.yCoordinate = 0;
  }

  snake.push({ xCoordinate: head.xCoordinate, yCoordinate: head.yCoordinate });
  while (snake.length > tail) {
    snake.shift();
  }

  // check if snake head is at food
}

function paint() {
  selectSnakeSegments();
  requestAnimationFrame(paint, 1 / 60);
}

function selectSnakeSegments() {
  // row then column
  rows.forEach((row, i) => {
    row.forEach((box, j) => {
      box.checked = snake.some(
        segment => segment.xCoordinate === i && segment.yCoordinate === j
      );
    });
  });
}
