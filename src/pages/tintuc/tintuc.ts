import { Component, OnInit } from '@angular/core';

import { NavController, LoadingController } from 'ionic-angular';

import { Platform } from 'ionic-angular';

import { ChiTietTinPage } from '../chitiettin/chitiettin';

import { HomePage } from '../homepage/homepage';
import { NewsService } from '../shared/news.service';
import { INews } from '../shared/news.model'
import { LoginPage } from '../login-page/login-page';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-tintuc',
  templateUrl: 'tintuc.html'
})
export class TinTucPage implements OnInit {
  t: string = "tinmoi";
  isAndroid: boolean = false;
  rootchitiet: any = ChiTietTinPage;
  news: INews[];
  public start: number = 6;
  arr: any[];


  constructor(private _newsService: NewsService, platform: Platform, public navCtrl: NavController, public loadingCtrl: LoadingController, private storage: Storage) {
    this.isAndroid = platform.is('android');
  }

  trove = () => {
    this.navCtrl.push(HomePage)
  }
  dangxuat = () => {


    this.storage.clear()
    this.navCtrl.push(LoginPage)
  }
  ngOnInit(): void {
    this._newsService.getWebs(0)
      .then(nw => this.news = nw)
      .catch(errorMessage => {
        console.error(errorMessage.message)
      })
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      this._newsService.getWebs(this.start)
        .then(
        (res) => {
          if (res.length !== 0) {
            for (let x of res)
              this.news.push(x);
            this.start += 6;
          }
        })
        .catch(errorMessage => {
          console.error(errorMessage.message)
        });
      infiniteScroll.complete();
    }, 2000);
  }

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });

    loading.present();
  }
  del = (news: INews, i) => {
    this._newsService.xoatin(news.id, news.ArrayQuanTam, news.ArrayDaXoa)
      .then(result => {
        console.log('Da xoa')
        this.news.splice(i, 1)
      })
      .catch(error => {
        alert('Loi' + error.message);
      })
  }
  qt = (news: INews) => {
    this._newsService.themtin(news.id, news.ArrayQuanTam, news.ArrayDaXoa)
      .then(result => {
      })
      .catch(error => {
        alert('Loi' + error.message);
      })
  }

  daxem = (news: INews) => {
    this._newsService.daxem(news.id, news.ArrayQuanTam, news.ArrayDaXoa)
      .then(result => {
        alert("Da xem");
      })
      .catch(error => {
        alert('Loi' + error.message);
      })
  }

  goDetail($event, index) {
    console.log("index " + index);
    this._newsService.getNew(index)
      .then(nw => {
        this.arr = nw;
        this.navCtrl.push(ChiTietTinPage, { index, news: this.arr });
      })
      .catch(errorMessage => {
        console.error(errorMessage.message)
      });
    // this.navCtrl.push(ChiTietTinPage,dnew);
  }

}
