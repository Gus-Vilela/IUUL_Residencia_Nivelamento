"use strict";
import { Paciente } from "./Paciente.js";
import { DateTime } from "luxon";
import { Consulta } from "./Consulta.js";

export class Cadastro {
  #pacientes;
  #agenda;
  constructor() {
    this.#pacientes = [];
    this.#agenda = [];
  }
  get pacientes() {
    return this.#pacientes;
  }
  //busca um paciente e retorna esse paciente
  #retornarPaciente(cpf) {
    let paciente = this.#pacientes.find((paciente) => paciente.cpf === cpf);
    if (paciente) {
      return paciente;
    } else {
      return false;
    }
  }

  //recebe um paciente e o adiciona no array de pacientes
  cadastrarPaciente(paciente) {
    if (this.#retornarPaciente(paciente.cpf)) {
      throw new Error("CPF já cadastrado");
    } else {
      this.#pacientes.push(paciente);
      return "Paciente cadastrado com sucesso!";
    }
  }
  //recebe um cpf e retorna o paciente correspondente
  buscarPaciente(cpf) {
    let paciente = this.#retornarPaciente(cpf);
    if (paciente) {
      return paciente;
    }
    throw new Error("Paciente não encontrado");
  }
  //recebe um cpf e remove o paciente correspondente
  removerPaciente(cpf) {
    let paciente = this.#retornarPaciente(cpf);
    if (paciente) {
      let index = this.#pacientes.indexOf(paciente);
      this.#pacientes.splice(index, 1);
      return "Paciente removido com sucesso";
    }
    throw new Error("Paciente não encontrado");
  }
  //verifica se já os horarios e datas das consultas não se sobrepõem
  #verificarSobreposicao(consulta) {
    let consultas = this.#agenda.filter(
      (c) =>
        c.data === consulta.data &&
        ((c.hinicio <= consulta.hinicio && c.hfim > consulta.hinicio) ||
          (c.hinicio < consulta.hfim && c.hfim >= consulta.hfim) ||
          (c.hinicio >= consulta.hinicio && c.hfim <= consulta.hfim))
    );
    if (consultas.length > 0) {
      return true;
    } else {
      return false;
    }
  }
  //recebe o paciente e devolve a sua consulta agendada
  #buscarConsulta(paciente) {
    let consulta = this.#agenda.filter(
      (consulta) =>
        consulta.paciente.cpf === paciente.cpf &&
        DateTime.fromFormat(consulta.data, "dd/MM/yyyy") > DateTime.now()
    );
    if (consulta.length > 0) {
      return consulta;
    }
    return false;
  }

  //recebe cpf e agenda uma consulta para o paciente correspondente
  agendarConsulta(cpf, hinicio, hfim, data) {
    let paciente = this.buscarPaciente(cpf);
    if (paciente) {
      let consulta = new Consulta(hinicio, hfim, paciente, data);
      if (this.#buscarConsulta(paciente)) {
        throw new Error(
          "O paciente já tem uma consulta marcada para uma data futura"
        );
      }
      if (this.#verificarSobreposicao(consulta)) {
        throw new Error("Já existe uma consulta marcada para esse horário");
      }
      this.#agenda.push(consulta);
      return "Consulta agendada com sucesso";
    }
  }

  //Cancelamento de um agendamento: são necessários CPF do paciente, data da consulta e hora inicial.
  cancelarConsulta(cpf, hinicio, data) {
    let paciente = this.buscarPaciente(cpf);
    if (paciente) {
      let index = this.#agenda.findIndex(
        (consulta) =>
          consulta.paciente.cpf === paciente.cpf &&
          consulta.data === data &&
          consulta.hinicio === hinicio
      );
      if (index != -1) {
        this.#agenda.splice(index, 1);
        return "Consulta cancelada com sucesso";
      }
      throw new Error("Consulta não encontrada");
    }
  }
  /*  Listagem dos Pacientes
a. A listagem de pacientes deve ser apresentada conforme o layout definido no final desse
documento e pode estar ordenada de forma crescente por CPF ou nome, à escolha do
usuário.
b. Se o paciente possuir um agendamento futuro, os dados do agendamento devem ser
apresentados abaixo dos dados do paciente.
  */
  listarPacientes(ordem) {
    let pacientes = this.#pacientes;
    if (ordem === "cpf") {
      pacientes = pacientes.sort((a, b) => a.cpf - b.cpf);
    } else if (ordem === "nome") {
      pacientes = pacientes.sort((a, b) => {
        if (a.nome > b.nome) {
          return 1;
        } else {
          return -1;
        }
      });
    }
    let lista = "";
    pacientes.forEach((paciente) => {
      lista += `Nome: ${paciente.nome} CPF: ${paciente.cpf} Data de Nascimento: ${paciente.dataNascimento} \n`;
      let consulta = this.#buscarConsulta(paciente);
      if (consulta) {
        consulta.forEach((consulta) => {
          lista += `Data da consulta: ${consulta.data} Horário: ${consulta.hinicio} - ${consulta.hfim} \n`;
        });
      }
      lista += "\n";
    });
    return lista;
  }
}
