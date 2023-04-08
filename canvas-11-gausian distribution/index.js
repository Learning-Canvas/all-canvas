function gaussianRandom(mean=0, stdev=1) {
    let u = 1 - Math.random(); // Converting [0,1) to (0,1]
    let v = Math.random();
    let z = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    // Transform to the desired mean and standard deviation:
    return z * stdev + mean;
}

let canvas=document.getElementById('canvas')
canvas.width=innerWidth;
canvas.height=innerHeight;
let c=canvas.getContext("2d");

let numofcubs=window.innerWidth/100;
class bar{
    draw(c,x,y,lengthx,lengthy,speed){ 
        this.x=x;
        this.y=y;
        this.lengthx=lengthx;
        this.lengthy=lengthy;
        this.speed=speed;
        c.rect(this.x,this.y,this.lengthx,this.lengthy)
        c.fillStyle="blue"
    }
    update(c,num){
    
    if(this.lengthy>innerHeight){
        window.location.reload();
    }
    if(num>this.x && this.x+numofcubs>num){
        this.y=this.y-this.speed;
        this.lengthy=this.lengthy+this.speed;
        c.rect(this.x,this.y,this.lengthx,this.lengthy)
        c.fillStyle="blue"
    }
    
    }
}

let bars=[]
c.beginPath()
for(let i=0;i<100;i++){
    bars.push(new bar())
    //draw(c,x,y,lengthx,lengthy,speed)
    bars[i].draw(c,i*numofcubs,window.innerHeight,numofcubs,0,2)
}
c.fill()
c.stroke()


function animate(){
    requestAnimationFrame(animate)
    c.beginPath()
    for(let i=0;i<100;i++){
        //bars[i].update(c,gaussianRandom(mean,stddev,speed))
        bars[i].update(c,gaussianRandom(window.innerWidth/2,200))
    }
    
    c.fill()
    c.stroke()
    
}
animate()

