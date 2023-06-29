let canvas=document.getElementById("canvas");
let c=canvas.getContext("2d");
canvas.width=innerWidth;
canvas.height=innerHeight;
let a=0;
let amplitude=200;
let avel=0.1;
function animate(){
    c.clearRect(0,0,innerWidth,innerHeight)
    requestAnimationFrame(animate)
    c.beginPath()
    c.moveTo(innerWidth/2,innerHeight/2)
    c.lineTo(innerWidth/2+amplitude*Math.sin(a),innerHeight/2+0)
    c.stroke()
    c.beginPath()
    c.arc(innerWidth/2+amplitude*Math.sin(a),innerHeight/2+0,50,0,2*Math.PI,false);
    
    c.stroke()
    a+=avel
}
animate()