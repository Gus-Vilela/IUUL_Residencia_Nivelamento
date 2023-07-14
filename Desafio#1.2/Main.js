// Version: 1.0
import { Interface } from "./Interface.js";
import PromptSync from "prompt-sync";
import { DateTime } from "luxon";
const prompt = PromptSync({ sigint: true });

// console.log(
//   "Dia e mes e ano: " + DateTime.now().set({ second: 0, millisecond: 0 })
// );
// console.log("Data atual: " + DateTime.now().toFormat("dd/MM/yyyy HHmm"));
// console.log(
//   "Data atual: " + DateTime.fromFormat("13/07/20231853", "dd/MM/yyyyHHmm")
// );
console.log(
  DateTime.fromFormat("13/07/2023", "dd/MM/yyyy") ==
    DateTime.now().set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
);
console.log(
  DateTime.fromFormat("13/07/2023" + "2023", "dd/MM/yyyyHHmm") >=
    DateTime.now().set({
      seconds: 0,
      milliseconds: 0,
    })
);
console.log(DateTime.fromFormat("32/10/2023", "dd/MM/yyyy"));
// console.log(
//   DateTime.fromFormat("13/07/20231853", "dd/MM/yyyyHHmm") >=
//     DateTime.now().set({
//       second: 0,
//       millisecond: 0,
//     })
// );
// let hinicio = DateTime.fromFormat("2000", "HHmm");
// let hfim = DateTime.fromFormat("2100", "HHmm");
// let duracao = hfim.diff(hinicio).toFormat("hh:mm");
// console.log(duracao);
console.log(DateTime.now().toFormat("HHmm"));
let interfaceUsuario = new Interface();
interfaceUsuario.menuPrincipal();
