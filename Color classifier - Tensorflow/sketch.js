let data;
let model;
let xs, ys;
let rSlider, gSlider, bSlider;
let labelP;

let labelList = [
  "red-ish",
  "green-ish",
  "blue-ish",
  "orange-ish",
  "yellow-ish",
  "pink-ish",
  "purple-ish",
  "brown-ish",
  "grey-ish"
];

function preload() {
  data = loadJSON("colorData.json");
}

function setup() {
  createCanvas(300, 300);
  console.log(data.entries.length);
  rSlider = createSlider(0, 255, 255);
  rSlider.position(10, 370);
  rSlider.style("width", "300px");
  gSlider = createSlider(0, 255, 255);
  gSlider.position(10, 400);
  gSlider.style("width", "300px");
  bSlider = createSlider(0, 255, 0);
  bSlider.position(10, 430);
  bSlider.style("width", "300px");

  labelP = createP("");

  let colors = [];
  let labels = [];
  for (let record of data.entries) {
    let col = [record.r / 255, record.g / 255, record.b / 255];
    colors.push(col);
    labels.push(labelList.indexOf(record.label));
  }

  xs = tf.tensor2d(colors);
  let labelsTensor = tf.tensor1d(labels, "int32");

  ys = tf.oneHot(labelsTensor, 9);
  labelsTensor.dispose();

  //xs.print();
  //ys.print();
  // console.log(xs.shape);
  // console.log(ys.shape);

  model = tf.sequential();

  let hidden = tf.layers.dense({
    units: 16,
    activation: "sigmoid",
    inputDim: 3
  });

  let output = tf.layers.dense({
    units: 9,
    activation: "softmax"
  });
  model.add(hidden);
  model.add(output);

  const lr = 0.2;
  const optimizer = tf.train.sgd(lr);

  model.compile({
    optimizer: optimizer,
    loss: "categoricalCrossentropy"
  });

  train().then(results => {
    console.log(results);
  });
}

async function train() {
  const options = {
    epochs: 10,
    validationSplit: 0.1,
    shuffle: true,
    callbacks: {
      onTrainBegin: () => console.log("Training start"),
      onTrainEnd: () => console.log("Training end"),
      onEpochEnd: (num, logs) => {
        console.log("Epoch: " + num);
        console.log("Loss " + logs.loss);
      }
    }
  };
  return await model.fit(xs, ys, options);
}

function draw() {
  let r = rSlider.value();
  let g = gSlider.value();
  let b = bSlider.value();
  background(r, g, b);

  tf.tidy(() => {
    const xs = tf.tensor2d([[r / 255, g / 255, b / 255]]);
    let results = model.predict(xs);
    let index = results.argMax(1).dataSync()[0];
    let label = labelList[index];
    labelP.html(label);
  });
}
