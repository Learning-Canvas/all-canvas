import {Pvector} from './Pvector.js'
import {drawTriangle,mousedrag} from './Arrows.js'
let canvas=document.getElementById("canvas")
let c=canvas.getContext("2d")
canvas.width=innerWidth
canvas.height=innerHeight
let showingtarget=false
alert("click and drag to create agents")
function circle(c,x,y){
    c.beginPath()
    c.arc(x,y,5,0,Math.PI*2,false)
    c.stroke()
}
class Agent{
constructor(x,y,velocitylimit,forcelimit,futureseen,littlebit){
this.location=new Pvector(x,y)
this.velocity=new Pvector(1,0)
this.acceleration=new Pvector(0,0)
this.velocitylimit=velocitylimit
this.forcelimit=forcelimit
this.futureseen=futureseen
this.littlebit=littlebit
}
seek(c,path){
let futureplace=new Pvector(this.velocity.x,this.velocity.y)
futureplace.setmag(this.futureseen)
futureplace.add(this.location)
if(showingtarget){
    circle(c,futureplace.x,futureplace.y)
}

let bbar=path.end.subvector(path.start)
let abar=futureplace.subvector(path.start)
let adjlen=abar.dot(bbar)/bbar.mag()
let adjbar=new Pvector(bbar.x,bbar.y)
adjbar.setmag(adjlen)
adjbar.add(path.start)
if(showingtarget){
    circle(c,adjbar.x,adjbar.y)
}

let littlebitmore=new Pvector(bbar.x,bbar.y)
littlebitmore.setmag(adjlen+this.littlebit)
littlebitmore.add(path.start)
let dist=futureplace.subvector(adjbar).mag()
if(dist>path.radius){
    c.fillStyle="red"
    
    
    this.applyforce(littlebitmore.subvector(this.location))
}
else{
    c.fillStyle="black"
}
if(showingtarget){
    circle(c,littlebitmore.x,littlebitmore.y)
    c.fill()
}
}
applyforce(force){
force.limit(this.forcelimit)
this.acceleration.add(force)
}
update(){
    this.velocity.add(this.acceleration)
    this.velocity.limit(this.velocitylimit)
    this.location.add(this.velocity)
    this.acceleration.setmag(0)
    if(this.location.x<=0){
        this.location.x=innerWidth-1
    }
    if(this.location.x>=innerWidth){
        this.location.x=1
    }

}
show(c){
    let newvec=new Pvector(this.velocity.x,this.velocity.y)

    drawTriangle(c,this.location.x,this.location.y,this.location.x+newvec.x,this.location.y+newvec.y,10,"#402F61")
}
}

class Path{
    constructor(x1,y1,x2,y2,radius){
        this.start=new Pvector(x1,y1)
        this.end=new Pvector(x2,y2)
        this.radius=radius
    }
    show(c){
        c.strokeStyle="black"
        //topline
        c.beginPath()
        c.moveTo(this.start.x,this.start.y-this.radius)
        c.lineTo(this.end.x,this.end.y-this.radius)
        c.stroke()
        //main line
        c.beginPath()
        c.moveTo(this.start.x,this.start.y)
        c.lineTo(this.end.x,this.end.y)
        c.stroke()
        //bottomline
        c.beginPath()
        c.moveTo(this.start.x,this.start.y+this.radius)
        c.lineTo(this.end.x,this.end.y+this.radius)
        c.stroke()

    }
}
let agentarr=[]

// let ag1=new Agent(innerWidth/2,innerHeight/2,1,1,50,50)
window.addEventListener("keydown",(e)=>{
    if(e.key==="t" || e.key==="T"){
        showingtarget=!showingtarget
    }
})
mousedrag(canvas,agentarr,Agent)
let p1=new Path(0,innerHeight/3,innerWidth,innerHeight/2,30)
function animate(){
    c.clearRect(0,0,innerWidth,innerHeight)
    requestAnimationFrame(animate)
    for(let i=0;i<agentarr.length;i++){
        agentarr[i].seek(c, p1)
        agentarr[i].update()
        agentarr[i].show(c)
    }
    // ag1.seek(c,p1)
    // ag1.update()
    // ag1.show(c)
    p1.show(c)
}
animate()