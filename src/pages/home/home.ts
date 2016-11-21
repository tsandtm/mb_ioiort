import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
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
