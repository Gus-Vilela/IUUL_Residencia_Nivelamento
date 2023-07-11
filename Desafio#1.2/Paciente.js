"use strict";
import luxon from "luxon";

class Paciente {
  #nome;
  #cpf;
  #dataNascimento;

  constructor(nome, cpf, dataNascimento) {
    this.#nome = nome;
    this.#cpf = cpf;
    this.#dataNascimento = dataNascimento;
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
  #calculaIdade() {
    let dataNascimento = luxon.DateTime.fromFormat(
      this.dataNascimento,
      "dd/MM/yyyy"
    );
    let hoje = luxon.DateTime.now();
    let idade = hoje.diff(dataNascimento, "years").years;
    return idade;
  }

  get idade() {
    return this.#calculaIdade();
  }

  //verifica se o nome tem 5 ou mais caracteres
  static verificaNome(nome) {
    if (nome.length >= 5) {
      return true;
    } else {
      return false;
    }
  }
  //verifica se a data de nascimento tem o formato correto DD/MM/AAAA
  #verificaFormato(dataNascimento) {
    if (dataNascimento.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
      return true;
    } else {
      return false;
    }
  }
  //verifica se o o paciente tem pelo menos 13 anos
  #verificaIdade(dataNascimento) {
    if (this.#calculaIdade() >= 13) {
      return true;
    } else {
      return false;
    }
  }
  // verifica data de nascimento
  static verificaDataNascimento(dataNascimento) {
    if (this.#verificaFormato(dataNascimento)) {
      if (this.#verificaIdade(dataNascimento)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  //verificação completa do cpf incluindo o digito verificador
  static verificaCpf(cpf) {
    if (cpf.match(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)) {
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
      if (
        digito1 === Number(cpfArray[9]) &&
        digito2 === Number(cpfArray[10])
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
