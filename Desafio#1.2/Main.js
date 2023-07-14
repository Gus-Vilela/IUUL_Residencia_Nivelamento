// Version: 1.0
import { Interface } from "./Interface.js";
import PromptSync from "prompt-sync";
import { DateTime } from "luxon";
const prompt = PromptSync({ sigint: true });

let interfaceUsuario = new Interface();
interfaceUsuario.menuPrincipal();
