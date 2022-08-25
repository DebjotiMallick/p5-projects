function nextOrder() {
  count++;
  var largestI = -1;
  for (var i = 0; i < order.length-1; i++) {
    if(order[i] < order[i+1]){
      largestI = i;
    }
  }
  if (largestI == -1) {
    noLoop();
    console.log('finished');
  }

  var largestJ = -1;
  for (var j = 0; j < order.length; j++) {
    if (order[largestI] < order[j]) {
      largestJ = j;
    }
  }

  swap(order , largestI, largestJ);

  var endArray = order.splice(largestI + 1);
  endArray.reverse();
  order = order.concat(endArray);
}

function swap(a, i, j){
  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}
