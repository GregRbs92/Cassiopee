import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InterpreterDataProvider } from '../../../providers/interpreter-data/interpreter-data';
import { ListInterpretersPage } from '../../interpreters/list-interpreters/list-interpreters';

/**
 * Generated class for the LanguesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

let langues;

@Component({
  selector: 'page-langues',
  templateUrl: 'langues.html',
})
export class LanguesPage implements OnInit {

  langues: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private docProvider: InterpreterDataProvider) {
  }

  ngOnInit() {
    this.docProvider.getLangues().subscribe(val => {
      this.langues = val;
      langues = val;
    });
  }

  goBack() {
    this.navCtrl.pop();
  }

  filter(e) {
    const query = e.target.value;
    this.langues = langues.filter(dep => {
      return dep[1].toLowerCase().indexOf(query.toLowerCase()) > -1;
    });
  }

  goToInterpretersList(specialityId: number) {
    this.navCtrl.push(ListInterpretersPage, {'specialityId': specialityId});
  }
}
