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
    subvector(secondvector){
        let ret=new Pvector(this.x,this.y);
        ret.sub(secondvector)
        return ret;
    }
    mult(scalar){
        this.x=this.x*scalar;
        this.y=this.y*scalar;
    }
    div(scalar){
        if(scalar>0){
            this.x=this.x/scalar;
            this.y=this.y/scalar;
        }
        
    }
    mag(){
        return Math.sqrt(this.x*this.x+this.y*this.y)
    }
    setangle(angle){
        let newx = this.x * Math.cos(angle) - this.y * Math.sin(angle)
        let newy = this.x * Math.sin(angle) + this.y * Math.cos(angle)
        this.x=newx
        this.y=newy
        this.normalize()
    }
    normalize(){
        
        let mg=this.mag();
        if(mg!=0){
            this.x=this.x/mg;
            this.y=this.y/mg;
        }
        else{
            this.x=1;
            this.y=0;
        }
        
    }
    setmag(scalar){
        this.normalize();
        this.mult(scalar);
    }
    limit(x){
        if(this.mag()>x){
            this.normalize();
            this.mult(x)
        }
        
    }
    dot(vec2){
        return this.x*vec2.x+this.y*vec2.y;
    }
    anglebetween(vec2){
        return Math.acos(this.dot(vec2)/(this.mag()*vec2.mag()))
    }
    copy(){
        return new Pvector(this.x,this.y)
    }
    dist(vec2){
        return Math.sqrt((vec2.x-this.x)*(vec2.x-this.x)+(vec2.y-this.y)*(vec2.y-this.y))
    }
}