import { Pvector } from "./Pvector.js"
import { drawArrow } from "./Arrows.js"
let canvas=document.getElementById("canvas")
let c=canvas.getContext("2d")
canvas.width=innerWidth
canvas.height=innerHeight
c.translate(innerWidth/2, innerHeight/2);

let v1=new Pvector(1,1)
let degrees=90;
v1.setangle(degrees * (Math.PI/180))

v1.setmag(100)

function animate(){
    requestAnimationFrame(animate)
    drawArrow(c,v1.x,v1.y,v1.x*2,v1.y*2)
}
animate()