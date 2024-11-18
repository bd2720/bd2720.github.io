/* Falling Shapes in p5.js */
let activeShapes = [];
let deadShapes = [];
let bottom; // init in setup()

const fps = 16;
const fpqs = fps/4; // frames per quarter second
const sq_size = 20;
const colors = ["#9eb7ed", "#edb8dd", "#adedb3"];

function setup() {
  // limit screen height
	canvas = createCanvas(1920, Math.min(document.body.offsetHeight, 2048));
	canvas.parent('bg');

  frameRate(fps);
  background("#1f1f1f");
  noStroke();
  bottom = new Array(floor(width / sq_size)).fill(height - 2*sq_size);

  // simulate 15 seconds
  for(let fr = 0; fr < fps*15; fr++){
    if (fr % fpqs === 0) {
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
    }
  }
}

function draw() {
  background("#1f1f1f");
  // add new shape every quarter-second
  if (frameCount % fpqs === 0) {
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
      if(bottom[floor(s.x / sq_size)] <= 0){ // reset at ceiling
        activeShapes = [];
        deadShapes = [];
        bottom.fill(height - 2*sq_size);
        break;
      }
      deadShapes.push(activeShapes[i]);
      activeShapes.splice(i, 1);
      i--;
      continue;
    }
    s.y += sq_size;
    // draw the active shape
    fill(s.col);
    square(s.x, s.y, sq_size);
  }
  // draw deadShapes
  for (let s of deadShapes) {
    fill(s.col);
    square(s.x, s.y, sq_size);
  }
}