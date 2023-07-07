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
        this.velocity.add(this.acceleration)
        this.velocity.limit(this.maxvelocity)
        this.location.add(this.velocity)
        
    }
    update(){
        this.velocity.add(this.acceleration)
        this.velocity.limit(this.maxvelocity)
        this.location.add(this.velocity)
    }
    rotaterightvector(x,y){
        let angle=Math.atan(y/x)
        let r=x/Math.cos(angle)
        angle+=8*Math.PI/9
        return [r*Math.cos(angle),r*Math.sin(angle)]
    }
    rotateleftvector(x,y){
        let angle=Math.atan(y/x)
        let r=x/Math.cos(angle)
        angle-=8*Math.PI/9
        return [r*Math.cos(angle),r*Math.sin(angle)]
    }
    drawarrow(c,x,y,velocity,angle){
    let newvector=new Pvector(velocity.x,velocity.y)
    newvector.setmag(100)
    c.beginPath();
    c.moveTo(x, y);
    c.lineTo(x+newvector.x, y+newvector.y);
    let xy1=this.rotaterightvector(x+newvector.x, y+newvector.y)
    c.lineTo(xy1[0],xy1[1])
    c.moveTo(x+newvector.x, y+newvector.y);
    let xy2=this.rotateleftvector(x+newvector.x, y+newvector.y)
    c.lineTo(xy2[0],xy2[1])
    c.stroke()

    }
    display(c){
        this.drawarrow(c,this.location.x,this.location.y,this.velocity)
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
