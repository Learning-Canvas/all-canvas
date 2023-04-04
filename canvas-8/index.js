let canvas=document.getElementById("canvas");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let c=canvas.getContext("2d");
c.beginPath();
c.arc(window.innerWidth/2,window.innerHeight/2,1,0,Math.PI*2,false)
c.stroke();

