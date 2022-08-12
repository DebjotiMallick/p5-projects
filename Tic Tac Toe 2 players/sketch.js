let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

let players = ['X', 'O'];

let w, h, clickCount = 0;
let currentPlayer;
let available = [];

function setup() {
  createCanvas(400, 400);
  w = width / 3;
  h = height / 3;
  currentPlayer = floor(random(players.length));
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      available.push([i, j]);
    }
  }
}

function equals3(a, b, c) {
  return(a==b && b==c && a!='');
}

function mousePressed() {
  nextTurn();
}

function checkWinner() {
  let winner = null;
  stroke(255, 0, 0);
  strokeWeight(3);
  for (var i = 0; i < 3; i++) {
    if (equals3(board[i][0],board[i][1],board[i][2])) {
      winner = board[i][0];
      line(w/4, i*h + h/2, width-w/4, i*h + h/2);
    }
  }
  for (var i = 0; i < 3; i++) {
    if (equals3(board[0][i],board[1][i],board[2][i])) {
      winner = board[0][i];
      line(i*w + w/2, h/4, i*w + w/2, height - h/4);
    }
  }
  for (var i = 0; i < 3; i++) {
    if (equals3(board[0][0],board[1][1],board[2][2])) {
      winner = board[0][0];
      line(w/2, h/2, width - w/2, height - h/2);
    }
  }
  for (var i = 0; i < 3; i++) {
    if (equals3(board[0][2],board[1][1],board[2][0])) {
      winner = board[2][0];
      line(width - w/2, h/2, w/2, height - h/2);
    }
  }

  if (winner == null && clickCount == 9) {
    return 'Tie';
  } else {
    return winner;
  }
}

function nextTurn() {
  let index = click();
  let spot = available.slice(index)[0];
  let i = spot[0];
  let j = spot[1];
  board[i][j] = players[currentPlayer];
  currentPlayer = (currentPlayer + 1) % players.length;
  clickCount++;
}

function draw() {
  background(230);
  stroke(0);
  line(w, 0, w, height);
  line(w*2, 0, w*2, height);
  line(0, h, width, h);
  line(0, h*2, width, h*2);
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      let x = w*j + w/2;
      let y = h*i + h/2;
      let spot = board[i][j];
      textSize(32);
      strokeWeight(4);
      if (spot == players[1]) {
        noFill();
        ellipse(x, y, w/1.5);
      } else if (spot == players[0]) {
        let xr = w/4;
        line(x - xr, y - xr, x + xr, y + xr);
        line(x + xr, y - xr, x - xr, y + xr);
      }
    }
  }
  let result = checkWinner();
  if (result != null) {
    noLoop();
    if (result == 'Tie') {
      createP(result).style('color', '#000').style('font-size', '32pt');
    } else {
      createP(result + ' wins!').style('color', '#000').style('font-size', '32pt');
    }
  }
}

function click() {
  if (mouseX > 0 && mouseX < w && mouseY > 0 && mouseY < h) {
    return 0;
  } else if (mouseX > w && mouseX < w*2 && mouseY > 0 && mouseY < h) {
    return 1;
  } else if (mouseX > w*2 && mouseX < w*3 && mouseY > 0 && mouseY < h) {
    return 2;
  } else if (mouseX > 0 && mouseX < w && mouseY > h && mouseY < h*2) {
    return 3;
  } else if (mouseX > w && mouseX < w*2 && mouseY > h && mouseY < h*2) {
    return 4;
  } else if (mouseX > w*2 && mouseX < w*3 && mouseY > h && mouseY < h*2) {
    return 5;
  } else if (mouseX > 0 && mouseX < w && mouseY > h*2 && mouseY < h*3) {
    return 6;
  } else if (mouseX > w && mouseX < w*2 && mouseY > h*2 && mouseY < h*3) {
    return 7;
  } else if (mouseX > w*2 && mouseX < w*3 && mouseY > h*2 && mouseY < h*3) {
    return 8;
  }
}
