
let canvas=document.getElementById("canvas");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let c=canvas.getContext("2d");

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}
  
class planet{
    draw(subraidus,radius,speed,colorred,colorgreen,colorblue,opacity){
        this.deg=Math.random()*360;
        this.subraidus=subraidus;
        this.speed=speed;
        this.theta=((this.deg)/180)*Math.PI;
        this.radius=radius;
        this.colorred=colorred;
        this.colorgreen=colorgreen;
        this.colorblue=colorblue;
        this.opacity=opacity;
        this.color="rgba("+this.colorred+","+this.colorgreen+","+this.colorblue+","+this.opacity+")";
        
        c.beginPath();
        c.arc(window.innerWidth/2+this.radius*Math.cos(this.theta),window.innerHeight/2+this.radius*Math.sin(this.theta),this.subraidus,0,Math.PI*2,false)
        c.fillStyle=this.color;
        c.strokeStyle=this.color;
        c.fill();
        c.stroke();
    }
    update(){    
    let trailing=100;
    for(let i=1;i<trailing;i++){
        this.theta=(this.deg-i)/180*Math.PI;
        let tempraidus=this.subraidus-(this.subraidus*i/trailing);
        let tempcolor="rgba("+this.colorred+","+this.colorgreen+","+this.colorblue+","+(this.opacity-(this.opacity*i/trailing))+")";
         
        c.beginPath();
        c.arc(window.innerWidth/2+this.radius*Math.cos(this.theta),window.innerHeight/2+this.radius*Math.sin(this.theta),tempraidus,0,Math.PI*2,false)
        c.fillStyle=tempcolor;
        c.strokeStyle=tempcolor;
        c.fill();
    }
    this.deg+=this.speed;
    }
    
}

// let plan1=new planet();
// plan1.draw(5,200,2,255*Math.random(),255*Math.random(),255*Math.random(),1);

let planarr=[]
for(let i=0;i<80;i++){
    planarr.push(new planet());
    let mainradius=randomIntFromInterval(100,200);
    let speed=randomIntFromInterval(1,5);
    planarr[i].draw(5,mainradius,speed,255*Math.random(),255*Math.random(),255*Math.random(),1);
}

function animate(){
    c.clearRect(0,0,window.innerWidth,window.innerHeight)
    requestAnimationFrame(animate)
    
    // plan1.update();
    for(let i=0;i<planarr.length;i++){
        planarr[i].update();
    }
    c.stroke();
}
animate();
