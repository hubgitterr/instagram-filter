// Image of Husky Creative commons from Wikipedia:
// https://en.wikipedia.org/wiki/Dog#/media/File:Siberian_Husky_pho.jpg

// // Step 1: Implement sepiaFilter function

var imgIn;
var matrix = [
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64]
];

/////////////////////////////////////////////////////////////////
function preload() {
    imgIn = loadImage("assets/husky.jpg");
}

/////////////////////////////////////////////////////////////////
function setup() {
    createCanvas((imgIn.width * 2), imgIn.height);
}

/////////////////////////////////////////////////////////////////
function draw() {
    background(125);
    image(imgIn, 0, 0);
    image(earlyBirdFilter(imgIn), imgIn.width, 0);
    noLoop();
}

/////////////////////////////////////////////////////////////////
function mousePressed(){
  loop();
}

// S5

var imgIn;
var matrix = [
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64]
];

var currentFilter = 0; // Index of the current filter in the filters array
var filters = [
  {
    name: "Sepia with Radial Blur and Dark Corners",
    filter: applySepiaRadialBlurDarkCorners
  },
  {
    name: "Greyscale with Radial Blur and Dark Corners",
    filter: applyGreyscaleRadialBlurDarkCorners
  }
  
];

/////////////////////////////////////////////////////////////////
function preload() {
    imgIn = loadImage("assets/husky.jpg");
}

/////////////////////////////////////////////////////////////////
function setup() {
    createCanvas((imgIn.width * 2), imgIn.height);
}

/////////////////////////////////////////////////////////////////
function draw() {
    background(125);
    image(imgIn, 0, 0);
    image(filters[currentFilter].filter(imgIn), imgIn.width, 0);
    noLoop();
}

/////////////////////////////////////////////////////////////////
function mousePressed(){
  loop();
}

// function earlyBirdFilter(img){
//   var resultImg = createImage(img.width, img.height);
//   resultImg = sepiaFilter(img);
//   resultImg = darkCorners(resultImg);
//   resultImg = radialBlurFilter(resultImg);
//   resultImg = borderFilter(resultImg);
//   return resultImg;
// }

function applySepiaRadialBlurDarkCorners(img) {
    var resultImg = createImage(img.width, img.height);
    resultImg = sepiaFilter(img);
    resultImg = darkCorners(resultImg);
    resultImg = radialBlurFilter(resultImg);
    resultImg = borderFilter(resultImg);
    return resultImg;
}

function applyGreyscaleRadialBlurDarkCorners(img) {
    var resultImg = createImage(img.width, img.height);
    resultImg = greyscaleFilter(img);
    resultImg = darkCorners(resultImg);
    resultImg = radialBlurFilter(resultImg);
    resultImg = borderFilter(resultImg);
    return resultImg;
}

function sepiaFilter(inputImg) {
  var outputImg = createImage(inputImg.width, inputImg.height);
  inputImg.loadPixels();
  outputImg.loadPixels();

  for (var y = 0; y < inputImg.height; y++) {
    for (var x = 0; x < inputImg.width; x++) {
      var index = (x + y * inputImg.width) * 4;

      var oldRed = inputImg.pixels[index];
      var oldGreen = inputImg.pixels[index + 1];
      var oldBlue = inputImg.pixels[index + 2];

      var newRed = (oldRed * 0.393) + (oldGreen * 0.769) + (oldBlue * 0.189);
      var newGreen = (oldRed * 0.349) + (oldGreen * 0.686) + (oldBlue * 0.168);
      var newBlue = (oldRed * 0.272) + (oldGreen * 0.534) + (oldBlue * 0.131);

      outputImg.pixels[index] = constrain(newRed, 0, 255);
      outputImg.pixels[index + 1] = constrain(newGreen, 0, 255);
      outputImg.pixels[index + 2] = constrain(newBlue, 0, 255);
      outputImg.pixels[index + 3] = inputImg.pixels[index + 3]; // Preserve alpha value
    }
  }

  outputImg.updatePixels();
  return outputImg;
}

function greyscaleFilter(inputImg) {
  // Create an output image the same size as the input
  var outputImg = createImage(inputImg.width, inputImg.height);
  inputImg.loadPixels();
  outputImg.loadPixels();

  // Loop over all the pixels in the input image
  for (var y = 0; y < inputImg.height; y++) {
    for (var x = 0; x < inputImg.width; x++) {
      // Get the pixel index
      var index = (x + y * inputImg.width) * 4;

      // Get the RGB values from the input image
      var oldRed = inputImg.pixels[index];
      var oldGreen = inputImg.pixels[index + 1];
      var oldBlue = inputImg.pixels[index + 2];

      // Compute the brightness of the pixel
      var brightness = (oldRed + oldGreen + oldBlue) / 3;

      // Set the RGB values of the output image
      outputImg.pixels[index] = brightness;
      outputImg.pixels[index + 1] = brightness;
      outputImg.pixels[index + 2] = brightness;
      outputImg.pixels[index + 3] = inputImg.pixels[index + 3]; // Preserve alpha value
    }
  }

  // Update the output image
  outputImg.updatePixels();
  return outputImg;
}


function darkCorners(inputImg) {
  var outputImg = createImage(inputImg.width, inputImg.height);
  inputImg.loadPixels();
  outputImg.loadPixels();

  var centerX = inputImg.width / 2;
  var centerY = inputImg.height / 2;

  for (var y = 0; y < inputImg.height; y++) {
    for (var x = 0; x < inputImg.width; x++) {
      var index = (x + y * inputImg.width) * 4;

      var distance = dist(x, y, centerX, centerY);
      var dynLum = map(distance, 0, centerX, 1, 0.4);
      dynLum = constrain(dynLum, 0.4, 1);

      outputImg.pixels[index] = inputImg.pixels[index] * dynLum;
      outputImg.pixels[index + 1] = inputImg.pixels[index + 1] * dynLum;
      outputImg.pixels[index + 2] = inputImg.pixels[index + 2] * dynLum;
      outputImg.pixels[index + 3] = inputImg.pixels[index + 3];
    }
  }

  outputImg.updatePixels();
  return outputImg;
}

function radialBlurFilter(inputImg) {
  var outputImg = createImage(inputImg.width, inputImg.height);
  inputImg.loadPixels();
  outputImg.loadPixels();

  var centerX = mouseX;
  var centerY = mouseY;

  for (var y = 0; y < inputImg.height; y++) {
    for (var x = 0; x < inputImg.width; x++) {
      var index = (x + y * inputImg.width) * 4;

      var distance = dist(x, y, centerX, centerY);
      var dynBlur = map(distance, 100, 300, 0, 1);
      dynBlur = constrain(dynBlur, 0, 1);

      var c = convolution(x, y, inputImg, matrix);
      outputImg.pixels[index + 0] = c[0] * dynBlur + inputImg.pixels[index] * (1 - dynBlur);
      outputImg.pixels[index + 1] = c[1] * dynBlur + inputImg.pixels[index + 1] * (1 - dynBlur);
      outputImg.pixels[index + 2] = c[2] * dynBlur + inputImg.pixels[index + 2] * (1 - dynBlur);
      outputImg.pixels[index + 3] = inputImg.pixels[index + 3];
    }
  }

  outputImg.updatePixels();
  return outputImg;
}

function convolution(x, y, img, matrix) {
  var rtotal = 0.0;
  var gtotal = 0.0;
  var btotal = 0.0;

  var offset = Math.floor(matrix.length / 2);

  for (var i = 0; i < matrix.length; i++) {
    for (var j = 0; j < matrix[i].length; j++) {
      var xloc = x + i - offset;
      var yloc = y + j - offset;
      var index = (xloc + img.width * yloc) * 4;

      var r = img.pixels[index + 0];
      var g = img.pixels[index + 1];
      var b = img.pixels[index + 2];

      var matrixVal = matrix[i][j];
      rtotal += r * matrixVal;
      gtotal += g * matrixVal;
      btotal += b * matrixVal;
    }
  }

  return [rtotal, gtotal, btotal];
}

function borderFilter(img) {
  var buffer = createGraphics(img.width, img.height);
  buffer.image(img, 0, 0);

  buffer.noFill();
  buffer.stroke(255);
  buffer.strokeWeight(20);
  buffer.rect(10, 10, buffer.width - 20, buffer.height - 20, 20);

  // Draw another rectangle without rounded corners to cover the corners
  buffer.rect(0, 0, buffer.width, buffer.height);

  return buffer;
}

function keyPressed() {
  if (keyCode === ENTER) {
    currentFilter = (currentFilter + 1) % filters.length;
    redraw();
  }
}
