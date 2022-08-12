class Snake{

  constructor(){
    this.body = [];
    this.body[0] = createVector(floor(w/2), floor(h/2));
    this.xdir = 0;
    this.ydir = 0;
  }

  update(){
    let head = this.body[this.body.length - 1].copy();
    this.body.shift();
    head.x += this.xdir;
    head.y += this.ydir;
    this.body.push(head);
  }

  show(){
    for (var i = 0; i <= this.body.length-1; i++) {
      noStroke();
      fill(0,255,0);
      rect(this.body[i].x, this.body[i].y, 1, 1);
    }
  }

  setdir(x, y){
    this.xdir = x;
    this.ydir = y;
  }

  endGame(){
    let x = this.body[this.body.length - 1].x;
    let y = this.body[this.body.length - 1].y;
    if (x > w-1 || x < 0 || y > h-1 || y < 0) {
      return true;
    }
    for (var i = 0; i < this.body.length-1; i++) {
      let part = this.body[i];
      if (part.x == x && part.y == y) {
        return true;
      }
    }
    return false;
  }

  eat(pos){
    if (this.body[this.body.length - 1].x == pos.x && this.body[this.body.length - 1].y == pos.y) {
      this.grow();
      return true;
    } else{
      return false;
    }
  }

  grow(){
    let head = this.body[this.body.length - 1].copy();
    this.body.push(head);
  }

}
