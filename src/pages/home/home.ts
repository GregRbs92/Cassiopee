import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TranslatePage } from '../translate/translate';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
  }

  goTo(page:string) {
    switch (page) {
      case 'medical':
        console.log("Going to medical page");
        break;

      case 'accomodation':
        console.log("Going to accomodation page");
        break;

      case 'translator':
        this.navCtrl.push(TranslatePage);
        break;

      case 'services':
        console.log("Going to services page");
        break;

      default:
        alert("Error: This page does not exist...");
        break;
    }
  }

}
