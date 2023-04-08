let canvas=document.getElementById('canvas');
canvas.height=window.innerHeight;
canvas.width=window.innerWidth;
let c=canvas.getContext("2d")

class Node{
    constructor(val){
        this.val=val;
        this.next=null;
    }
}

class perlinnoise{
    constructor(length){
        
        this.length=length-2;
        this.head=new Node(Math.random());
        this.tail=new Node(Math.random());
        let curr=this.head;
        let count=this.length;
        while(count-->0){
            curr.next=new Node(Math.random());
            curr=curr.next;
        }
        curr.next=this.tail;
    }
    generate(){
        if(this.length==-1){
            return Math.random()
        }
        let temp=this.head.next;
        this.head.next=null;
        this.head=temp;
        this.tail.next=new Node(Math.random());
        this.tail=this.tail.next;
        let curr=this.head;
        let ret=0;
        let count=0;
        while(curr!=null){
            ret+=curr.val;
            curr=curr.next;
            count++;
        }
        this.length=count;
        return ret/(count);
    }
}
const fps=1000;//set the frame rate of animation
//new perlinnoise(smoothness of perlin noise if randomness a lot more smoother just increase the number)
let per1=new perlinnoise(5);
let x=innerWidth/2;
let y=innerHeight/2;
let speed=5;
c.beginPath();


function animate(){
    
    // requestAnimationFrame(animate);
    

    setTimeout(() => {
        requestAnimationFrame(animate);
        let num=per1.generate()*4;
        
        let temprand=Math.floor(num);
        console.log(per1.length);
        
        switch(temprand){
            case 0:
                y+=speed;
                break;
            case 1:
                x+=speed;
                break;
            case 2:
                x-=speed;
                break
            default:
                y-=speed;              
        }
        c.lineTo(x,y);
        
        c.stroke(); 
       
        
      }, 1000 / fps);
}
animate();