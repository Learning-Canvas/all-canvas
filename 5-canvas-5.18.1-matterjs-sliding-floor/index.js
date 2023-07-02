import Boxy from './Box.js'
import Floor from './Floor.js'
let canvas=document.getElementById("canvas")
let c=canvas.getContext("2d")
alert("click to generate boxes")
canvas.width=innerWidth
canvas.height=innerHeight
let Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;
// create an engine
let engine = Engine.create();
let World=engine.world
// create runner
var runner = Runner.create();
// run the engine
Runner.run(runner, engine);
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}
  
// let box1= Bodies.rectangle(400, 200, 80, 80);
// Composite.add(World, [box1]);
let boxes=[]
let floors=[]
canvas.addEventListener("mousedown",(e)=>{
    createbox(e)
})


function createbox(e){
    boxes.push(new Boxy(Bodies,Composite,World,e.clientX,e.clientY,randomIntFromInterval(20,40),randomIntFromInterval(20,40)))
}

floors.push(new Floor(Bodies,Composite,World,innerWidth/4,innerHeight/2.3,innerWidth/2,10,0.1))
floors.push(new Floor(Bodies,Composite,World,innerWidth/2,innerHeight/1.5,innerWidth/2,10,2.9))

function animate(){
    c.clearRect(0,0,innerWidth,innerHeight)
    requestAnimationFrame(animate)
    // c.beginPath()
    // c.rect(box1.position.x,box1.position.y,80,80)
    // c.stroke()
    for(let i=0;i<boxes.length;i++){
        boxes[i].show(c)
    }
    for(let i=0;i<floors.length;i++){
        floors[i].show(c)
    }   
    
}
animate()