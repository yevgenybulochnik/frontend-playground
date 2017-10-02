import { Component, ViewEncapsulation } from '@angular/core';
import { DataService } from './services/data.service'
import * as helper from './data/dataHelper';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  calendars: any;
  constructor(private dataService: DataService) {
    this.calendars = this.dataService.generatedCalendars
  }
  setDomain(key: any) {
    return helper.generateDomain(key)
  }
}
