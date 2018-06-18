import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as moment from 'moment-timezone';
import { DepartmentsPage } from '../doctors/departments/departments';
import { LanguesPage } from '../interpreters/langues/langues';
import { TranslateService } from '@ngx-translate/core';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { AppointmentProvider } from '../../providers/appointment/appointment';
import { Appointment } from '../../interfaces/Appointment';

@Component({
  selector: 'page-appointments',
  templateUrl: 'appointments.html'
})
export class AppointmentsPage {

  nextAppointments: Appointment[] = [];
  previousAppointments: Appointment[] = [];
  showPrevious: boolean = false;

  constructor(public navCtrl: NavController, private translate: TranslateService, private auth: AuthServiceProvider, private rdv: AppointmentProvider) {
  }

  ngOnInit() {
    this.auth.isAuthenticated().then(isAuth => {
      if (isAuth) {
        this.rdv.getAppointments().then(res => {
          let next = [];
          let former = [];
          res.forEach(a => {
            if (moment(a.startDate).tz('Europe/Paris').isAfter(moment().tz('Europe/Paris'))) {
              next.push(a);
            }
            else {
              former.push(a);
            }
          });
          this.nextAppointments = next;
          this.previousAppointments = former;
        });
      }
    });
  }

  goToResearch() {
    this.navCtrl.parent.select(1);
  }
}
