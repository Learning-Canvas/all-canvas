import { Pvector } from "./Pvector.js"

let canvas=document.getElementById("canvas")
let c=canvas.getContext("2d")
canvas.width=innerWidth
canvas.height=innerHeight
let mouse=new Pvector(innerWidth/2,innerHeight/2)
let origin=new Pvector(innerWidth/2,innerHeight/2)
let vec1=new Pvector(innerWidth/2+225,innerHeight/2-75)
function updatemouse(e){
    mouse.x=e.clientX
    mouse.y=e.clientY
}
canvas.addEventListener("mousemove",(e)=>{
updatemouse(e)
})
function animate(){
    c.clearRect(0,0,innerWidth,innerHeight)
    requestAnimationFrame(animate)
    c.beginPath()
    c.moveTo(origin.x,origin.y)
    c.lineTo(vec1.x,vec1.y)
    c.moveTo(origin.x,origin.y)
    c.lineTo(mouse.x,mouse.y)
    c.font = "30px Arial";
    c.strokeText("angle "+(vec1.subvector(origin).anglebetween(mouse.subvector(origin))*180/Math.PI), innerWidth/4, innerHeight/4);
    c.stroke()
    
}
animate()