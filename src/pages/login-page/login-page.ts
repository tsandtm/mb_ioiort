import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { NavController, LoadingController,Loading } from 'ionic-angular';
import { Service } from '../share/variables';
import { HomePage } from '../home/home';
/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login-page.html',

  animations: [

    //For the logo
    trigger('flyInBottomSlow', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({ transform: 'translate3d(0,2000px,0' }),
        animate('2000ms ease-in-out')
      ])
    ]),

    //For the background detail
    trigger('flyInBottomFast', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({ transform: 'translate3d(0,2000px,0)' }),
        animate('1000ms ease-in-out')
      ])
    ]),
    //For the login form
    trigger('bounceInBottom', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        animate('2000ms 200ms ease-in', keyframes([
          style({ transform: 'translate3d(0,2000px,0)', offset: 0 }),
          style({ transform: 'translate3d(0,-20px,0)', offset: 0.9 }),
          style({ transform: 'translate3d(0,0,0)', offset: 1 })
        ]))
      ])
    ]),

    //For login button
    trigger('fadeIn', [
      state('in', style({
        opacity: 1
      })),
      transition('void => *', [
        style({ opacity: 0 }),
        animate('1000ms 2000ms ease-in')
      ])
    ])
  ]
})
export class LoginPage {
  loader:Loading
  logoState: any = "in";
  cloudState: any = "in";
  loginState: any = "in";
  formState: any = "in";
  // username + password
  username: string;
  password: string;
  constructor(public navCtrl: NavController, private service: Service, public loadingCtrl: LoadingController) {
  }

  Login = () => {
    this.presentLoading()
    if (this.username.toString().length == 0 || this.password.toString().length == 0) {
      this.service.ShowToastOK("Không được để trống")
    } else {
      this.service.LoginToSever(this.username, this.password, `POST_Login`)
        .then(data => {
          console.log('Data:' + data)
          if (data) {
            this.service.ShowToastOK("Đăng nhập thành công")
            return this.navCtrl.push(HomePage)
          } else {
            this.loader.dismiss();
            return this.service.ShowToastOK("Đăng nhập không thành công")
          }
        })
    }

  }
  presentLoading() {
    this.loader = this.loadingCtrl.create(
      {
        content: "Please wait...",
        dismissOnPageChange: true
      }
    );
    this.loader.present();
  }
}
