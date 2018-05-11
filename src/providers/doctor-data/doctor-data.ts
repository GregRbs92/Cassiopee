import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import { DoctorSpeciality } from '../../interfaces/DoctorSpecialityInterface';
import { Doctor } from '../../interfaces/Doctor';


/*
  Generated class for the DoctorDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DoctorDataProvider {

  constructor(public http: HttpClient, private translate: TranslateService) {
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

  searchDoctors(speciality, lat, long):Observable<Array<Doctor>> {
    return this.http.get<Array<Doctor>>(`https://itmp-api.herokuapp.com/api/docteurs/around?speciality=${speciality}&latitude=${lat}&longitude=${long}`)
      .map(doctors => {
        console.log(doctors);
        doctors.sort((a, b) => {
          if (a.distance <= b.distance)
            return -1;
          if (a.distance > b.distance)
            return 1;
        });

        return doctors;
      });
  }

}
