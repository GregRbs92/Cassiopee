import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DepartmentsPage } from '../departments/departments';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  appointments = [];
  sendingError:string;
  sendingSuccess: string;
  sending:boolean = false;

  constructor(public navCtrl: NavController, private http: HttpClient) {
  }

  goToResearch() {
    this.navCtrl.parent.select(1);
  }

  goToDepartments() {
    this.navCtrl.push(DepartmentsPage);
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
      this.http.post(`http://localhost:8000/clients/send-contact-email`, {nom: last, prenom: first, email: email, message: message}).subscribe(() => {
        this.sendingSuccess = "Votre message a bien été envoyé";
        this.sending = false;
      }, err => {
        this.sendingError = err.message;
      });
    }
  }

}
