let canvas=document.getElementById("canvas")
let c=canvas.getContext("2d")
canvas.width=innerWidth
canvas.height=innerHeight   
function drawrect(c,x1,y1,lenx,leny){
c.beginPath();
c.rect(x1, y1,lenx , leny);
c.fill()
c.stroke();
}
let h=30;

function animate(x1,y1,len){
    if(len>0.1){
        drawrect(c,x1,y1,len,10)
        animate(x1,y1+h,len/3)
        animate(x1+2*len/3,y1+h,len/3)
    }

}
animate(10,10,innerWidth/1.02)