import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import * as moment from 'moment';

@Component({
  selector: 'd3-calendar',
  template: `
  <div #container class='container'></div>
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
  private dateForm = 'MM/DD/YYYY';

  // D3 variables
  private svg: any;
  private months: any;
  private dayCells: any;

  // Input Variables
  private firstDate: any;
  private lastDate: any;

  constructor() {
  }

  ngOnInit() {
   this.firstDate = moment(this.data[0].date, this.dateForm).toDate()
   this.lastDate = moment(this.data[this.data.length - 1].date, this.dateForm).toDate()
  }

  ngAfterViewInit() {
    let element = this.element
    this.svg = d3.select(element.nativeElement).append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
    this.generateMonths()
    this.generateDays()
  }

  generateMonths() {
    let days = d3.timeDay.range(this.firstDate, this.lastDate) // Note: move generated dates to seperate function? see line 38-39
    let mgroup = d3.nest().key(function(d: any) { return moment(d).format('MMM') }).entries(days)
    this.months = this.svg.selectAll('g')
      .data(mgroup)
      .enter().append('g')
        .attr('class', function(d: any) {return d.keys})
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
}
