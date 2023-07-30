import { Pvector } from "./Pvector.js";
import { drawArrow,drawTriangle,mousedrag } from "./Arrows.js";
import { createNoise2D } from 'simplex-noise';

let canvas=document.getElementById("canvas")
let c=canvas.getContext("2d")
canvas.width=innerWidth
canvas.height=innerHeight

const noise2D = createNoise2D();

class fieldline{
    constructor(x,y,angle){
       this.x=x;
       this.y=y;
       this.force=new Pvector(1,1);
       this.force.setmag(10)
       this.force.setangle(angle)
    }
}

class Grid{
constructor(w,h,resolution){
    this.grid=[]
    this.rows=(w/resolution)+10
    this.cols=(h/resolution)+10
    this.resolution=resolution
}

creategrid(){
    for(let i=0;i<=this.rows;i++){
        this.grid.push([])
        for(let j=0;j<=this.cols;j++){
            this.grid[i].push(new fieldline(i*this.resolution,j*this.resolution,noise2D(i*this.resolution,j*this.resolution)*180))
        }
    }
}
changecolor(x,y){
    c.strokeStyle="red"
    let newvec=this.grid[x][y].force.copy();
    newvec.setmag(12)
    newvec.add(new Pvector(this.grid[x][y].x,this.grid[x][y].y))
    drawArrow(c,this.grid[x][y].x,this.grid[x][y].y,newvec.x,newvec.y)
}
show(c){
    c.strokeStyle="black"
    for(let i=0;i<this.rows;i++){
        for(let j=0;j<this.cols;j++){
            let newvec=this.grid[i][j].force.copy();
            newvec.setmag(12)
            newvec.add(new Pvector(this.grid[i][j].x,this.grid[i][j].y))
            drawArrow(c,this.grid[i][j].x,this.grid[i][j].y,newvec.x,newvec.y)
        }
    }
}
}

class Agent{
    constructor(x,y,velocitylimit){
        this.location=new Pvector(x,y)
        this.velocity=new Pvector(1,0)
        this.acceleration=new Pvector(0,0)
        this.velocitylimit=velocitylimit
    }
    takeforce(grid){
        let x=Math.floor(this.location.x/grid.resolution)+1
        let y=Math.floor(this.location.y/grid.resolution)+1
        grid.changecolor(x,y)
        this.applyForce(grid.grid[x][y].force)
    }
    applyForce(force){
        this.acceleration.add(force)
    }
    update(){
        this.velocity.add(this.acceleration)
        this.velocity.limit(this.velocitylimit)
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
        newvec.setmag(15)
        newvec.add(this.location)
        drawTriangle(c,this.location.x,this.location.y,newvec.x,newvec.y,10,"red")
    }
}

let agarr=[]
let grid1=new Grid(innerWidth,innerHeight,20)
grid1.creategrid()
mousedrag(canvas,agarr,Agent)
window.addEventListener("mousedown",(e)=>{
    agarr.push(new Agent(e.clientX,e.clientY,1))
})
function animate(){
    c.clearRect(0,0,innerWidth,innerHeight)
    requestAnimationFrame(animate)
    grid1.show(c)
    for(let i=0;i<agarr.length;i++){
        agarr[i].takeforce(grid1)
        agarr[i].update()
        agarr[i].show(c)
    }
   
    
}
animate()