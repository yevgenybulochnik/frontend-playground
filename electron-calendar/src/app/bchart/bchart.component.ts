import { Component, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'd3-bar-chart',
  template: `
  <div #container class="container">
  test
  </div>
  `,
  styleUrls: ['./bchart.component.sass']
})

export class BChartComponent {
  @ViewChild('container') element: any;
}
