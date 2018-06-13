import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DepartmentsPage } from '../doctors/departments/departments';
import { LanguesPage } from '../interpreters/langues/langues';
import { CommentsPage } from '../comments/comments';
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

  goToLangues() {
    this.navCtrl.push(LanguesPage);
  }

  goToComments() {
    //this.navCtrl.popToRoot().then(res => this.navCtrl.parent.select(3)).then(res => this.navCtrl.push(CommentsPage));
    this.navCtrl.parent.select(3).then(res => this.navCtrl.push(CommentsPage));
    //(this.navCtrl.parent.select(3)).navCtrl.push(CommentsPage);
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
