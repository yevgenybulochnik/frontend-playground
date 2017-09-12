import { Component, Input } from '@angular/core';

@Component({
  selector: 'tooltip',
  template: `
  <div class='tooltip'>
    <div>{{data}}</div>
  </div>
  `,
  styles: [`
    :host {
      position: absolute;
      pointer-events: none;
    }
    .tooltip {
      width: 10em;
      height: 2.5em;
      background-color: black;
      position: absolute;
      border-radius: 0.2em;
      color: white;
    }
    .tooltip::after {
      content: ' ';
      position: absolute;
      border-width: 0.5em;
      margin-left: -0.5em;
      top: 100%;
      left: 50%;
      border-style: solid;
      border-color: black transparent transparent transparent;
    }
    `]
})
export class ToolTipComponent {
  @Input() data: any;
}
