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
        this.x=this.x/scalar;
        this.y=this.y/scalar;
    }
    mag(){
        return Math.sqrt(this.x*this.x+this.y*this.y)
    }
    setangle(theta){
        if(theta<=Math.PI/2 || theta>Math.PI*3/2){
            this.x=1
            this.y=-1*Math.tan(theta)
            this.normalize()
        }
        else{
        this.x=-1
        this.y=Math.tan(theta)
        this.normalize()
        }
        
    }
    normalize(){
        let mg=this.mag();
        if(mg!=0){
            this.x=this.x/mg;
            this.y=this.y/mg;
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
}