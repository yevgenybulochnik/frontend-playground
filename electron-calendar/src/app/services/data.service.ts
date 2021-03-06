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
  selectedYear: string;
  years: string[] = [];
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
    this.setYears()
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
      //console.log(onName)
      return 'ERR'
    }
  }

  setYears() {
    for (let year in this.byClinic) {
      if (year) {
        this.years.push(year)
      }
    }
  }

  generateKeys(year: string) {
    this.selectedYear = year
    this.clinics.length = 0
    for (let clinic in this.byClinic[year]) {
      if (clinic) {
        this.clinics.push(clinic)
      }
    }
    this.providers.length = 0
    for (let provider in this.byProvider[year]) {
      if (provider) {
        this.providers.push(provider)
      }
    }
    this.clinics.sort()
    this.providers.sort()
  }

  generateCalendar(value: string) {
    let checkValue = this.generatedCalendars.findIndex((element) => {
     return element.name === value + this.selectedYear
    })
    if (checkValue !== -1) {
      this.generatedCalendars.splice(checkValue, 1)
    } else {
      let ref = new Object()
      ref['name'] = value + this.selectedYear
      if (this.byClinic[this.selectedYear][value]) {
        ref['data'] = this.byClinic[this.selectedYear][value]
      } else {
        ref['data'] = this.byProvider[this.selectedYear][value]
      }
      this.generatedCalendars.push(ref)
    }
  }
}
