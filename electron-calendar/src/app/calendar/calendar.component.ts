import { Component, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import * as moment from 'moment';

@Component({
  selector: 'd3-calendar',
  template: `
  `,
  styleUrls: ['./calendar.component.sass']
})
export class CalendarComponent {
  constructor(private elRef: ElementRef) {}
  ngAfterViewInit() {
  }
}
