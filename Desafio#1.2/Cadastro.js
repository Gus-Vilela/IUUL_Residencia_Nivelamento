"use strict";
import luxon from "luxon";


class Cadastro {
  #pacientes;
  constructor() {
    this.#pacientes = [];
  }
  get pacientes() {
    return this.#pacientes;
  }
  //verifica se o paciente já está cadastrado por cpf
  #verificaPaciente(cpf) {
    let paciente = this.#pacientes.find((paciente) => paciente.cpf === cpf);
    if (paciente) {
      return true;
    } else {
      return false;
    }
  }
  //recebe um paciente e o adiciona no array de pacientes
  cadastrar(paciente) {
    if (this.#verificaPaciente(paciente.cpf)) {
      throw new Error("Paciente já cadastrado");
    } else {
      this.#pacientes.push(paciente);
    }
  }
  //recebe um cpf e retorna o paciente correspondente
  buscar(cpf) {
    let paciente = this.#pacientes.find((paciente) => paciente.cpf === cpf);
    if (paciente) {
      return paciente;
    } else {
      throw new Error("Paciente não encontrado");
    }
  }
  //recebe um cpf e remove o paciente correspondente
  remover(cpf) {
    let paciente = this.#pacientes.find((paciente) => paciente.cpf === cpf);
    if (paciente) {
      this.#pacientes.splice(this.#pacientes.indexOf(paciente), 1);
    } else {
      throw new Error("Paciente não encontrado");
    }
  }
}
