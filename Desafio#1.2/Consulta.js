"use strict";
import { DateTime } from "luxon";

export class Consulta {
  #hinicio;
  #hfim;
  #paciente;
  #data;
  constructor(hinicio, hfim, paciente, data) {
    if (this.#verificaHorario(hinicio, hfim) && this.#verificaData(data)) {
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
  get duracao() {
    return this.#hfim - this.#hinicio;
  }
  #verificaFromatoData(data) {
    if (data.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
      return true;
    } else {
      throw new Error("A data deve ter o formato DD/MM/AAAA");
    }
  }
  #verificaData(data) {
    if (this.#verificaFromatoData(data)) {
      let hoje = DateTime.now();
      let dataConsulta = DateTime.fromFormat(data, "dd/MM/yyyy");
      if (dataConsulta > hoje) {
        return true;
      } else {
        throw new Error("A data da consulta deve ser posterior à data atual");
      }
    }
  }
  #verificaFormatoHorario(hinicio, hfim) {
    if (hinicio.match(/^\d{4}$/) && hfim.match(/^\d{4}$/)) {
      return true;
    } else {
      throw new Error("O horário deve ter o formato HHMM");
    }
  }
  #verificaHorario15min(hinicio, hfim) {
    if (
      hinicio.match(/^[0-1][0-9][0-5][0,5]$/) &&
      hfim.match(/^[0-1][0-9][0-5][0,5]$/)
    ) {
      return true;
    } else {
      throw new Error("O horário deve ser definido sempre de 15 em 15 minutos");
    }
  }
  #verificaIntervaloHorario(hinicio, hfim) {
    if (hinicio >= 800 && hfim <= 1900) {
      return true;
    } else {
      throw new Error("O horário deve estar entre 08:00 e 19:00");
    }
  }
  #verificaHorario(hinicio, hfim) {
    if (
      this.#verificaFormatoHorario(hinicio, hfim) &&
      this.#verificaHorario15min(hinicio, hfim) &&
      this.#verificaIntervaloHorario(hinicio, hfim)
    ) {
      if (hinicio < hfim) {
        return true;
      } else {
        throw new Error("O horário inicial deve ser menor que o final");
      }
    }
  }
}
