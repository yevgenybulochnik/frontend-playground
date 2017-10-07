import { Component, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import * as moment from 'moment';

@Component({
  selector: 'd3-line-chart',
  template: `
  <div #container class="container">
  </div>
  `,
  styleUrls: ['./chart.component.sass']
})
export class ChartComponent {
  @ViewChild('container') element: any;

  // Default values
  private width: 1000;
  private height: 500;

  // D3 variables
  private svg: any;
  constructor() {

  }

  ngAfterViewInit() {
    let element = this.element
    this.svg = d3.select(element.nativeElement).append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
  }

}
