import { Component } from '@angular/core';
import { DataService } from '../services/data.service'

@Component({
  selector: 'top-menu',
  template: `
  <span>Years</span>
  <button *ngFor='let year of years' (click)='getClinicProviders(year)' [class.selected]='dataService.selectedYear === year'>{{year}}</button>
  `,
  styles: [`
    :host {
      font-family: arial;
      display: flex;
      align-items: center;
    }
    span {
      border-right: solid black 1px;
      padding-right: 0.2em;
      margin-right: 0.3em;
    }
    button {
      margin: 0 0.3em;
      width: 5em;
      border: solid 1px #008CBA;
      background-color: white;
      outline: none;
      border-radius: 3px;
    }
    button:hover {
      background-color: #008CBA;
      color: white;
    }
    .selected {
      background: #008CBA;
      color: white;
    }
    `]
})
export class TopMenuComponent {
  years: any;
  constructor(private dataService: DataService) {
    this.years = this.dataService.byClinic.keys()
  }
  getClinicProviders(value: any) {
    this.dataService.generateKeys(value)
  }
}
