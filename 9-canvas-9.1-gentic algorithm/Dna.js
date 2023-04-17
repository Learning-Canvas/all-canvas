export class Dna{
    constructor(dna,target){
        this.dna=dna;
        this.target=target;
        this.fitness=0;
        this.normalizedfitness=0;
        
    }
    calcfitness(){
        let count=0;
        for(let i=0;i<this.target.length;i++){
            if(this.dna[i]===this.target[i]){
                count++;
            }
        }
        this.fitness=count;
    }
}