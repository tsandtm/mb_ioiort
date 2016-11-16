import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoginPage} from '../login-page/login-page';
import { NK_Navigation } from '../NK_Navigation/NK_Navigation';

/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    this.navCtrl.push(NK_Navigation)
  }

}
