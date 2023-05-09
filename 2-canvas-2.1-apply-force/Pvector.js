export class Pvector{
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
    normalize(){
        let magni=this.mag();
        this.x=this.x/magni;
        this.y=this.y/magni;
    }
    setmag(num){
        this.normalize();
        this.mult(num);
    }
    limit(num){
        let magni=this.mag();
        if(magni>num){
            this.setmag(num)
        }
    }
}


