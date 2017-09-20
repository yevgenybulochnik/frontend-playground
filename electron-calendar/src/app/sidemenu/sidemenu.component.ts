import { Component } from '@angular/core';
import { DataService } from '../services/data.service'

@Component({
  selector: 'side-menu',
  template: `
    <div>hello</div>
  `,
  styles: [`

    `],
})
export class SideMenuComponent {
  constructor(private dataService: DataService) {
    console.log(this.dataService)
  }
}
