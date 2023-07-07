import { Pvector } from "./Pvector.js";

let canvas=document.getElementById("canvas");
let c=canvas.getContext("2d");
canvas.width=innerWidth
canvas.height=innerHeight
function drawArrow(ctx, fromx, fromy, tox, toy, arrowWidth, color){
    //variables to be used when creating the arrow
    var headlen = 50;
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
    ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/10),
               toy-headlen*Math.sin(angle-Math.PI/10));
    ctx.fillStyle=color;
    ctx.fill()
    //draws the paths created above
    ctx.stroke();
    ctx.restore();
}
class Agent{
    constructor(){
        this.location=new Pvector(0,0)
        this.velocity=new Pvector(3,1)
        this.acceleration=new Pvector(0,0)
        this.maxvelocity=3
        this.maxforce=0.1
        this.radius=50
    }
    applyForce(force){
        force.limit(this.maxforce)
        this.acceleration.setmag(0)
        this.acceleration.add(force)
        this.velocity.add(this.acceleration)
        this.velocity.limit(this.maxvelocity)
        this.location.add(this.velocity)
        
    }
    update(){
        this.velocity.add(this.acceleration)
        this.velocity.limit(this.maxvelocity)
        this.location.add(this.velocity)
    }
   
    display(c){
        let newvector=new Pvector(this.velocity.x,this.velocity.y)
        newvector.setmag(100)
        drawArrow(c, this.location.x, this.location.y, this.location.x+newvector.x, this.location.y+newvector.y, 10, "#ADD8E6")
        // c.beginPath()
        // c.arc(this.location.x,this.location.y,this.radius,0,Math.PI*2,false)
        // c.stroke()    
    }
}

let mouseposition=new Pvector(0,0)
canvas.addEventListener("mousemove",(e)=>{
    mouseposition.x=e.clientX
    mouseposition.y=e.clientY
})
let a1=new Agent()
function animate(){
c.clearRect(0,0,innerWidth,innerHeight)
requestAnimationFrame(animate)
a1.update()
let force=mouseposition.subvector(a1.location)
a1.applyForce(force)
a1.display(c)
}
animate()
