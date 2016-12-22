import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar,Splashscreen } from 'ionic-native';

import { LoginPage } from '../pages/login-page/login-page';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = LoginPage;

  constructor(platform: Platform, alertCtrl: AlertController) {

    window.onerror = (message, url, line, col, error) => {
      alertCtrl.create({
        title: error.name,
        message: `error message: ${error.message}, message: ${message}, url: ${url}`
      }).present();
    }

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.show();
    });
  }
}
