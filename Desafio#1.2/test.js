import { Paciente } from "./Paciente.js";
import { Cadastro } from "./Cadastro.js";
import PromptSync from "prompt-sync";
const prompt = PromptSync({ sigint: true });

//cria um paciente com os dados informados pelo usuário
function criaPaciente() {
  let nome = prompt("Digite o nome do paciente: ");
  let cpf = prompt("Digite o cpf do paciente: ");
  let dataNascimento = prompt("Digite a data de nascimento do paciente: ");
  let paciente = new Paciente(nome, cpf, dataNascimento);
  return paciente;
}

let cadastro = new Cadastro();
let paciente = criaPaciente();
cadastro.cadastrar(paciente);
console.log(cadastro.pacientes[0].idade);
console.log(cadastro.buscar(paciente.cpf).nome);
