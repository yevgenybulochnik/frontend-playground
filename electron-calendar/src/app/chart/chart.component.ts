import { Component, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import * as moment from 'moment';

@Component({
  selector: 'd3-chart',
  template: `
  `,
  styleUrls: ['./chart.component.sass']
})
export class ChartComponent {
  constructor(private elRef: ElementRef) {}
  ngAfterViewInit() {
  }
}
