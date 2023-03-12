const canvas=document.querySelectorAll('#canvas')[0];

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
let context=canvas.getContext('2d');
let x=100;
let y=100;
let r=50;
let direction=true;
function animate(){
    requestAnimationFrame(animate)
    context.clearRect(0,0, innerWidth, innerHeight);
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI*2, false);
    context.strokeStyle='red';
    if(x+r==innerWidth){
        direction=false;
    }
    if(x-r==0){
        direction=true;
    }
    if(direction){
        x+=1;
    }
    else{
        x-=1;
    }
    context.stroke();

}
animate()