import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TranslatePage } from '../translate/translate';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  appointments = [];
  sendingError:string;
  sending:boolean = false;

  constructor(public navCtrl: NavController, private auth:AuthServiceProvider) {
  }

  goToResearch() {
    this.navCtrl.parent.select(1);
  }

  onSubmit(message) {
    this.sending = true;
    this.auth.isAuthenticated().then(val => {
      if(!val) {
        this.sendingError = "Vous devez être connecté pour envoyer un message";
        this.sending = false
      }
    });
  }

}
