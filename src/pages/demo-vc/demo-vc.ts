import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the DemoVC page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-demo-vc',
  templateUrl: 'demo-vc.html'
})
export class DemoVCPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello DemoVCPage Page');
  }

}
