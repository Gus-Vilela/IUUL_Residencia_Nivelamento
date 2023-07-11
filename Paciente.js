"use strict";
import PromptSync from "prompt-sync";
const prompt = PromptSync({ sigint: true });

class Paciente {
  #nome;
  #cpf;
  #dataNascimento;

  constructor(nome, cpf, dataNascimento) {
    this.#nome = nome;
    this.#cpf = cpf;
    this.#dataNascimento = dataNascimento;
  }
}
