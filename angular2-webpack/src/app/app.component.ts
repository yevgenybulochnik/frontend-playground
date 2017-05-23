import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <div>test div</div>
    <div>test div</div>
  `,
  styles: [`
    div {
      background-color: red;
    }
    `]
})
export class AppComponent {
  title = 'Angular 2 and webpack';
}
