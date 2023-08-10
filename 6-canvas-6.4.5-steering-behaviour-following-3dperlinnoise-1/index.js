import {Noise} from "noisejs"
import { Pvector } from "./Pvector.js"
import { drawArrow,drawTriangle, mousedrag } from "./Arrows.js"
let canvas=document.getElementById("canvas")
let c=canvas.getContext("2d")
canvas.width=innerWidth
canvas.height=innerHeight
var noise = new Noise(Math.random());
alert("click and drag to create agents and click g to see the grid")

class fieldline{

constructor(x,y,angle){
this.x=x
this.y=y
this.force=new Pvector(1,1)
this.force.setangle(angle)
this.force.setmag(10)
}

}

class Grid{
constructor(resolution){
    this.grid=[]
    this.rows=(innerWidth+100)/resolution
    this.cols=(innerHeight+100)/resolution
    this.resolution=resolution
}

creategrid(time){
for(let i=0;i<this.rows;i++){
    this.grid.push([])
    for(let j=0;j<this.cols;j++){
        this.grid[i].push(new fieldline(i*this.resolution,j*this.resolution,360*noise.simplex3(i / 100, j / 100,time/100)))
    }
}
}
updatenoise(time){
    for(let i=0;i<this.rows;i++){
        for(let j=0;j<this.cols;j++){
            this.grid[i][j]=new fieldline(i*this.resolution,j*this.resolution,360*noise.simplex3(i / 100, j / 100,time/100))
        }
    }
}
show(c){
    for(let i=0;i<this.rows;i++){
        for(let j=0;j<this.cols;j++){
            let newvec=this.grid[i][j].force.copy()
            newvec.add(new Pvector(this.grid[i][j].x,this.grid[i][j].y))
            drawArrow(c,this.grid[i][j].x,this.grid[i][j].y,newvec.x,newvec.y)
        }
    }

}   
}

class Agent{
constructor(x,y,maxvel){
    this.location=new Pvector(x,y)
    this.velocity=new Pvector(0,0)
    this.acceleration=new Pvector(0,0)
    this.maxvel=maxvel;
}
applyForce(force){
    this.acceleration.add(force)
}
update(){
    this.velocity.add(this.acceleration)
    this.velocity.limit(this.maxvel)
    this.acceleration.setmag(0)
    this.location.add(this.velocity)
    if(this.location.x<0){
        this.location.x=innerWidth
    }
    if(this.location.y<0){
        this.location.y=innerHeight
    }
    if(this.location.x>innerWidth){
        this.location.x=0
    }
    if(this.location.y>innerHeight){
        this.location.y=0
    }
}
show(c){
    let newvec=this.velocity.copy()
    newvec.add(this.location)
    drawTriangle(c,this.location.x,this.location.y,newvec.x,newvec.y,10,"red")
}
}

let agarr=[]
let time=0;
let grid1=new Grid(30)
let showgrid=true;

// let ag1=new Agent(100,100,10)

window.addEventListener("keypress",(e)=>{
    if(e.key==="g" || e.key==="G"){
        showgrid=!showgrid
    }
})
mousedrag(canvas,agarr,Agent)
grid1.creategrid(time)


function animate(){
    c.clearRect(0,0,innerWidth,innerHeight)
    requestAnimationFrame(animate)
    if(showgrid){
        grid1.show(c)
    }
    grid1.updatenoise(time)
    for(let i=0;i<agarr.length;i++){
        let newforce=new Pvector(0,0)
        let l=Math.floor(agarr[i].location.x/grid1.resolution)
        let m=Math.floor(agarr[i].location.y/grid1.resolution)
        newforce.add(grid1.grid[l][m].force)
        agarr[i].applyForce(newforce)
        agarr[i].update()
        agarr[i].show(c)
    }
    time+=0.01;
}
animate()