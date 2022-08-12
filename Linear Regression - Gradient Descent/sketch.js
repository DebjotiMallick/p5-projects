let points = [];
let m = 0;
let b = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(51);
  fill(255);
  noStroke();
  for (var i = 0; i < points.length; i++) {
    let x = map(points[i].x, 0, 1, 0, width);
    let y = map(points[i].y, 0, 1, height, 0);
    ellipse(x, y, 8, 8);
  }
  if (points.length > 1) {
    gradientDescent();
    drawLine();
  }
}

function drawLine() {
  let x1 = 0;
  let y1 = m * x1 + b;
  let x2 = 1;
  let y2 = m * x2 + b;
  x1 = map(x1, 0, 1, 0, width);
  y1 = map(y1, 0, 1, height, 0);
  x2 = map(x2, 0, 1, 0, width);
  y2 = map(y2, 0, 1, height, 0);
  stroke(255, 255, 0);
  line(x1, y1, x2, y2);
}

function gradientDescent() {
  let learningRate = 0.05;
  for (var i = 0; i < points.length; i++) {
    let x = points[i].x;
    let y = points[i].y;
    let guess = m * x + b;
    let error = y - guess;

    m = m + error * x * learningRate;
    b = b + error * learningRate;
  }
}

function mousePressed() {
  var x = map(mouseX, 0, width, 0, 1);
  var y = map(mouseY, 0, height, 1, 0);
  let point = createVector(x, y);
  points.push(point);
}
