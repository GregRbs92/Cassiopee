import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  searchForm: FormGroup;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      doctor: ['', Validators.required],
      speciality: [''],
      location: ['', Validators.required]
    })
  }

  search() {
    console.log(this.searchForm.value);
  }

}
