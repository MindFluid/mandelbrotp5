colours = [];

var magnificationFactor = 300;
var panX = 2;
var panY = 1.25;

function setup() {
  createCanvas(800, 800);
  colorMode(RGB, 255)
  background(0);

  loadPixels();
  for (x = 0; x < width; x++) {
    for (y = 0; y < height; y++) {

      //calculate if current pixel is in mandelbrot set
      var isMandel = mandel(x / magnificationFactor - panX, y / magnificationFactor - panY);
      var pixie = (x + y * width) * 4;

      //if not in the mandel set, colour them pixely bois
      if (isMandel != 0) {
        var col1 = 'hsl(270, 100%, ' + isMandel + '%)';
        pixels[pixie + 0] = red(col1);
        pixels[pixie + 1] = green(col1);
        pixels[pixie + 2] = blue(col1);
        pixels[pixie + 3] = 255;
      }
    }
  }
  updatePixels();
}

function mandel(x, y) {
  var realNum = x;
  var imagNum = y;
  var maxIteration = 40; //precision of detail
  for (var i = 0; i < maxIteration; i++) {
    //maths that I don't really understand why it works ¯\_(ツ)_/¯
    var tempRealComponent = realNum * realNum - imagNum * imagNum + x;
    var tempImaginaryComponent = 2 * realNum * imagNum + y;

    realNum = tempRealComponent;
    imagNum = tempImaginaryComponent;

    if (realNum * imagNum > 5) { //in the set!
      //this will be brightness value
      return (i / maxIteration * 100);
    }
  }
  return 0; //not in set
}

function doubleClicked() {
  save("mandel_" + panX + "_" + panY + "_" + magnificationFactor + ".png");
}