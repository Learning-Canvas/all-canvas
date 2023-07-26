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
function circle(c,x,y){
    c.beginPath()
    c.arc(x,y,10,0,Math.PI*2,false)
    c.stroke()
}
class Agent{
    constructor(x,y,velocitylimit,forcelimit){
        this.location=new Pvector(x,y)
        this.velocity=new Pvector(1,0)
        this.acceleration=new Pvector(0,0)
        this.forcelimit=forcelimit
        this.velocitylimit=velocitylimit
        this.futurevelocity=30
        this.littlebitmore=30
    }
    ontheline(normal,x1,y1,x2,y2){
        if(y1<=normal.y && normal.y<=y2){
            return true
        }
        if(y2<=normal.y && normal.y<=y1){
            return true
        }
        return false;
    }
    seek(c,path){
        let futureplace=new Pvector(this.velocity.x,this.velocity.y)
        futureplace.setmag(this.futurevelocity)
        futureplace.add(this.location)
        circle(c,futureplace.x,futureplace.y)
        let smallestdistance=99999999999999;
        let smallestdistanceline=-1;
        for(let i=0;i<path.lines.length;i++){
            let abar=futureplace.subvector(path.lines[i].start)
            let bbar=path.lines[i].end.subvector(path.lines[i].start)
            let adjbar=new Pvector(bbar.x,bbar.y)
            let adjlen=abar.dot(bbar)/bbar.mag()
            adjbar.setmag(adjlen)
            adjbar.add(path.lines[i].start)
            let dist=futureplace.subvector(adjbar)
            dist=dist.mag()
            if(smallestdistance>dist){
                if(this.ontheline(adjbar,path.lines[i].start.x,path.lines[i].start.y,path.lines[i].end.x,path.lines[i].end.y)){
                    smallestdistance=dist;
                    smallestdistanceline=i;
                }
            }
        }
        
        console.log(smallestdistanceline)
        // circle(c,path.lines[smallestdistanceline].start.x,path.lines[smallestdistanceline].start.y)
        let abar=futureplace.subvector(path.lines[smallestdistanceline].start)
        // circle(c,path.lines[smallestdistanceline].end.x,path.lines[smallestdistanceline].end.y)
        let bbar=path.lines[smallestdistanceline].end.subvector(path.lines[smallestdistanceline].start)
        let adjbar=new Pvector(bbar.x,bbar.y)
        let adjlen=abar.dot(bbar)/bbar.mag()
        adjbar.setmag(adjlen)
        let target=new Pvector(adjbar.x,adjbar.y)
        adjbar.add(path.lines[smallestdistanceline].start)
        circle(c,adjbar.x,adjbar.y)
        target.setmag(adjlen+this.littlebitmore)
        target.add(path.lines[smallestdistanceline].start)
        circle(c,target.x,target.y)
        this.applyForce(target.subvector(this.location))
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
        if(this.location.x<=30){
            this.location.x=innerWidth-30
        }
        if(this.location.x>=innerWidth-30){
            this.location.x=30
        }
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
let ag1=new Agent(innerWidth/2,innerHeight/2,0.1,0.1)
window.addEventListener("mousedown",(e)=>{
    ag1=new Agent(e.clientX,e.clientY,5,5)
    animate()
})

let p1=new Path(40)
p1.createlines(3)

function animate(){
    c.clearRect(0,0,innerWidth,innerHeight)
    requestAnimationFrame(animate)
    ag1.seek(c,p1)
    ag1.update()
    ag1.show(c)
    p1.show(c)
}
