import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Doctor } from '../../../interfaces/Doctor';
import { DoctorDataProvider } from '../../../providers/doctor-data/doctor-data';
import { TranslateService } from '@ngx-translate/core';
import { DoctorBookingPage } from '../doctor-booking/doctor-booking';
import { ContactDocPage } from '../contact-doc/contact-doc';
import { Consultation } from '../../../interfaces/Consultation';

@Component({
  selector: 'page-show-doctor',
  templateUrl: 'show-doctor.html',
})
export class ShowDoctorPage implements OnInit {

  doctor: Doctor;
  specialite: string;
  avis: any[] = [];
  locale: string = this.translate.currentLang;
  consultations: Consultation[] = [];
  selectedConsultation: Consultation;
  showBookingWarning: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private doctorProvider: DoctorDataProvider, private translate: TranslateService) {
  }

  ngOnInit() {
    const doctorId = this.navParams.get('doctorId');

    this.doctorProvider.getDoctor(doctorId).subscribe(doc => {
      this.doctor = doc;
      this.doctorProvider.getSpeciality(doc.specialiteId).subscribe(spe => {
        this.specialite = spe[this.translate.currentLang];
      });
    });

    this.doctorProvider.getConsultations(doctorId).subscribe(consultations => {
      this.consultations = consultations;
    })
  }

  goBack() {
    this.navCtrl.pop();
  }

  goToBooking() {
    if (!this.selectedConsultation) {
      this.showBookingWarning = true;
      return;
    }
    this.navCtrl.push(DoctorBookingPage, {doctor: this.doctor, consultation: this.selectedConsultation});
  }

  sendMail() {
    this.navCtrl.push(ContactDocPage);
  }

}
