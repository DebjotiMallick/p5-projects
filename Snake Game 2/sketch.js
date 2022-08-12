let snake;
let food;
let rez = 20;
let w;
let h;
let score = 0;

function setup() {
  createCanvas(400,400);
  frameRate(7);
  snake = new Snake();
  w = floor(width/rez);
  h = floor(height/rez);
  foodLocation();
}

function draw() {
  scale(rez);
  background(51);
  if(snake.eat(food)){
    foodLocation();
    score++;
  }
  snake.update();
  snake.show();

  if (snake.endGame()) {
    background(255,0,0, 100);
    textSize(2);
    fill(255);
    text('Game Over', 5, 10);
    noLoop();
  }
  textSize(1);
  text('Score : ' + score, 15,2);

  noStroke();
  fill(255,0,100);
  rect(food.x, food.y, 1, 1);
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    snake.setdir(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    snake.setdir(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    snake.setdir(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    snake.setdir(-1, 0);
  }
}

function foodLocation() {
  food = createVector(floor(random(w)), floor(random(h)));
}
