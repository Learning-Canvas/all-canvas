import { Pvector } from "./Pvector.js"
import { drawArrow,drawTriangle,perlinnoise,drawCircle } from "./Arrows.js"
let canvas=document.getElementById("canvas")
let c=canvas.getContext("2d")
canvas.width=innerWidth
canvas.height=innerHeight
let showinggrid=true;
alert("press g to see the grid")
// c.translate(innerWidth/2, innerHeight/2);
//new perlinnoise(smoothness of perlin noise if randomness a lot more smoother just increase the number)
let perl1=new perlinnoise(8)
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
    this.rows=innerWidth/this.resolution
    this.cols=innerHeight/this.resolution
}
createCells(){
    for(let i=0;i<this.cols;i++){
        this.grid.push([])
        for(let j=0;j<this.rows;j++){
            
            this.grid[i].push(new Cell(perl1.generate(10)*360+90,j*this.resolution,i*this.resolution))
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
    this.velocitylimit=4
}
applyForce(force){  
this.acceleration.setmag(0)
this.acceleration.add(force)
}
update(){
    this.velocity.add(this.acceleration)
    this.velocity.limit(this.velocitylimit)
    this.location.add(this.velocity)
    if(this.location.x>=innerWidth){
        this.location.x=10
    }
    if(this.location.x<=0){
        this.location.x=innerWidth-10
    }
    if(this.location.y>=innerHeight){
        this.location.y=10
    }
    if(this.location.y<=0){
        this.location.y=innerHeight-10
    }
}
display(c){
    let newvector=new Pvector(this.velocity.x,this.velocity.y)
    newvector.setmag(10)
    drawTriangle(c, this.location.x, this.location.y, this.location.x+newvector.x, this.location.y+newvector.y, 10, "red")
    // drawCircle(c, this.location.x, this.location.y, this.location.x+newvector.x, this.location.y+newvector.y, 5, "red")
}
}

let g1=new Grid(25)
g1.createCells()
let agents=[]
// let ag1=new Agent(innerWidth/2,innerHeight/2)
canvas.addEventListener("mousemove",(e)=>{
    agents.push(new Agent(e.clientX,e.clientY))
})
function showgrid(e){
if(e.key==="g" ||e.key==="G"){
    showinggrid=!showinggrid;
}

}
window.addEventListener("keydown",(e)=>{showgrid(e)})

function animate(){
   
    c.clearRect(0,0,innerWidth,innerHeight)
    
    requestAnimationFrame(animate)
    // let i=Math.floor(ag1.location.y/g1.resolution)+1
    // let j=Math.floor(ag1.location.x/g1.resolution)+1
    
    // if(ag1.location.y/g1.resolution>=0 && ag1.location.x/g1.resolution &&ag1.location.y/g1.resolution<g1.cols && ag1.location.x/g1.resolution<g1.rows){
        // ag1.applyForce(g1.grid[i][j].vec)
        // ag1.display(c)
    // }
    
    //----for debugging the testagent----------
    // c.strokeStyle="red"
    // drawArrow(c,g1.grid[i][j].x,g1.grid[i][j].y,g1.grid[i][j].x+g1.grid[i][j].vec.x,g1.grid[i][j].y+g1.grid[i][j].vec.y)
    
    //----for debugging the testagent----------

    //--------------------for more agents------------
    for(let k=0;k<agents.length;k++){
        let l=Math.floor(agents[k].location.y/g1.resolution)+1
        let m=Math.floor(agents[k].location.x/g1.resolution)+1
        if(l>=0 && m>=0 && l<g1.cols && m<g1.rows){
            agents[k].applyForce(g1.grid[l][m].vec)
            agents[k].update()
        }
        else{
            agents[k].update()
        }
        agents[k].display(c)
      
    }
    if(showinggrid){
        g1.show(c)
    }
    
    //--------------------for more agents------------
}

animate()