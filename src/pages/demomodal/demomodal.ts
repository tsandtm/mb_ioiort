import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Demomodal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-demomodal',
  templateUrl: 'demomodal.html'
})
export class DemomodalPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello DemomodalPage Page');
  }

}
