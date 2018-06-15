import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DepartmentsPage } from '../doctors/departments/departments';
import { LanguesPage } from '../interpreters/langues/langues';
import { TranslateService } from '@ngx-translate/core';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { AppointmentProvider } from '../../providers/appointment/appointment';

@Component({
  selector: 'page-appointments',
  templateUrl: 'appointments.html'
})
export class AppointmentsPage {

  appointments = [];
  sendingError:string;
  sendingSuccess: string;
  sending:boolean = false;

  constructor(public navCtrl: NavController, private translate: TranslateService, private auth: AuthServiceProvider, private rdv: AppointmentProvider) {
  }

  ngOnInit() {
    this.auth.isAuthenticated().then(isAuth => {
      if (isAuth) {
        this.rdv.getAppointments().then(res => {
          this.appointments = res;
        });
      }
    });
  }

  goToResearch() {
    this.navCtrl.parent.select(1);
  }

  goToDepartments() {
    this.navCtrl.push(DepartmentsPage);
  }

  goToLangues() {
    this.navCtrl.push(LanguesPage);
  }
}
