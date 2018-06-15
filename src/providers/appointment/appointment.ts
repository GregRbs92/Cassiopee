import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Appointment } from '../../interfaces/Appointment';

/*
  Generated class for the AppointmentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppointmentProvider {

  constructor(public http: HttpClient, private storage: Storage) {}

  getAppointments(): Promise<Appointment[]> {
    return new Promise((resolve, reject) => {
      this.storage.get('access_token').then(accessToken => {
        this.http.get<Appointment[]>(`https://itmp-api.herokuapp.com/api/clients/${accessToken.userId}/appointments?access_token=${accessToken.token}`)
        .subscribe(res => resolve(res));
      });
    });
  }

}
