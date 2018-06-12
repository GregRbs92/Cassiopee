import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';

import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';

import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { DoctorDataProvider } from '../providers/doctor-data/doctor-data';

import { ComponentsModule } from '../components/components.module';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { UserPage } from '../pages/user/user';
import { LoginPage } from '../pages/login/login';
import { ListDoctorsPage } from '../pages/doctors/list-doctors/list-doctors';
import { DepartmentsPage } from '../pages/doctors/departments/departments';
import { ForgottenPasswordPage } from '../pages/forgotten-password/forgotten-password';
import { ShowDoctorPage } from '../pages/doctors/show-doctor/show-doctor';
import { ServicesPage } from '../pages/services/services';
import { DoctorBookingPage } from '../pages/doctors/doctor-booking/doctor-booking';

import { CalendarComponent } from '../components/calendar/calendar.component';
import { CalendarFreeHoursComponent } from '../components/calendar-free-hours/calendar-free-hours.component';
import { LanguesPage } from '../pages/interpreters/langues/langues';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, "assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    UserPage,
    LoginPage,
    ListDoctorsPage,
    DepartmentsPage,
    LanguesPage,
    ForgottenPasswordPage,
    ShowDoctorPage,
    ServicesPage,
    DoctorBookingPage,
    CalendarComponent,
    CalendarFreeHoursComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule,
    HttpClientModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
    ReactiveFormsModule,
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    UserPage,
    LoginPage,
    ListDoctorsPage,
    DepartmentsPage,
    LanguesPage,
    ForgottenPasswordPage,
    ShowDoctorPage,
    ServicesPage,
    DoctorBookingPage,
    CalendarComponent,
    CalendarFreeHoursComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    DoctorDataProvider,
    Geolocation,
    NativeGeocoder
  ]
})
export class AppModule {}
