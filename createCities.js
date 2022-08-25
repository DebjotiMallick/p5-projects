function createCities() {
  // Create the cities with their order
  for (var i = 0; i < totalCities; i++) {
    cities[i] = createVector(random(20,width/2), random(20,height/2-50));
    order[i] = i;
  }

  // Save the first distance as the best distance so far and copy the order into new array
  var d = calcDistance(cities, order);
  recordDistance = d;
  bestEver = order.slice();

}
