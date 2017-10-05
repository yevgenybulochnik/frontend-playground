import { Injectable } from '@angular/core';
import * as moment from 'moment';
import * as d3 from 'd3';
import * as helper from '../data/dataHelper';

@Injectable()
export class DataService {
  data = require('../data/temp2.csv')
  byClinic: any;
  byProvider: any;
  selectedYear: any;
  clinics: string[] = [];
  providers: string[] = [];
  generatedCalendars = new Map();
  constructor() {
    this.byClinic = d3.nest()
      .key(function(d: any) {return moment(d.date, 'MM/DD/YYYY').format('YYYY')})
      .key(function(d: any) {return helper.cRename(d.clinic)})
      .key(function(d: any) {return d.date})
      .key(function(d: any) {return helper.pRename(d.prov)})
      .key(function(d: any) {return helper.tRename(d.type)})
      .rollup(function(g: any) {return g.length})
      .map(this.data)

    this.byProvider = d3.nest()
      .key(function(d: any) {return moment(d.date, 'MM/DD/YYYY').format('YYYY')})
      .key(function(d: any) {return helper.pRename(d.prov)})
      .key(function(d: any) {return d.date})
      .key(function(d: any) {return helper.cRename(d.clinic)})
      .key(function(d: any) {return helper.tRename(d.type)})
      .rollup(function(g: any) {return g.length})
      .map(this.data)
  }

  generateKeys(year: string) {
    this.selectedYear = year
    this.clinics.length = 0
    for (let clinic of this.byClinic.get(year).keys()) {
      this.clinics.push(clinic)
    }
    this.providers.length = 0
    for (let provider of this.byProvider.get(year).keys()) {
      this.providers.push(provider)
    }
    this.clinics.sort()
    this.providers.sort()
  }

  generateCalendar(value: string) {
    if (this.generatedCalendars.has(value + this.selectedYear)) {
      this.generatedCalendars.delete(value + this.selectedYear)
    } else {
      if (this.byClinic.get(this.selectedYear).has(value)) {
        this.generatedCalendars.set(value + this.selectedYear, this.byClinic.get(this.selectedYear).get(value))
      }
      if (this.byProvider.get(this.selectedYear).has(value)) {
        this.generatedCalendars.set(value + this.selectedYear, this.byProvider.get(this.selectedYear).get(value))
      }
    }
  }
}
