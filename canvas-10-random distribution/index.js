let canvas=document.getElementById("canvas");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let c=canvas.getContext("2d");
// c.beginPath();
// c.rect(0,window.innerHeight-25,20,25)
// c.rect(20,window.innerHeight-20,20,20)
// c.fillStyle="grey"
// c.fill()
// c.stroke()
let numofboxes=window.innerWidth/100;
c.beginPath();
c.fillStyle="grey"
class bar{
    draw(c,x,y,lengthx,lengthy){
        this.x=x;
        this.y=y;
        this.lengthx=lengthx;
        this.lengthy=lengthy;
        c.beginPath();
        c.rect(this.x,this.y,this.lengthx,this.lengthy)
        
        
        
    }
    update(c,num){
        if(this.lengthy>window.innerHeight){
            this.lengthy=0;
            this.y=window.innerHeight
        }
        this.lengthy=this.lengthy+num;
        this.y=this.y-num;
        
        c.rect(this.x,this.y,this.lengthx,this.lengthy)
        c.fillStyle="grey"
        
    }
}
let bars=[]
for(let i=0;i<100;i++){
    bars.push(new bar());
    bars[i].draw(c,i*numofboxes,window.innerHeight-0,numofboxes,0)
}
c.fill()
c.stroke()

function animate(){
    c.clearRect(0,0,window.innerWidth,window.innerHeight);
    requestAnimationFrame(animate)
    c.beginPath();
    for(let i=0;i<100;i++){
        bars[i].update(c,Math.random())
    }
    c.fillStyle="grey"
    c.fill()
    c.stroke();
}

animate();