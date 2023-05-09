const canvas=document.getElementById("canvas");
canvas.width=window.innerWidth
canvas.height=window.innerHeight

const c=canvas.getContext("2d")
const centerx=window.innerWidth/2;
const centery=window.innerHeight/2;

class planet{
    draw(c,radius,circularradius,color,speed){
        this.speed=speed;
        this.circularradius=circularradius;
        this.color=color;
        this.deg=0;
        this.radius=radius;
        this.sin=Math.sin((Math.PI*this.deg/180))
        this.cos=Math.cos((Math.PI*this.deg/180))
        c.beginPath();
        c.arc(centerx+this.radius*this.cos,centery+this.radius*this.sin,this.circularradius,0,Math.PI*2,false);
        c.stroke();
    }
    update(c,speed){
        this.sin=Math.sin((Math.PI*this.deg/180))
        this.cos=Math.cos((Math.PI*this.deg/180))
        
        c.beginPath();
        c.arc(centerx+this.radius*this.cos,centery+this.radius*this.sin,this.circularradius,0,Math.PI*2,false);
        c.strokeStyle=this.color;
        c.fillStyle=this.color;
        c.fill();
        
        this.deg+=this.speed;
    }


}
let numofplanets=30;
let planet1=new planet();
planet1.draw(c,200,10,'green',2);
let planets=[]
for(let i=0;i<numofplanets;i++){
    planets.push(new planet());
    let mainradius=Math.random()*200;
    let smallradius=Math.random()*10;
    let speed=Math.random()*2;
    planets[i].draw(c,mainradius,smallradius,'green',speed)
}
function animate(){
    c.clearRect(0,0,window.innerWidth,window.innerHeight);
    requestAnimationFrame(animate)
    c.beginPath();
    c.arc(centerx,centery,1,0,Math.PI*2,false);
    c.stroke();
    planet1.update(c);
    for(let i=0;i<numofplanets;i++){
        planets[i].update(c)
    }
    c.stroke();
}
animate()
