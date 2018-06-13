import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  isLoggedIn:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public translate: TranslateService) {
  }

  goBack() {
    this.navCtrl.pop();
  }

  changeLangFr() {
    this.translate.use('fr');
    this.navCtrl.popToRoot();
  }
  changeLangEn() {
    this.translate.use('en');
    this.navCtrl.popToRoot();
  }
  changeLangAr() {
    this.translate.use('ar');
    this.navCtrl.popToRoot();
  }
  changeLangRu() {
    this.translate.use('ru');
    this.navCtrl.popToRoot();
  }

}
