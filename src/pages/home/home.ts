import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { PageGoogleMapPage } from '../page-google-map/page-google-map';
import { LoginPage } from '../login-page/login-page';
import {PageChartPage} from '../chart/chart';
@Component({
    templateUrl: 'home.html'
})
export class HomePage {
    constructor(public navCtrl: NavController) {
    }

    GoToMap = () => {
        this.navCtrl.push(PageGoogleMapPage)
    }
    GoToChart = () => {
        this.navCtrl.push(PageChartPage)
    }
    Logout = () => {
        this.navCtrl.setRoot(LoginPage)
    }
}
