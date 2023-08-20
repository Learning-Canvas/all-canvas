let canvas=document.getElementById("canvas")
let c=canvas.getContext("2d")
let input=document.getElementById("value")
let change=document.getElementById("change")
alert("eneter number and click outside")
canvas.width=innerWidth
canvas.height=innerHeight
function drawpixel(c,x,y,color){
    c.beginPath()
    c.strokeStyle=color;
    c.fillStyle=color;
    c.fillRect(x,y,1,1)
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
        this.draw(c,i)
        this.update()
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
         newarr.push(this.arr[0])
        for(let i=1;i<this.arr.length-1;i++){
            newarr.push(this.applyruleset(this.arr[i-1],this.arr[i],this.arr[i+1]))
        }
        newarr.push(this.arr[this.arr.length-1])
        this.arr=newarr;
    }
    draw(c,i){
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


function attachzeros(result){
let num=8-result.length;
let retadd=""
for(let i=0;i<num;i++){
    retadd+="0"
}
return retadd+result
}

function update(){
    let iv1=parseInt(input.value)
    let result=iv1.toString(2);
    if(iv1>=0 && iv1<256){
        let resultarr=[0,0,0,0,0,0,0,0]
        result=attachzeros(result)
        for(let i=0;i<result.length;i++){
            resultarr[i]=parseInt(result[i])
        }
        c.clearRect(0,0,innerWidth,innerHeight)
        let ca1=new CellularAutomata(resultarr)
        ca1.initialize()
        ca1.run(c)
    }
}
