let canvas=document.getElementById('canvas')
canvas.width=window.innerWidth
canvas.height=window.innerHeight

let c=canvas.getContext('2d')
class Sine{
    draw(c,amplitude,frequency,speed){
        this.amplitude=amplitude
        this.frequency=frequency
        this.phase=0
        this.speed=speed;
        c.beginPath()
        c.moveTo(0,window.innerHeight/2)
        for(let i=0;i<1500;i+=1){
            console.log(Math.sin(Math.PI*i/180))
            c.lineTo(i,window.innerHeight/2+this.amplitude*Math.sin((Math.PI*i/180)*this.frequency)) 
        }
        c.stroke()
    }
    update(c){
        this.phase+=this.speed;
        c.beginPath()
        c.moveTo(0,window.innerHeight/2)
        for(let i=0;i<1500;i++){
            c.lineTo(i,window.innerHeight/2+this.amplitude*Math.sin((Math.PI*i/180)*this.frequency+this.phase))     
        }   
        c.stroke()
    }
}

let sinarr=[]
let x=50;
for(let i=x;i<100;i++){
    sinarr.push(new Sine())
    sinarr[i-x].draw(c,i,1,0.05)
}

console.log(sinarr)
function animate(){
    requestAnimationFrame(animate)
    c.clearRect(0,0,window.innerWidth,window.innerHeight)
    for(let i=x;i<100;i++){
        sinarr[i-x].update(c)
    }
    
    
}
animate()
