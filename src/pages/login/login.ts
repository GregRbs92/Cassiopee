import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { TabsPage } from '../tabs/tabs';
import 'rxjs/add/operator/catch';
import { ForgottenPasswordPage } from '../forgotten-password/forgotten-password';

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

  ngOnInit() {
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthServiceProvider) {
    this.authService.isAuthenticated().then(val => {
      if (val) {
        this.navCtrl.push(TabsPage);
      }
    });
  }

  login(form) {
    // Vérifie que le formulaire ne s'envoie pas déjà
    if (this.loading) return;
    // Récupère les valeurs des champs
    const email = form.children[1].value;
    const password = form.children[2].value;
    // Vérifie qu'ils ne sont pas nuls
    if (email === "" || password === "") {
      this.error = 'Email and password can\'t be blank';
      return;
    }
    // Déclenche l'authentification
    this.loading = true;
    this.authService.login(email, password)
      .subscribe(result => {
        // Si l'authentification réussit, retourne à la racine
        if (result) {
          this.navCtrl.popToRoot();
        }
        this.loading = false
      }, err => {
        // Si erreur 401 => mauvais identifiants
        if (err.status === 401) {
          this.error = "Wrong credentials";
        } else {
          this.error = err.error.message;
          console.log(err);
        }
        this.loading = false;
      });
  }

  goBack() {
    this.navCtrl.pop();
  }

  goToForgottenPassword() {
    this.navCtrl.push(ForgottenPasswordPage);
  }

}
