function percentage() {
  translate(0,-height/2);
  textSize(24);
  fill(255);
  var percent = 100 * (count / totalPermutations);
  text("Percentage completed : ", width/2+30, height/2-50);
  text(nf(percent, 0, 2) + "%", width/2+120, height/2-10);
}

function factorial(n) {
  if (n == 1) {
    return 1;
  } else {
    return n * factorial(n-1);
  }
}
