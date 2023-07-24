import {Pvector} from './Pvector.js'
import {drawArrow,perlinnoise,drawTriangle} from './Arrows.js'
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
        if(this.location.x<=0){
            this.location.x=innerWidth-1
        }
        if(this.location.y<=0){
            this.location.y=innerHeight-1
        }
        if(this.location.x>=innerWidth){
            this.location.x=1
        }
        if(this.location.y>=innerHeight){
            this.location.y=1
        }
    }
    show(c){
        
        let newvec=new Pvector(this.velocity.x,this.velocity.y)
        drawTriangle(c,this.location.x,this.location.y,this.location.x+newvec.x,this.location.y+newvec.y,15,"black")
    }
}
class fieldline{
    constructor(x,y,angle){
        this.location=new Pvector(x,y)
        this.force=new Pvector(1,1)
        this.force.setangle(angle*Math.PI/180)
        this.force.setmag(20)
    }
}
class Grid{
    constructor(width,height,resolution){
        this.grid=[]
        this.resolution=resolution;
        this.rows=(width/resolution)+1;
        this.cols=(height/resolution)+1;
    }
    createcells(){
        let perl1=new perlinnoise(20)
        for(let i=0;i<this.rows;i++){
            this.grid.push([])
            for(let j=0;j<this.cols;j++){
                this.grid[i].push(new fieldline(i*this.resolution,j*this.resolution,perl1.generate()*360))
            }
        }
    }
    show(c){
        for(let i=0;i<this.rows;i++){
            for(let j=0;j<this.cols;j++){
                let l=i*this.resolution
                let m=j*this.resolution
                drawArrow(c,l,m,l+this.grid[i][j].force.x,m+this.grid[i][j].force.y)
            }
        }
    }
}
let agarr=[]
let g1=new Grid(innerWidth,innerHeight,20)
let ag1=new Agent(innerWidth/2,innerHeight/2,3,1)

canvas.addEventListener("mousemove",(e)=>{
agarr.push(new Agent(e.clientX,e.clientY,3,1))
})
g1.createcells()
function animate(){
    c.clearRect(0,0,innerWidth,innerHeight)
    requestAnimationFrame(animate)
    // let currx=Math.floor(ag1.location.x/g1.resolution)+1
    // let curry=Math.floor(ag1.location.y/g1.resolution)+1
    // let currfieldline=new Pvector(g1.grid[currx][curry].force.x,g1.grid[currx][curry].force.y)
    // ag1.applyForce(currfieldline)
    // ag1.update()
    // ag1.show(c)
    for(let i=0;i<agarr.length;i++){
    let currx=Math.floor(agarr[i].location.x/g1.resolution)+1
    let curry=Math.floor(agarr[i].location.y/g1.resolution)+1
    let currfieldline=new Pvector(g1.grid[currx][curry].force.x,g1.grid[currx][curry].force.y)
    agarr[i].applyForce(currfieldline)
    agarr[i].update()
    agarr[i].show(c)
    }
    g1.show(c)
}
animate()