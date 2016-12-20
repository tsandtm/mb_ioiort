import { Component, ViewChild } from '@angular/core';
import { Platform, AlertController, Nav } from 'ionic-angular';
import { StatusBar, Push, Splashscreen } from 'ionic-native';

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
  rootPage: any;

  constructor(platform: Platform, public alertCtrl: AlertController, private service: LoginService,
    private storage: Storage) {


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

    this.SetRootPage();
  }


  SetRootPage = () => {
    this.storage.forEach((value, key) => {
      switch (key) {
        case "TaiKhoan": this.username = value; break;
        case "Password": this.password = value; break;
        default:
      }
      console.log(`${this.username}${this.password}`)
      if (this.username && this.password)
        this.service.LoginToSever(this.username, this.password)
          .then(result => {
            if (result !== -1) {
              // this.IDuser = result._body;
              // console.log("id user:" + this.IDuser);
              this.storage.set("IDUser",result)
              this.rootPage = TinTucPage
              return;
            }
            // this.navCtrl.push(HomePage, { id: this.IDuser });
            else {
              console.log(result)
              this.rootPage = LoginPage;
              return;
            }
          })
          .catch(err => {
            console.log(err)
          })
    })
  }
}

