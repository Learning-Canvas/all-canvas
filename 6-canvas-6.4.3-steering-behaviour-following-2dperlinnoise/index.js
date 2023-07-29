import { Pvector } from "./Pvector.js";
import { drawArrow,perlin2D } from "./Arrows.js";
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
       this.force.setangle(angle)
    }
}

class Grid{

constructor(w,h,resolution){
    this.grid=[]
    this.rows=w/resolution
    this.cols=h/resolution
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
show(c){
    console.log(this.grid)
    for(let i=0;i<this.rows;i++){
        for(let j=0;j<this.cols;j++){
            let newvec=this.grid[i][j].force.copy();
            newvec.setmag(10)
            newvec.add(new Pvector(this.grid[i][j].x,this.grid[i][j].y))
            drawArrow(c,this.grid[i][j].x,this.grid[i][j].y,newvec.x,newvec.y)
        }
    }
}

}

let grid1=new Grid(innerWidth,innerHeight,30)
grid1.creategrid()
grid1.show(c)
// function animate(){
//     requestAnimationFrame(animate)

// }
// animate()