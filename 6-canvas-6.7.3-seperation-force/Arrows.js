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
class Node{
  constructor(val){
      this.val=val;
      this.next=null;
  }
}
export class perlinnoise{
  constructor(length){
      
      this.length=length-2;
      this.head=new Node(Math.random());
      this.tail=new Node(Math.random());
      let curr=this.head;
      let count=this.length;
      while(count-->0){
          curr.next=new Node(Math.random());
          curr=curr.next;
      }
      curr.next=this.tail;
  }
  generate(){
      if(this.length==-1){
          return Math.random()
      }
      let temp=this.head.next;
      this.head.next=null;
      this.head=temp;
      this.tail.next=new Node(Math.random());
      this.tail=this.tail.next;
      let curr=this.head;
      let ret=0;
      let count=0;
      while(curr!=null){
          ret+=curr.val;
          curr=curr.next;
          count++;
      }
      this.length=count;
      return ret/(count);
  }
}

export function random(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}





export function mousedrag(canvas,agarr,Agent){
  // Variables to track the mouse state
let isMouseDown = false;
let mousePosition = { x: 0, y: 0 };

// Function to print mouse coordinates
function printMouseCoordinates() {
  if (isMouseDown) {
    agarr.push(new Agent(mousePosition.x,mousePosition.y,random(3,9)))
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