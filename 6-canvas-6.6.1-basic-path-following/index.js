import {Pvector} from './Pvector.js'
import { drawTriangle } from './Arrows.js'
let canvas=document.getElementById("canvas")
let c=canvas.getContext("2d")
canvas.width=innerWidth
canvas.height=innerHeight
function lineto(c,x1,y1,x2,y2){
    c.beginPath()
    c.moveTo(x1,y1)
    c.lineTo(x2,y2)
    c.stroke()
}
function circle(c,x,y){
c.beginPath()
c.arc(x,y,5,0,Math.PI*2,false)
c.stroke()
}
class Path{
    constructor(x1,y1,x2,y2,radius){
        this.start=new Pvector(x1,y1)
        this.end=new Pvector(x2,y2)
        this.radius=radius
    }
    show(c){
        c.strokeStyle="black"
        lineto(c,this.start.x,this.start.y-this.radius,this.end.x,this.end.y-this.radius)
        lineto(c,this.start.x,this.start.y,this.end.x,this.end.y)
        lineto(c,this.start.x,this.start.y+this.radius,this.end.x,this.end.y+this.radius)
        
    }
}
class Agent{
constructor(x,y,velocitylimit,forcelimit){
    this.location=new Pvector(x,y)
    this.velocity=new Pvector(1,0)
    this.acceleration=new Pvector(0,0)
    this.newvel=new Pvector(1,1)
    this.newvel.setmag(1)
    this.forcelimit=forcelimit
    this.velocitylimit=velocitylimit
    this.littlebitalongtarget=100
    this.futurelookuplen=100
}
seek(path){
    let futureplace=new Pvector(this.velocity.x,this.velocity.y)
    futureplace.setmag(this.futurelookuplen)
    futureplace.add(this.location)
    circle(c,futureplace.x,futureplace.y)
    let bbar=path.end.subvector(path.start)
    let abar=futureplace.subvector(path.start)
    let adjlen=(abar.dot(bbar))/bbar.mag()
    let adj=new Pvector(bbar.x,bbar.y)
    
    bbar.setmag(adjlen)
    bbar.add(path.start)
    circle(c,bbar.x,bbar.y)
    adj.setmag(adjlen+this.littlebitalongtarget)
    adj.add(path.start)
    lineto(c,futureplace.x,futureplace.y,bbar.x,bbar.y)
    let dist=bbar.subvector(futureplace).mag()
    
    if(dist>path.radius){
        c.fillStyle="red"
        circle(c,adj.x,adj.y)
        let target=adj.subvector(this.location)
        this.applyForce(target)
    }
    else{
        c.fillStyle="black"
        circle(c,adj.x,adj.y)
    }
    c.fill()
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
    if(this.location.x>=innerWidth){
        this.location.x=1
    }
    if(this.location.x<=0){
        this.location.x=innerWidth-1
    }
    if(this.location.y>=innerHeight){
        this.location.y=1
    }
    if(this.location.y<=0){
        this.location.y=innerHeight-1
    }
}

show(c){
    this.newvel=new Pvector(this.velocity.x,this.velocity.y)
    this.newvel.setmag(30)
    drawTriangle(c,this.location.x,this.location.y,this.location.x+this.newvel.x,this.location.y+this.newvel.y,this.newvel.mag(),"#e1ae36")
    // c.beginPath()
    // c.arc(this.location.x,this.location.y,20,0,Math.PI*2,false)
    // c.stroke()
}
}

let ag1=new Agent(innerWidth/2,100,3,3)
let p1=new Path(0,innerHeight/3,innerWidth,innerHeight/1.7,20)
function animate(){
    c.clearRect(0,0,innerWidth,innerHeight)
    requestAnimationFrame(animate)
    ag1.seek(p1)
    ag1.update()
    ag1.show(c)
    p1.show(c)
}
animate()