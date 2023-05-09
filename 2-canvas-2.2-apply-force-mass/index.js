import { Pvector } from "./Pvector.js"
let canvas=document.getElementById('canvas')
canvas.width=innerWidth
canvas.height=innerHeight
let c=canvas.getContext("2d");
alert("click mouse to create wind force to left")
class Mover{
    constructor(){
        this.location=new Pvector(innerWidth/2,innerHeight/2);
        this.veloctiy=new Pvector(0,0);
        this.acceleration=new Pvector(0,0);
        let size=Math.random()*50;
        this.radius=size;
        this.mass=size/10;
    }
    draw(c){
        c.beginPath();
        c.arc(this.location.x,this.location.y,this.radius,0,2*Math.PI,false);
        c.stroke();
    }
    update(){
        // this.veloctiy.add(this.acceleration);
        // this.location.add(this.veloctiy);
        // this.acceleration.mult(0);
    }
    edges(){
        if(this.location.x-this.radius<=0 ){
            this.location.x=this.radius;
            this.veloctiy.x=-1*this.veloctiy.x;
        }
        if( this.location.x+this.radius>=innerWidth){
            this.location.x=innerWidth-this.radius;
            this.veloctiy.x=-1*this.veloctiy.x;
        }
        if(this.location.y-this.radius<=0){
            this.location.y=this.radius;
            this.veloctiy.y=-1*this.veloctiy.y;
        }
        if(this.location.y+this.radius>=innerHeight){
           this.location.y=innerHeight-this.radius;
            this.veloctiy.y=-1*this.veloctiy.y;
        }
    }
    applyForce(force){
        this.acceleration.mult(0);
        force.div(this.mass)
        this.acceleration.add(force)
        this.veloctiy.add(this.acceleration);
        this.location.add(this.veloctiy);
    }
    display(c){
        c.beginPath();
        c.arc(this.location.x,this.location.y,this.radius,0,2*Math.PI,false);
        c.stroke();
    }
}
let m1=new Mover();
let movers=[]
for(let i=0;i<10;i++){
    movers.push(new Mover());
    movers[i].draw(c)
}
window.addEventListener("mousedown",setwind)
function setwind(){
    let wind=new Pvector(-3,0);
    m1.applyForce(wind)
    for(let i=0;i<movers.length;i++){
        wind=new Pvector(-3,0);
        movers[i].applyForce(wind);
    }
}

m1.draw(c)
function animate(){
    c.clearRect(0,0,innerWidth,innerHeight)
    requestAnimationFrame(animate)
    // m1.update()
    let gravity=new Pvector(0,0.5);
    gravity.mult(m1.mass)
    m1.applyForce(gravity)
    m1.edges()
    m1.display(c)
    for(let i=0;i<movers.length;i++){
        // movers[i].update()
        let gravity=new Pvector(0,0.5);
        gravity.mult(movers[i].mass)
        movers[i].applyForce(gravity)
        movers[i].edges()
        movers[i].display(c)
    }
}
animate();