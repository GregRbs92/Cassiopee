import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the ContactIntPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-contact-int',
  templateUrl: 'contact-int.html',
})
export class ContactIntPage {

  sendingError:string;
  sendingSuccess: string;
  sending:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
  }

  goBack() {
    this.navCtrl.pop();
  }

  onSubmit(last, first, email, message) {
    if (last === "" || first === "" || email === "" || message === "") {
      this.sendingError = "Veuillez renseigner tous les champs.";
      return;
    }
    if (!this.sending) {
      this.sendingSuccess = "";
      this.sendingError = "";
      this.sending = true;
      this.http.post(`https://itmp-api.herokuapp.com/api/clients/send-contact-email`, {nom: last, prenom: first, email: email, message: message}).subscribe(() => {
        this.sendingSuccess = "Votre message a bien été envoyé";
        this.sending = false;
      }, err => {
        this.sendingError = err.message;
      });
    }
  }

}
