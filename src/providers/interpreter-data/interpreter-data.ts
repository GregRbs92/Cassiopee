import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import { Interpreter } from '../../interfaces/Interpreter';


/*
  Generated class for the InterpreterDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InterpreterDataProvider {

  constructor(public http: HttpClient) {
  }

  searchInterpreters(speciality, lat, long):Observable<Array<Interpreter>> {
    return this.http.get<Array<Interpreter>>(`https://itmp-api.herokuapp.com/api/interpretes/around?langue=${speciality}&latitude=${lat}&longitude=${long}`)
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
    return this.http.get<Interpreter>(`https://itmp-api.herokuapp.com/api/interpretes/${InterpreterId}`);
  }

}