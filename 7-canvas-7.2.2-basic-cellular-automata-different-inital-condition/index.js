let canvas=document.getElementById("canvas")
let c=canvas.getContext("2d")
canvas.width=innerWidth
canvas.height=innerHeight
function drawpixel(c,x,y,color){
    c.beginPath()
    c.moveTo(x,y)
    c.lineTo(x+1,y+1)
    c.strokeStyle=color;
    c.stroke()
}
class CellularAutomata{
    constructor(rules){
    this.arr=[]      
    this.rules=rules
    }
    initialize(){
        for(let i=0;i<innerWidth;i++){
            if(i===innerWidth/2){
                this.arr.push(1)
            }
            else{
                this.arr.push(0)
            }
        }
    }
    run(c){
        for(let i=0;i<innerHeight;i++){
        this.update()
        this.draw(c,i)
        }
    }
    applyruleset(a,b,c){
        if(a===1 && b===1 && c===1){return this.rules[0]}
        if(a===1 && b===1 && c===0){return this.rules[1]}
        if(a===1 && b===0 && c===1){return this.rules[2]}
        if(a===1 && b===0 && c===0){return this.rules[3]}
        if(a===0 && b===1 && c===1){return this.rules[4]}
        if(a===0 && b===1 && c===0){return this.rules[5]}
        if(a===0 && b===0 && c===1){return this.rules[6]}
        if(a===0 && b===0 && c===0){return this.rules[7]}
    }
    update(){
        let newarr=[]   
        for(let i=0;i<this.arr.length-2;i++){
            newarr.push(this.applyruleset(this.arr[i],this.arr[i+1],this.arr[i+2]))
        }
        newarr.push(this.arr[this.arr.length-1])
        newarr.push(this.arr[this.arr.length-2])
        this.arr=newarr;
    }
    draw(c,i){
        if(i===1){
            console.log(this.arr)
        }
    for(let j=0;j<this.arr.length;j++){
        if(this.arr[j]===1){
            drawpixel(c,j,i,"black")
        }
    }
    }
}
let ca1=new CellularAutomata([0,0,0,1,1,1,1,0])
ca1.initialize()
ca1.run(c)
