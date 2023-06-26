"use strict";
// classe vértice
export class Vertice{
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