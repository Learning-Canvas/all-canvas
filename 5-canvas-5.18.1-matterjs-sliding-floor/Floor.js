export default class Floor{
    constructor(Bodies,Composite,World,x,y,l,h,angle){
        this.angle=angle
        this.l=l,this.h=h;
        this.options={
            angle:angle,
            isStatic:true
        }
        this.box=Bodies.rectangle(x,y,l,h,this.options)
        Composite.add(World, [this.box]);
    }
    show(c){
        c.beginPath()
        c.translate(this.box.position.x, this.box.position.y);
        c.rotate(this.box.angle);
        c.translate(-this.box.position.x, -this.box.position.y);
        c.rect(this.box.position.x-this.l/2,this.box.position.y-this.h/2,this.l,this.h)
        c.stroke()
        c.setTransform(1, 0, 0, 1, 0, 0);

    }
}