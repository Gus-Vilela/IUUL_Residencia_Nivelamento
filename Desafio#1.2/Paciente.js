"use strict";
import { DateTime } from "luxon";

export class Paciente {
  #nome;
  #cpf;
  #dataNascimento;

  constructor(nome, cpf, dataNascimento) {
    if (
      this.#verificaNome(nome) &&
      this.#verificaFormatoData(dataNascimento) &&
      this.#verificaIdade(dataNascimento) &&
      this.#verificaCpf(cpf)
    ) {
      this.#nome = nome;
      this.#cpf = cpf;
      this.#dataNascimento = dataNascimento;
    }
  }
  get nome() {
    return this.#nome;
  }
  get cpf() {
    return this.#cpf;
  }
  get dataNascimento() {
    return this.#dataNascimento;
  }
  //calcula a idade do paciente com luxon
  #calculaIdade(dataNascimento) {
    let data = DateTime.fromFormat(dataNascimento, "dd/MM/yyyy");
    let idade = DateTime.now().diff(data, "years").toObject();
    //retorna a idade em anos arredondada
    return Math.floor(idade.years);
  }

  get idade() {
    return this.#calculaIdade(this.#dataNascimento);
  }

  //verifica se o nome tem 5 ou mais caracteres
  #verificaNome(nome) {
    if (nome.length >= 5) {
      return true;
    } else {
      throw new Error("O nome deve ter no mínimo 5 caracteres");
    }
  }
  //verifica se a data de nascimento tem o formato correto DD/MM/AAAA
  #verificaFormatoData(dataNascimento) {
    if (dataNascimento.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
      return true;
    } else {
      throw new Error("A data de nascimento deve ter o formato DD/MM/AAAA");
    }
  }
  //verifica se o o paciente tem pelo menos 13 anos
  #verificaIdade(dataNascimento) {
    if (this.#calculaIdade(dataNascimento) >= 13) {
      return true;
    } else {
      throw new Error("O paciente deve ter pelo menos 13 anos");
    }
  }

  //verificação completa do cpf incluindo o digito verificador
  #verificaCpf(cpf) {
    let cpfLimpo = cpf.replace(".", "").replace(".", "").replace("-", "");
    let cpfArray = cpfLimpo.split("");
    let digito1 = 0;
    let digito2 = 0;
    let j = 10;
    for (let i = 0; i < 9; i++) {
      digito1 += cpfArray[i] * j;
      j--;
    }
    j = 11;
    for (let i = 0; i < 10; i++) {
      digito2 += cpfArray[i] * j;
      j--;
    }
    digito1 = (digito1 * 10) % 11;
    digito2 = (digito2 * 10) % 11;
    if (digito1 === 10) {
      digito1 = 0;
    }
    if (digito2 === 10) {
      digito2 = 0;
    }
    if (digito1 === Number(cpfArray[9]) && digito2 === Number(cpfArray[10])) {
      return true;
    } else {
      throw new Error("CPF inválido");
    }
  }
}
