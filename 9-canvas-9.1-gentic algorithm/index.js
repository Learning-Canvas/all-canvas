import { Population } from "./Population.js";

let canvas=document.getElementById('canvas')
canvas.width=innerWidth
canvas.height=innerHeight
let c=canvas.getContext('2d');
c.font = "bold 30px Arial";
let LINEBREAKER=2;

let generation=0;
let target="I wrote my first genetic algorithm  "
let populationsize=1000;
let mutationrate=5;
let p1=new Population(populationsize,target.toUpperCase(),mutationrate);
let population=p1.createpopulation();
p1.calcfitnessofpopulation();

let lineheight=30;

function animate(){ 
    c.clearRect(0,0,innerWidth,innerHeight)
    let reqid=requestAnimationFrame(animate)
    generation++;   
    let avgfitness=p1.calcfitnessofpopulation()
    let [fitest,fitness]=p1.fitest();
    p1.reproduce()
    population=p1.population;
    
    c.font = "bold 30px Arial";
    c.fillText("target:            ", 10,LINEBREAKER*lineheight);
    c.fillText(target.toLowerCase(), 10,(LINEBREAKER+1)*lineheight);
    c.fillText("Best phrase: ", 10,(LINEBREAKER+2)*lineheight);
    c.fillText(fitest.toLowerCase(), 10,(LINEBREAKER+3)*lineheight);
    c.fillText("fitness: "+fitness, 10,(LINEBREAKER+4)*lineheight);
    c.font = "normal 30px Arial";
    c.fillText("average fitness: "+avgfitness,10,(LINEBREAKER+5)*lineheight)
    c.fillText("generation: "+generation,10,(LINEBREAKER+6)*lineheight)
    c.fillText("mutation rate: "+mutationrate,10,(LINEBREAKER+7)*lineheight)
    c.fillText("total population: "+populationsize,10,(LINEBREAKER+8)*lineheight)
    if(target.length===fitness){
        cancelAnimationFrame(reqid)
    }
    
    for(let i=0;i<populationsize;i++){
        c.fillText(population[i].dna.toLowerCase(),innerWidth/2,50+i*lineheight);
    }
    
}
animate()

