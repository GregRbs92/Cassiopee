import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DepartmentsPage } from '../departments/departments';

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

}
