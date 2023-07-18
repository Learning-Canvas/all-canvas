import { Pvector } from "./Pvector.js"
import { drawCircle } from "./Arrows.js"
let canvas=document.getElementById("canvas")
let c=canvas.getContext("2d")
canvas.width=innerWidth
canvas.height=innerHeight
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}
let projectionstart=new Pvector(0,innerHeight)
let projectionend=new Pvector(innerWidth,innerHeight)
let bottom=projectionend.subvector(projectionstart)

class Agent{
    constructor(){
        this.location=new Pvector(randomIntFromInterval(0,innerWidth),randomIntFromInterval(0,innerHeight))
        this.velocity=new Pvector(randomIntFromInterval(-5,5),randomIntFromInterval(-0.5,0.5))
        this.acceleration=new Pvector(0,0)
    }
    update(){
        this.velocity.add(this.acceleration)
        this.location.add(this.velocity)
        if(this.location.x>innerWidth){
            this.location.x=0
        }
        if(this.location.y>innerHeight){
            this.location.y=0
        }
        if(this.location.x<0){
            this.location.x=innerWidth
        }
        if(this.location.y<0){
            this.location.y=innerHeight
        }
    }
    project(c,vector){
        let abar=this.location.subvector(projectionstart)
        let dot=abar.dot(vector)/vector.mag()
        let projection=new Pvector(vector.x,vector.y)
        projection.setmag(dot)
        projection.add(projectionstart)
        c.beginPath()
        c.moveTo(this.location.x,this.location.y)
        c.lineTo(projection.x,projection.y)
        c.stroke()

    }
    dispaly(c){
        let newvec=new Pvector(this.velocity.x,this.velocity.y)
        newvec.setmag(20)
        drawCircle(c, this.location.x, this.location.y, this.location.x+newvec.x, this.location.y+newvec.y, 10, "red")
    }
}
let agents=[]
for(let i=0;i<10;i++){
    agents.push(new Agent())
}

function animate(){
    c.clearRect(0,0,innerWidth,innerHeight)
    requestAnimationFrame(animate)
    for(let i=0;i<agents.length;i++){
        agents[i].update()
        agents[i].dispaly(c)
        agents[i].project(c,bottom)
    }
}
animate()