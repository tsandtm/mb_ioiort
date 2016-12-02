import { Component } from '@angular/core';
import { NavController ,ToastController } from 'ionic-angular';
import{NewsService} from '../shared/news.service';
import {INews} from  '../shared/news.model'
import { ChiTietTinPage } from '../chitiettin/chitiettin';

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
     rootchitiet: any = ChiTietTinPage;
      arr: any[];
  constructor(public navCtrl: NavController,private _newservice: NewsService,private toastCtrl: ToastController) {}

  ngOnInit(): void {
    this._newservice.tinnoibat(0)
      .then(nw => this.new = nw)
      .catch(errorMessage => {
        console.error(errorMessage.message)
      })
  }
  doInfinite(infiniteScroll) {
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
      })
      .catch(error => {
        alert('Loi' + error.message);
      })
  }
  tinnoibat($event, index) {
     this._newservice.gettinnoibat(index)
      .then(nw => {
        this.arr = nw;
        this.navCtrl.push(ChiTietTinPage, { index, news: this.arr })
      })
      .catch(errorMessage => {
        console.error(errorMessage.message)
      });
    // this.navCtrl.push(ChiTietTinPage,dnew);
  }
  ionViewDidLoad() {
    console.log('Hello TinnoibatPage Page');
  }

}
