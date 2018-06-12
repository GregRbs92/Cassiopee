import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UserPage } from '../user/user';
import { ServicesPage } from '../services/services';
import { AppointmentsPage } from '../appointments/appointments';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  home = HomePage;
  services = ServicesPage;
  appointments = AppointmentsPage;
  user = UserPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
