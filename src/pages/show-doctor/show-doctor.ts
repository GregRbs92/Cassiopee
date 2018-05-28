import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Doctor } from '../../interfaces/Doctor';
import { DoctorDataProvider } from '../../providers/doctor-data/doctor-data';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-show-doctor',
  templateUrl: 'show-doctor.html',
})
export class ShowDoctorPage {

  doctor: Doctor;
  specialite: string;
  avis: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private doctorProvider: DoctorDataProvider, private translate: TranslateService) {
    const doctorId = this.navParams.get('doctorId');
    this.doctorProvider.getDoctor(doctorId).subscribe(doc => {
      this.doctor = doc;
      this.doctorProvider.getSpeciality(doc.specialiteId).subscribe(spe => {
        this.specialite = spe[this.translate.currentLang];
      });
    });
  }

  goBack() {
    this.navCtrl.pop();
  }

}
