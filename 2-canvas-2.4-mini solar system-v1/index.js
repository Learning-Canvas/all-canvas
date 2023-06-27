import { Pvector } from "./Pvector.js";

let canvas=document.getElementById('canvas');
canvas.width=innerWidth;
canvas.height=innerHeight;
let c=canvas.getContext("2d");

class Sun{
    constructor(radius,x,y,mass){
        this.radius=radius
        this.mass=mass
        this.location=new Pvector(x,y)
        this.velocity=new Pvector(0,0)
        this.acceleration=new Pvector(0,0)
    }
    display(c){
        c.beginPath()
        c.arc(this.location.x,this.location.y,this.radius,0,Math.PI*2,false);
        c.stroke()
    }
}
class Planet{
    constructor(radius,x,y,mass){
        this.radius=radius
        this.mass=mass
        this.location=new Pvector(x,y)
        this.velocity=new Pvector(0,10)
        this.acceleration=new Pvector(0,0)
    }
    
    applygravity(sun){
        this.accelerationdirection=this.location.subvector(sun.location)
        this.dist=new Pvector(this.accelerationdirection.x,this.accelerationdirection.y)
        this.accelerationdirection.setmag(-1);
        this.acceleration=this.accelerationdirection
        this.velocity.add(this.acceleration)
        this.location.add(this.velocity)
    }
    display(c){
        c.beginPath()
        c.arc(this.location.x,this.location.y,this.radius,0,Math.PI*2,false);
        c.stroke()
    }
}
let s1=new Sun(50,innerWidth/2,innerHeight/2,10000)
let p1=new Planet(20,innerWidth/2+100,innerHeight/2,100)
let p2=new Planet(20,innerWidth/2+150,innerHeight/2,100)
let p3=new Planet(20,innerWidth/2+200,innerHeight/2,100)
let p4=new Planet(20,innerWidth/2+250,innerHeight/2,100)

function animate(){
    c.clearRect(0,0,innerWidth,innerHeight)
    requestAnimationFrame(animate)
    s1.display(c)
    p1.applygravity(s1)
    p1.display(c)
    p2.applygravity(s1)
    p2.display(c)
    p3.applygravity(s1)
    p3.display(c)
    p4.applygravity(s1)
    p4.display(c)
}
animate()