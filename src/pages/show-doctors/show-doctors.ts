import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { DoctorDataProvider } from '../../providers/doctor-data/doctor-data';
import { NativeGeocoder, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { Geolocation } from '@ionic-native/geolocation';
import { Doctor } from '../../interfaces/Doctor';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the ShowDoctorsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-show-doctors',
  templateUrl: 'show-doctors.html',
})
export class ShowDoctorsPage implements OnInit{

  specialities: any[];
  location: string;
  lat: number;
  long: number;
  loading:boolean;
  error:string;
  doctors:Array<Doctor>;

  ngOnInit() {
    this.doctorData.getSpecialities().subscribe((res) => {
      this.specialities = res;
    });
  }

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public platform:Platform,
    private translate:TranslateService,
    public doctorData: DoctorDataProvider,
    public geolocation: Geolocation,
    public geocoder: NativeGeocoder) {
  }

  searchDoctors(speciality, location) {
    this.error = "";
    if (speciality == -1) {
      this.translate.get('SHOW_DOCTOR.NO_SPECIALITY').subscribe(val => {
        this.error = val;
      });
      return;
    }
    if (!location || location == "") {
      this.translate.get('SHOW_DOCTOR.NO_LOCATION').subscribe(val => {
        this.error = val;
      });
      return;
    }
    this.loading = true;
    this.platform.ready().then(data => {
      alert(location);
      this.geocoder.forwardGeocode(location).then((res:NativeGeocoderForwardResult) => {
        this.lat = parseFloat(res[0].latitude);
        this.long = parseFloat(res[0].longitude);
        this.doctorData.searchDoctors(speciality, this.lat, this.long).subscribe(doctors => {
          this.loading = false;
          this.doctors = doctors;
        });
      })
      .catch(err => alert(err));
    });
  }

  searchDoctorsAroundMe(speciality) {
    this.error = "";
    if (speciality == -1) {
      this.translate.get('SHOW_DOCTOR.NO_SPECIALITY').subscribe(val => {
        this.error = val;
      });
      return;
    }
    this.loading = true;
    this.platform.ready().then(data => {
      this.geolocation.getCurrentPosition({timeout: 10000}).then(pos => {
        this.lat = pos.coords.latitude;
        this.long = pos.coords.longitude;
        this.doctorData.searchDoctors(speciality, this.lat, this.long).subscribe(doctors => {
          this.loading = false;
          this.doctors = doctors;
        });
      });
    });
  }

}
