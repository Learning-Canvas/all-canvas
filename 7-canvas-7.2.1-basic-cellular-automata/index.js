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

class CellularAtomata{
    constructor(ruleset){
      this.arr=[]
      this.ruleset=ruleset;
    }
    initialize(){
        for(let i=0;i<innerWidth;i++){
            this.arr.push(0)
        }
    }
    applyruleset(a,b,c){
        if(a===0 && b===0 && c===0){return this.ruleset[0]}
        if(a===0 && b===0 && c===1){return this.ruleset[1]}
        if(a===0 && b===1 && c===0){return this.ruleset[2]}
        if(a===0 && b===1 && c===1){return this.ruleset[3]}
        if(a===1 && b===0 && c===0){return this.ruleset[4]}
        if(a===1 && b===0 && c===1){return this.ruleset[5]}
        if(a===1 && b===1 && c===0){return this.ruleset[6]}
        if(a===1 && b===1 && c===1){return this.ruleset[7]}

    }
    applyrules(){
        let updatearr=[]
        for(let i=0;i<this.arr.length-2;i++){
            updatearr.push(this.applyruleset(this.arr[i],this.arr[i+1],this.arr[i+2]))
        }
        this.arr=updatearr;
        console.log(this.arr)
    }
    drawinitial(i){
        for(let j=0;j<this.arr.length;j++){
            if(this.arr[j]===1){
                drawpixel(c,j,i,"black")
            }
            
        }
    }
    draw(c){
        for(let i=0;i<innerHeight;i++){
            this.applyrules()
            this.drawinitial(c,i)
        }
    }

}
let ca1=new CellularAtomata([0,0,0,1,1,1,1,0])
ca1.initialize()
ca1.draw(c)
