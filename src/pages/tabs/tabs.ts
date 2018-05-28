import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UserPage } from '../user/user';
import { ServicesPage } from '../services/services';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  home = HomePage;
  services = ServicesPage;
  user = UserPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
