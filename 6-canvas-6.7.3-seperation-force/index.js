import {Pvector} from './Pvector.js'
import {drawCircle, random} from './Arrows.js'
let canvas=document.getElementById("canvas")
let c=canvas.getContext("2d")
canvas.width=innerWidth
canvas.height=innerHeight

class Agent{
    constructor(x,y,velocitylimit){
        this.location=new Pvector(x,y)
        this.velocity=new Pvector(random(-5,10),random(-5,10))
        this.acceleration=new Pvector(0,0)
        this.velocitylimit=velocitylimit
    }
    repel(agarr){

    }
    update(){
        this.velocity.add(this.acceleration)
        this.velocity.limit(this.velocitylimit)
        this.location.add(this.velocity)
    }
    show(c){
        let newvec=this.velocity.copy()
        newvec.setmag(15)
        newvec.add(this.location)
        
        drawCircle(c,this.location.x,this.location.y,newvec.x,newvec.y,10,"white")
    }
}
let agarr=[]
window.addEventListener("mousedown",(e)=>{
    agarr.push(new Agent(e.clientX,e.clientY))
})
function animate(){
    c.clearRect(0,0,innerWidth,innerHeight)
    requestAnimationFrame(animate)
    for(let i=0;i<agarr.length;i++){
        agarr[i].update()
        agarr[i].show(c)
    }
}
animate()