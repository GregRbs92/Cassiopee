import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DepartmentsPage } from '../doctors/departments/departments';
import { LanguesPage } from '../interpreters/langues/langues';
import { HttpClient } from '@angular/common/http';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { AppointmentProvider } from '../../providers/appointment/appointment';
import { TranslateService } from '@ngx-translate/core';
import { Appointment } from '../../interfaces/Appointment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  appointments: Appointment[] = [];
  locale: string = this.translate.currentLang;
  sendingError:string;
  sendingSuccess: string;
  sending:boolean = false;

  constructor(public navCtrl: NavController, private http: HttpClient, private translate: TranslateService, private auth: AuthServiceProvider, private rdv: AppointmentProvider) {}

  ngOnInit() {
    this.auth.isAuthenticated().then(isAuth => {
      if (isAuth) {
        this.rdv.getAppointments().then(res => {
          console.log(res);
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

  goToComments() {
    this.navCtrl.parent.select(3).then(res => console.log(res));
  }

  onSubmit(last, first, email, message) {
    if (last === "" || first === "" || email === "" || message === "") {
      this.sendingError = "Veuillez renseigner tous les champs.";
      return;
    }
    if (!this.sending) {
      this.sendingSuccess = "";
      this.sendingError = "";
      this.sending = true;
      this.http.post(`http://localhost:8000/clients/send-contact-email`, {nom: last, prenom: first, email: email, message: message}).subscribe(() => {
        this.sendingSuccess = "Votre message a bien été envoyé";
        this.sending = false;
      }, err => {
        this.sendingError = err.message;
      });
    }
  }

}
