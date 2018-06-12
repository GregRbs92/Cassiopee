import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { InterpreterDataProvider } from '../../../providers/interpreter-data/interpreter-data';
import { NativeGeocoder, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { Geolocation } from '@ionic-native/geolocation';
import { Interpreter } from '../../../interfaces/Interpreter';
import { TranslateService } from '@ngx-translate/core';
import { ShowDoctorPage } from '../../doctors/show-doctor/show-doctor';

/**
 * Generated class for the ListInterpretersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-list-interpreters',
  templateUrl: 'list-interpreters.html',
})
export class ListInterpretersPage implements OnInit {

  speciality: number;
  location: string = "Paris";
  lat: number;
  long: number;
  loading: boolean;
  error: string;
  interpreters: Array<Interpreter>;

  isModalOpen: boolean = false;

  ngOnInit() {
    this.loading = true;
    this.interpreterData.searchInterpreters(this.speciality, 48.858797, 2.333377).subscribe(interpreters => {
      this.loading = false;
      this.interpreters = interpreters;
    });
  }

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    private translate: TranslateService,
    public interpreterData: InterpreterDataProvider,
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

  searchInterpreters(location) {
    this.error = "";
    if (this.speciality == -1) {
      this.translate.get('LIST_INTERPRETERS.NO_SPECIALITY').subscribe(val => {
        this.error = val;
      });
      return;
    }
    if (!location || location == "") {
      this.translate.get('LIST_INTERPRETERS.NO_LOCATION').subscribe(val => {
        this.error = val;
      });
      return;
    }
    this.loading = true;
    this.platform.ready().then(data => {
      this.geocoder.forwardGeocode(location).then((res: NativeGeocoderForwardResult) => {
        this.lat = parseFloat(res[0].latitude);
        this.long = parseFloat(res[0].longitude);
        this.interpreterData.searchInterpreters(this.speciality, this.lat, this.long).subscribe(interpreters => {
          this.loading = false;
          this.interpreters = interpreters;
          this.location = location;
        });
      })
        .catch(err => {
          this.loading = false;
          alert(err);
        });
    });
  }

  searchInterpretersAroundMe() {

    this.error = "";
    if (this.speciality == -1) {
      this.translate.get('LIST_INTERPRETERS.NO_SPECIALITY').subscribe(val => {
        this.error = val;
      });
      return;
    }
    this.loading = true;
    this.platform.ready().then(data => {
      this.geolocation.getCurrentPosition({ timeout: 10000 }).then(pos => {
        this.lat = pos.coords.latitude;
        this.long = pos.coords.longitude;
        this.interpreterData.searchInterpreters(this.speciality, this.lat, this.long).subscribe(interpreters => {
          this.loading = false;
          this.interpreters = interpreters;
          this.translate.get('LIST_INTERPRETERS.AROUND_ME').subscribe(val => {
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
