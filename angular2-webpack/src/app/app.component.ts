import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <div>{{name}}</div>
  `,
  styles: [`
    div {
      background-color: red;
    }
    `]
})
export class AppComponent {
  title = 'Angular 2 and webpack';
  name = 'testing webpack';
}
