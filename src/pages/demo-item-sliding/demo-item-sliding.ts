import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonicApp, IonicModule, ItemSliding, ToastController, getSlidingPercent,_optsWidthRightSide } from '../';

/*
  Generated class for the DemoItemSliding page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-demo-item-sliding',
  templateUrl: 'demo-item-sliding.html'
})
export class DemoItemSlidingPage {
  width:number;
  constructor(public navCtrl: NavController) {
    this.width=window.screen.width;
   }

  ionViewDidLoad() {
    console.log('Hello DemoItemSlidingPage Page');
  }

  saveItem(item) {
    console.info('save');
    //item.close();
  }

  logDrag(item) {
    //let percent = item.getSlidingPercent();
    // console.info("thietbi"+this.width);
   // console.info(item.item._elementRef.nativeElement.clientWidth);
    // console.info(item.item);
     //console.info(item);

    // if (percent > 50) {
    //   // positive
    //   console.log('right side' + percent);
    // }
    // else {
    //   // negative
    //   console.log('left side' + percent);
    // }
    // if (Math.abs(percent) > 1) {
    //   console.log('overscroll' + percent);
    // }
  }


  // getSlidingPercent(): number {
  //   let openAmount = this._openAmount;
  //   if (openAmount > 0) {
  //     return openAmount / this._optsWidthRightSide;
  //   } else if (openAmount < 0) {
  //     return openAmount / this._optsWidthLeftSide;
  //   } else {
  //     return 0;
  //   }
  // }

}
