import { Injectable } from '@angular/core';
import * as moment from 'moment';
import * as d3 from 'd3';
import * as helper from '../data/dataHelper';

@Injectable()
export class DataService {
  data = require('../data/temp2.csv')
  byClinic: any;
  byProvider: any;
  byClinicWeek: any;
  byProviderWeek: any;
  selectedYear: any;
  clinics: string[] = [];
  providers: string[] = [];
  generatedCalendars: any[] = [];
  generatedCharts: any[] = [];
  constructor() {
    this.byClinic = d3.nest()
      .key(function(d: any) {return moment(d.date, 'MM/DD/YYYY').format('YYYY')})
      .key(function(d: any) {return helper.cRename(d.clinic)})
      .key(function(d: any) {return d.date})
      .key((d: any) => {return this.renameProvider(d.prov)})
      .key(function(d: any) {return helper.tRename(d.type)})
      .rollup(function(g: any) {return g.length})
      .object(this.data)

    this.byProvider = d3.nest()
      .key(function(d: any) {return moment(d.date, 'MM/DD/YYYY').format('YYYY')})
      .key((d: any) => {return this.renameProvider(d.prov)})
      .key(function(d: any) {return d.date})
      .key(function(d: any) {return helper.cRename(d.clinic)})
      .key(function(d: any) {return helper.tRename(d.type)})
      .rollup(function(g: any) {return g.length})
      .object(this.data)

    //this.byClinicWeek = d3.nest()
      //.key(function(d: any) {return moment(d.date, 'MM/DD/YYYY').format('YYYY')})
      //.key(function(d: any) {return helper.cRename(d.clinic)})
      //.key(function(d: any) {return moment(d.date, 'MM/DD/YYYY').format('M')})
      //.rollup(function(g: any) {return g.length})
      //.map(this.data)

    //this.byProviderWeek = d3.nest()
      //.key(function(d: any) {return moment(d.date, 'MM/DD/YYYY').format('YYYY')})
      //.key((d: any) => {return this.renameProvider(d.prov)})
      //.key(function(d: any) {return moment(d.date, 'MM/DD/YYYY').format('M')})
      //.rollup(function(g: any) {return g.length})
      //.map(this.data)
  }

  renameProvider(onName: string) {
    let isName = /([a-zA-Z'-]+),\s([a-zA-z'-]+)\s?([a-zA-Z'-]+)?$/
    let match = isName.exec(onName)
    if (match) {
      let fullName = match[0]
      let lastName = match[1]
      let firstName = match[2]
      let middleName = match[3]
      let initials = ''
      if (middleName) {
        initials = firstName[0] + middleName[0] + lastName[0]
        return initials.toUpperCase()
      } else {
        initials = firstName[0] + lastName[0]
        return initials.toUpperCase()
      }
    } else {
      console.log(onName)
      return 'ERR'
    }
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
    //if (this.generatedCalendars.has(value + this.selectedYear)) {
      //this.generatedCalendars.delete(value + this.selectedYear)
      //this.generatedCharts.delete(value + this.selectedYear)
    //} else {
      //if (this.byClinic.get(this.selectedYear).has(value)) {
        //this.generatedCalendars.set(value + this.selectedYear, this.byClinic.get(this.selectedYear).get(value))
        //this.generatedCharts.set(value + this.selectedYear, this.byClinicWeek.get(this.selectedYear).get(value))
      //}
      //if (this.byProvider.get(this.selectedYear).has(value)) {
        //this.generatedCalendars.set(value + this.selectedYear, this.byProvider.get(this.selectedYear).get(value))
        //this.generatedCharts.set(value + this.selectedYear, this.byProviderWeek.get(this.selectedYear).get(value))
      //}
    //}
  }
}
