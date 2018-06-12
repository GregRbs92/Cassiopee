import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import { InterpreterSpeciality } from '../../interfaces/InterpreterSpecialityInterface';
import { Interpreter } from '../../interfaces/Interpreter';


/*
  Generated class for the InterpreterDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InterpreterDataProvider {

  constructor(public http: HttpClient, private translate: TranslateService) {
  }

  getLangues() {
    let lang: string = this.translate.currentLang;
    return this.http.get<Array<InterpreterSpeciality>>("https://itmp-api.herokuapp.com/api/specialites")
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

  getLangue(specialityId: number) {
    return this.http.get<InterpreterSpeciality>(`https://itmp-api.herokuapp.com/api/specialites/${specialityId}`);
  }

  searchInterpreters(speciality, lat, long):Observable<Array<Interpreter>> {
    return this.http.get<Array<Interpreter>>(`https://itmp-api.herokuapp.com/api/docteurs/around?speciality=${speciality}&latitude=${lat}&longitude=${long}`)
      .map(interpreters => {
        interpreters.sort((a, b) => {
          if (a.distance <= b.distance)
            return -1;
          if (a.distance > b.distance)
            return 1;
        });

        return interpreters;
      });
  }

  getInterpreter(InterpreterId: number) {
    return this.http.get<Interpreter>(`https://itmp-api.herokuapp.com/api/docteurs/${InterpreterId}`);
  }

}