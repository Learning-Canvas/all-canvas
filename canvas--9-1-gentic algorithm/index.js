import { Population } from "./Population.js";

let canvas=document.getElementById('canvas')
canvas.width=innerWidth
canvas.height=innerHeight
let c=canvas.getContext('2d');
c.font = "bold 30px Arial";

let target="vishal is studing evoluinary "
let p1=new Population(1000,target.toUpperCase());
let population=p1.createpopulation();
p1.calcfitnessofpopulation();
let populationsize=population.length;
let lineheight=30;

function animate(){ 
    c.clearRect(0,0,innerWidth,innerHeight)
    requestAnimationFrame(animate)
    let avgfitness=p1.calcfitnessofpopulation()
    p1.reproduce()
    let [fitest,fitness]=p1.fitest();
    c.font = "bold 30px Arial";
    c.fillText("target:            "+target, 10,2*lineheight);
    c.fillText("Best phrase: "+fitest.toLowerCase(), 10,3*lineheight);
    c.fillText("fitness: "+fitness, 10,4*lineheight);
    c.font = "normal 30px Arial";
    c.fillText("average fitness="+avgfitness,10,5*lineheight)
    
    for(let i=0;i<populationsize;i++){
        c.fillText(population[i].dna.toLowerCase(),innerWidth/2,50+i*lineheight);
    }
    
}
animate()

