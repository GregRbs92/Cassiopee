import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthServiceProvider {

  loggedIn: boolean = false;

  constructor(public http: HttpClient, private storage: Storage) {
  }

  login(email: string, password: string) {

    return this.http.post('https://itmp-api.herokuapp.com/api/clients/login', { 'email': email, 'password': password })
      .map((response: any) => {
        // login successful if there's a token in the response
        let token = response.id;
        if (token) {
          // set token property
          let ttl = Date.now() + response.ttl * 1000;
          let userId = response.userId;
          // store email and jwt token in local storage to keep user logged in between page refreshes
          this.storage.set('access_token', {'token': token, 'ttl': ttl, 'userId': userId})
          .then(() => {
            // store the user in storage
            this.getUser().then(res => {
              res.subscribe(user => {
                this.storage.set('user', user);
              });
            });
          });
          this.loggedIn = true;

          // return true to indicate successful login
          return true;

        } else {
          // return false to indicate failed login
          return false;
        }
      });
  }

  isAuthenticated():Promise<boolean> {
    return this.storage.get('access_token').then((val) => {
      if (!val || !val.ttl) {
        return false;
      } else {
        return Date.now() < val.ttl;
      }
    });
  }

  getUser(): Promise<Observable<any>> {
    return this.storage.get('access_token').then(val => {
      if (val) {
        return this.http.get(`https://itmp-api.herokuapp.com/api/clients/${val.userId}?access_token=${val.token}`);
      }
    });
  }

  logout() {
    this.storage.remove('access_token');
    this.storage.remove('user');
  }
}

