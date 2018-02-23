import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SearchPage } from '../search/search';
import { UserPage } from '../user/user';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  home = HomePage;
  search = SearchPage;
  user = UserPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
