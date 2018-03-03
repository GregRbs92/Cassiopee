import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';

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

  isLoggedIn:boolean;
  username:string;
  email:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth:AuthServiceProvider, private storage:Storage) {
  }

  ionViewWillEnter() {
    this.auth.isAuthenticated().then(val => {
      if (val) {
        this.isLoggedIn = true;
        this.storage.get('user').then(res => {
          this.username = res.username;
          this.email = res.email;
        });
      }
      this.isLoggedIn = val;
    });
  }

  goToLoginPage() {
    this.navCtrl.push(LoginPage);
  }

  logout() {
    this.auth.logout();
    this.navCtrl.popToRoot().then(res => this.navCtrl.parent.select(0));
  }

}
