import { Component, ViewChild } from '@angular/core';
import { Platform, AlertController, Nav } from 'ionic-angular';
import { StatusBar, Push } from 'ionic-native';
import {Http} from '@angular/http';

import { LoginPage } from '../pages/login-page/login-page';
import { TestPagePage } from '../pages/test-page/test-page';
@Component({
  selector: 'my-app',
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage = LoginPage;

  constructor(platform: Platform, public alertCtrl: AlertController,http: Http) {
     let alert;

    alert = this.alertCtrl.create({
      title: 'thong bao chay app',
      message: 'app bat dau chay'
    });
    alert.present();

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();

      alert = this.alertCtrl.create({
        title: 'thong bao push firebase',
        message: 'bat dau push firebase'
      });
      alert.present();

      //Splashscreen.hide();
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

      alert = this.alertCtrl.create({
        title: 'thong bao init push',
        message: 'sau khi init push'
      });
      alert.present();


      if (platform.is('android')) {

        alert = this.alertCtrl.create({
          title: 'platform alert',
          message: `day la platform android`
        });
        alert.present();

        push.on('registration', (data) => {
          console.log("device token ->", data.registrationId);

          alert = this.alertCtrl.create({
            title: 'init token',
            message: `token la: ${data.registrationId}`
          });
          alert.present();


          //TODO - send device token to server

          // let body = new URLSearchParams();
          // body.set('Token', data.registrationId);
          // body.set('Device', 'android');
          // body.set('NgayTao', '12/12/2016');
          // body.set('TagAppID', '1');

          alert = this.alertCtrl.create({
            title: 'thong bao request',
            message: `bat dau send request`
          });
          alert.present();



          http.get(`http://test5.hutech.edu.vn/api/pushFireBase/clientdangky/${data.registrationId}/android/1`)
            .subscribe((response) => {

              alert = this.alertCtrl.create({
                title: 'thong bao push firebase',
                message: `ket qua push firebase ${JSON.stringify(response)}`
              });
              alert.present();

            },
            (error) => {

              alert = this.alertCtrl.create({
                title: 'Http Error: thong bao push firebase',
                message: `co loi khi push len firebase: ${error.message}
                 stacktrace: ${error}`
              });
              alert.present();

            }, () => {

              alert = this.alertCtrl.create({
                title: 'thong bao push firebase',
                message: `hoan thanh push len firebase`
              });
              alert.present();

            })

        });
        //-----------------------------------end push on registration----------------------

        push.on('notification', (data) => {
          console.log('message', data.message);
          //if user using app and push notification comes
          if (data.additionalData.foreground) {
            // if application open, show popup
            let confirmAlert = this.alertCtrl.create({
              title: data.title,
              message: data.message
            });
            confirmAlert.present();
          } else {
            //if user NOT using app and push notification comes
            //TODO: Your logic on click of push notification directly
            console.log("Push notification clicked");
          }
        });

        //-----------------------end push on notification----------------

        push.on('error', (e) => {
          alert = this.alertCtrl.create({
            title: 'Push OnError: thong bao push firebase',
            message: `co loi khi push len firebase: ${e.message}
                 stacktrace: ${e}`
          });
          alert.present();
        });

        //-------------------------------end push on error---------------

      }
    });
  }
}

