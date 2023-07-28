import {Pvector} from './Pvector.js'
import {drawCircle, mousedrag, random} from './Arrows.js'
let canvas=document.getElementById("canvas")
let c=canvas.getContext("2d")
canvas.width=innerWidth
canvas.height=innerHeight
alert("click and drag to create agents")
class Agent{
constructor(x,y,velocitylimit){
    this.location=new Pvector(x,y)
    this.velocity=new Pvector(random(-4,4),random(-4,4))
    this.acceleration=new Pvector(0,0)
    this.velocitylimit=velocitylimit
}
repel(agarr){
    let count=0
    let sumrepel=new Pvector(0,0)
    for(let i=0;i<agarr.length;i++){
        let dist=this.location.dist(agarr[i].location)
        if(dist>0 && dist<100){
            let currrepel=this.location.subvector(agarr[i].location)
            currrepel.div(dist*0.1)
            sumrepel.add(currrepel)
            count++;
        }
    }
    if(count>0){
        sumrepel.div(count)
        return sumrepel;
    }
    else{
        return new Pvector(0,0)
    }
}
seek(mouse){
    
let seekforce=mouse.subvector(this.location)
return seekforce
}

applytwoforces(agarr,mouse){
    

let repel=this.repel(agarr)
let seek=this.seek(mouse)

// repel.setmag(1)
seek.setmag(1)
this.applyForce(repel)
this.applyForce(seek)
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
    newvec.setmag(20)
    newvec.add(this.location)
    drawCircle(c,this.location.x,this.location.y,newvec.x,newvec.y,10,"white")
}
}

let agarr=[]
let mouse=new Pvector(innerWidth/2,innerHeight/2)
mousedrag(canvas,agarr,Agent)
window.addEventListener("mousemove",(e)=>{
mouse.x=e.clientX
mouse.y=e.clientY
})
function animate(){
    c.clearRect(0,0,innerWidth,innerHeight)
    requestAnimationFrame(animate)
    for(let i=0;i<agarr.length;i++){
        agarr[i].applytwoforces(agarr,mouse)
        agarr[i].update()
        agarr[i].show(c)
    }
}
animate()