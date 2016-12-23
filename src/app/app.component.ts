import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, NavController } from 'ionic-angular';
import { StatusBar, Push, Splashscreen } from 'ionic-native';
import { Http } from '@angular/http';

import { LoginPage } from '../pages/login-page/login-page';
import { TestPagePage } from '../pages/test-page/test-page';


import { LoginService } from '../pages/shared/services/login-page.service';
import { Storage } from '@ionic/storage';
import { HomePage } from '../pages/homepage/homepage';
import { TinTucPage } from '../pages/tintuc/tintuc';


@Component({
  selector: 'my-app',
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  username: string;
  password: string;
  rootPage = LoginPage;
  count: number;

  constructor(platform: Platform, private service: LoginService, private storage: Storage, private http: Http) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      let push = Push.init({
        android: {
          senderID: "413199343728"
        },
        ios: {
          alert: "true",
          badge: false,
          sound: "true"
        },
        windows: {}
      });

      if (platform.is('android')) {

        push.on('registration', (data) => {
          console.log("device token ->", data.registrationId);


          //TODO - send device token to server

          // let body = new URLSearchParams();
          // body.set('Token', data.registrationId);
          // body.set('Device', 'android');
          // body.set('NgayTao', '12/12/2016');
          // body.set('TagAppID', '1');



          http.get(`http://test5.hutech.edu.vn/api/pushFireBase/clientdangky/${data.registrationId}/android/1`)
            .subscribe((response) => {


            },
            (error) => {


            }, () => {


            })

        });

        //-----------------------------------end push on registration----------------------

        push.on('notification', (data) => {
          console.log('message', data.message);
          //if user using app and push notification comes
          if (data.additionalData.foreground) {
            // if application open, show popup


          } else {
            //if user NOT using app and push notification comes
            //TODO: Your logic on click of push notification directly
            console.log("Push notification clicked");
          }
        });


        //-----------------------end push on notification----------------

        push.on('error', (e) => {

        });


        //-------------------------------end push on error---------------

      }
    });
  }
}

