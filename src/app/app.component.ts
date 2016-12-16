import { Component, ViewChild } from '@angular/core';
import { Platform, AlertController, Nav } from 'ionic-angular';
import { StatusBar, Push } from 'ionic-native';

import { LoginPage } from '../pages/login-page/login-page';

@Component({
  selector: 'my-app',
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage = LoginPage;

  constructor(platform: Platform, public alertCtrl: AlertController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      // Splashscreen.hide();
    //   let push = Push.init({
    //     android: {
    //       senderID: "413199343728"
    //     },
    //     ios: {
    //       alert: "true",
    //       badge: false,
    //       sound: "true"
    //     },
    //     windows: {}
    //   });

    //   push.on('registration', (data) => {
    //     console.log("device token ->", data.registrationId);
    //     //TODO - send device token to server
    //   });
    //   push.on('notification', (data) => {
    //     console.log('message', data.message);
    //     let self = this;
    //     //if user using app and push notification comes
    //     if (data.additionalData.foreground) {
    //       // if application open, show popup
    //       let confirmAlert = this.alertCtrl.create({
    //         title: 'New Notification',
    //         message: data.message,
    //         buttons: [{
    //           text: 'Ignore',
    //           role: 'cancel'
    //         }, {
    //           text: 'View',
    //           handler: () => {
    //             //TODO: Your logic here
    //           }
    //         }]
    //       });
    //       confirmAlert.present();
    //     } else {
    //       //if user NOT using app and push notification comes
    //       //TODO: Your logic on click of push notification directly
    //       console.log("Push notification clicked");
    //     }
    //   });
    //   push.on('error', (e) => {
    //     console.log(e.message);
    //   });
     });
  }
}

