import { Component, ViewEncapsulation } from '@angular/core';
import { DataService } from './services/data.service'

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  constructor(private dataservice: DataService) {
    console.log(this.dataservice)
  }
}
