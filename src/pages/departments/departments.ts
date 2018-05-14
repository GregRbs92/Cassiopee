import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DoctorDataProvider } from '../../providers/doctor-data/doctor-data';

/**
 * Generated class for the DepartmentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

let departments;

@Component({
  selector: 'page-departments',
  templateUrl: 'departments.html',
})
export class DepartmentsPage implements OnInit {

  departments: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private docProvider: DoctorDataProvider) {
  }

  ngOnInit() {
    this.docProvider.getSpecialities().subscribe(val => {
      this.departments = val;
      departments = val;
    });
  }

  goBack() {
    this.navCtrl.pop();
  }

  filter(e) {
    const query = e.target.value;
    this.departments = departments.filter(dep => {
      return dep[1].toLowerCase().indexOf(query.toLowerCase()) > -1;
    });
  }
}
