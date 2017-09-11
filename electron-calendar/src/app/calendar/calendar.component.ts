import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import * as moment from 'moment';

@Component({
  selector: 'd3-calendar',
  template: `
  <div #container class='container'>
    <tooltip></tooltip>
  </div>
  `,
  styleUrls: ['./calendar.component.sass']
})
export class CalendarComponent {

  // Refernce to .container div
  @ViewChild('container') element: any;
  @Input() data: any;

  // Default values
  private cellSize = 15;
  private cellPadding = 3;
  private width = 1300;
  private height = (this.cellSize + this.cellPadding) * 8;

  // D3 variables
  private svg: any;
  private months: any;
  private monthLabels: any;
  private dayCells: any;
  private toolTip: any;

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
    this.generateToolTip()
  }

  generateDateRange() {
    if (this.data) {
      let dataYear = moment(this.data[0].date, this.dateForm).format('YYYY')
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
    let cellTotal = this.cellSize + this.cellPadding
    let mgroup = d3.nest().key(function(d: any) { return moment(d).format('MMM') }).entries(this.dateRange)
    this.months = this.svg.selectAll('g')
      .data(mgroup)
      .enter().append('g')
        .attr('class', 'months')
        .attr('id', function(d: any) {return d.key})
        .attr('transform', function(d: any, i: any) {
          let space = cellTotal * i
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
      .attr('y', 12)
      .attr('class', 'monthLabel')
    this.monthLabels.data(firstX)
      .attr('x', function(d: any) {return d + 40})
  }

  generateDays() {
    let cellTotal = this.cellSize + this.cellPadding
    let fDate = this.firstDate
    this.dayCells = this.months.selectAll('rect')
      .data(function(d: any) {return d.values})
      .enter().append('rect')
        .attr('width', this.cellSize)
        .attr('height', this.cellSize)
        .attr('class', 'dateBox')
        .attr('y', function(d: any) {return (d.getDay() * cellTotal) + cellTotal})
        .attr('x', function(d: any) {
          let cellDate = moment(d)
          let firstDate = moment(fDate)
          let result = cellDate.week() - firstDate.week() + (firstDate.weeksInYear() * (cellDate.weekYear() - firstDate.weekYear()))
          return result * cellTotal
        })
        .text(function(d: any) {return moment(d).format('MMM Do YYYY')})
  }

  generateToolTip() {
    let element = this.element
    this.toolTip = d3.select(element.nativeElement).select('tooltip')
      .style('opacity', 0)
    let tip = this.toolTip
    this.dayCells.on('mouseover', function(d: any) {
      let elem = d3.select(this)
      let matrix = elem['_groups'][0][0].getScreenCTM().translate(+elem['_groups'][0][0].getAttribute('x'), + elem['_groups'][0][0].getAttribute('y'))
      tip.transition()
        .duration(0)
        .style('opacity', 0.8)
        .style('left', (window.pageXOffset + matrix.e - 72) + 'px')
        .style('top', (window.pageYOffset + matrix.f - 48) + 'px')
    })
    .on('mouseout', function(d: any) {
      tip.transition()
        .duration(0)
        .style('opacity', 0)
    })
  }
}
