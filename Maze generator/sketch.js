var columns, rows;
var w = 20;
var grid = [];
var current;
var stack = [];

function setup() {
  createCanvas(400,400);
  columns = floor(width/w);
  rows = floor(height/w);

  for(var j = 0; j < rows ; j++){
    for(var i = 0; i < columns ; i++){
      var cell = new Cell(i,j);
      grid.push(cell);
    }
  }
  current = grid[0];
}

function draw() {
  background(51);
  for (var i = 0; i < grid.length; i++) {
    grid[i].show();
  }

  current.visited = true;
  current.highlight();
  var next = current.checkNeighbours();
  if (next) {
    next.visited = true;

    stack.push(current);

    removeWalls(current, next);
    current = next;
  } else if(stack.length > 0){
    current = stack.pop();
  }
}

function index(i ,j){

  if (i< 0 || j < 0 || i > columns - 1 || j > rows - 1) {
    return -1;
  }
  return i + (j) * columns;

}
