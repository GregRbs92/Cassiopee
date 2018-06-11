import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Appointment } from '../../../interfaces/Appointment';
import * as moment from 'moment-timezone';
import { TranslateService } from '@ngx-translate/core';

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
export class DoctorBookingPage {

  locale: string = 'fr';
  events: Appointment[] = [
    {
      id: 0,
      title: 'Rendez-vous avec le docteur',
      type: 'docteur',
      startDate: moment({y: 2018, M: 5, d: 7, h: 15}).tz('Europe/Paris').toDate(),
      endDate: moment({y: 2018, M: 5, d: 7, h: 15}).tz('Europe/Paris').add(30, 'm').toDate()
    },
    {
      id: 1,
      title: 'Rendez-vous avec le docteur',
      type: 'docteur',
      startDate: moment({y: 2018, M: 5, d: 7, h: 15}).tz('Europe/Paris').add(2, 'd').toDate(),
      endDate: moment({y: 2018, M: 5, d: 7, h: 15}).tz('Europe/Paris').add(2, 'd').add(30, 'm').toDate()
    },
    {
      id: 2,
      title: 'Rendez-vous avec le docteur',
      type: 'docteur',
      startDate: moment({y: 2018, M: 5, d: 7, h: 15}).tz('Europe/Paris').add(5, 'd').toDate(),
      endDate: moment({y: 2018, M: 5, d: 7, h: 15}).tz('Europe/Paris').add(8, 'd').add(30, 'm').toDate()
    }
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams, private translate: TranslateService) {
    this.locale = this.translate.currentLang;
  }

  goBack() {
    this.navCtrl.pop();
  }

  book(dates: Date[]) {
    this.events.push({
      id: 3,
      title: 'Rendez-vous avec le docteur',
      type: 'docteur',
      startDate: dates[0],
      endDate: dates[1]
    });
  }

}
