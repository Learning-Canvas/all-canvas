let canvas=document.getElementById('canvas')
console.log(canvas)
let c=canvas.getContext('2d');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let x=window.innerWidth/2;
let y=window.innerHeight/2;
let tempx,tempy;

class randomwalker{
    draw(c,x,y,size){
        this.x=x;
        this.y=y;
        this.size=size;
        c.beginPath();
        c.moveTo(this.x,this.y);        
    }
    update(c){
        c.lineTo(this.x, this.y);
        
        let randomnum=Math.floor(Math.random()*4);
       
        switch(randomnum){
            case 0:
                tempx=1*this.size;
                tempy=0
                break
            case 1:
                tempy=1*this.size;
                tempx=0
                break
            case 2:
                tempx=-1*this.size;
                tempy=0
                break
            default:
                tempx=0
                tempy=-1*this.size;
            
        }
        this.x+=tempx;
        this.y+=tempy;
    }
}

let rand1=new randomwalker();
rand1.draw(c,window.innerWidth/2,window.innerHeight/2,2)
function animate(){
    requestAnimationFrame(animate);
    for(let i=0;i<100;i++){
        rand1.update(c)
    }
   
    c.stroke()   
}
animate();