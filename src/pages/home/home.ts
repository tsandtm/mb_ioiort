import { Component } from '@angular/core';
import { NavController, ModalController, Platform, AlertController } from 'ionic-angular';
import { Network } from 'ionic-native';
import { LoginPage } from '../login-page/login-page';
import { PageChartPage } from '../chart/chart';
import { Map } from '../map/map';

@Component({
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    private platform: Platform,
    private Alert: AlertController) {
  }

  GoToMap = () => {
    // this.navCtrl.push(Map)
    let modal = this.modalCtrl.create(Map);
    modal.present();
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
