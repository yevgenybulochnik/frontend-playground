import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import * as helper from '../data/dataHelper';

@Injectable()
export class DataService {
  data = require('../data/2017.csv')
  byClinic: any;
  byProvider: any;
  generatedCalendars = new Map();
  constructor() {
    this.byClinic = d3.nest()
      .key(function(d: any) {return helper.cRename(d.clinic)})
      .key(function(d: any) {return d.date})
      .key(function(d: any) {return helper.tRename(d.type)})
      .rollup(function(g: any) {return g.length})
      .map(this.data)

    this.byProvider = d3.nest()
      .key(function(d: any) {return helper.pRename(d.prov)})
      .key(function(d: any) {return d.date})
      .key(function(d: any) {return helper.cRename(d.clinic)})
      .key(function(d: any) {return helper.tRename(d.type)})
      .rollup(function(g: any) {return g.length})
      .map(this.data)
  }

  generateCalendar(value: string) {
    if (this.generatedCalendars.has(value)) {
      this.generatedCalendars.delete(value)
    } else {
      if (this.byClinic.has(value)) {
        this.generatedCalendars.set(value, this.byClinic.get(value))
      }
      if (this.byProvider.has(value)) {
        this.generatedCalendars.set(value, this.byProvider.get(value))
      }
    }
  }
}
