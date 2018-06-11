import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { DoctorDataProvider } from '../../../providers/doctor-data/doctor-data';
import { NativeGeocoder, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { Geolocation } from '@ionic-native/geolocation';
import { Doctor } from '../../../interfaces/Doctor';
import { TranslateService } from '@ngx-translate/core';
import { ShowDoctorPage } from '../show-doctor/show-doctor';

/**
 * Generated class for the ListDoctorsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-list-doctors',
  templateUrl: 'list-doctors.html',
})
export class ListDoctorsPage implements OnInit {

  speciality: number;
  location: string = "Paris";
  lat: number;
  long: number;
  loading: boolean;
  error: string;
  doctors: Array<Doctor>;

  isModalOpen: boolean = false;

  ngOnInit() {
    this.loading = true;
    this.doctorData.searchDoctors(this.speciality, 48.858797, 2.333377).subscribe(doctors => {
      this.loading = false;
      this.doctors = doctors;
    });
  }

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    private translate: TranslateService,
    public doctorData: DoctorDataProvider,
    public geolocation: Geolocation,
    public geocoder: NativeGeocoder) {
      this.speciality = this.navParams.get('specialityId');
  }

  goBack() {
    this.navCtrl.pop();
  }

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  searchDoctors(location) {
    this.error = "";
    if (this.speciality == -1) {
      this.translate.get('LIST_DOCTORS.NO_SPECIALITY').subscribe(val => {
        this.error = val;
      });
      return;
    }
    if (!location || location == "") {
      this.translate.get('LIST_DOCTORS.NO_LOCATION').subscribe(val => {
        this.error = val;
      });
      return;
    }
    this.loading = true;
    this.platform.ready().then(data => {
      this.geocoder.forwardGeocode(location).then((res: NativeGeocoderForwardResult) => {
        this.lat = parseFloat(res[0].latitude);
        this.long = parseFloat(res[0].longitude);
        this.doctorData.searchDoctors(this.speciality, this.lat, this.long).subscribe(doctors => {
          this.loading = false;
          this.doctors = doctors;
          this.location = location;
        });
      })
        .catch(err => {
          this.loading = false;
          alert(err);
        });
    });
  }

  searchDoctorsAroundMe() {

    this.error = "";
    if (this.speciality == -1) {
      this.translate.get('LIST_DOCTORS.NO_SPECIALITY').subscribe(val => {
        this.error = val;
      });
      return;
    }
    this.loading = true;
    this.platform.ready().then(data => {
      this.geolocation.getCurrentPosition({ timeout: 10000 }).then(pos => {
        this.lat = pos.coords.latitude;
        this.long = pos.coords.longitude;
        this.doctorData.searchDoctors(this.speciality, this.lat, this.long).subscribe(doctors => {
          this.loading = false;
          this.doctors = doctors;
          this.translate.get('LIST_DOCTORS.AROUND_ME').subscribe(val => {
            this.location = val;
          });
        });
      })
      .catch(err => {
        this.loading = false;
        alert("Cannot get your location: " + err);
      });
    });
  }

  showDoctor(id_doctor) {
    this.navCtrl.push(ShowDoctorPage, {'doctorId': id_doctor});
  }

}
