import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
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
    return this.http.get<Array<DoctorSpeciality>>("https://apocalypse2017.com/jasmine/api/doctors/specialities")
      .map(specialities => {
        let result = [];
        switch (lang) {
          case 'en':
            specialities.forEach(speciality => {
              result.push([speciality.id, speciality.enName])
            });
            break;
          case 'ar':
            specialities.forEach(speciality => {
              result.push([speciality.id, speciality.arName])
            });
            break;
          case 'ru':
            specialities.forEach(speciality => {
              result.push([speciality.id, speciality.ruName])
            });
            break;
          default:
            specialities.forEach(speciality => {
              result.push([speciality.id, speciality.frName])
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
    return this.http.get<Array<Doctor>>("https://apocalypse2017.com/jasmine/api/doctors/" + speciality + "/" + lat + "/" + long);
  }

}
