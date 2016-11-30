import { Component } from '@angular/core';
import { NavController ,ToastController } from 'ionic-angular';
import{NewsService} from '../shared/news.service';
import {INews} from  '../shared/news.model'
/*
  Generated class for the Tinnoibat page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tinnoibat',
  templateUrl: 'tinnoibat.html'
})
export class TinnoibatPage {
    new: INews[];
    public start: number = 2;
  constructor(public navCtrl: NavController,private _newservice: NewsService,private toastCtrl: ToastController) {}

  ngOnInit(): void {
    this._newservice.tinnoibat()
      .then(nw => this.new = nw)
      .catch(errorMessage => {
        console.error(errorMessage.message)
      })
  }

 del=(news: INews,i) => {
    this._newservice.xoatin(news.id, news.ArrayQuanTam, news.ArrayDaXoa)
      .then(result => {
        console.log('Da xoa')
        this.new.splice(i,1)
      })
      .catch(error => {
        alert('Loi' + error.message);
      })
  }
    qt = (news: INews) => {
    this._newservice.themtin(news.id, news.ArrayQuanTam, news.ArrayDaXoa)
      .then(result => {
        alert("Da them");
      })
      .catch(error => {
        alert('Loi' + error.message);
      })
  }
  
   Xoa(n: INews,index) {
    this.expandAction(n, 'downloading', 'Login was downloaded.');
  }

   expandAction(n: INews, action: string, text: string) {
    // TODO item.setElementClass(action, true);

    setTimeout(() => {
      const toast = this.toastCtrl.create({
        message: text
      });
      toast.present();
      // TODO item.setElementClass(action, false)

      setTimeout(() => toast.dismiss(), 2000);
    }, 1500);
  }

  ionViewDidLoad() {
    console.log('Hello TinnoibatPage Page');
  }

}
