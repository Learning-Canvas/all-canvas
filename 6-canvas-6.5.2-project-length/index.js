import {Pvector} from './Pvector.js'
let canvas=document.getElementById("canvas")
let c=canvas.getContext("2d")
canvas.width=innerWidth
canvas.height=innerHeight

let origin=new Pvector(innerWidth/2,innerHeight/2);
let vec1=new Pvector(innerWidth/2+225,innerHeight/2-75);
let mouse=new Pvector(innerWidth/2,innerHeight/2)

canvas.addEventListener("mousemove",(e)=>{
    mouse.x=e.clientX
    mouse.y=e.clientY
})
function drawcircle(c,x,y,radius=20,color="black"){
c.beginPath()
c.arc(x,y,radius,0,Math.PI*2,false)
c.fillStyle=color
c.fill()
c.stroke()
}
function animate(){
c.clearRect(0,0,innerWidth,innerHeight)
requestAnimationFrame(animate)
c.beginPath()
c.moveTo(origin.x,origin.y)
c.lineTo(vec1.x,vec1.y)
c.moveTo(origin.x,origin.y)
c.lineTo(mouse.x,mouse.y)

let mousevec=mouse.subvector(origin)
let vec1vec=vec1.subvector(origin)
let mag=mousevec.dot(vec1vec)/vec1vec.mag()
vec1vec.setmag(mag)
console.log(vec1vec)
vec1vec.add(origin)
c.lineTo(vec1vec.x,vec1vec.y)
c.stroke()
drawcircle(c,vec1vec.x,vec1vec.y,3,"red")
c.stroke()

}
animate()