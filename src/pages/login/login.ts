import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { TabsPage } from '../tabs/tabs';
import 'rxjs/add/operator/catch';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit {

  loading: boolean = false;
  error:string;
  form: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthServiceProvider) {
    this.authService.isAuthenticated().then(val => {
      if (val) {
        this.navCtrl.push(TabsPage);
      }
    });
  }

  login() {
    this.loading = true;
    this.authService.login(this.form.value.email, this.form.value.password)
      .subscribe(result => {
        if (result) {
          this.navCtrl.popToRoot();
        } else {
          this.error = 'Username or password is incorrect';
          this.loading = false;
        }
      }, err => {
        this.error = err.error.message;
        console.log(err);
      });
  }

}
