let canvas=document.getElementById('canvas')
canvas.width=window.innerWidth
canvas.height=window.innerHeight

let c=canvas.getContext('2d')

class Sine{
    draw(c,amplitude,frequency,speed,phase,color){
        this.amplitude=amplitude
        this.frequency=frequency
        this.phase=phase
        this.speed=speed;
        this.color=color
        c.beginPath()
        c.moveTo(0,window.innerHeight/2)
        for(let i=0;i<1500;i+=1){
            c.lineTo(i,window.innerHeight/2+this.amplitude*Math.sin((Math.PI*i/180)*this.frequency+(Math.PI/180)*this.phase)) 
        }
        c.strokeStyle=this.color;
        c.stroke()
    }
    update(c){
        this.phase+=this.speed;
        c.beginPath()
        c.moveTo(0,window.innerHeight/2)
        for(let i=0;i<1500;i++){
            c.lineTo(i,window.innerHeight/2+this.amplitude*Math.sin((Math.PI*i/180)*this.frequency))     
        }   
        c.strokeStyle=this.color;
        c.stroke()
    }
}

let sin1=new Sine();
let sin2=new Sine();
let phase1=45
sin1.draw(c,100,1,0.01,phase1,"black");
sin2.draw(c,100,2,0.01,0,"black");
c.beginPath()
c.moveTo(0,window.innerHeight/2)
for(let i=0;i<1500;i+=1){
c.lineTo(i,window.innerHeight/2+100*Math.sin((Math.PI*i/180)*1+(Math.PI/180)*phase1)+100*Math.sin((Math.PI*i/180)*2)) 
}
c.strokeStyle="red";
c.stroke()



// function animate(){
//     requestAnimationFrame(animate)
   
    
// }
// animate()
