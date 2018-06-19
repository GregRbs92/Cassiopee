import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Appointment } from '../../../interfaces/Appointment';
import * as moment from 'moment-timezone';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { DoctorDataProvider } from '../../../providers/doctor-data/doctor-data';
import { Doctor } from '../../../interfaces/Doctor';
import { Consultation } from '../../../interfaces/Consultation';

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
  m = moment;
  events: Appointment[] = [];
  dates: Date[] = [];
  doctor: Doctor;
  consultation: Consultation;
  isModalOpened: boolean = false;
  loading: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private translate: TranslateService, private docProvider: DoctorDataProvider) {
    this.locale = this.translate.currentLang;
  }

  ngOnInit() {
    this.doctor = this.navParams.get('doctor');
    this.consultation = this.navParams.get('consultation');

    this.docProvider.getAppointments(this.doctor.id).then(a => {
      this.events = a;
    });
  }

  goBack() {
    this.navCtrl.pop();
  }

  onFreeTimeClick(dates: Date[]) {
    this.dates = dates;
    this.isModalOpened = true;
  }

  closeModal() {
    this.dates = [];
    this.isModalOpened = false;
  }

  book() {
    if (!this.navParams.get('doctor')) return;
    if (!this.dates) return;

    this.loading = true;
    const dates = this.dates;

    this.storage.get('access_token').then(at => {
      this.docProvider.setAppointment('Doc', dates[0], dates[1], at.userId, this.doctor.id)
        .then(appointment => {
          alert('RDV réservé');
          this.navCtrl.popToRoot();
        });
    });
  }

}
