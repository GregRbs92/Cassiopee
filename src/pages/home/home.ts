import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TranslatePage } from '../translate/translate';
import { SearchPage } from '../search/search';


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
        console.log("Accomodation");
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

  seeMore() {
    this.navCtrl.push(SearchPage);
  }

}
