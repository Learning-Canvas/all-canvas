import {Pvector} from './Pvector.js'
import {drawArrow} from './Arrows.js'
import { createNoise3D } from 'simplex-noise';
import {Noise} from 'noisejs';
const noise3D = createNoise3D();
var noise = new Noise(Math.random());
console.log(noise)
let canvas=document.getElementById("canvas")
let c=canvas.getContext("2d")
canvas.width=innerWidth
canvas.height=innerHeight
class fieldline{
    constructor(x,y,angle){
        this.x=x
        this.y=y
        this.force=new Pvector(1,1)
        this.force.setangle(angle)
        this.force.setmag(15)
    }
    setangle(angle){
        this.force.setangle(angle)
    }
}
class Grid{
    constructor(w,h,resolution){
        this.grid=[]
        this.rows=Math.floor(w/resolution)+10
        this.cols=Math.floor(h/resolution)+10
        this.resolution=resolution
    }
    createcells(time){
        for(let i=0;i<this.rows;i++){
            this.grid.push([])
            for(let j=0;j<this.cols;j++){
                this.grid[i].push(new fieldline(i*this.resolution,j*this.resolution,360*noise.simplex3(i/ 150, j / 150,time)))
            }
        }
    }
    updatecells(time){
        for(let i=0;i<this.rows;i++){
            for(let j=0;j<this.cols;j++){
                this.grid[i][j]=new fieldline(i*this.resolution,j*this.resolution,360*noise.simplex3(i/ 150, j / 150,time))
            }
        }
    }
    show(c){
        for(let i=0;i<this.rows;i++){
            for(let j=0;j<this.cols;j++){
               let vec=new Pvector(this.grid[i][j].x,this.grid[i][j].y)
               vec.add(this.grid[i][j].force)
               drawArrow(c,this.grid[i][j].x,this.grid[i][j].y,vec.x,vec.y)
            }
        }
    }
}
let time=0
let grid1=new Grid(innerWidth,innerHeight,40)
grid1.createcells(time) 
function animate(){
    c.clearRect(0,0,innerWidth,innerHeight)
    requestAnimationFrame(animate)
    time+=0.0001;
    grid1.updatecells(time)
    grid1.show(c)
    
}
animate()