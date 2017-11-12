import { Component, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'bar-chart',
  template: `
  <div #container class="container">
  </div>
  `,
  styleUrls: ['./chart.bchartcomponent.sass']
})

export class BChartComponent {
  @ViewChild('container') element: any;
}
