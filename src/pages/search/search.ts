import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TranslatePage } from '../translate/translate';
import { ShowDoctorsPage } from '../show-doctors/show-doctors';


@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  goToDoctors() {
    this.navCtrl.push(ShowDoctorsPage);
  }

  goToInterprete() {
    this.navCtrl.push(TranslatePage);
  }

}
