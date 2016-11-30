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
    public start: number = 6;
  constructor(public navCtrl: NavController,private _newservice: NewsService,private toastCtrl: ToastController) {}

  ngOnInit(): void {
    this._newservice.tinnoibat(0)
      .then(nw => this.new = nw)
      .catch(errorMessage => {
        console.error(errorMessage.message)
      })
  }
  doInfinite(infiniteScroll) {
      console.log('Begin async operation');
      setTimeout(() => {
        this._newservice.tinnoibat(this.start)
          .then(
          (res) => {
            if (res.length !== 0) {
              for (let x of res)
                this.new.push(x);
              // this.webs1.concat(res);
              this.start += 6;
            }
          })
          .catch(errorMessage => {
            console.error(errorMessage.message)
          });
        console.log('Async operation has ended');
        infiniteScroll.complete();
      }, 2000);
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

  ionViewDidLoad() {
    console.log('Hello TinnoibatPage Page');
  }

}
