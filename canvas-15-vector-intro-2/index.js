import { Pvector } from "./vector.js"

let canvas=document.getElementById('canvas')
let c=canvas.getContext('2d')
canvas.width=innerWidth
canvas.height=innerHeight
canvas.addEventListener('mousemove',accleratetowardsmouse)
class Ball{
    constructor(){
        this.location=new Pvector(innerWidth/2-1,innerHeight/2-1)
        this.radius=50
        this.velocity=new Pvector(0,0);
        this.acceleration=new Pvector(0.00,0)
        this.mouse=new Pvector(innerWidth/2,innerHeight/2);
        this.mathmouse=new Pvector(innerWidth/2,innerHeight/2);
        
    }
    setmouse(mousex,mousey){
        this.mouse.x=mousex;
        this.mouse.y=mousey;
        this.mathmouse.x=mousex;
        this.mathmouse.y=mousey;
    }
    move(){
        this.mathmouse.x=this.mouse.x;
        this.mathmouse.y=this.mouse.y;
        this.mathmouse.sub(this.location)
        this.mathmouse.setmag(0.01)
        this.acceleration=this.mathmouse;
        this.velocity.add(this.acceleration)
        this.location.add(this.velocity)
    }
    display(c){
        c.beginPath();
        c.arc(this.location.x,this.location.y,this.radius,0,Math.PI*2,false)
        c.stroke()
    }
}
let ball1=new Ball();
function accleratetowardsmouse(event){
    
    ball1.setmouse(event.offsetX,event.offsetY)
}
function animate(){
    c.clearRect(0,0,innerWidth,innerHeight)
    requestAnimationFrame(animate)
    ball1.move()
    ball1.display(c)
}
animate()

