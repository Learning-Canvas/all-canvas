let canvas=document.getElementById("canvas");
let c=canvas.getContext("2d");
canvas.width=innerWidth;
canvas.height=innerHeight;
c.translate(innerWidth/2, innerHeight/2)

class Oscillator{
    constructor(radius,amplitude,avel,deg){
        this.a=0;
        this.avel=avel;
        this.radius=radius;
        this.amplitude=amplitude;
        this.deg=deg
    }
    display(c){
        this.x=this.amplitude*Math.sin(this.a)
        this.y=0
        this.xnot=this.x*Math.cos(this.deg)-this.y*Math.sin(this.deg)
        this.ynot=this.y*Math.cos(this.deg)+this.x*Math.sin(this.deg)
        c.beginPath()
        c.moveTo(0,0)
        c.lineTo(this.xnot,this.ynot)
        c.stroke()
        c.beginPath();
        c.arc(this.xnot,this.ynot,this.radius,0,Math.PI*2,false);
        c.stroke();
        this.a+=this.avel;
    }
}

let oscarr=[]
for(let i=0;i<20;i++){
    oscarr.push(new Oscillator(50*Math.random(),300*Math.random(),0.1*Math.random(),Math.PI*Math.random()))
}
function animate(){
    c.clearRect(-innerWidth/2,-innerHeight/2,innerWidth,innerHeight)
    requestAnimationFrame(animate)
    for(let i=0;i<oscarr.length;i++){
        oscarr[i].display(c)
    }
}
animate()