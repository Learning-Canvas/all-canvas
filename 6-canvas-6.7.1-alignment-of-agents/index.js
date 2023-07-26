import {Pvector} from './Pvector.js'
import { drawCircle,random,mousedrag } from './Arrows.js'
let canvas=document.getElementById("canvas")
let c=canvas.getContext("2d")
canvas.width=innerWidth
canvas.height=innerHeight
class Agent{
    constructor(x,y,maxvelocity){
        this.location=new Pvector(x,y)
        this.velocity=new Pvector(random(-10,10),random(-10,10))
        this.acceleration=new Pvector(0,0)
        this.maxvelocity=maxvelocity
    }
    align(agarr){
     
        let sum=new Pvector(0,0)
        for(let i=0;i<agarr.length;i++){

            sum.add(agarr[i].velocity)
        }
        sum.div(agarr.length)
        sum.setmag(this.velocity.mag())
        this.velocity=sum
    }
    update(){
        this.velocity.add(this.acceleration)
        this.velocity.limit(this.maxvelocity)
        this.location.add(this.velocity)
        this.acceleration.setmag(0)
        if(this.location.x<0){
            this.location.x=innerWidth
        }
        if(this.location.y<0){
            this.location.y=innerHeight
        }
        if(this.location.x>innerWidth)
        {
            this.location.x=0
        }
        if(this.location.y>innerHeight){
            this.location.y=0
        }
    }
    show(c){
        let newvec=this.velocity.copy()
        newvec.setmag(20)
        newvec.add(this.location)
        drawCircle(c,this.location.x,this.location.y,newvec.x,newvec.y,10,"white")
    }
}
let agarr=[]
mousedrag(canvas,agarr,Agent)

function animate(){
    c.clearRect(0,0,innerWidth,innerHeight)
    requestAnimationFrame(animate)
    for(let i=0;i<agarr.length;i++){
        agarr[i].align(agarr)
        agarr[i].update()
        agarr[i].show(c)
    }
}
animate()