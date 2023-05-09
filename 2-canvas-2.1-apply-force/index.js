import { Pvector } from "./Pvector.js";
let canvas=document.getElementById('canvas');
let c=canvas.getContext('2d');
canvas.width=innerWidth;
canvas.height=innerHeight;

class Ball{
constructor(){
    this.location=new Pvector(innerWidth/2,innerHeight/2);
    this.velocity=new Pvector(0,0);
    this.acceleration=new Pvector(0,0)
    this.radius=50;
}
draw(c){
c.beginPath();
c.arc(this.location.x,this.location.y,this.radius,0,2*Math.PI,false)
c.stroke();
}
update(){
this.location.add(this.velocity);
this.velocity.add(this.acceleration);
this.acceleration.mult(0)
}
edges(){
if(this.location.x+this.radius>innerWidth|| this.location.x+this.radius<0){
    this.velocity.x*=-1;
}
if(this.location.y+this.radius>innerHeight || this.location.y+this.radius<0){
    this.velocity.y*=-1;
}
}
applyForce(force){
    this.acceleration.add(force)
}
}

let ball1=new Ball();
ball1.draw(c);

function animate(){
    c.clearRect(0,0,innerWidth,innerHeight)
    requestAnimationFrame(animate)
    let force1=new Pvector(0,-0.5);
    ball1.applyForce(force1)
    let force2=new Pvector(-0.1,0);
    ball1.applyForce(force2)
    ball1.update()
    ball1.edges()
    ball1.draw(c);

}
animate();