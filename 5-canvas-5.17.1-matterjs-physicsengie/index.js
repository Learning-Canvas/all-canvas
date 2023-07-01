let canvas=document.getElementById("canvas")
let c=canvas.getContext("2d")
canvas.width=innerWidth
canvas.height=innerHeight

var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

//initialize the world and start ehe word to run
let engine = Engine.create();
let world=engine.world
let runner = Runner.create();
Runner.run(runner, engine);
//
function drawrect(c,x,y,l,b,angle){
    c.beginPath();
    //to rotate
    c.translate(x, y);
    c.rotate(angle);
    c.translate(-1*x, -1*y);
    //
    //to draw the rectangle
    c.rect(x-l/2, y-b/2, l, b);
    //
    c.stroke();
    //reset transform
    c.setTransform(1, 0, 0, 1, 0, 0);
    //
}
function drawrectground(c,x,y,l,b){
    c.beginPath();
    c.rect(x-l/2, y-b/2, l, b);
    c.stroke();
}
class Ground{
    constructor(Composite,posx,posy,l,b){
    this.posx=posx;this.posy=posy;this.l=l;this.b=b;
    this.ground = Bodies.rectangle(posx, posy, l, b, { isStatic: true });
    Composite.add(world, [this.ground]);
    }
    show(c){
        //show the ground
        drawrectground(c,this.posx,this.posy,this.l,this.b)
    }
}
class Boxy{
    constructor(Composite,posx,posy,l,b){
        this.posx=posx;this.posy=posy;this.l=l;this.b=b;
        this.boxy=Bodies.rectangle(posx, posy, l, b);
        Composite.add(world, [this.boxy]);
    }
    show(c){
        //show the box
        drawrect(c,this.boxy.position.x,this.boxy.position.y,this.l,this.b,this.boxy.angle)
    }
}

// let boxA = Bodies.rectangle(400, 200, 20, 20);

// Composite.add(world, [boxA]);


canvas.addEventListener("mousedown",(e)=>{
    createrect(e)
})
let boxes=[]

let ground=new Ground(Composite,innerWidth/2 , innerHeight, innerWidth, 100)

function createrect(e){
    boxes.push(new Boxy(Composite,e.clientX,e.clientY,100,50))
}

function animate(){
    c.clearRect(0,0,innerWidth,innerHeight)
    requestAnimationFrame(animate)
    // drawrect(c,boxA.position.x,boxA.position.y,20,20)
    
    for(let i=0;i<boxes.length;i++){
        boxes[i].show(c)
    }
    ground.show(c)
}
animate()