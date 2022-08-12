function Node(val, x, y) {
  this.value = val;
  this.left = null;
  this.right = null;
  this.x = x;
  this.y = y;
}

Node.prototype.search = function(val) {
  if (this.value == val) {
    return this;
  } else if(val < this.value && this.left != null){
    return this.left.search(val);
  } else if(val > this.value && this.right != null){
    return this.right.search(val);
  }
  return null;
}

Node.prototype.visit = function(parent) {
  if (this.left != null) {
    this.left.visit(this);
  }
  console.log(this.value);
  stroke(255);
  fill(255);
  ellipse(this.x, this.y, 30);
  noStroke();
  textAlign(CENTER);
  textSize(20);
  fill(0);
  text(this.value,this.x, this.y+7);
  fill(255);
  stroke(255);
  line(parent.x, parent.y+15, this.x, this.y-15);
  if (this.right != null) {
    this.right.visit(this);
  }
}

Node.prototype.addNode = function(n) {
  if (n.value < this.value) {
    if (this.left == null) {
      this.left = n;
      this.left.x = this.x - (100 - 10*i);
      this.left.y = this.y + (100 - 10*i);
      i += 1.0;
    } else {
      this.left.addNode(n);
    }
  } else if (n.value > this.value) {
    if (this.right == null) {
      this.right = n;
      this.right.x = this.x + (100 - 10*j);
      this.right.y = this.y + (100 - 10*j);
      j += 1.0;
    } else {
      this.right.addNode(n);
    }
  }
}
