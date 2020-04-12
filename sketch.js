let board = [];
let redsTurn = true;
let gameOver = false;

//Fill up the board with values of zero
function clear2() {
  board = [];
  for (let i = 0; i < 7; i++) {
    board.push([]);
    for (let j = 0; j < 6; j++) {
      board[i].push(0)
    }
  }
  redsTurn=true;
  gameOver=false;
  loop();
}

//always starts on red's turn

function placePiece(column) {
  let i = 5;
  while (board[column][i] != 0 && i >= 0) {
    i--;
  }
  //Yellow is a value of 1 and Red is a value of 2
  if (i < 0) {
    redsTurn = !redsTurn;
  }
  else {
    board[column][i] = pieceColor();
  }
}

function updateBoard() {
  background('blue');
  for (let i = 0; i < 7; i++) {
    let ypos = 100 * (i) + 50
    for (let j = 5; j >= 0; j--) {
      let xpos = 100 * (j) + 50;

      if (board[i][j] == 0) {
        fill('white');
      }
      else if (board[i][j]==2) {
        fill('red');
      }
      else {
        fill('yellow');
      }
      circle(ypos,xpos,80);


    }

  }
  if (mouseX < 700 && mouseY < 600 && mouseY > 0) {
    fill('pink');
    triangle(floor(mouseX/100)*100,0,100*floor(mouseX/100)+100,0,100*floor(mouseX/100)+50, 10);
    triangle(floor(mouseX/100)*100,height,100*floor(mouseX/100)+100,height,100*floor(mouseX/100)+50, height-10);
  }
}

function checkWin() {
  if (checkHorizontal()) {
    return true;
  }
  else if (checkVertical()) {
    return true;
  }
  else if (checkDiagonal()) {
    return true;
  }
  else {
    return false;
  }
}

function checkHorizontal() {
  for (let j = 0; j < 6; j++) {
    for (let i = 0; i < 4; i++) {
      if (board[i][j] == pieceColor()) {
        if (board[i+1][j] == pieceColor()) {
          if (board[i+2][j] == pieceColor()) {
            if (board[i+3][j] == pieceColor()) {
              return true;
            }
          }
        }
      }
    }
  }
  return false;
}

function checkVertical() {
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 7; i++) {
      if (board[i][j] == pieceColor()) {
        if (board[i][j+1] == pieceColor()) {
          if (board[i][j+2] == pieceColor()) {
            if (board[i][j+3] == pieceColor()) {
              return true;
            }
          }
        }
      }
    }
  }
  return false;
}

function checkDiagonal() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == pieceColor()) {
        if (board[i+1][j+1] == pieceColor()) {
          if (board[i+2][j+2] == pieceColor()) {
            if (board[i+3][j+3] == pieceColor()) {
              return true;
            }
          }
        }
      }
    }
  }
  for (let i = 4; i >= 0; i--) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == pieceColor()) {
        if (board[i-1][j+1] == pieceColor()) {
          if (board[i-2][j+2] == pieceColor()) {
            if (board[i-3][j+3] == pieceColor()) {
              return true;
            }
          }
        }
      }
    }
  }
}

function pieceColor() {
  if (redsTurn) {
    return 2;
  }
  else {
    return 1;
  }
}

function mouseClicked() {
  if (mouseX < 700 && mouseY < 600 && mouseX > 0 && mouseY > 0) {
    placePiece(floor(mouseX/100));
    if (checkWin()) {
      gameOver=true;
    } else {
      redsTurn = !redsTurn;
    }
  }
}

function setup() {
  createCanvas(700, 600)
  textAlign(CENTER,CENTER);
  textSize(100);
  clear2();
  updateBoard();
}

function draw() {
  if (gameOver) {
    noLoop();
    updateBoard();
    document.getElementById('scoreboard').innerHTML = "Red Wins!";
  }
  else {
    if (redsTurn) {
      document.getElementById('scoreboard').innerHTML = "Red's Turn";
    }
    else {
      document.getElementById('scoreboard').innerHTML = "Yellow's Turn";
    }

    updateBoard();
  }
}
