var cities = [];
var totalCities = 7;
var totalPermutations;
var count = 0;
var order = [];
var recordDistance;
var bestEver;

function setup() {
  createCanvas(600,500);
  createCities();
  totalPermutations = factorial(totalCities);
}

function draw() {
  background(0);
  drawing();
  nextOrder();
  percentage();
}
