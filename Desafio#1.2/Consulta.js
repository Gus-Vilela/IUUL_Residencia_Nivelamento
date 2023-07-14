import { DateTime } from "luxon";

export class Consulta {
  #hinicio;
  #hfim;
  #paciente;
  #data;
  constructor(hinicio, hfim, paciente, data) {
    if (
      this.#verificarFromatoData(data) &&
      this.#verificarHorario(hinicio, hfim) &&
      this.#verificarDataAtual(data, hinicio)
    ) {
      this.#hinicio = hinicio;
      this.#hfim = hfim;
      this.#paciente = paciente;
      this.#data = data;
    }
  }
  get hinicio() {
    return this.#hinicio;
  }
  get hfim() {
    return this.#hfim;
  }
  get paciente() {
    return this.#paciente;
  }
  get data() {
    return this.#data;
  }
  //retorna a duração da consulta em hh:mm e zera os minutos se for NaN
  get duracao() {
    let duracao = this.#calcularDuracao(this.#hinicio, this.#hfim).toFormat(
      "hh:mm"
    );
    return duracao;
  }
  //retorna o horário de início da consulta em hh:mm
  get hIniForm() {
    return this.#hinicio.slice(0, 2) + ":" + this.#hinicio.slice(2, 4);
  }
  //retorna o horário de fim da consulta em hh:mm
  get hFimForm() {
    return this.#hfim.slice(0, 2) + ":" + this.#hfim.slice(2, 4);
  }

  //verifica se o cpf do paciente é válido
  #verificarFromatoData(data) {
    if (data.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
      return true;
    } else {
      throw new Error("A data deve ter o formato DD/MM/AAAA");
    }
  }
  //verifica se o horário tem o formato correto HHMM
  #verificarFormatoHorario(hinicio, hfim) {
    if (hinicio.match(/^\d{4}$/) && hfim.match(/^\d{4}$/)) {
      return true;
    } else {
      throw new Error("O horário deve ter o formato HHMM");
    }
  }
  //calcula a duração da consulta
  #calcularDuracao(hinicio, hfim) {
    let inicio = DateTime.fromFormat(hinicio, "HHmm");
    let fim = DateTime.fromFormat(hfim, "HHmm");
    let duracao = fim.diff(inicio);
    return duracao;
  }
  //verifica se o horário está definido de 15 em 15 minutos verificar a multiplicidade de 15 da diferença entre o horário inicial e final
  #verificarHorario15min(hinicio, hfim) {
    let duracao = this.#calcularDuracao(hinicio, hfim).toFormat("mm");
    if (duracao % 15 === 0) {
      return true;
    }
    throw new Error("O horário deve ser definido de 15 em 15 minutos");
  }
  //verifica se o horário está entre 08:00 e 19:00
  #verificarIntervaloHorario(hinicio, hfim) {
    if (hinicio >= 800 && hfim <= 2200) {
      return true;
    } else {
      throw new Error("O horário deve estar entre 08:00 e 19:00");
    }
  }
  //verifica se o horário inicial é anterior ao horário final
  #verificarHorario(hinicio, hfim) {
    if (
      this.#verificarFormatoHorario(hinicio, hfim) &&
      this.#verificarHorario15min(hinicio, hfim) &&
      this.#verificarIntervaloHorario(hinicio, hfim)
    ) {
      if (hinicio < hfim) {
        return true;
      } else {
        throw new Error("O horário inicial deve ser menor que o final");
      }
    }
  }
  //verifica se a data é posterior à data atual
  #verificarDataAtual(data, hinicio) {
    if (
      DateTime.fromFormat(data + hinicio, "dd/MM/yyyyHHmm") >=
      DateTime.now().set({
        seconds: 0,
        milliseconds: 0,
      })
    ) {
      return true;
    } else {
      throw new Error("A data deve ser posterior à data atual");
    }
  }
}
