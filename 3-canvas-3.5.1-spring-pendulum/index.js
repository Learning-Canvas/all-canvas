import { Pvector } from "./Pvector.js"
alert("click to apply wind force")
let canvas=document.getElementById("canvas")
let c=canvas.getContext("2d")
canvas.width=innerWidth
canvas.height=innerHeight
class Spring{
    constructor(x,y,restlength,k,bob){
        this.origin=new Pvector(x,y);
        this.restlen=restlength;
        this.k=k;
        this.connect=new Pvector(bob.location.x,bob.location.y);
    }
    giveforce(bob){
        this.springforce=this.origin.subvector(bob.location)
        this.connect=new Pvector(bob.location.x,bob.location.y)
        let extendlength=this.springforce.mag()
        let force= this.k*(extendlength-this.restlen);
        console.log(force)
        this.springforce.setmag(force)
        return this.springforce;
    }
    show(c){
        c.beginPath()
        c.moveTo(this.origin.x,this.origin.y)
        c.lineTo(this.connect.x,this.connect.y)
        c.stroke()
    }
    
}
class Bob{
constructor(radius,currpos){
    this.location=new Pvector(innerWidth/2,currpos)
    this.velocity=new Pvector(0,0)  
    this.acceleration=new Pvector(0,0)
    this.radius=radius   
}
applyForce(force){
    this.acceleration.add(force)
    this.velocity.add(this.acceleration)
    this.location.add(this.velocity)
    this.acceleration.mult(0)
}
update(){
this.velocity.add(this.acceleration)
this.location.add(this.velocity)
}
show(c){
    c.beginPath()
    c.fillStyle="white"
    c.arc(this.location.x,this.location.y,this.radius,0,Math.PI*2,false)
    c.fill()
    c.stroke()
}
}
canvas.addEventListener("mousedown",(e)=>{
    applywind(e)
})
function applywind(){
    let wind=new Pvector(0.5,0)
    bob1.applyForce(wind)
}
let bob1=new Bob(30,350)
let spring1=new Spring(innerWidth/2,10,300,0.0001,bob1)
function animate(){
c.clearRect(0,0,innerWidth,innerHeight)
requestAnimationFrame(animate)
let gravity=new Pvector(0,0.01)
bob1.applyForce(gravity)
bob1.applyForce(spring1.giveforce(bob1))

bob1.update()
spring1.show(c)
bob1.show(c)
}
animate()