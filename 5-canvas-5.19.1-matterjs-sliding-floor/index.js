import Ball from './Ball.js'
import Floor from './Floor.js'
let canvas=document.getElementById("canvas")
let c=canvas.getContext("2d")
canvas.width=innerWidth
canvas.height=innerHeight
alert("click to create balls")
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
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}
let balls=[]
canvas.addEventListener("mousedown",(e)=>{
    balls.push(new Ball(Bodies,Composite,World,e.clientX,e.clientY,randomIntFromInterval(10,30)) )
})
let floors=[]
floors.push(new Floor(Bodies,Composite,World,innerWidth/4,innerHeight/2.3,innerWidth/2,10,0.2,0))
floors.push(new Floor(Bodies,Composite,World,innerWidth/1.5,innerHeight/1.5,innerWidth/2,10,2.9,0))

function animate(){
c.clearRect(0,0,innerWidth,innerHeight)
requestAnimationFrame(animate)
for(let i=0;i<balls.length;i++){
    balls[i].show(c)
    if(balls[i].outsideofscreen(innerHeight,innerWidth)){
        Composite.remove(World,balls[i].body)
        balls.splice(i,1);
    }
}
for(let i=0;i<floors.length;i++){
    floors[i].show(c)
}
// console.log(balls.length,Composite.allBodies(World)) //to check the size of the world
}
animate()