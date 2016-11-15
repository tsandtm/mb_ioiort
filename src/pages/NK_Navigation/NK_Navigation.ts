import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {TabsViewPage} from '../tabs-view/tabs-view';
@Component({
    templateUrl: `NK_Navigation.html`
})
export class NK_Navigation {
    constructor(public navCtrl: NavController) {
    }

    GoToMap = ()=>{
        this.navCtrl.push(TabsViewPage)
    }
    GoToChart() {

    }
}
