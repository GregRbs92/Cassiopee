import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login';
import { LegalPage } from '../legal/legal';
import { CommentsPage } from '../comments/comments';
import { SettingsPage } from '../settings/settings';

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  isLoggedIn:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth:AuthServiceProvider) {
  }

  ionViewWillEnter() {
    this.auth.isAuthenticated().then(val => {
      if (val) {
        this.isLoggedIn = true;
      }
    });
  }

  goToLegalPage() {
    this.navCtrl.push(LegalPage);
  }

  goToLoginPage() {
    this.navCtrl.push(LoginPage);
  }

  goToSettingsPage() {
    this.navCtrl.push(SettingsPage);
  }

  goToCommentsPage() {
    this.navCtrl.push(CommentsPage);
  }

  logout() {
    this.auth.logout();
    this.navCtrl.popToRoot().then(res => this.navCtrl.parent.select(0));
    this.isLoggedIn = false;
  }

}
