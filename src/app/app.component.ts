import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { LoginPage } from '../pages/login-page/login-page';
import { HomePage } from '../pages/homepage/homepage';
@Component({
  selector: 'my-app',
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = HomePage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      // Splashscreen.hide();
    });
  }


}
