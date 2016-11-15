import { Component} from '@angular/core';
import { NavController, ToastController  } from 'ionic-angular';
import { LoginsuccessPage} from '../loginsuccess/loginsuccess';
/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login-page.html'
})
export class LoginPage {
  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController) {

  }

  login() {
    let toast = this.toastCtrl.create({
      message: 'User was added successfully',
      duration: 3000
    });
    toast.present();


    this.navCtrl.push(LoginsuccessPage,{
      mystring:'ngoc'
    });
  }

}
