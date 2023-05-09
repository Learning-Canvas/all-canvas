export class Pvector{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
    add(seconvector){
        this.x+=seconvector.x;
        this.y+=seconvector.y;
    }
    sub(seconvector){
        this.x-=seconvector.x;
        this.y-=seconvector.y;
    }
    mult(scalar){
        this.x=this.x*scalar;
        this.y=this.y*scalar;
    }
    div(scalar){
        this.x=this.x/scalar;
        this.y=this.y/scalar;
    }
    mag(){
        return Math.sqrt(this.x*this.x+this.y*this.y)
    }
}