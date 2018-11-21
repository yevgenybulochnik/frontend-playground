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
  @Input() selectedMonth: any;

  // Default values
  private width = 400;
  private height = 350;
  private plotMargins = {
    top: 30,
    bottom: 80,
    left: 30,
    right: 30
  };
  private plotWidth = this.width - this.plotMargins.left - this.plotMargins.right
  private plotHeight = this.height - this.plotMargins.top - this.plotMargins.bottom
  private componentInitialized = false;

  // D3 variables
  private svg: any;
  private plotArea: any;
  private toolTip: any;
  private xScale: any;
  private yScale: any;
  private xAxis: any;
  private yAxis: any;
  private dayRects: any;
  private legend: any;
  constructor() {

  }

  ngAfterViewInit() {
    let element = this.element
    this.svg = d3.select(element.nativeElement).append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
    this.generatePlotArea()
    this.componentInitialized = true
    this.generateScales()
    this.generateAxis()
    this.generateLegend()
  }

  ngOnChanges() {
    if (this.componentInitialized) {
      if (this.dayRects) {
        this.dayRects.remove()
      }
      this.generateDayRects()
    }
  }

  generateDayRects() {
    let series = d3.stack()
      .keys([ 'RT', 'TEL', 'EV', 'NP', 'PST', 'PTE', 'DO', 'NP MS', 'MS Tel', 'NP HEP'])(this.selectedMonth)
    let z = d3.scaleOrdinal(d3.schemeCategory10)
    this.dayRects = this.plotArea.append('g')
      .selectAll('g')
      .data(series)
      .enter().append('g')
        .attr('fill', function(d: any) {return z(d.key)})
      .selectAll('rect')
      .data(function(d: any) {return d})
      .enter().append('rect')
        .attr('width', '10px')
        .attr('x', (d: any) => this.xScale(d.data.day))
        .attr('y', (d: any) => this.yScale(d[1]))
        .attr('height', (d: any) => this.yScale(d[0]) - this.yScale(d[1]))
  }

  generatePlotArea() {
    this.plotArea = this.svg.append('g')
      .attr('class', 'plot')
      .attr('transform', `translate(${this.plotMargins.left}, ${this.plotMargins.top})`)
  }

  generateScales() {
    let days = []
    for (let i = 1; i <= 31; i++) {
      days.push(i.toString())
    }
    this.xScale = d3.scaleBand()
      .domain(days)
      .range([0, this.plotWidth])
      .padding(0.1)
    this.yScale = d3.scaleLinear()
      .domain([0, 42])
      .range([this.plotHeight, 0])
  }

  generateAxis() {
    let ticks = []
    for (let i = 1; i <= 31; i++) {
      if (i % 2) {
        ticks.push(i.toString())
      }
    }
    let x = d3.axisBottom(this.xScale)
      .tickValues(ticks)
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

  generateLegend() {
    let encounters = ['RT', 'TEL', 'EV', 'NP', 'PST', 'PTE', 'DO', 'NP MS', 'MS Tel', 'NP HEP']
    let z = d3.scaleOrdinal(d3.schemeCategory10)
    this.legend = this.svg.append('g')
      .attr('class', 'legend')
      .attr('transform', 'translate(60, 300)')
    this.legend.selectAll('g')
      .data(encounters)
      .enter().append('g')
      .attr('transform', function(d: any, i: any) {
        if ( i < 7 ) {
          return `translate(${i * 40}, 0)`
        } else {
          return `translate(${(i - 6) * 60}, 12)`
        }
      })
      .append('rect')
        .attr('width', 10)
        .attr('height', 10)
        .attr('fill', function(d: any) { return z(d) })
    this.legend.selectAll('g')
      .append('text')
        .text(function(d: any) { return d })
        .attr('font-family', 'arial')
        .attr('font-size', 11)
        .attr('dominant-baseline', 'text-before-edge')
        .attr('x', 13)
  }
}
