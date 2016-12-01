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
  listFilter: string = "";
  public start: number = 6;
  rootchitiet: any = ChiTietTinPage;
  tinOffLine: INews[] = [];
  new: INews[];
  arr: any[];
  constructor(private _newservice: NewsService, platform: Platform, public navCtrl: NavController, public loadingCtrl: LoadingController,private storage: Storage) {
    this.isAndroid = platform.is('android', );
  }


  trove = () => {
    this.navCtrl.push(HomePage)
  }
  dangxuat = () => {


    this.storage.clear()
    this.navCtrl.push(LoginPage)
  }
  ngOnInit(): void {
    this._newservice.getWebs(0)
      .then(nw => this.new = nw)
      .catch(errorMessage => {
        console.error(errorMessage.message)
      })
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    setTimeout(() => {
      this._newservice.getWebs(this.start)
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

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });

    loading.present();
  }
  del = (news: INews, i) => {
    this._newservice.xoatin(news.id, news.ArrayQuanTam, news.ArrayDaXoa)
      .then(result => {
        console.log('Da xoa')
        this.new.splice(i, 1)
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

  daxem = (news: INews) => {
    this._newservice.daxem(news.id, news.ArrayQuanTam, news.ArrayDaXoa)
      .then(result => {
        alert("Da xem");
      })
      .catch(error => {
        alert('Loi' + error.message);
      })
  }

  goDetail($event, index) {
    this._newservice.getNew(0)
      .then(nw => {
        this.arr = nw;
        this.navCtrl.push(ChiTietTinPage, { index, news: this.arr })
      })
      .catch(errorMessage => {
        console.error(errorMessage.message)
      });
    // this.navCtrl.push(ChiTietTinPage,dnew);
  }
  

}
