import { Component } from '@angular/core';

@Component({
  selector: 'test-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  buttons: string[] = ['hello', 'test', 'button', 'kotes'];
}
