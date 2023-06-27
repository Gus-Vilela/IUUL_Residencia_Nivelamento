"use strict";
import PromptSync from 'prompt-sync';
const prompt = PromptSync({  sigint: true  });

class Aluno{
    #matricula;
    #nome;
    #nota1 = null;
    #nota2 = null;
    constructor(matricula, nome){
        this.#matricula = matricula;
        this.#nome = nome;
    }
    #veridicaNota(nota){
        if(isNaN(nota)){
            throw new Error("A nota deve ser um número");
        }
        if(nota < 0 || nota > 10){
            throw new Error("A nota deve ser um número entre 0 e 10");
        }
    }
    set nota1(nota){
        this.#veridicaNota(nota);
        this.#nota1 = nota;
    }
    set nota2(nota){
        this.#veridicaNota(nota);
        this.#nota2 = nota;
    }
    get matricula(){
        return this.#matricula;
    }
    get nome(){
        return this.#nome;
    }
    get nota1(){
        return this.#nota1;
    }
    get nota2(){  
        return this.#nota2;
    }
    //Retornar a média do aluno com base na presença nas provas.
    get media(){
        if(this.#nota1 !== null && this.#nota2 !== null){
            return (this.#nota1 + this.#nota2)/2;
        }else if(this.#nota1 === null){
            return this.#nota2/2;
        }else if(this.#nota2 === null){
            return this.#nota1/2;
        }
        return 0; 
    }
}

class Turma{
    #alunos;
    constructor(...alunos){
        //verifica matriculas repetidas
        let matriculas = [];
        alunos.forEach(aluno => {
            if(matriculas.includes(aluno.matricula)){
                throw new Error("Matrícula já cadastrada");
            }
            matriculas.push(aluno.matricula);
        }
        );
        this.#alunos = alunos;
    }    
     //Procurar um aluno na turma a partir da matrícula.
    #procuraAluno(matricula){
      return this.#alunos.findIndex(alunoTurma => alunoTurma.matricula === matricula);
    }
    //Inserir um aluno na turma. Não podem ser inseridos dois alunos com a mesma matrícula.
    addAluno(aluno){
        if(this.#procuraAluno(aluno.matricula) !== -1){
            console.log("Matricula já cadastrada");
            return false;
        }
        this.#alunos.push(aluno);
        return true;
    }
    //Remover um aluno da turma a partir da matrícula com procuraAluno.
    removeAluno(matricula){
        let i = this.#procuraAluno(matricula);
        if(i === -1){
            console.log("Aluno não encontrado");
            return false;
        }
        this.#alunos.splice(i, 1);
        return true;
    }
    //Lançar a nota (seja ela P1 ou P2) de um aluno.
    lancarNota(matricula, nota, prova){
        let i = this.#procuraAluno(matricula);
        if(i === -1){
            console.log("Aluno não encontrado");
            return false;
        }
        if(prova === "P1" || prova === "p1"){
            this.#alunos[i].nota1 = Number(nota);
        }else if(prova === "P2" || prova === "p2"){
            this.#alunos[i].nota2 = Number(nota);
        }else{
            throw new Error("Prova inválida");
        }
        return true;
    }
    // imprime os alunos no formato tabela em ordem alfabética com suas notas e médias
    imprimeAlunos(){
        let alunos = this.#alunos.sort((a, b) => {
            a = a.nome.toLowerCase();
            b = b.nome.toLowerCase();
            if(a < b){
                return -1;
            }
            if(a > b){
                return 1;
            }
            return 0;
        });
        console.log("Matrícula  Nome\t\t\tP1  P2  NF");
        alunos.forEach(aluno => {
            console.log(`  ${aluno.matricula}   ${aluno.nome}\t${!aluno.nota1 ? "-" : aluno.nota1.toFixed(1)}  ${!aluno.nota2 ? "-" : aluno.nota2.toFixed(1)}  ${aluno.media.toFixed(1)}`);
          }
        );
    }
}

console.log("Digite as informações dos alunos: ");
let matricula;
let nome;
let alunos = [];
do{
    do{
        matricula = prompt("Digite a matrícula do aluno: ");
    }while(isNaN(matricula));
    nome = prompt("Digite o nome do aluno: ");
    alunos.push(new Aluno(matricula, nome));
    nome = prompt("Deseja adicionar mais um aluno? (s/n)");
}while(nome === 's' || nome === 'S');

let turma = new Turma(...alunos);

let opcao;
do{
    console.log("Digite a opção desejada: ");
    console.log("1 - Adicionar aluno");
    console.log("2 - Remover aluno");
    console.log("3 - Lançar nota");
    console.log("4 - Imprimir alunos");
    console.log("0 - Sair");
    do{
        opcao = prompt("Digite a opção desejada: ");
    }while(isNaN(opcao));
    switch(opcao){
        case '1':
            do{
                do{
                    matricula = prompt("Digite a matrícula do aluno: ");
                }while(isNaN(matricula));
                nome = prompt("Digite o nome do aluno: ");
                turma.addAluno(new Aluno(matricula, nome))
                nome = prompt("Deseja adicionar mais um aluno? (s/n)");
            }while(nome === 's' || nome === 'S');
            break;
        case '2':
            do{
                matricula = prompt("Digite a matrícula do aluno: ");
            }while(isNaN(matricula));
            turma.removeAluno(matricula);
            break;
        case '3':
            let prova;
            do{
                matricula = prompt("Digite a matrícula do aluno: ");
            }while(isNaN(matricula));
            do{
                prova = prompt("Digite a prova (P1, p1 ou P2, p2): ");
            }while(prova !== "P1" && prova !== "p1" && prova !== "P2" && prova !== "p2");
            let nota;
            do{
                nota = prompt("Digite a nota: ");
            }while(isNaN(nota));
            turma.lancarNota(matricula, nota, prova);
            break;
        case '4':
            turma.imprimeAlunos();
            break;
        case '0':
            break;
        default:
            console.log("Opção inválida");
    }
}while(opcao !== '0');