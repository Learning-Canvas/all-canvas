import {Pvector} from './Pvector.js'
import {drawArrow,drawTriangle} from './Arrows.js'
let canvas=document.getElementById("canvas")
let c=canvas.getContext("2d")
canvas.width=innerWidth
canvas.height=innerHeight
class Agent{
    constructor(x,y,maxvelocity,maxforce){
        this.location=new Pvector(x,y)
        this.velocity=new Pvector(0,0)
        this.acceleration=new Pvector(0,0)
        this.maxvelocity=maxvelocity;
        this.maxforce=maxforce;
    }
    applyForce(force){
        force.limit(this.maxforce)
        this.acceleration.setmag(0)
        this.acceleration.add(force)
    }
    update(){
        this.velocity.add(this.acceleration)
        this.velocity.limit(this.maxvelocity)
        this.location.add(this.velocity)
    }
    show(c){
        let newvec=new Pvector(this.velocity.x,this.velocity.y)
        drawTriangle(c,this.location.x,this.location.y,this.location.x+newvec.x,this.location.y+newvec.y,15,"black")
    }
}
class Cell{
    constructor(x,y){
        this.location=new Pvector(x,y)
        // this.location.setangle(0)
    }
}
class Grid{
    constructor(width,height,resolution){
        this.grid=[]
        this.resolution=resolution;
        this.rows=width/resolution;
        this.cols=height/resolution;
        
    }
    createcells(){
        for(let i=0;i<this.rows;i++){
            this.grid.push([])
            for(let j=0;j<this.cols;j++){
                this.grid[i].push(new Cell(i*this.resolution,j*this.resolution))
            }
        }
    }
    show(c){
        for(let i=0;i<this.rows;i++){
            for(let j=0;j<this.cols;j++){
                drawArrow(c,this.grid[i][j].location.x,this.grid[i][j].location.y,this.grid[i][j].location.x+10,this.grid[i][j].location.y+10)
            }
        }
    }
}
let g1=new Grid(innerWidth,innerHeight,20)
g1.createcells()


let ag1=new Agent(innerWidth/2,innerHeight/2,10,10)
function animate(){
    c.clearRect(0,0,innerWidth,innerHeight)
    requestAnimationFrame(animate)
    let gravity=new Pvector(0,0.1)
    ag1.applyForce(gravity)
    ag1.update()
    ag1.show(c)
    g1.show(c)
}
animate()