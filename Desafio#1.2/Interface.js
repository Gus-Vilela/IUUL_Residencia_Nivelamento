import { Paciente } from "./Paciente.js";
import { Cadastro } from "./Cadastro.js";
import PromptSync from "prompt-sync";
const prompt = PromptSync({ sigint: true });

export class Interface {
  #cadastro;
  constructor() {
    this.#cadastro = new Cadastro();
  }
  //cria um paciente com os dados informados pelo usuário
  criarPaciente() {
    let flag = true;
    while (flag) {
      try {
        let nome = prompt("Digite o nome do paciente: ");
        let cpf = prompt("Digite o cpf do paciente: ");
        let dataNascimento = prompt(
          "Digite a data de nascimento do paciente: "
        );
        let paciente = new Paciente(nome, cpf, dataNascimento);
        let resposta = this.#cadastro.cadastrarPaciente(paciente);
        console.log("\n" + resposta + "\n");
        flag = false;
      } catch (error) {
        console.log("\n Erro: " + error.message + "\n");
      }
    }
  }
  //cria uma consulta com os dados informados pelo usuário
  criarConsulta() {
    let flag = true;
    while (flag) {
      try {
        let cpf = prompt("Digite o cpf do paciente: ");
        let data = prompt("Digite a data da consulta: ");
        let hinicio = prompt("Digite o horário de início da consulta: ");
        let hfim = prompt("Digite o horário de fim da consulta: ");
        let resposta = this.#cadastro.agendarConsulta(cpf, hinicio, hfim, data);
        console.log("\n" + resposta + "\n");
        flag = false;
      } catch (error) {
        console.log("\n Erro: " + error.message + "\n");
        let p = prompt("Deseja tentar novamente? (s/n)");
        if (p === "n" || p === "N") {
          flag = false;
        }
      }
    }
  }
  //exclui um paciente com o cpf informado pelo usuário
  excluirPaciente() {
    let flag = true;
    while (flag) {
      try {
        let cpf = prompt("Digite o cpf do paciente: ");
        let resposta = this.#cadastro.removerPaciente(cpf);
        console.log("\n" + resposta + "\n");
        flag = false;
      } catch (error) {
        console.log("\n Erro: " + error.message + "\n");
        let p = prompt("Deseja tentar novamente? (s/n)");
        if (p === "n" || p === "N") {
          flag = false;
        }
      }
    }
  }
  //cancela uma consulta com o cpf informado pelo usuário
  cancelarConsulta() {
    let flag = true;
    while (flag) {
      try {
        let cpf = prompt("Digite o cpf do paciente: ");
        let data = prompt("Digite a data da consulta: ");
        let hinicio = prompt("Digite o horário de início da consulta: ");
        let resposta = this.#cadastro.cancelarConsulta(cpf, hinicio, data);
        console.log("\n" + resposta + "\n");
        flag = false;
      } catch (error) {
        console.log("\n Erro: " + error.message + "\n");
        let p = prompt("Deseja tentar novamente? (s/n)");
        if (p === "n" || p === "N") {
          flag = false;
        }
      }
    }
  }
  //Apresentar a agenda T-Toda ou P-Periodo: P
  listarAgenda() {
    let flag = true;
    while (flag) {
      try {
        let opcao = prompt("Apresentar a agenda T-Toda ou P-Periodo: ");
        switch (opcao) {
          case ("T", "t"):
            console.log(this.#cadastro.listarAgenda());
            flag = false;
            break;
          case ("P", "p"):
            let dataInicio = prompt("Digite a data de início: ");
            let dataFim = prompt("Digite a data de fim: ");
            console.log(this.#cadastro.listarAgenda(dataInicio, dataFim));
            flag = false;
            break;
          default:
            console.log("Opção inválida");
        }
      } catch (error) {
        console.log("\n Erro: " + error.message + "\n");
      }
    }
  }
  //menu principal
  menuPrincipal() {
    do {
      console.log("1-Cadastro de pacientes\n2-Agenda\n3-Fim");
      var opcao = prompt("Digite a opção desejada: ");
      switch (opcao) {
        case "1":
          this.menuCadastro();
          break;
        case "2":
          this.menuAgenda();
          break;
        case "3":
          return;
        default:
          console.log("Opção inválida");
      }
    } while (opcao !== "3");
  }
  //menu de cadastro
  menuCadastro() {
    do {
      console.log(
        "1-Cadastrar novo paciente\n2-Excluir paciente\n3-Listar pacientes (ordenado por CPF)\n4-Listar pacientes (ordenado por nome)\n5-Voltar p/ menu principal"
      );
      var opcaoCadastro = prompt("Digite a opção desejada: ");
      switch (opcaoCadastro) {
        case "1":
          this.criarPaciente();
          break;
        case "2":
          this.excluirPaciente();
          break;
        case "3":
          console.log(this.#cadastro.listarPacientes("cpf"));
          break;
        case "4":
          console.log(this.#cadastro.listarPacientes("nome"));
          break;
        case "5":
          return;
        default:
          console.log("Opção inválida");
      }
    } while (opcaoCadastro !== "5");
  }
  //menu da agenda
  menuAgenda() {
    do {
      console.log(
        "1-Agendar consulta\n2-Cancelar agendamento\n3-Listar agenda\n4-Voltar p/ menu principal"
      );
      var opcaoAgenda = prompt("Digite a opção desejada: ");
      switch (opcaoAgenda) {
        case "1":
          this.criarConsulta();
          break;
        case "2":
          this.cancelarConsulta();
          break;
        case "3":
          this.listarAgenda();
          break;
        case "4":
          return;
        default:
          console.log("Opção inválida");
      }
    } while (opcaoAgenda !== "4");
  }
}
