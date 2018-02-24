import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TranslatePage } from '../translate/translate';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  appointments = [];

  constructor(public navCtrl: NavController) {
  }

  goToResearch() {
    this.navCtrl.parent.select(1);
  }

  onSubmit(message) {
    console.log(message);
  }

}
