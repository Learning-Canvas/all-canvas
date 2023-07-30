export const drawArrow = (context, x1, y1, x2, y2, t = 0.9) => {
  const arrow = {
    dx: x2 - x1,
    dy: y2 - y1
};
  const middle = {
    x: arrow.dx * t + x1,
    y: arrow.dy * t + y1
};
const tip = {
    dx: x2 - middle.x,
    dy: y2 - middle.y
};
context.beginPath();
context.moveTo(x1, y1);
context.lineTo(middle.x, middle.y);
  context.moveTo(middle.x + 0.5 * tip.dy, middle.y - 0.5 * tip.dx);
context.lineTo(middle.x - 0.5 * tip.dy, middle.y + 0.5 * tip.dx);
context.lineTo(x2, y2);
context.closePath();
context.stroke();
};
export function drawTriangle(ctx, fromx, fromy, tox, toy, arrowWidth, color){
  //variables to be used when creating the arrow
  var headlen = arrowWidth;
  var angle = Math.atan2(toy-fromy,tox-fromx);

  // ctx.save();//will slow down the program
  ctx.strokeStyle = color;

  //starting path of the arrow from the start square to the end square
  //and drawing the stroke
  // ctx.beginPath();
  // ctx.moveTo(fromx, fromy);
  // ctx.lineTo(tox, toy);
  // ctx.lineWidth = arrowWidth;
  // ctx.stroke();

  //starting a new path from the head of the arrow to one of the sides of
  //the point
  ctx.beginPath();
  ctx.moveTo(tox, toy);
  ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/10),
             toy-headlen*Math.sin(angle-Math.PI/10));

  //path from the side point of the arrow, to the other side point
  ctx.lineTo(tox-headlen*Math.cos(angle+Math.PI/10),
             toy-headlen*Math.sin(angle+Math.PI/10));

  //path from the side point back to the tip of the arrow, and then
  //again to the opposite side point
  ctx.lineTo(tox, toy);
  // ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/10),
  //            toy-headlen*Math.sin(angle-Math.PI/10));
  ctx.fillStyle=color;
  ctx.fill()
  //draws the paths created above
  ctx.stroke();
  
}
export function drawCircle(c, fromx, fromy, tox, toy, radius, color){
c.beginPath()
c.arc(fromx,fromy,radius,0,Math.PI*2,false)
c.moveTo(fromx,fromy)
c.lineTo(tox,toy)
c.fillStyle=color
c.fill()
c.stroke()
}
// Function to generate 2D Perlin Noise
export function perlin2D(x, y) {
  // Grid cell coordinates
  const X = Math.floor(x);
  const Y = Math.floor(y);

  // Get relative coordinates within the grid cell
  x = x - X;
  y = y - Y;

  // Smooth the coordinates
  const u = fade(x);
  const v = fade(y);

  // Generate gradients for the grid corners
  const topLeftGradient = grad(X, Y);
  const topRightGradient = grad(X + 1, Y);
  const bottomLeftGradient = grad(X, Y + 1);
  const bottomRightGradient = grad(X + 1, Y + 1);

  // Calculate dot products between gradients and distance vectors
  const dotTopLeft = dotGridGradient(topLeftGradient, x, y);
  const dotTopRight = dotGridGradient(topRightGradient, x - 1, y);
  const dotBottomLeft = dotGridGradient(bottomLeftGradient, x, y - 1);
  const dotBottomRight = dotGridGradient(bottomRightGradient, x - 1, y - 1);

  // Interpolate the dot products to get the final noise value
  const interpolateTop = lerp(dotTopLeft, dotTopRight, u);
  const interpolateBottom = lerp(dotBottomLeft, dotBottomRight, u);
  const noiseValue = lerp(interpolateTop, interpolateBottom, v);

  return noiseValue;
}

function fade(t) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function lerp(a, b, t) {
  return (1 - t) * a + t * b;
}

// Pseudo-random number generator with seed
function random(seed) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function grad(x, y) {
  // Pseudo-random gradients based on grid cell coordinates
  const gradients = [
    [random(x * 31 + y * 11), random(x * 73 + y * 101)],
    [random(x * 89 + y * 43), random(x * 53 + y * 197)],
    [random(x * 149 + y * 151), random(x * 163 + y * 97)],
    [random(x * 193 + y * 173), random(x * 109 + y * 131)],
    [random(x * 179 + y * 89), random(x * 67 + y * 211)],
    [random(x * 139 + y * 157), random(x * 157 + y * 59)],
    [random(x * 97 + y * 137), random(x * 113 + y * 167)],
    [random(x * 83 + y * 127), random(x * 109 + y * 73)],
  ];
  const idx = (x + y) % gradients.length;
  return gradients[idx];
}

function dotGridGradient(gradient, x, y) {
  return gradient[0] * x + gradient[1] * y;
}



export function randomnum(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}





export function mousedrag(canvas,agarr,Agent){
  // Variables to track the mouse state
let isMouseDown = false;
let mousePosition = { x: 0, y: 0 };

// Function to print mouse coordinates
function printMouseCoordinates() {
  if (isMouseDown) {
    agarr.push(new Agent(mousePosition.x,mousePosition.y,1))
  }
}

// Event listener for mouse down
canvas.addEventListener('mousedown', (event) => {
  isMouseDown = true;
  mousePosition.x = event.clientX - canvas.offsetLeft;
  mousePosition.y = event.clientY - canvas.offsetTop;
});

// Event listener for mouse move
canvas.addEventListener('mousemove', (event) => {
  if (isMouseDown) {
    mousePosition.x = event.clientX - canvas.offsetLeft;
    mousePosition.y = event.clientY - canvas.offsetTop;
    printMouseCoordinates();
  }
});

// Event listener for mouse up
canvas.addEventListener('mouseup', () => {
  isMouseDown = false;
});


}