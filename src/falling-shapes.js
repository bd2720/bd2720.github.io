/* Falling Shapes in p5.js */
let activeShapes = [];
let deadShapes = [];
let bottom; // init in setup()

const fps = 15;
const sq_size = 20;
const colors = ["#9eb7ed", "#edb8dd", "#adedb3"];

function setup() {
	canvas = createCanvas(1920, document.body.offsetHeight);
	canvas.parent('bg');

  frameRate(fps);
  background("#1f1f1f");
  noStroke();
  bottom = new Array(floor(width / sq_size)).fill(height - 2*sq_size);
}

function draw() {
  background("#1f1f1f");
  // add new shape every second
  if (frameCount % fps === 0) {
    activeShapes.push({
      x: floor(random(0, width / sq_size)) * sq_size,
      y: -sq_size,
      col: random(colors),
    });
  }
  // active shapes fall
  for (let i = 0; i < activeShapes.length; i++) {
    let s = activeShapes[i];
    // detect bottom
    if (s.y >= bottom[floor(s.x / sq_size)]) {
      bottom[floor(s.x / sq_size)] -= sq_size;
      deadShapes.push(activeShapes[i]);
      activeShapes.splice(i, 1);
      i--;
      continue;
    }
    // draw the active shape
    s.y += sq_size;
    fill(s.col);
    square(s.x, s.y, sq_size);
  }
  // draw deadShapes
  for (let s of deadShapes) {
    fill(s.col);
    square(s.x, s.y, sq_size);
  }
}
