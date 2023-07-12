import {Pvector} from './Pvector.js'
let canvas=document.getElementById("canvas")
let c=canvas.getContext("2d")
canvas.width=innerWidth
canvas.height=innerHeight
function map(c,a,b,x,y){
    return x+((y-x)*c/(b-a))
}
class Agent{
constructor(radius){
this.location=new Pvector(0,0);
this.velocity=new Pvector(0.5,0.5);
this.acceleration=new Pvector(0,0);
this.radius=radius;
this.maxforce=0.4
this.maxvelocity=3
}
applyForce(attractor,force){
    let desiredvelocity=attractor.location.subvector(ag1.location)
    if(desiredvelocity.mag()>=attractor.radius){
        force.limit(this.maxforce)
        this.acceleration.add(force)
        this.velocity.add(this.acceleration)
        this.acceleration.setmag(0)
        this.velocity.limit(this.maxvelocity)
        
        this.location.add(this.velocity)
    }
    else{
        force.limit(this.maxforce)
        this.acceleration.add(force)
        this.velocity.add(this.acceleration)
        this.acceleration.setmag(0)
        // console.log(desiredvelocity.mag(),Math.floor(map(desiredvelocity.mag(),0,attractor.radius,0,this.maxvelocity)))
        this.velocity.setmag(Math.floor(map(desiredvelocity.mag(),0,attractor.radius,0,this.maxvelocity)))
        // console.log(this.velocity,this.velocity.mag())
        this.location.add(this.velocity)
    }
// console.log(this.location)
}
update(){
    this.velocity.add(this.acceleration)
    this.location.add(this.velocity)
}
display(c){
c.beginPath()
c.moveTo(this.location.x,this.location.y)
c.lineTo(this.location.x+this.velocity.x*20,this.location.y+this.velocity.y*20)
c.stroke()
c.beginPath()

c.arc(this.location.x,this.location.y,this.radius,0,Math.PI*2,false);
c.stroke()
}
}

class Attractor{
    constructor(){
    this.location=new Pvector(innerWidth/2,innerHeight/2);
    this.radius=10;
    }
    update(x,y){
        this.location.x=x;
        this.location.y=y;
    }
}
let attractor=new Attractor()
canvas.addEventListener("mousemove",(e)=>{
attractor.update(e.clientX,e.clientY)
})

let ag1=new Agent(30)

function animate(){
    c.clearRect( 0,0,innerWidth,innerHeight)
    requestAnimationFrame(animate)
    let desiredvelocity=attractor.location.subvector(ag1.location)
    let steeringforce=desiredvelocity.subvector(ag1.velocity)
    ag1.applyForce(attractor,steeringforce)
    ag1.update()
    ag1.display(c) 
       
}
animate()