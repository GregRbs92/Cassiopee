import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DepartmentsPage } from '../doctors/departments/departments';
import { LanguesPage } from '../interpreters/langues/langues';

@Component({
  selector: 'page-services',
  templateUrl: 'services.html',
})
export class ServicesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  goToDepartments() {
    this.navCtrl.push(DepartmentsPage);
  }

  goToLangues() {
    this.navCtrl.push(LanguesPage);
  }

}
