import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';

import { NavController, LoadingController, Loading } from 'ionic-angular';

import { LoginService } from './login-page.service';
import { WebsService } from '../shared/website.service';
import { Storage } from '@ionic/storage';
import { IWeb } from '../shared/website.model';
import { HomePage } from '../homepage/homepage';
import { TinnoibatPage } from '../tinnoibat/tinnoibat';
import { Facebook_Login } from './login.facebook';
import { passport, User } from 'passport';
import { FacebookStrategy, Strategy } from 'passport-facebook';
import * as express from 'express';
// var app=express(); sai file này
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
  loader: Loading
  logoState: any = "in";
  cloudState: any = "in";
  loginState: any = "in";
  formState: any = "in";
  username: string;
  password: string;
  save: boolean = false;
  //login facebook
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, private service: LoginService, private storage: Storage) {
  }
  ionViewWillEnter() {
    this.storage.forEach((value, key) => {
      switch (key) {
        case "TaiKhoan": this.username = value; break;
        case "Password": this.password = value; break;
        case "Checkbox": this.save = value; break
        default: break;
      }
      console.log(`${this.username}${this.password}`)

      if (this.username && this.password) {
        this.service.LoginToSever(this.username, this.password)
          .then(result => {
            if (result == 'OK') {
              console.log(result)
              this.service.ShowToastOK("Dang Nhap Thanh Cong", { position: 'top' });

              //login bebinh kiem tra nay dum nha
            this.service.GetLogin(this.username, this.password).then(res=>{this.service.GetCount(res).then(data=>{
            if(data==0)
            {
              this.navCtrl.setRoot(HomePage);
            }
            else{
                this.navCtrl.setRoot(TinnoibatPage);
            }

          })});
          //login bebinh
            }
            else {
              console.log(result)
              this.service.ShowToastOK("Dang nhap ko thanh cong", { position: 'top', duration: 3000 })
              return
            }
          })
          .catch(err => {
          })
      }
    })
  }


  Login = () => {
    this.service.LoginToSever(this.username, this.password)
      .then(result => {
        if (result == 'OK') {
          console.log(result);
   
          this.service.ShowToastOK("Dang Nhap Thanh Cong", { position: 'top' })
          if (this.save) {
            this.storage.set("TaiKhoan", this.username);
            this.storage.set("Password", this.password);
            this.storage.set("Checkbox", this.save);

          //Login Bebinh tu day
          this.service.GetLogin(this.username, this.password).then(res=>{this.service.GetCount(res).then(data=>{
            if(data==0)
            {
              this.navCtrl.setRoot(HomePage);
            }
            else{
                this.navCtrl.setRoot(TinnoibatPage);
            }

          })});
          } else {
            this.service.GetLogin(this.username, this.password).then(res=>{this.service.GetCount(res).then(data=>{
            if(data==0)
            {
              this.navCtrl.setRoot(HomePage);
            }
            else{
                this.navCtrl.setRoot(TinnoibatPage);
            }

          })});
          //Login Bebinh toi day
          }
        }

        else {
          console.log(result)
          this.service.ShowToastOK("Dang nhap ko thanh cong", { position: 'top', duration: 3000 })
          return
        }
      })
      .catch(err => {
      })
  }
  Change = () => {
    console.log(`save: ${this.save}`)
  }
}