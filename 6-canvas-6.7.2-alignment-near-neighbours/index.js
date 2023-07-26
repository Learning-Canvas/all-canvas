import {Pvector} from './Pvector.js'
import { random,drawCircle, mousedrag } from './Arrows.js'
let canvas=document.getElementById("canvas")
let c=canvas.getContext("2d")
canvas.width=innerWidth
canvas.height=innerHeight
alert("click and drag to create agents")
class Agent{
    constructor(x,y,maxvelocity,neighbourdist){
        this.location=new Pvector(x,y)
        this.velocity=new Pvector(random(-10,10),random(-10,10))
        this.acceleration=new Pvector(0,0)
        this.maxvelocity=maxvelocity;
        this.neighbourdist=neighbourdist
    }
    align(agarr){
        let sum=new Pvector(0,0)
        let count=0
        for(let i=0;i<agarr.length;i++){
            let dist=this.location.dist(agarr[i].location)
            if(dist>0 && dist<this.neighbourdist){
                sum.add(agarr[i].velocity)
                count++
            }
            
        }
        if(count!=0){
            sum.div(count)
            
            this.velocity=sum;
        }
        
    }
    update(){
        this.velocity.add(this.acceleration)
        this.velocity.limit(this.maxvelocity)
        this.location.add(this.velocity)
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
        newvec.setmag(20)
        newvec.add(this.location)
        drawCircle(c,this.location.x,this.location.y,newvec.x,newvec.y,10,"white")
    }
}
let agarr=[]
// window.addEventListener("mousedown",(e)=>{
//     agarr.push(new Agent(e.clientX,e.clientY,random(3,10),30))
//     alert("asf")
// })
let flocksize=50
mousedrag(canvas,agarr,Agent,flocksize)
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