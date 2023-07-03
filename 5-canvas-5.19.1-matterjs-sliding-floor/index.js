import Ball from './Ball.js'
import Floor from './Floor.js'
let canvas=document.getElementById("canvas")
let c=canvas.getContext("2d")
canvas.width=innerWidth
canvas.height=innerHeight

let Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;
let engine = Engine.create();
let World=engine.world
// create runner
let runner = Runner.create();
// run the engine
Runner.run(runner, engine);

let balls=[]
canvas.addEventListener("mousemove",(e)=>{
    balls.push(new Ball(Bodies,Composite,World,e.clientX,e.clientY,Math.random()*30) )
})
let floors=[]
floors.push(new Floor(Bodies,Composite,World,innerWidth/4,innerHeight/2.3,innerWidth/2,10,0.2,0))
floors.push(new Floor(Bodies,Composite,World,innerWidth/1.5,innerHeight/1.5,innerWidth/2,10,2.9,0))

function animate(){
c.clearRect(0,0,innerWidth,innerHeight)
requestAnimationFrame(animate)
for(let i=0;i<balls.length;i++){
    balls[i].show(c)
}
for(let i=0;i<floors.length;i++){
    floors[i].show(c)
}
}
animate()