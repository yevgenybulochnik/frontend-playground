import { Component, Input } from '@angular/core';
import * as moment from 'moment'

@Component({
  selector: 'tooltip',
  template: `
  <div class='tooltip'>
    <div class='date'>{{date}}</div>
    <div class='total'>Total: {{sum}}</div>
    <div class='clinic' *ngFor='let clinic of dayData'>{{clinic.name}}
      <div class='encounters'>
        <div class='encounter' *ngFor='let encounter of clinic.encounters'>{{encounter.type}}: {{encounter.value}}</div>
      </div>
    </div>
  </div>
  `,
  styles: [`
    :host {
      position: absolute;
      pointer-events: none;
      font-family: arial
    }
    .tooltip {
      background-color: black;
      border-radius: 0.2em;
      color: white;
      padding: 5px;
      min-width: 10em;
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
    .encounters {
      display: flex;
    }
    .encounter {
      flex-grow: 1;
      margin: 0px 5px;
      font-size: 12px;
    }
    .date {
      text-align: center;
    }
    .clinic {
      font-size: 14px;
    }
    .total {
      text-align: center;
    }
    `]
})
export class ToolTipComponent {
  @Input() data: any;
  date: any;
  sum: number;
  dayData: any = [];
  ngOnChanges() {
    this.dayData = []
    this.sum = 0
    if (this.data) {
      this.date = moment(this.data[0], 'MM/DD/YYYY').format('LL')
      if (this.data[1]) {
        this.generateDataObject(this.data[1])
      }
    }
  }

  generateDataObject(data: any) {
    let encounterCounts: number[] = []
    data.each((encounters: any, clinic: any) => {
      let refObject = new Object()
      refObject['name'] = clinic
      refObject['encounters'] = []
      encounters.each(function(count: any, encounter: any) {
        refObject['encounters'].push({type: encounter, value: count})
        refObject['encounters'].sort(function(a: any, b: any) {
          return b.value - a.value
        })
        encounterCounts.push(count)
      })
      this.dayData.push(refObject)
    })
    this.sum = encounterCounts.reduce(function(a: number, b: number) {return a + b}, 0)
  }
}
