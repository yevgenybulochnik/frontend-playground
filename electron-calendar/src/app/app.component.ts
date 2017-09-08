import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  data = [
    {date: '10/01/2017', count: 10},
    {date: '3/10/2017', count: 20},
  ]
}
