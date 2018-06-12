import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DepartmentsPage } from '../doctors/departments/departments';
import { LanguesPage } from '../interpreters/langues/langues';

@Component({
  selector: 'page-appointments',
  templateUrl: 'appointments.html'
})
export class AppointmentsPage {

  appointments = [];
  sendingError:string;
  sendingSuccess: string;
  sending:boolean = false;

  constructor(public navCtrl: NavController) {
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

  goToServices() {
    //this.navCtrl.push(ServicesPage);
    this.navCtrl.popToRoot().then(res => this.navCtrl.parent.select(1));
  }

  

}
