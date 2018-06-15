import { Component } from '@angular/core';
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
export class LanguesPage {

  langues: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private docProvider: InterpreterDataProvider) {
  }

  goBack() {
    this.navCtrl.pop();
  }

  goToInterpretersList(lang: string) {
    this.navCtrl.push(ListInterpretersPage, {'lang': lang});
  }
}
