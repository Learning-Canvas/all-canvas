import { Pvector } from "./Pvector.js"
import { drawArrow,drawTriangle } from "./Arrows.js"
let canvas=document.getElementById("canvas")
let c=canvas.getContext("2d")
canvas.width=innerWidth
canvas.height=innerHeight
// c.translate(innerWidth/2, innerHeight/2);


class Cell{
    constructor(theta,x,y){
        this.vec=new Pvector(1,1)
        this.vec.setangle(theta*(Math.PI/180))
        this.vec.setmag(20)
        this.x=x
        this.y=y
    }
}
class Grid{
constructor(resolution){
    this.grid=[]
    this.resolution=resolution
    this.rows=Math.floor(innerWidth/this.resolution)
    this.cols=Math.floor(innerHeight/this.resolution)
}
createCells(){
    for(let i=0;i<this.cols;i++){
        this.grid.push([])
        for(let j=0;j<this.rows;j++){
            this.grid[i].push(new Cell(30*Math.random(),j*this.resolution,i*this.resolution))
        }
    }    
}
show(c){
    // drawArrow(c,this.grid[0][0].vec.x,this.grid[0][0].vec.y,2*this.grid[0][0].vec.x,2*this.grid[0][0].vec.y)
    for(let i=0;i<this.cols;i++){
        for(let j=0;j<this.rows;j++){
            // console.log(this.grid[i][j].x,this.grid[i][j].y)
            c.strokeStyle="black"
            drawArrow(c,this.grid[i][j].x,this.grid[i][j].y,this.grid[i][j].x+this.grid[i][j].vec.x,this.grid[i][j].y+this.grid[i][j].vec.y)
        }
    }
}
}
class Agent{
constructor(x,y){
    this.location=new Pvector(x,y)
    this.velocity=new Pvector(0,0)
    this.acceleration=new Pvector(0,0)
    this.velocitylimit=1
}
applyForce(force){
this.acceleration.setmag(0)
this.acceleration.add(force)
this.velocity.add(this.acceleration)
this.velocity.limit(this.velocitylimit)
this.location.add(this.velocity)
}
display(c){
    let newvector=new Pvector(this.velocity.x,this.velocity.y)
    newvector.setmag(1)
    drawTriangle(c, this.location.x, this.location.y, this.location.x+newvector.x, this.location.y+newvector.y, 10, "red")
}
}

let g1=new Grid(25)
g1.createCells()
let agents=[]
let ag1=new Agent(innerWidth/2,innerHeight/2)
canvas.addEventListener("mousedown",(e)=>{
    agents.push(new Agent(e.clientX,e.clientY))
})
function animate(){
    c.clearRect(0,0,innerWidth,innerHeight)
    requestAnimationFrame(animate)
    let i=Math.floor(ag1.location.y/g1.resolution)
    let j=Math.floor(ag1.location.x/g1.resolution) 
    
    if(ag1.location.y/g1.resolution<g1.cols && ag1.location.x/g1.resolution<g1.rows){
        ag1.applyForce(g1.grid[i][j].vec)
    }
    g1.show(c)
    //----for debugging the testagent----------
    // c.strokeStyle="red"
    // drawArrow(c,g1.grid[i][j].x,g1.grid[i][j].y,g1.grid[i][j].x+g1.grid[i][j].vec.x,g1.grid[i][j].y+g1.grid[i][j].vec.y)
    ag1.display(c)
    //----for debugging the testagent----------

    //--------------------for more agents------------

    for(let k=0;k<agents.length;k++){
        let l=Math.floor(agents[k].location.y/g1.resolution)
        let m=Math.floor(agents[k].location.x/g1.resolution) 
        if(agents[k].location.y/g1.resolution<g1.cols && agents[k].location.x/g1.resolution<g1.rows){
            agents[k].applyForce(g1.grid[l][m].vec)
        }
        agents[k].display(c)
        
    }
    //--------------------for more agents------------
}

animate()