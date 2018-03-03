import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

@Injectable()
export class AuthServiceProvider {

  loggedIn: boolean = false;
  token: string;

  constructor(public http: HttpClient, private storage: Storage) {
  }

  login(email: string, password: string) {

    return this.http.post('https://apocalypse2017.com/jasmine/api/restricted/login_check', { '_email': email, '_password': password })
      .map((response: any) => {
        // login successful if there's a jwt token in the response
        let token = response.token;
        if (token) {
          // set token property
          let username = JSON.parse(atob(token.split('.')[1])).username;
          let email = JSON.parse(atob(token.split('.')[1])).email;
          let user = {'username': username, 'email': email};
          this.token = token;
          // store email and jwt token in local storage to keep user logged in between page refreshes
          this.storage.set('access_token', token);
          this.storage.set('user', user);
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
      if (!val) {
        return false;
      } else {
        let exp = JSON.parse(atob(val.split('.')[1])).exp;
        let expired = Date.now() / 1000 < exp ? false : true;
        return !expired;
      }
    });
  }

  logout() {
    this.storage.remove('access_token');
    this.storage.remove('username');
  }
}

