"use strict";
import PromptSync from 'prompt-sync';
const prompt = PromptSync({  sigint: true  });

// classe vértice
class Vertice{
    #x;
    #y;
    constructor (x, y){
        this.#x = x;
        this.#y = y;
    }   
    get x(){
        return this.#x;
    }
    get y(){
        return this.#y;
    }
    // calcula a distancia	entre dois vértices
    distancia(vertice){
        return Math.sqrt(Math.pow((this.#x - vertice.x), 2) + Math.pow((this.#y - vertice.y), 2));
    }
    // move o vértice para uma nova posição
    move(x, y){
        this.#x = x;
        this.#y = y;
    }
    // verifica se dois vértices são iguais
    equals(vertice){
        return this.#x === vertice.x && this.#y === vertice.y;
    }
}   

let x;
let y;
let vertices = [];
for(let i = 0; i < 3; i++){
    do{
        x = prompt(`Digite o valor de x do vértice ${i + 1}: `);
    }while(isNaN(x));
    do{
        y = prompt(`Digite o valor de y do vértice ${i + 1}: `);
    }while(isNaN(y));
    vertices.push(new Vertice(Number(x),Number(y)));
}
let [vertice1,vertice2,vertice3] = vertices;
console.log(`A distância entre o vértice 1 e o vértice 2 é: ${vertice1.distancia(vertice2)}`);
console.log(`A distância entre o vértice 2 e o vértice 3 é: ${vertice2.distancia(vertice3)}`);
console.log(`A distância entre o vértice 3 e o vértice 1 é: ${vertice3.distancia(vertice1)}`);
console.log("Vértice 1 e 2 são iguais?", vertice1.equals(vertice2))
vertice2.move(5,4);
console.log("Vértice 1 e 2 são iguais?", vertice1.equals(vertice2))
