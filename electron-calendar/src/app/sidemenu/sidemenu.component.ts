import { Component } from '@angular/core';
import { DataService } from '../services/data.service'

@Component({
  selector: 'side-menu',
  template: `
  <div class='clinic-container'>
    <span>Clinics</span>
    <button *ngFor='let clinic of clinics' (click)='getData(clinic)' [class.selected]='checkSelection(clinic)'>{{clinic}}</button>
  </div>
  <div class='provider-container'>
    <span>Providers</span>
    <button *ngFor='let provider of providers' (click)='getData(provider)' [class.selected]='checkSelection(provider)'>{{provider}}</button>
  </div>
  `,
  styles: [`
    :host {
      font-family: arial;
      max-width: 6em;
    }
    button {
      margin: 0.1em 0.5em;
      border: solid 1px #008CBA;
      background-color: white;
      outline: none;
    }
    button:hover {
      background-color: #008CBA;
      color: white;
    }
    span {
      border-bottom: solid 1px grey;
      margin-bottom: 2px;
    }
    .clinic-container, .provider-container {
      display: flex;
      flex-direction: column;
      padding: 5px;
    }
    .selected {
      background: #008CBA;
      color: white;
    }
    `],
})
export class SideMenuComponent {
  clinics: string[];
  providers: string[];
  constructor(private dataService: DataService) {
    this.clinics = this.dataService.byClinic.keys()
    this.providers = this.dataService.byProvider.keys()
  }

  checkSelection(key: string) {
    if (this.dataService.generatedCalendars.has(key)) {
      return true
    }
  }

  getData(value: string) {
    this.dataService.generateCalendar(value)
  }
}
