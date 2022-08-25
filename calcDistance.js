function calcDistance(points, order){
  var sum = 0;
  for (var i = 0; i < order.length-1; i++) {
    var cityAIndex = order[i];
    var cityA = points[cityAIndex];
    var cityBIndex = order[i+1];
    var cityB = points[cityBIndex];

    var d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
    sum += d;
  }
  return sum;
}
