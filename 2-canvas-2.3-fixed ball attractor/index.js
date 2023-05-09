import {Pvector} from './Pvector.js'
let canvas=document.getElementById('canvas')
canvas.width=innerWidth
canvas.height=innerHeight
let c=canvas.getContext("2d")
class Attractor{
constructor(){
    this.location=new Pvector(innerWidth/2,innerHeight/2);
    this.radius=50;
    this.mass=this.radius/10;
}

applyAttractiveForce(mover){
mover.acceleration.mult(0)
let distvector=this.location.subvector(mover.location)
let dist=distvector.mag();
let attractiveforce=(this.mass*mover.mass)/(dist*dist)
mover.acceleration=distvector;
mover.acceleration.setmag(attractiveforce*1000)    

}
display(c){
    c.beginPath();
    c.arc(this.location.x,this.location.y,this.radius,0,2*Math.PI,false);
    c.stroke();
}
}

class Mover{
constructor(){
    this.location=new Pvector(innerWidth/2,innerHeight/4)
    this.velocity=new Pvector(10,0);
    this.acceleration=new Pvector(0,0)
    this.radius=25;
    this.mass=this.radius/10;
}
update(){
this.velocity.add(this.acceleration)
this.location.add(this.velocity)
}
dispay(c){
c.beginPath()
c.arc(this.location.x,this.location.y,this.radius,0,2*Math.PI,false);
c.stroke();
}
}

let att1=new Attractor();

let m1=new Mover()

function animate(){
c.clearRect(0,0,innerWidth,innerHeight);
requestAnimationFrame(animate)
att1.display(c)
att1.applyAttractiveForce(m1)
m1.update()
m1.dispay(c)
}
animate()