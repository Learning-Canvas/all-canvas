let canvas=document.getElementById('canvas');
canvas.width=innerWidth
canvas.height=innerHeight
let c=canvas.getContext("2d");
let r=150;
let a=0;
let avel=0;
let aacc=0.02;
let shiftx=innerWidth/2;
let shifty=innerHeight/2;
function limit(x,limitvalue){
    if(x>limitvalue){
        return limitvalue;
    }
    else{
        return x;
    }
}
function animate(){
    c.clearRect(0,0,innerWidth,innerHeight)
    requestAnimationFrame(animate)
    c.beginPath()
    c.moveTo(shiftx, shifty);
    c.lineTo(shiftx+r*Math.cos(a), shifty+r*Math.sin(a));
    c.strokeStyle = "red";
    c.stroke()
    c.beginPath()
    c.arc(shiftx+r*Math.cos(a),shifty+r*Math.sin(a),50,0,Math.PI*2,false);
    c.fillStyle="red";
    c.fill()
    c.stroke()
    avel+=aacc;
    a+=avel;
    avel=limit(avel,0.01)
}
animate()