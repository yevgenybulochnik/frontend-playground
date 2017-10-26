import { Component, ViewChild, ElementRef, Input } from '@angular/core';
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
  @Input() chartData: any;
  @Input() chartDataSize: any;

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
  private adjData: any = [];
  private componentInitialized = false;

  // D3 variables
  private svg: any;
  private plotArea: any;
  private xScale: any;
  private yScale: any;
  private xAxis: any;
  private yAxis: any;
  private calWeeks: any;
  private calPoints: any;
  private calLines: any;
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
    this.componentInitialized = true
    this.generateCalWeeks()
    this.generateCalPoints()
    this.generateCalLines()
  }

  ngOnChanges() {
    this.addData()
  }

  generatePlotArea() {
    this.plotArea = this.svg.append('g')
      .attr('class', 'plot')
      .attr('transform', `translate(${this.plotMargins.left}, ${this.plotMargins.top})`)
  }

  generateScales() {
    this.xScale = d3.scaleLinear()
      .domain([1, 53])
      .range([0, this.plotWidth])
    this.yScale = d3.scaleLinear()
      .domain([0, 600])
      .range([this.plotHeight, 0])
  }

  generateAxis() {
    let x = d3.axisBottom(this.xScale)
    x.tickValues([4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52])
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

  generateCalWeeks() {
    this.calWeeks = this.plotArea.selectAll('.caldata')
      .data(this.adjData)
      .enter().append('g')
        .attr('class', 'caldata')
  }

  generateCalPoints() {
    this.calPoints = this.calWeeks.selectAll('circle')
      .data(function(d: any) {return d.weeks})
      .enter().append('circle')
        .attr('class', '.points')
        .attr('r', 2)
        .style('fill', 'red')
        .attr('transform', (d: any, i: any) => `translate(${this.xScale(d.week)}, ${this.yScale(d.sum)})`)
  }

  generateCalLines() {
    let valueLine = d3.line()
      .x((d: any) => {return this.xScale(d.week)})
      .y((d: any) => {return this.yScale(d.sum)})
      .curve(d3.curveCatmullRom)
    let color = d3.scaleOrdinal(d3.schemeCategory10)
    this.calLines = this.calWeeks.selectAll('path')
      .data(function(d: any) {return [d.weeks]})
      .enter().append('path')
        .attr('class', 'line')
        .attr('d', valueLine)
        .attr('stroke-width', 2)
        .style('fill', 'none')
        .style('stroke', color)
  }

  generateDataObject() {
    this.chartData.forEach((weekMap: any, calendarName: any) => {
      let refObj = new Object()
      refObj['calendarName'] = calendarName
      refObj['weeks'] = [];
      weekMap.each(function(count: any, weekNumber: any) {
        refObj['weeks'].push({week: Number(weekNumber), sum: count})
      })
      refObj['weeks'].sort(function(a: any, b: any) {
        return a.week - b.week
      })
      this.adjData.push(refObj)
    })
  }

  addData() {
    this.adjData.length = 0
    if (this.componentInitialized) {
      this.calWeeks.remove()
    }
    if (this.chartData.size) {
      this.generateDataObject()
      this.generateCalWeeks()
      this.generateCalPoints()
      this.generateCalLines()
    }
  }
}
