import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'd3-bar-chart',
  template: `
  <div #container class="container">
  </div>
  `,
  styleUrls: ['./bchart.component.sass']
})

export class BChartComponent {
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
  private toolTip: any;
  private xScale: any;
  private yScale: any;
  private xAxis: any;
  private yAxis: any;
  constructor() {

  }

  ngAfterViewInit() {
    let element = this.element
    this.svg = d3.select(element.nativeElement).append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
    this.generatePlotArea()
    this.generateScales()
    this.generateAxis()
  }

  generatePlotArea() {
    this.plotArea = this.svg.append('g')
      .attr('class', 'plot')
      .attr('transform', `translate(${this.plotMargins.left}, ${this.plotMargins.top})`)
  }

  generateScales() {
    this.xScale = d3.scaleLinear()
      .domain([1, 31])
      .range([0, this.plotWidth])
    this.yScale = d3.scaleLinear()
      .domain([0, 55])
      .range([this.plotHeight, 0])
  }

  generateAxis() {
    let x = d3.axisBottom(this.xScale)
    let y = d3.axisLeft(this.yScale)
    this.xAxis = this.plotArea.append('g')
      .classed('x', true)
      .classed('axis', true)
      .attr('transform', `translate(${0}, ${this.plotHeight})`)
      .call(x)
    this.yAxis = this.plotArea.append('g')
      .classed('y', true)
      .classed('axis', true)
      .call(y)
  }
}
