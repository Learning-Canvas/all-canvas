const canvas=document.getElementById('canvas')
canvas.width=window.innerWidth
canvas.height=window.innerHeight
let colorcomobs=['#F7C8E0','#DFFFD8','#B4E4FF','#95BDFF','#25316D','#5F6F94']
let cirarr=[]
let numofcircles=700;
let mincirclesize=5;
let maxcirclesize=10;
let maxspeed=3;
let enlargmentsphere=70;
canvas.addEventListener('mousemove',enlarge);
let c=canvas.getContext('2d');
function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

class Circle{
    draw(c,x,y,radius,vx,vy,color){
        this.x=x;
        this.y=y;
        this.radius=radius;
        this.originalradius=radius;
        this.vx=vx;
        this.vy=vy;
        this.color=color;
        c.beginPath()
        c.arc(this.x, this.y,this.radius, 0, Math.PI*2, false);
        c.fillStyle=this.color;
        c.fill();
        c.stroke()
    }
    update(c){
        this.x+=this.vx;
        this.y+=this.vy;
        if(this.x+this.radius+this.vx>window.innerWidth || this.x-this.radius+this.vx<0){
            this.vx=-this.vx;
        }
        if(this.y+this.radius+this.vy>window.innerHeight || this.y-this.radius+this.vy<0){
            this.vy=-this.vy;
        }
        c.beginPath()
        c.arc(this.x, this.y,this.radius, 0, Math.PI*2, false);
        c.fillStyle=this.color;
        c.fill();
        c.stroke()
    }
}




for(let i=0;i<numofcircles;i++){
    cirarr.push(new Circle());
    let radius=randomIntFromInterval(mincirclesize,maxcirclesize)
    let x=randomIntFromInterval(radius,window.innerWidth-radius);
    let y=randomIntFromInterval(radius,window.innerHeight-radius);
    let dx=(-0.5+Math.random())*maxspeed;
    let dy=(-0.5+Math.random())*maxspeed;
    let color=colorcomobs[randomIntFromInterval(0,colorcomobs.length)];
    console.log(randomIntFromInterval(0,colorcomobs.length-1))
    cirarr[i].draw(c,x,y,radius,dx,dy,color);
}
function dist(x1,y1,x2,y2){
    return Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2));
}
function enlarge(event){
    let x1=event.clientX;
    let y1=event.clientY;
    for(let i=0;i<cirarr.length;i++){
        let x2=cirarr[i].x;
        let y2=cirarr[i].y;
        if(dist(x1,y1,x2,y2)<enlargmentsphere){
            if(cirarr[i].radius<50){
                cirarr[i].radius+=1;
            }
            
        }
        else{
            if(cirarr[i].radius>cirarr[i].originalradius)
            cirarr[i].radius-=1;
        }
    }

}
function animate(){
    requestAnimationFrame(animate)
    c.clearRect(0,0,window.innerWidth,window.innerHeight)
    for(let i=0;i<cirarr.length;i++){
        cirarr[i].update(c);
    }
}
animate()


