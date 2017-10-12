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
  private width = 400;
  private height = 300;
  private plotMargins = {
    top: 30,
    bottom: 30,
    left: 30,
    right: 30
  };
  private plotWidth = this.width - this.plotMargins.left - this.plotMargins.right
  private plotHeight = this.height - this.plotMargins.top - this.plotMargins.bottom

  // D3 variables
  private svg: any;
  private plotArea: any;
  constructor(private dataService: DataService) {

  }

  ngAfterViewInit() {
    let element = this.element
    this.svg = d3.select(element.nativeElement).append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
    this.generatePlotArea()

  // temporary data, will switch to @Input
    let data = this.dataService.byProvider.get('2017').get('YBS')
    console.log(data)
  }

  generatePlotArea() {
    this.plotArea = this.svg.append('g')
      .attr('class', 'plot')
      .attr('transform', `translate(${this.plotMargins.left}, ${this.plotMargins.top})`)
  }

}
