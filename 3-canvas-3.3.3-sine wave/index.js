let canvas=document.getElementById("canvas")
let c=canvas.getContext("2d")
canvas.width=innerWidth
canvas.height=innerHeight
c.translate(innerWidth/2,innerHeight/2)
class Oscillator{
    constructor(radius,amplitude,avel,x,y){
        this.a=0;
        this.avel=avel;
        this.radius=radius;
        this.amplitude=amplitude;

        this.x=x;
        this.y=y;
    }
    display(c){
        c.beginPath()
        c.arc(this.x,this.y+this.amplitude*Math.sin(this.a),this.radius,0,Math.PI*2,false);
        c.stroke();
        this.a+=this.avel;
    }
}
// let osc1=new Oscillator(50,100,0.03,0,0)
let oscarr=[]
let radius=10;
let amplitude=200;
let frequency=20;
for(let i=-innerWidth/2;i<innerWidth;i+=0.5){
    oscarr.push(new Oscillator(radius,amplitude*Math.sin(i/frequency),0.05,i,0))
}
function animate(){
c.clearRect(-innerWidth/2,-innerHeight/2,innerWidth,innerHeight)
requestAnimationFrame(animate)
// osc1.display(c)
for(let i=0;i<oscarr.length;i+=10){
    oscarr[i].display(c)
}
}
animate()