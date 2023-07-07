import { Pvector } from "./Pvector.js";

let canvas=document.getElementById("canvas");
let c=canvas.getContext("2d");
canvas.width=innerWidth
canvas.height=innerHeight
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
        console.log(force.mag())
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
        c.beginPath()
        c.arc(this.location.x,this.location.y,this.radius,0,Math.PI*2,false)
        c.stroke()    
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
