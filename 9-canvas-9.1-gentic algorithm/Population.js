import { Dna } from "./Dna.js";
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomChar(){
    let textarr=[" ","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
    let randomNumber = Math.floor(Math.random()*textarr.length);
    return textarr[randomNumber];
}

export class Population{
    constructor(populationsize,target,mutationrate){
        this.populationsize=populationsize;
        this.target=target;
        this.targetlength=target.length;
        this.population=[]
        this.populationprobabilityarry=[];
        this.avgfitness=0;
        this.totalfitness=0;
        this.generation=1;
        this.mutationrate=mutationrate/100;
    }
    createpopulation(){
        for(let i=0;i<this.populationsize;i++){
            let currstring="";
            for(let j=0;j<this.targetlength;j++){
                currstring+=randomChar();
            }
            this.population.push(new Dna(currstring,this.target))
        }
        return this.population
    }
    calcfitnessofpopulation(){
        this.totalfitness=0
        for(let i=0;i<this.populationsize;i++){
            this.population[i].calcfitness();
        }
        
        for(let i=0;i<this.populationsize;i++){
            this.totalfitness+=this.population[i].fitness;
        }
        this.avgfitness=(this.totalfitness/(this.targetlength*this.populationsize))*100;
        this.normalizefitness()
        
        return Math.round(this.avgfitness)
    }
    normalizefitness(){
        for(let i=0;i<this.populationsize;i++){
            this.population[i].normalizefitness=Math.floor((this.population[i].fitness/this.totalfitness)*this.populationsize);
        }
    }
    reproduce(){
        let newpopluation=[];
        this.generatebucket();
        
        for(let i=0;i<this.populationsize;i++){
            let str1=this.selection();
            let str2=this.selection();
            newpopluation.push(new Dna(this.crossover(str1,str2),this.target));
        }
        this.mutation(newpopluation)
        this.population=newpopluation;
    }
    mutation(newpopluation){
        for(let i=0;i<this.populationsize;i++){
            let newpopluationsize=newpopluation[i].dna.length;
            for(let j=0;j<newpopluationsize;j++){
                if(Math.random()<this.mutationrate){
                    console.log(newpopluation[i].dna)
                    let rand=randomChar()
                    newpopluation[i].dna=newpopluation[i].dna.substring(0,j)+rand+newpopluation[i].dna.substring(j+1);
                    console.log(newpopluation[i].dna,j,rand)
                }
            }
        }
    }
    selection(){
        let randomNumber = Math.floor(Math.random()*this.populationprobabilityarry.length);
        return this.populationprobabilityarry[randomNumber];
    }
    generatebucket(){
        this.populationprobabilityarry=[];
        for(let i=0;i<this.populationsize;i++){
            
            for(let j=0;j<this.population[i].normalizefitness;j++){
                this.populationprobabilityarry.push(this.population[i].dna)
            }
        }
    }
    crossover(str1,str2){
        let ret="";
        let num=randomIntFromInterval(1,this.targetlength);
        ret+=str1.slice(0,num);
        ret+=str2.slice(num,this.targetlength)
        return ret;
    }
    fitest(){
        let maxfitness=this.population[0].fitness;
        let ret=this.population[0].dna;
        for(let i=1;i<this.populationsize;i++){
            
            if(maxfitness<this.population[i].fitness){
                maxfitness=this.population[i].fitness;
                ret=this.population[i].dna;
               
            }
        }
        
        return [ret,maxfitness];
    }
}