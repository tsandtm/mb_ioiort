import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { PageGoogleMapPage } from '../page-google-map/page-google-map';
import { LoginPage } from '../login-page/login-page';
import { PageChartPage } from '../chart/chart';
import { Map } from '../map/map';

@Component({
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {
  }

  GoToMap = () => {
    this.navCtrl.push(Map)
    // let modal = this.modalCtrl.create(PageGoogleMapPage);
    // modal.present();
  }
  GoToChart = () => {
    // this.navCtrl.push(PageChartPage)
    let modal = this.modalCtrl.create(PageChartPage);
    modal.present();
  }
  Logout = () => {
    this.navCtrl.setRoot(LoginPage)
  }
}
