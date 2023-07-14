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
  #buscarPaciente(cpf) {
    let paciente = this.#retornarPaciente(cpf);
    if (paciente) {
      return paciente;
    } else {
      throw new Error("Paciente não encontrado");
    }
  }
  //recebe um cpf e remove o paciente correspondente verficando consultas futuras
  removerPaciente(cpf) {
    let paciente = this.#buscarPaciente(cpf);
    if (paciente) {
      let consulta = this.#buscarConsulta(paciente);
      if (consulta) {
        throw new Error(
          "O paciente tem uma consulta marcada para uma data futura"
        );
      }
      let index = this.#pacientes.findIndex(
        (pacienteAtual) => pacienteAtual.cpf === paciente.cpf
      );
      this.#pacientes.splice(index, 1);
      return "Paciente removido com sucesso";
    }
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

  //recebe o paciente e devolve a sua consulta futura agendada
  #buscarConsulta(paciente) {
    let consulta = this.#agenda.find(
      (consulta) =>
        consulta.paciente.cpf === paciente.cpf &&
        DateTime.fromFormat(
          consulta.data + consulta.hinicio,
          "dd/MM/yyyyHHmm"
        ) >=
          DateTime.now().set({
            seconds: 0,
            milliseconds: 0,
          })
    );
    if (consulta) {
      return consulta;
    }
    return false;
  }

  //recebe cpf e agenda uma consulta para o paciente correspondente
  agendarConsulta(cpf, hinicio, hfim, data) {
    let paciente = this.#buscarPaciente(cpf);
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
  //verifica se a data tem o formato correto DD/MM/AAAA
  #verificarFormData(data) {
    if (data.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
      return true;
    } else {
      throw new Error("A data deve ter o formato DD/MM/AAAA");
    }
  }
  //verifica se o horário tem o formato correto HHMM
  //recebe cpf, horario e data e cancela a consulta correspondente
  cancelarConsulta(cpf, hinicio, data) {
    let paciente = this.#buscarPaciente(cpf);
    if (paciente) {
      let hfim = Number(hinicio) + 15;
      let consulta = new Consulta(hinicio, hfim.toString(), paciente, data);
      let index = this.#agenda.findIndex(
        (consultaAtual) =>
          consultaAtual.paciente.cpf === consulta.paciente.cpf &&
          consultaAtual.data === consulta.data &&
          consultaAtual.hinicio === consulta.hinicio
      );
      if (index != -1) {
        this.#agenda.splice(index, 1);
        return "Consulta cancelada com sucesso";
      } else {
        throw new Error("Consulta não encontrada");
      }
    }
  }

  //ordena os pacientes em ordem crescente de cpf ou nome
  #ordenarPacientes(ordem) {
    let pacientesOrdenados = this.#pacientes.sort((a, b) => {
      if (ordem === "cpf") {
        if (a.cpf > b.cpf) {
          return 1;
        } else if (a.cpf < b.cpf) {
          return -1;
        } else {
          return 0;
        }
      } else if (ordem === "nome") {
        if (a.nome > b.nome) {
          return 1;
        } else if (a.nome < b.nome) {
          return -1;
        } else {
          return 0;
        }
      }
    });
    return pacientesOrdenados;
  }
  //imprime os pacientes
  #imprimirPacientes(pacientes) {
    let lista = "";
    pacientes.forEach((paciente) => {
      lista += `CPF: ${paciente.cpf} Nome: ${paciente.nome}  Dt.Nasc: ${paciente.dataNascimento} Idade: ${paciente.idade} \n`;
      let consulta = this.#buscarConsulta(paciente);
      if (consulta) {
        lista += `Agendado para: ${consulta.data} \n ${consulta.hIniForm} às ${consulta.hFimForm} \n`;
      }
    });
    return lista;
  }
  //recebe uma ordem e lista os pacientes em ordem crescente de cpf ou nome
  listarPacientes(ordem) {
    let pacientes = this.#pacientes;
    pacientes = this.#ordenarPacientes(ordem);
    let lista = this.#imprimirPacientes(pacientes);
    return lista;
  }

  //verifica se a data inicial é anterior a data final
  #ordenarAgenda(agenda) {
    let agendaOrdenada = agenda.sort((a, b) => {
      if (a.data > b.data) {
        return 1;
      } else if (a.data < b.data) {
        return -1;
      } else {
        if (a.hinicio > b.hinicio) {
          return 1;
        } else if (a.hinicio < b.hinicio) {
          return -1;
        } else {
          return 0;
        }
      }
    });
    return agendaOrdenada;
  }
  //filtra a agenda entre as datas informadas
  #filtrarAgenda(dataInicial, dataFinal) {
    let agenda = this.#agenda.filter(
      (consulta) =>
        DateTime.fromFormat(consulta.data, "dd/MM/yyyy") >=
          DateTime.fromFormat(dataInicial, "dd/MM/yyyy") &&
        DateTime.fromFormat(consulta.data, "dd/MM/yyyy") <=
          DateTime.fromFormat(dataFinal, "dd/MM/yyyy")
    );
    return agenda;
  }
  //imprime a agenda
  #imprimirAgenda(agenda) {
    let lista = "";
    let dataAnterior = "";
    agenda.forEach((consulta) => {
      if (consulta.data != dataAnterior) {
        lista += `Data: ${consulta.data} `;
        dataAnterior = consulta.data;
      }
      lista += `H.Ini: ${consulta.hIniForm} H.fim: ${consulta.hFimForm} Tempo: ${consulta.duracao} `;
      lista += `Nome: ${consulta.paciente.nome} Dt.Nasc.: ${consulta.paciente.dataNascimento}\n`;
    });
    return lista;
  }
  //recebe uma data inicial e uma data final e lista as consultas agendadas nesse período
  listarAgenda(dataInicial, dataFinal) {
    let agenda = this.#agenda;
    if (dataInicial && dataFinal) {
      if (
        this.#verificarFormData(dataInicial) &&
        this.#verificarFormData(dataFinal)
      ) {
        agenda = this.#filtrarAgenda(dataInicial, dataFinal);
      }
    }
    agenda = this.#ordenarAgenda(agenda);
    let lista = this.#imprimirAgenda(agenda);
    return lista;
  }
}
