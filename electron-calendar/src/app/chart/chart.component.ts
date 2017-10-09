import { Component, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../services/data.service';
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
  constructor(private dataService: DataService) {

  }

  ngAfterViewInit() {
    let element = this.element
    this.svg = d3.select(element.nativeElement).append('svg')
      .attr('width', this.width)
      .attr('height', this.height)

  // temporary data, will switch to @Input
    let data = this.dataService.byProvider.get('2017').get('YBS')
    console.log(data)
  }

}
