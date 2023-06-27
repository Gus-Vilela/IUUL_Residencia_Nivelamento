"use strict";
import PromptSync from 'prompt-sync';
const prompt = PromptSync({  sigint: true  });

//classe cliente
class Cliente{
  #nome;
  #cpf;
  #dataNascimento;
  #rendaMensal;
  #estadoCivil;
  #dependentes;

  constructor(nome, cpf, dataNascimento, rendaMensal, estadoCivil, dependentes){
    this.#nome = nome;
    this.#cpf = cpf;
    this.#dataNascimento = dataNascimento;
    this.#rendaMensal = rendaMensal;
    this.#estadoCivil = estadoCivil;
    this.#dependentes = dependentes;
  }
  //verifica se a data de nascimento tem o formato correto e se o cliente tem pelo menos 18 anos
  static verificaIdade(dataNascimento){
    if(dataNascimento.match(/^\d{2}\/\d{2}\/\d{4}$/)){
      let atual = new Date();
      let data = new Date(dataNascimento.split("/")[2], dataNascimento.split("/")[1] - 1, dataNascimento.split("/")[0]);
      let idade = atual.getFullYear() - data.getFullYear();
      let difMes = atual.getMonth() - data.getMonth();
      if (difMes < 0 || (difMes === 0 && hoje.getDate() < data.getDate())) {
        idade--;
      }
      // Verifica se a idade é maior ou igual a 18
      if (idade >= 18) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  //vericia se a renda mensal é maior que 0, se tiver virgula troca por um ponto e se tem pelo menos 2 casas decimais
  static verificaRendaMensal (rendaMensal){
    // regex que aceita números com no máximo 2 casas decimais
    if(rendaMensal.match(/^\d+(\.\d{1,2})?$/)){
      return true;
    } else {
      return false;
    }
  }
  //remove a virgula da renda mensal
  static removeVirgula(rendaMensal){
    return rendaMensal.replace(",", ".");
  }
  get nome(){
    return this.#nome;
  }
  //trasforma o cpf em uma string, verifica se tem 11 digitos para aceitar 0 a esquerda e adiciona pontos e traço
  get cpf(){
    let cpf = this.#cpf.toString();
    cpf = cpf.padStart(11, "0");
    return cpf.slice(0,3) + "." + cpf.slice(3,6) + "." + cpf.slice(6,9) + "-" + cpf.slice(9,11);
  }
  //retorna a data de nascimento no formato dd/mm/aaaa
  get dataNascimento(){
    let data = this.#dataNascimento;
    return `${data.getDate().toString().padStart(2, "0")}/${(data.getMonth() + 1).toString().padStart(2, "0")}/${data.getFullYear()}`
  }
  //retorna rendamensal,substitui "." por ",", se não tiver casas decimais adiciona ",00", se tiver apenas uma casa decimal adiciona um 0 a direita
  get rendaMensal(){
    let rendaMensal = this.#rendaMensal.toString();
    if(rendaMensal.indexOf(".") == -1){
      rendaMensal += ",00";
    } else if(rendaMensal.indexOf(".") == rendaMensal.length - 2){
      rendaMensal += "0";
    }
    return "R$" + rendaMensal.replace(".", ",");
  }
  get estadoCivil(){
    return this.#estadoCivil;
  }
  get dependentes(){
    return this.#dependentes;
  }
}


console.log("Forneça os dados do cliente:");
let nome = "";
let cpf = "";
let dataNascimento = "";
let rendaMensal = "";
let estadoCivil = "";
let dependentes = "";
do{
  nome = prompt("Digite o nome do cliente: (deve conter pelo menos 5 letras)");
  //verifica se o nome tem pelo menos 5 letras e é uma String
} while( nome.length < 5 || !isNaN(nome) );
do{
  cpf = prompt("Digite um CPF  do cliente: (deve conter 11 digitos)");
  //verifica se o cpf tem 11 digitos e é um número
} while( cpf.length != 11 || isNaN(cpf) );
do{
  dataNascimento = prompt("Digite a data de nascimento do cliente: (dd/mm/aaaa)");
  //verifica se a data de nascimento tem o formato correto e se o cliente tem pelo menos 18 anos
}while( !Cliente.verificaIdade(dataNascimento));
do{
  rendaMensal = prompt("Digite a renda mensal do cliente: (deve ser um número com no máximo 2 casas decimais)");
  //substitui "," por "."
  rendaMensal = Cliente.removeVirgula(rendaMensal); 
  //verifica se a renda mensal é um número e se é maior que 0, aceita no maximo 2 casas decimais
}while( !Cliente.verificaRendaMensal(rendaMensal) );
do{
  estadoCivil = prompt("Digite o estado civil do cliente: (S, C, V ou D)");
  //verifica se o estado civil é S, C, V ou D sem diferenciar maiusculas de minusculas e se é uma String
}while( !estadoCivil.match(/^[scvdSCVD]$/) );
do{
  dependentes = prompt("Digite a quantidade de dependentes do cliente: (deve ser um número inteiro)");
  //verifica se a quantidade de dependentes é um número inteiro de 0 a 10
}while( !dependentes.match(/^[0-9]$/) );

// cria um objeto cliente com os tipos de dados corretos
let cliente = new Cliente( nome, Number(cpf),
  new Date(dataNascimento.split("/")[2], dataNascimento.split("/")[1] - 1, dataNascimento.split("/")[0]),
  Number(Cliente.removeVirgula(rendaMensal)), estadoCivil.toUpperCase(), Number(dependentes));

//imprime os dados do cliente
console.log("Dados do cliente:");
console.log("Nome: " + cliente.nome);
console.log("CPF: " + cliente.cpf);
console.log("Data de nascimento: " + cliente.dataNascimento);
console.log("Renda mensal: " + cliente.rendaMensal);
console.log("Estado civil: " + cliente.estadoCivil);
console.log("Dependentes: " + cliente.dependentes);