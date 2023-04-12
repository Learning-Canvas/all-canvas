let canvas=document.getElementById('canvas')
let c=canvas.getContext('2d')
canvas.width=innerWidth
canvas.height=innerHeight

class Pvector{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
    mag(){
        return Math.sqrt(this.x*this.x+this.y*this.y)
    }
    add(secondvector){
        this.x+=secondvector.x;
        this.y+=secondvector.y;
    }
    sub(secondvector){
        this.x-=secondvector.x;
        this.y-=secondvector.y;
    }
    mult(num){
        this.x*=num;
        this.y*=num;
    }
}

class Ball{
    constructor(x,y){
        this.radius=50;
        this.location=new Pvector(x,y);
        this.velocity=new Pvector(1,0.1);
    }
    move(){
        this.location.add(this.velocity)
    }
    bounce(){
        if(this.location.x+this.velocity.x+this.radius>innerWidth || this.location.x+this.velocity.x-this.radius<0){
            this.velocity.x=-1*this.velocity.x;
        }
        if(this.location.y+this.velocity.x+this.radius>innerHeight || this.location.y+this.velocity.y-this.radius<0){
            this.velocity.y=-1*this.velocity.y
        }
    }
    display(c){
        c.beginPath();
        c.arc(this.location.x,this.location.y,this.radius,0,Math.PI*2,false);
        c.stroke();
    }
}
let ball1=new Ball(100,100);

function animate(){
    c.clearRect(0,0,innerWidth,innerHeight);
    requestAnimationFrame(animate)
    ball1.move()
    ball1.bounce()
    ball1.display(c)
    
}
animate()