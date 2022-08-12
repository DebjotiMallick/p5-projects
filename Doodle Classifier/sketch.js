const len = 784;
const total_data = 10000;

const RAINBOW = 0;
const MONALISA = 1;
const CAR = 2;
const FLOWER = 3;

let rainbows_data;
let rainbows = {};

let monalisa_data;
let monalisa = {};

let cars_data;
let cars = {};

let flowers_data;
let flowers = {};

let nn;

function preload() {
  rainbows_data = loadBytes("data/rainbow.bin");
  monalisa_data = loadBytes("data/monalisa.bin");
  cars_data = loadBytes("data/car.bin");
  flowers_data = loadBytes("data/flower.bin");
}

function setup() {
  createCanvas(280, 280);
  background(255);

  prepareData(rainbows, rainbows_data, RAINBOW);
  prepareData(monalisa, monalisa_data, MONALISA);
  prepareData(cars, cars_data, CAR);
  prepareData(flowers, flowers_data, FLOWER);

  nn = new NeuralNetwork(784, 128, 4);

  let training = [];
  training = training.concat(rainbows.training);
  training = training.concat(monalisa.training);
  training = training.concat(cars.training);
  training = training.concat(flowers.training);

  let testing = [];
  testing = testing.concat(rainbows.testing);
  testing = testing.concat(monalisa.testing);
  testing = testing.concat(cars.testing);
  testing = testing.concat(flowers.testing);

  let deleteButton = select("#delete");
  deleteButton.mousePressed(function() {
    background(255);
  });

  let trainButton = select("#train");
  let epochCounter = 0;
  trainButton.mousePressed(function() {
    trainEpoch(training);
    epochCounter++;
    console.log("Epoch: " + epochCounter);
  });

  let testButton = select("#test");
  testButton.mousePressed(function() {
    let percent = testAll(testing);
    console.log("Percent: " + nf(percent, 2, 2) + "%");
  });

  let guessButton = select("#guess");
  guessButton.mousePressed(function() {
    let inputs = [];
    let img = get();
    img.resize(28, 28);
    //console.log(img);
    img.loadPixels();
    for (var i = 0; i < len; i++) {
      let bright = img.pixels[i * 4];
      inputs[i] = (255 - bright) / 255.0;
    }

    let guess = nn.predict(inputs);
    let m = max(guess);
    let classification = guess.indexOf(m);
    if (classification === RAINBOW) {
      console.log("Rainbow");
    } else if (classification === MONALISA) {
      console.log("Monalisa");
    } else if (classification === CAR) {
      console.log("Car");
    } else if (classification === FLOWER) {
      console.log("Flower");
    }
  });
}

function draw() {
  strokeWeight(8);
  stroke(0);
  if (mouseIsPressed) {
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}
