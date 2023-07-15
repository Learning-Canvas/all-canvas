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

  ctx.save();
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