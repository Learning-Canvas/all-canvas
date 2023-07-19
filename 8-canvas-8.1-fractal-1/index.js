let canvas=document.getElementById('canvas');
let c=canvas.getContext('2d');
canvas.width=innerWidth;
canvas.height=innerHeight;
function animate(x,y,radius){
    if(radius>2){
        c.beginPath();
        c.arc(x,y,radius,0,Math.PI*2,false);
        c.stroke()
        animate(x+radius,y,radius/2)
        animate(x-radius,y,radius/2)
        animate(x,y+radius,radius/2)
        
        // animate(x,y-radius,radius/2)
    }   
}
animate(innerWidth/2,innerHeight/2,100)