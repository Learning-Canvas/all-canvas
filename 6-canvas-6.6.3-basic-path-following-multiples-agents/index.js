import {Pvector} from './Pvector.js'
import {drawTriangle} from './Arrows.js'
let canvas=document.getElementById("canvas")
let c=canvas.getContext("2d")
canvas.width=innerWidth
canvas.height=innerHeight
function line(c,linex){
    c.beginPath()
    c.moveTo(linex.start.x,linex.start.y)
    c.lineTo(linex.end.x,linex.end.y)
    c.stroke()
}
function liner(c,linex,radius){
    c.beginPath()
    c.moveTo(linex.start.x,linex.start.y+radius)
    c.lineTo(linex.end.x,linex.end.y+radius)
    c.stroke()
}
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
class Agent{
    constructor(x,y,velocitylimit,forcelimit){
        this.location=new Pvector(x,y)
        this.velocity=new Pvector(1,0)
        this.acceleration=new Pvector(0,0)
        this.forcelimit=forcelimit
        this.velocitylimit=velocitylimit
    }
    seek(path){
        
    }
    applyForce(force){
        force.limit(this.forcelimit)
        this.acceleration.add(force)
    }
    update(){
        this.velocity.add(this.acceleration)
        this.velocity.limit(this.velocitylimit)
        this.location.add(this.velocity)
        this.acceleration.setmag(0)
    }
    show(c){
        drawTriangle(c,this.location.x,this.location.y,this.location.x+this.velocity.x,this.location.y+this.velocity.y,10,"black")
    }
}
class Line{
    constructor(x1,y1,x2,y2){
        this.start=new Pvector(x1,y1)
        this.end=new Pvector(x2,y2)
    }
}
class Path{
    constructor(radius){
        this.lines=[]
        this.radius=radius
    }
    createlines(xlines){
        let currx=0
        let curry=innerHeight/3
        let inc=innerWidth/xlines
        for(let i=0;i<xlines;i++){
            let newx=currx+inc
            let newy=randomInteger(innerHeight/3,2*innerHeight/3)
            this.lines.push(new Line(currx,curry,newx,newy))
            currx=newx
            curry=newy;
        }
    }
    show(c){
        for(let i=0;i<this.lines.length;i++){
            liner(c,this.lines[i],this.radius)
            line(c,this.lines[i])
            liner(c,this.lines[i],-1*this.radius)
        }
    }
}
let ag1=new Agent(innerWidth/2,innerHeight/2)
let p1=new Path(20)
p1.createlines(10)

function animate(){
    c.clearRect(0,0,innerWidth,innerHeight)
    requestAnimationFrame(animate)
    ag1.seek(p1)
    ag1.update()
    ag1.show(c)
    p1.show(c)
}
animate()