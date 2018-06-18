import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import { DoctorSpeciality } from '../../interfaces/DoctorSpecialityInterface';
import { Doctor } from '../../interfaces/Doctor';
import { Appointment } from '../../interfaces/Appointment';
import { Storage } from '@ionic/storage';
import { Consultation } from '../../interfaces/Consultation';


/*
  Generated class for the DoctorDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DoctorDataProvider {

  constructor(public http: HttpClient, private translate: TranslateService, private storage: Storage) {
  }

  getSpecialities() {
    let lang: string = this.translate.currentLang;
    return this.http.get<Array<DoctorSpeciality>>("https://itmp-api.herokuapp.com/api/specialites")
      .map(specialities => {
        let result = [];
        switch (lang) {
          case 'en':
            specialities.forEach(speciality => {
              result.push([speciality.id, speciality.en])
            });
            break;
          case 'ar':
            specialities.forEach(speciality => {
              result.push([speciality.id, speciality.ar])
            });
            break;
          case 'ru':
            specialities.forEach(speciality => {
              result.push([speciality.id, speciality.ru])
            });
            break;
          default:
            specialities.forEach(speciality => {
              result.push([speciality.id, speciality.fr])
            });
            break;
        }
        result.sort((a, b) => {
          if (a[1] <= b[1])
            return -1;
          if (a[1] > b[1])
            return 1;
        });

        return result;
      })
  }

  getSpeciality(specialityId: number) {
    return this.http.get<DoctorSpeciality>(`https://itmp-api.herokuapp.com/api/specialites/${specialityId}`);
  }

  searchDoctors(speciality, lat, long):Observable<Array<Doctor>> {
    return this.http.get<Array<Doctor>>(`https://itmp-api.herokuapp.com/api/docteurs/around?speciality=${speciality}&latitude=${lat}&longitude=${long}`)
      .map(doctors => {
        doctors.sort((a, b) => {
          if (a.distance <= b.distance)
            return -1;
          if (a.distance > b.distance)
            return 1;
        });

        return doctors;
      });
  }

  getDoctor(doctorId: number) {
    return this.http.get<Doctor>(`https://itmp-api.herokuapp.com/api/docteurs/${doctorId}`);
  }

  getConsultations(doctorId: number) {
    return this.http.get<Consultation[]>(`https://itmp-api.herokuapp.com/api/docteurs/${doctorId}/consultations`);
  }

  setAppointment(title, start, end, clientId, doctorId) {
    return new Promise((resolve, reject) => {
      this.storage.get('access_token').then(accessToken => {
        this.http.post<Appointment>(`https://itmp-api.herokuapp.com/api/clients/${clientId}/appointments?access_token=${accessToken.token}`,
          {
            title: title,
            type: 'docteur',
            startDate: start,
            endDate: end,
            clientId: clientId,
            workerId: doctorId
          }
        )
        .subscribe(res => {
          this.http.get<any>(`https://itmp-api.herokuapp.com/api/clients/${clientId}?access_token=${accessToken.token}`)
          .subscribe(client => {
            this.http.get<any>(`https://itmp-api.herokuapp.com/api/docteurs/${doctorId}`)
            .subscribe(docteur => {
              this.http.post(`https://itmp-api.herokuapp.com/api/docteurs/send-appointment-email?access_token=${accessToken.token}`,
              {
                nom: client.username,
                email: client.email,
                doctorEmail: docteur.email,
                startDate: start,
                endDate: end,
              })
              .subscribe(success => resolve(success));
            });
          });
        });
      });
    });
  }

  getAppointments(doctorId: number): Promise<Appointment[]> {
    return new Promise((resolve, reject) => {
      this.storage.get('access_token').then(accessToken => {
        this.http.get<Appointment[]>(`https://itmp-api.herokuapp.com/api/docteurs/${doctorId}/appointments?access_token=${accessToken.token}`)
        .subscribe(res => resolve(res));
      });
    });
  }

}
