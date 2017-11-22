import { Component, ViewEncapsulation } from '@angular/core';
import { DataService } from './services/data.service'
import * as helper from './data/dataHelper';
import * as moment from 'moment'

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  calendars: any;
  charts: any;
  selectedMonthData: any;
  constructor(private dataService: DataService) {
    this.calendars = this.dataService.generatedCalendars
    this.charts = this.dataService.generatedCharts
  }
  setDomain(key: any) {
    return helper.generateDomain(key)
  }
  getMonthData(emittedMonth: any) {
    let data: any[] = []
    let cal = this.dataService.generatedCalendars.get(emittedMonth['calendarName'])
    cal.each((clinics: any, date: any) => {
      if (moment(date).format('M') === emittedMonth['month']) {
        let encounters = {date: date, day: moment(date).format('D'), RT: 0 , TEL: 0, EV: 0, NP: 0, PST: 0, PTE: 0, DO: 0,  'NP MS': 0, 'MS Tel': 0, 'NP HEP': 0}
        clinics.each((types: any, clinic: any) => {
          types.each((count: any, encounterType: any) => {
            encounters[encounterType] += count
          })
        })
        data.push(encounters)
      }
    })
    data.sort(function(a: any, b: any) {return a.day - b.day})
    this.selectedMonthData = data
  }
}
