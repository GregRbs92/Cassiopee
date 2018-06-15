import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Appointment } from '../../../interfaces/Appointment';
import * as moment from 'moment-timezone';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { DoctorDataProvider } from '../../../providers/doctor-data/doctor-data';

/**
 * Generated class for the DoctorBookingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-doctor-booking',
  templateUrl: 'doctor-booking.html',
})
export class DoctorBookingPage implements OnInit {

  locale: string = 'fr';
  events: Appointment[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private translate: TranslateService, private docProvider: DoctorDataProvider) {
    this.locale = this.translate.currentLang;
  }

  ngOnInit() {
    this.docProvider.getAppointments(this.navParams.get('doctorId')).then(a => {
      this.events = a;
    });
  }

  goBack() {
    this.navCtrl.pop();
  }

  book(dates: Date[]) {
    if (!this.navParams.get('doctorId')) return;

    this.storage.get('access_token').then(at => {
      this.docProvider.setAppointment('Doc', dates[0], dates[1], at.userId, this.navParams.get('doctorId'))
        .then(appointment => {
          alert('RDV réservé');
        });
    });
  }

}
