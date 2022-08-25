function drawing() {
  drawCities();

  // Drawing lines between cities with shortest path
  beginShape();
  stroke(255, 0 , 255, 200);
  strokeWeight(2);
  noFill();
  for (var i = 0; i < order.length; i++) {
    var n = bestEver[i];
    vertex(cities[n].x, cities[n].y);
  }
  endShape();

  // Drawing lines between cities with every possible combination
  translate(0, height/2);
  drawCities();
  beginShape();
  stroke(255);
  strokeWeight(1);
  noFill();
  for (var i = 0; i < order.length; i++) {
    var n = order[i];
    vertex(cities[n].x, cities[n].y);
  }
  endShape();

  var d = calcDistance(cities, order);
  if (d < recordDistance) {
    recordDistance = d;
    bestEver = order.slice();
    console.log("Best distance : " + nf(recordDistance,0,2));
  }
}

function drawCities() {
  fill(255);
  noStroke();
  for (var i = 0; i < cities.length; i++) {
    ellipse(cities[i].x, cities[i].y , 8, 8);
  }

}
