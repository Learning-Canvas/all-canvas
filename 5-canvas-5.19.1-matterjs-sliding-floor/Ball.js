export default class Ball{
    constructor(Bodies,Composite,World,x,y,r){
        this.x=x;this.y=y;this.r=r;
        this.options={
            friction:0
        }
        this.body=Bodies.circle(this.x,this.y,this.r,this.options)
        Composite.add(World, this.body);
    }
    show(c){
        c.beginPath()
        c.arc(this.body.position.x,this.body.position.y,this.r,0,Math.PI*2,false)
        c.stroke()
    }
}