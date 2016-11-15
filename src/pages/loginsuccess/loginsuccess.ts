import { Component } from '@angular/core';
import { NavController,NavParams, ModalController  } from 'ionic-angular';
import { DemomodalPage} from '../demomodal/demomodal';

/*
  Generated class for the Loginsuccess page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-loginsuccess',
  templateUrl: 'loginsuccess.html'
})
export class LoginsuccessPage {

  buttonText
  constructor(
    public navCtrl: NavController,
    public navPara:NavParams,
    public modalCtrl:ModalController) {
      this.buttonText=this.navPara.get('mystring');
    }



  ionViewDidLoad() {
    console.log('Hello LoginsuccessPage Page');
  }

  thisPop(){
    this.navCtrl.pop();
    
  }

  thisMD(){
    //this.navCtrl.pop();
    let modal = this.modalCtrl.create(DemomodalPage);
    modal.present();
  }

}
