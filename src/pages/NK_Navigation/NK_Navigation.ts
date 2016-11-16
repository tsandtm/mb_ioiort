import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { PageGoogleMapPage } from '../page-google-map/page-google-map';
import { ChartPage } from '../chart/chart';
import { TabsViewPage } from '../tabs-view/tabs-view';
import { LoginPage } from '../login-page/login-page'
@Component({
    templateUrl: `NK_Navigation.html`
})
export class NK_Navigation {
    constructor(public navCtrl: NavController) {
    }

    GoToMap = () => {
        this.navCtrl.push(TabsViewPage)
    }
    GoToChart = () => {
        this.navCtrl.push(TabsViewPage)
    }
    Logout = () => {
        this.navCtrl.setRoot(LoginPage)
    }
}
