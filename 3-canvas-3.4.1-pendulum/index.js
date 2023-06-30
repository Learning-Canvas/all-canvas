let canvas=document.getElementById("canvas")
let c=canvas.getContext("2d");
canvas.width=innerWidth;
canvas.height=innerHeight;
c.translate(innerWidth/2,innerHeight/2)
let x=0;
let y=0;
let length=200;
let radius=30;
let a=Math.PI/4;
let avel=0
let aacc=0;

function animate(){
c.clearRect(-innerWidth/2,-innerHeight/2,innerWidth,innerHeight)
requestAnimationFrame(animate)

x=length*Math.sin(a)
y=length*Math.cos(a)

c.beginPath()
c.moveTo(0,0)
c.lineTo(x,y)
console.log(x,y)
c.stroke()
c.beginPath()
c.arc(x,y,radius,0,Math.PI*2,false)
c.fillStyle="white"
c.fill()
c.stroke()
aacc=-0.01*Math.sin(a)
a+=avel;
avel+=aacc;
avel=avel*0.99;
}
animate()