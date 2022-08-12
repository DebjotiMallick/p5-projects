var tree;
var i = 0;
var j = 0;
function setup(){
  createCanvas(1000,600);
  background(51);
  tree = new Tree();
  for (var i = 0; i < 10; i++) {
    tree.addValue(floor(random(0,50)));
  }
  console.log(tree);
  tree.traverse();
}
