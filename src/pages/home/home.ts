import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DepartmentsPage } from '../departments/departments';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  appointments = [];
  sendingError:string;
  sending:boolean = false;

  constructor(public navCtrl: NavController) {
  }

  goToResearch() {
    this.navCtrl.parent.select(1);
  }

  goToDepartments() {
    this.navCtrl.push(DepartmentsPage);
  }

  onSubmit(last, first, email, message) {
    if (!this.sending) {
      this.sending = true;
      alert("Sending message: " + message + "\nFrom: " + email + "\nSo called: " + first + " " + last);
      this.sending = false;
    }
  }

}
