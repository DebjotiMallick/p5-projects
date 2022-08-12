function Tree() {
  this.root = null;
}

Tree.prototype.traverse = function() {
  this.root.visit(this.root);
}

Tree.prototype.search = function(val) {
  var found = this.root.search(val);
  if (found != null) {
    console.log("Found");
  } else {
    console.log("Not found");
  }
  return found;
}

Tree.prototype.addValue = function(val) {
  var n = new Node(val);
  if (this.root == null) {
    this.root = n;
    this.root.x = width/2;
    this.root.y = 20;
  } else {
    this.root.addNode(n);
  }
}
