import { Component, ElementRef } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'd3-chart',
  template: `
    <div>
      <svg class="chart"></svg>
    </div>
  `,
  styles: [`

    `]
})
export class ChartComponent {
  constructor(private elRef: ElementRef) {}
  ngAfterViewInit() {
    let chart = d3.select(this.elRef.nativeElement).select('.chart')
          .append('svg')
          .attr('width', 50)
          .attr('height', 50)
          .append('circle')
          .attr('cx', 25)
          .attr('cy', 25)
          .attr('r', 25)
          .style('fill', 'purple')
  }
}
