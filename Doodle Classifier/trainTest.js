function testAll(testing) {
  //shuffle(training, true);
  let correct = 0;
  for (var i = 0; i < testing.length; i++) {
    let data = testing[i];
    let inputs = Array.from(data).map(x => x / 255);
    let label = testing[i].label;
    let guess = nn.predict(inputs);

    let m = max(guess);
    let classification = guess.indexOf(m);

    // console.log(guess);
    // console.log(classification);
    // console.log(label);

    if (classification === label) {
      correct++;
    }
  }
  let percent = 100 * (correct / testing.length);
  return percent;
}

function trainEpoch(training) {
  shuffle(training, true);

  for (var i = 0; i < training.length; i++) {
    let data = training[i];
    let inputs = Array.from(data).map(x => x / 255.0);
    let label = training[i].label;
    // console.log(inputs);
    // console.log(label);
    let targets = [0, 0, 0, 0];
    targets[label] = 1;
    // console.log(targets);

    nn.train(inputs, targets);
  }
}
