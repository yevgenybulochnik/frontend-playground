import { Component, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
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
  @Output() monthData: EventEmitter<any> = new EventEmitter();

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
  private toolTip: any;
  private xScale: any;
  private yScale: any;
  private xAxis: any;
  private yAxis: any;
  private calMonths: any;
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
    this.generateToolTip()
    this.generateScales()
    this.generateAxis()
    this.componentInitialized = true
    this.generateCalMonths()
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

  generateToolTip() {
   this.toolTip = d3.select(this.element.nativeElement).append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)
  }

  generateScales() {
    this.xScale = d3.scalePoint()
      .domain(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'])
      .range([0, this.plotWidth])
      .padding(0.5)
    this.yScale = d3.scaleLinear()
      .domain([0, 600])
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

  generateCalMonths() {
    this.calMonths = this.plotArea.selectAll('.caldata')
      .data(this.adjData)
      .enter().append('g')
        .attr('class', 'caldata')
  }

  generateCalPoints() {
    this.calPoints = this.calMonths.selectAll('circle')
      .data(function(d: any) {return d.months})
      .enter().append('circle')
        .attr('class', 'points')
        .attr('r', 4)
        .style('fill', 'red')
        .attr('transform', (d: any, i: any) => `translate(${this.xScale(moment(d.month).format('MMM'))}, ${this.yScale(d.sum)})`)
      .on('mouseover', (d: any) => {
        this.toolTip.transition()
          .duration(0)
          .style('opacity', 0.8)
        this.toolTip.html(d.sum)
          .style('left', (d3.event.pageX - 17) + 'px')
          .style('top', (d3.event.pageY - 40) + 'px')
      })
      //.on('mouseout', (d: any) => {
        //this.toolTip.transition()
          //.duration(0)
          //.style('opacity', 0)
      //})
      .on('click', (d: any) => {
        this.monthData.emit(d)
      })
  }

  generateCalLines() {
    let valueLine = d3.line()
      .x((d: any) => {return this.xScale(moment(d.month).format('MMM'))})
      .y((d: any) => {return this.yScale(d.sum)})
      .curve(d3.curveCatmullRom)
    let color = d3.scaleOrdinal(d3.schemeCategory10)
    this.calLines = this.calMonths.selectAll('path')
      .data(function(d: any) {return [d.months]})
      .enter().append('path')
        .attr('class', 'line')
        .attr('d', valueLine)
        .attr('stroke-width', 2)
        .style('fill', 'none')
        .style('stroke', color)
  }

  generateDataObject() {
    this.chartData.forEach((monthMap: any, calendarName: any) => {
      let refObj = new Object()
      refObj['calendarName'] = calendarName
      refObj['months'] = [];
      monthMap.each(function(count: any, monthNumber: any) {
        refObj['months'].push({ calendarName: calendarName, month: monthNumber, sum: count})
      })
      refObj['months'].sort(function(a: any, b: any) {
        return a.month - b.month
      })
      this.adjData.push(refObj)
    })
  }

  addData() {
    this.adjData.length = 0
    if (this.componentInitialized) {
      this.calMonths.remove()
    }
    if (this.chartData.size) {
      this.generateDataObject()
      this.generateCalMonths()
      this.generateCalLines()
      this.generateCalPoints()
    }
  }
}
