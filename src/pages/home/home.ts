import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NavController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  searchForm: FormGroup;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, private http:Http) {
    this.searchForm = this.formBuilder.group({
      language: ['', Validators.required],
      speciality: [''],
      location: ['', Validators.required]
    })
  }

  search() {
    console.log(this.searchForm.value);
    this.http.get('https://wikint.fr/js/services/getEvents.php')
    .subscribe((res) => {
      alert(res.json());
    }, (err) => {
      alert("Something went wrong !\n\nMake sure your device is connected to internet.");
    });
  }

}
