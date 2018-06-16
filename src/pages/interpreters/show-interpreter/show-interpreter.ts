import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { InterpreterDataProvider } from '../../../providers/interpreter-data/interpreter-data';
import { TranslateService } from '@ngx-translate/core';
import { Interpreter } from '../../../interfaces/Interpreter';

@Component({
  selector: 'page-show-interpreter',
  templateUrl: 'show-interpreter.html',
})
export class ShowInterpreterPage {

  interpreter: Interpreter;
  langues: string;
  avis: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private interpreterProvider: InterpreterDataProvider, private translate: TranslateService) {
    const interpreterId = this.navParams.get('interpreterId');
    this.interpreterProvider.getInterpreter(interpreterId).subscribe(int => {
      this.interpreter = int;
      /*this.interpreterProvider.getSpeciality(int.langues[]).subscribe(spe => {
        this.langues = spe[this.translate.currentLang];
      });*/
    });
  }

  goBack() {
    this.navCtrl.pop();
  }


}
