"use strict";
import PromptSync from 'prompt-sync';
const prompt = PromptSync({  sigint: true  });
import {Vertice} from './vertice.js';

class Triangulo {
    #vertice1; 
    #vertice2; 
    #vertice3; 
    constructor(vertice1, vertice2, vertice3) {
        if (this.formaTriangulo(vertice1, vertice2, vertice3)) {
            this.#vertice1 = vertice1;
            this.#vertice2 = vertice2;
            this.#vertice3 = vertice3;
        } else {
            throw new Error("Os vértices não formam um triângulo");
        }
    }
    get vertice1() {
        return this.#vertice1;
    }
    get vertice2() {
        return this.#vertice2;
    }
    get vertice3() {
        return this.#vertice3;
    }
    // verifica se os vértices formam um triângulo
    formaTriangulo(vertice1, vertice2, vertice3) {
        let a = vertice1.distancia(vertice2);
        let b = vertice2.distancia(vertice3);
        let c = vertice3.distancia(vertice1);
        return a + b > c && a + c > b && b + c > a;
    }
    // verifica se dois triangulos são iguais
    equals(triangulo) {
        return this.vertice1.equals(triangulo.vertice1) && 
        this.vertice2.equals(triangulo.vertice2) && 
        this.vertice3.equals(triangulo.vertice3);
    }   
    // retorna o perímetro do triângulo
    get perimetro() {
        return this.vertice1.distancia(this.vertice2) + 
        this.vertice2.distancia(this.vertice3) + 
        this.vertice3.distancia(this.vertice1);
    }
    // retorna o tipo do triângulo
    tipo() {
        let a = this.vertice1.distancia(this.vertice2);
        let b = this.vertice2.distancia(this.vertice3);
        let c = this.vertice3.distancia(this.vertice1);
        if (a === b && b === c) {
            return "equilátero";
        } else if (a === b || b === c || a === c) {
            return "isósceles";
        } else {
            return "escaleno";
        }
    }
    // retorna uma copia do triângulo
    clone() {
        return new Triangulo(this.vertice1, this.vertice2, this.vertice3);
    }
    // retorna a area do triângulo
    get area() {
        let a = this.vertice1.distancia(this.vertice2);
        let b = this.vertice2.distancia(this.vertice3);
        let c = this.vertice3.distancia(this.vertice1);
        let s = this.perimetro / 2;
        return Math.sqrt(s * (s - a) * (s - b) * (s - c));
    }
}
console.log("Digite os vértices dos triângulos: ")
let x;
let y;
let vertices = [];
for(let j = 0; j < 3; j++){
    for(let i = 0; i < 3; i++){
        do{
            x = prompt(`Digite o valor de x do vértice ${i + 1} do ${j+1} triângulo: `);
        }while(isNaN(x));
        do{
            y = prompt(`Digite o valor de y do vértice ${i + 1} do ${j+1} triângulo: `);
        }while(isNaN(y));
        vertices.push(new Vertice(Number(x),Number(y)));
    }
}
let [v11,v12,v13,v21,v22,v23,v31,v32,v33] = vertices;
let triangulo1 = new Triangulo(v11,v12,v13);
let triangulo2 = new Triangulo(v21,v22,v23);
let triangulo3 = new Triangulo(v31,v32,v33);
console.log("Triângulo 1 e 2 são iguais?", triangulo1.equals(triangulo2));
console.log("Triângulo 1 e 3 são iguais?", triangulo1.equals(triangulo3));
console.log(`O perímetro do triângulo 1 é: ${triangulo1.perimetro}`);
console.log(`O perímetro do triângulo 2 é: ${triangulo2.perimetro}`);
console.log(`O perímetro do triângulo 3 é: ${triangulo3.perimetro}`)
console.log(`O tipo do triângulo 1 é: ${triangulo1.tipo()}`);
console.log(`O tipo do triângulo 2 é: ${triangulo2.tipo()}`);
console.log(`O tipo do triângulo 3 é: ${triangulo3.tipo()}`);
console.log(`A área do triângulo 1 é: ${triangulo1.area}`);
console.log(`A área do triângulo 2 é: ${triangulo2.area}`);
console.log(`A área do triângulo 3 é: ${triangulo3.area}`);