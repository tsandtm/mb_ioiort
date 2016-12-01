import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import{NewsService} from '../shared/news.service'
import {INews} from  '../shared/news.model'
/*
  Generated class for the Tinquantam page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tinquantam',
  templateUrl: 'tinquantam.html'
})
export class TinquantamPage {
  new:INews[];
  constructor(public navCtrl: NavController,private _newsService:NewsService) {}
  ngOnInit():void{
    this._newsService.tinquantam()
      .then(nw=>this.new=nw)
      .catch(errorMessage=>{
      console.error(errorMessage.message)
      })
  }
  del=(news: INews,i) => {
      this._newsService.xoatinquantam(news.id)
        .then(result => {
          console.log('Da xoa')
          this.new.splice(i,1)
        })
        .catch(error => {
          alert('Loi' + error.message);
        })
    }
  ionViewDidLoad() {
    console.log('Hello TinquantamPage Page');
  }

}
