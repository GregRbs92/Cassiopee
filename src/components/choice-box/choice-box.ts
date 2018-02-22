import { Component, Input } from '@angular/core';

@Component({
  selector: 'choice-box',
  templateUrl: 'choice-box.html'
})
export class ChoiceBoxComponent {

  @Input() text: string;
  @Input() image: string;
  @Input() full: string;

  constructor() {
  }

}
