function setup() {
  createCanvas(310, 100);
}

function draw() {
  background(220);
  fill(255);
 arc(145, 55, 70, 70, PI, HALF_PI- HALF_PI, CHORD);
  fill(255);
  line(145, 10, 145, 55)
  fill(0, 255, 0)
  rect(130, 60, 30, 20);
  line(140, 10, 140, 20);
  line(150, 10, 150, 20);
  fill(0);
  textSize(10);
  text('C4', 140, 75);
}
