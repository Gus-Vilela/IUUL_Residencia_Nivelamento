"use strict";
import PromptSync from 'prompt-sync';
const prompt = PromptSync({  sigint: true  });
import {Vertice} from './vertice.js';

class Poligono{
    #vertices;
    constructor(vertices){
      if(vertices.length < 3){
        throw new Error("O polígono deve ter pelo menos 3 vértices");
      }
      this.#vertices = vertices;
    }
    get vertices(){
      return this.#vertices;
    }
    // adiciona um vértice ao polígono
    addVertice(vertice){
      if(this.#vertices.includes(vertice)){
        return false;
      }
      this.#vertices.push(vertice);
      return true;
    }
    // retorna o perimetro do polígono
    get perimetro(){
      let p = this.#vertices.reduce((acumulador, vertice, index, vertices) => {
        if(index === vertices.length - 1){
          return acumulador + vertice.distancia(vertices[0]);
        }
        return acumulador + vertice.distancia(vertices[index + 1]);
      } , 0);
      return p;
    }
    // retorna o quantidade de vertices do polígono
    get qtdVertices(){
      return this.#vertices.length;
    }
}

console.log("Digite as coordenadas dos vértices: ");
let x;
let y;
let vertices = [];
do{
    do{
        x = prompt(`Digite o valor de x do vértice ${i + 1}: `);
    }while(isNaN(x));
    do{
        y = prompt(`Digite o valor de y do vértice ${i + 1}: `);
    }while(isNaN(y));
    vertices.push(new Vertice(Number(x),Number(y)));
    y = prompt("Deseja adicionar mais um vértice? (s/n)");
}while(y === 's' || y === 'S');
let poligono = new Poligono(vertices);
console.log(`O perímetro do polígono é: ${poligono.perimetro}`);
console.log(`O polígono tem ${poligono.qtdVertices} vértices`);
console.log(`Adicionando o vértice vertice1 ao polígono: ${poligono.addVertice(vertice1)}`);
console.log(`O polígono tem ${poligono.qtdVertices} vértices`);