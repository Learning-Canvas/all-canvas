let canvas=document.getElementById('canvas');

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
let colorcomobs=['#F7C8E0','#DFFFD8','#B4E4FF','#95BDFF','#25316D','#5F6F94']
let c=canvas.getContext('2d');
let numofcircles=100;
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  
class Circle{
    draw(c,x,y,radius,color,dx,dy){
        this.x=x;
        this.y=y;
        this.dy=dy;
        this.dx=dx;
        this.g=1;
        this.radius=radius;
        this.color=color;
        c.beginPath();      
        c.arc(this.x,this.y,this.radius,0,2*Math.PI,false);
        c.fillStyle=this.color;
        c.fill();
        c.stroke();
    }
    update(c){
        if(this.x-this.radius+this.dx<0 || this.x+this.radius+this.dx>window.innerWidth){
            this.dx=-this.dx;
        }
        if(this.y+this.radius+this.dy>window.innerHeight){
            this.dy=-0.9*this.dy;
        }
        else{
            this.dy+=this.g;
        }
        this.x+=this.dx;
        this.y+=this.dy;
        c.beginPath();      
        c.arc(this.x,this.y,this.radius,0,2*Math.PI,false);
        c.fillStyle=this.color;
        c.fill();
        c.stroke();
    }
}

let cirarr=[]

for(let i=0;i<numofcircles;i++){
cirarr.push(new Circle())
let radius=randomIntFromInterval(10,20);
let x=randomIntFromInterval(radius,window.innerWidth-radius);
let y=randomIntFromInterval(radius,window.innerHeight-5*radius);
let xspeed=(-0.5+Math.random())*5;
let yspeed=0;
let color=colorcomobs[randomIntFromInterval(0,colorcomobs.length)];
cirarr[i].draw(c,x,y,radius,color,xspeed,yspeed);
}

console.log(cirarr  )
function animate(){
    requestAnimationFrame(animate)
    c.clearRect(0,0,window.innerWidth,window.innerHeight)
     for(let i=0;i<numofcircles;i++){
        cirarr[i].update(c);
    }
}
animate();


