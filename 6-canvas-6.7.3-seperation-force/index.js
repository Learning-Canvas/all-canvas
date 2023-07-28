import {Pvector} from './Pvector.js'
import {drawCircle, random} from './Arrows.js'
let canvas=document.getElementById("canvas")
let c=canvas.getContext("2d")
canvas.width=innerWidth
canvas.height=innerHeight

class Agent{
    constructor(x,y,velocitylimit){
        this.location=new Pvector(x,y)
        this.velocity=new Pvector(random(-5,5),random(-5,5))
        this.acceleration=new Pvector(0,0)
        this.velocitylimit=velocitylimit
    }
    repel(agarr){
        let sum=new Pvector(0,0)
        let count=0
        for(let i=0;i<agarr.length;i++){
            let dist=this.location.dist(agarr[i].location)
            if(dist>0 && dist<100){
                let opposite=agarr[i].location.subvector(this.location)
                opposite.div(dist*-1)
                sum.add(opposite)
                count++;
            }
        }
        if(count>0){
            sum.div(count)
            this.applyForce(sum)
        }        
    }
    applyForce(force){
        this.acceleration.add(force)
    }
    update(){
        this.velocity.add(this.acceleration)
        this.velocity.limit(this.velocitylimit)
        this.location.add(this.velocity)
        this.acceleration.setmag(0)
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
        drawCircle(c,this.location.x,this.location.y,newvec.x,newvec.y,10,"white")
    }
}
let agarr=[]
window.addEventListener("mousemove",(e)=>{
    agarr.push(new Agent(e.clientX,e.clientY,3))
})
function animate(){
    c.clearRect(0,0,innerWidth,innerHeight)
    requestAnimationFrame(animate)
    for(let i=0;i<agarr.length;i++){
        agarr[i].repel(agarr)
        agarr[i].update()
        agarr[i].show(c)
    }
}
animate()