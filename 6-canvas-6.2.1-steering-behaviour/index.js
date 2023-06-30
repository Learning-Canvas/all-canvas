import { Pvector } from "./Pvector.js";
let canvas=document.getElementById("canvas")
let c=canvas.getContext("2d")
canvas.width=innerWidth;
canvas.height=innerHeight;
c.translate(innerWidth/2,innerHeight/2)
class Agent{
    constructor(x,y,radius){
        this.location=new Pvector(x,y)
        this.velocity=new Pvector(3,0)
        this.acceleration=new Pvector(0,0)
        this.radius=radius
        this.maxvel=3; 
        this.maxforce=0.1;
    }
    applyForce(attractor){
        this.steeringforce=attractor.location.subvector(this.location)
        this.steeringforce.setmag(1)
        this.acceleration.setmag(0)
        this.steeringforce.limit(this.maxforce)
        this.acceleration.add(this.steeringforce)
        this.velocity.add(this.acceleration)
        this.velocity.limit(this.maxvel)
        this.location.add(this.velocity)
    }
    
    display(c){
        c.beginPath()
        c.arc(this.location.x,this.location.y,this.radius,0,Math.PI*2,false);
        c.stroke()
    }
}
class Attractor{
    constructor(x,y,radius){
        this.location=new Pvector(x,y)
        this.radius=radius
    }
    display(c){
        c.beginPath()
        c.arc(this.location.x,this.location.y,this.radius,0,Math.PI*2,false);
        c.stroke()
    }
}
canvas.addEventListener("mousemove",(event)=>{
    updatemouseposition(event)
})
function updatemouseposition(e){
    let x = e.clientX-innerWidth/2;
    let y = e.clientY-innerHeight/2;
    at1.location.x=x;
    at1.location.y=y;
    console.log(x,y)
}
let a1=new Agent(-100,-100,30)
let at1=new Attractor(0,0,3);
function animate(){
    c.clearRect(-innerWidth/2,-innerHeight/2,innerWidth,innerHeight)
    requestAnimationFrame(animate);
    a1.display(c)
    a1.applyForce(at1)
    at1.display(c)
}
animate()
