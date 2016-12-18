import { Component } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar, Splashscreen, Push } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login-page/login-page';
import { DemoItemSlidingPage } from '../pages/demo-item-sliding/demo-item-sliding';



@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = DemoItemSlidingPage;

  constructor(platform: Platform, public alertCtrl: AlertController, http: Http) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      //Splashscreen.hide();
      let push = Push.init({
        android: {
          senderID: "261586936266"
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

          let body = new URLSearchParams();
          body.set('Token', data.registrationId);
          body.set('Device', 'android');
          body.set('NgayTao', '12/12/2016');
          body.set('TagAppID', '{1}');

          http.post('http://test5.hutech.edu.vn/api/pushFireBase/clientdangky', body)
            .subscribe((response) => {
              console.log('success');
            },
            (error) => {
              console.error('Loi khi push token: ', error);
            })

        });
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
        push.on('error', (e) => {
          console.log(e.message);
        });

      }
    });
  }
}
