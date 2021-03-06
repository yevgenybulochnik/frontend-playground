import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import * as moment from 'moment';

@Component({
  selector: 'd3-calendar',
  template: `
  <div #container class='container'>
    <tooltip [data]='toolTipData'></tooltip>
  </div>
  `,
  styleUrls: ['./calendar.component.sass']
})
export class CalendarComponent {

  // Refernce to .container div
  @ViewChild('container') element: any;
  @Input() data: any;
  @Input() domain: number[];

  // Default values
  private cellSize = 11;
  private cellPadding = 3;
  private topGutter = this.cellSize + this.cellPadding + 2;
  private leftGutter = this.cellSize + this.cellPadding + 1;
  private width = 920;
  private height = (this.cellSize + this.cellPadding) * 8;

  // D3 variables
  private svg: any;
  private months: any;
  private monthLabels: any;
  private weekDayLabels: any;
  private dayCells: any;
  private toolTip: any;
  private toolTipData: any;
  private colorScale: any;

  // Date Variables
  private firstDate: any;
  private lastDate: any;
  private dateRange: any;
  private dateForm = 'MM/DD/YYYY';

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    let element = this.element
    this.svg = d3.select(element.nativeElement).append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
    this.generateDateRange()
    this.generateMonths()
    this.generateDays()
    this.generateMonthLabels()
    this.generateDayLabels()
    this.handlerToolTipData()
    this.generateToolTip()
    this.generateColorScale()
    this.generateDayFill()
  }

  generateDateRange() {
    if (this.data) {
      let dataDates = Object.keys(this.data)
      let dataYear = moment(dataDates[0], this.dateForm).format('YYYY')
      this.firstDate = moment('01/01/' + dataYear, this.dateForm)
      this.lastDate = moment('12/31/' + dataYear, this.dateForm).add(1, 'day')
      this.dateRange = d3.timeDay.range(this.firstDate, this.lastDate)
    } else {
      let dataYear = moment().format('YYYY')
      this.firstDate = moment('01/01/' + dataYear, this.dateForm)
      this.lastDate = moment('12/31/' + dataYear, this.dateForm).add(1, 'day')
      this.dateRange = d3.timeDay.range(this.firstDate, this.lastDate)
    }
  }

  generateMonths() {
    let mgroup = d3.nest().key(function(d: any) { return moment(d).format('MMM') }).entries(this.dateRange)
    this.months = this.svg.selectAll('g')
      .data(mgroup)
      .enter().append('g')
        .attr('class', 'months')
        .attr('id', function(d: any) {return d.key})
        .attr('transform', (d: any, i: any) => {
          let space = (this.cellSize + this.cellPadding) * i
          return `translate(${space}, 0)`
        })
  }

  generateMonthLabels() {
    // x position for first of each month
    let firstXrect = this.svg.selectAll('rect').filter(function(d: any) { return moment(d).format('D') === '1' })
    let firstX: number[] = []
    firstXrect.each(function(d: any) {
      let xValue = d3.select(this).attr('x')
      firstX.push(Number(xValue))
    })
    this.monthLabels = this.months.append('text')
      .text(function(d: any) {return d.key})
      .attr('y', this.cellSize + 'px')
      .attr('class', 'monthLabel')
      .attr('font-size', this.cellSize + 'px')
    this.monthLabels.data(firstX)
      .attr('x', (d: any) => {return d + (this.cellSize + this.cellPadding) * 2})
  }

  generateDays() {
    this.dayCells = this.months.selectAll('rect')
      .data(function(d: any) {return d.values})
      .enter().append('rect')
        .attr('width', this.cellSize)
        .attr('height', this.cellSize)
        .attr('class', 'dateBox')
        .attr('y', (d: any) => {return (d.getDay() * (this.cellSize + this.cellPadding)) + this.topGutter})
        .attr('x', (d: any)  => {
          let cellDate = moment(d)
          let firstDate = moment(this.firstDate)
          let result = cellDate.week() - firstDate.week() + (firstDate.weeksInYear() * (cellDate.weekYear() - firstDate.weekYear()))
          return result * (this.cellSize + this.cellPadding) + this.leftGutter
        })
        .text(function(d: any) {return moment(d).format('MMM Do YYYY')})
  }

  generateDayLabels() {
    let labels = ['M', 'W', 'F']
    this.weekDayLabels = this.svg.selectAll('text.weekday')
      .data(labels)
      .enter().append('text')
      .attr('y', (d: any, i: any) => {
        return (i * 2) * (this.cellSize + this.cellPadding) + this.topGutter + (this.cellSize + this.cellPadding)
      })
      .attr('font-size', this.cellSize + 'px')
      .attr('dominant-baseline', 'text-before-edge')
      .attr('class', 'dayLabel')
      .text(function(d: any) {return d})
  }

  generateToolTip() {
    let element = this.element
    this.toolTip = d3.select(element.nativeElement).select('tooltip')
      .style('opacity', 0)
    let tip = this.toolTip
    this.dayCells.on('mouseover.position', function(d: any) {
      let elem = d3.select(this)
      let matrix = elem['_groups'][0][0].getScreenCTM().translate(+elem['_groups'][0][0].getAttribute('x'), + elem['_groups'][0][0].getAttribute('y'))
      let tipHeight = 5 + tip.node().getBoundingClientRect().height
      let tipWidth = (tip.node().getBoundingClientRect().width / 2) - 6
      tip.transition()
        .duration(0)
        .style('opacity', 0.8)
        .style('left', (window.pageXOffset + matrix.e - tipWidth) + 'px')
        .style('top', (window.pageYOffset + matrix.f - tipHeight) + 'px')
    })
    .on('mouseout', function(d: any) {
      tip.transition()
        .duration(0)
        .style('opacity', 0)
    })
  }

  generateColorScale() {
    this.colorScale = d3.scaleLinear<string>()
      .domain(this.domain)
      .range(['white', 'yellow', 'green', 'red'])
  }

  generateDayFill() {
    this.dayCells.style('fill', (d: any) => {
      let cellDate = moment(d).format('L')
      let sum = 0
      if (this.data[cellDate]) {
        let dayData = this.data[cellDate]
        let encounterCount: number[] = []
        Object.keys(dayData).map((key) => {
          Object.keys(dayData[key]).map((value) => {
            encounterCount.push(dayData[key][value])
          })
        })
        sum = encounterCount.reduce(function(a: number, b: number) {return a + b}, 0)
      }
      return this.colorScale(sum)
    })
  }

  handlerToolTipData() {
    this.dayCells.on('mouseover.data', (d: any) => {
      let cellDate = moment(d).format('L')
      if (this.data[cellDate]) {
        this.toolTipData = [cellDate, this.data[cellDate]]
      } else {
        this.toolTipData = [cellDate]
      }
    })
  }
}
