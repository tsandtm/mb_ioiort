import { Component, OnInit } from '@angular/core';

import { NavController, LoadingController } from 'ionic-angular';

import { Platform } from 'ionic-angular';

import { ChiTietTinPage } from '../chitiettin/chitiettin';
import { TinnoibatPage } from '../tinnoibat/tinnoibat';
import { HomePage } from '../homepage/homepage';
import { ChuyenMucPage } from '../chuyenmuc/chuyenmuc';
import { NewsService } from '../shared/news.service';
import { INews } from '../shared/news.model'


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

  constructor(private _newservice: NewsService, platform: Platform, public navCtrl: NavController, public loadingCtrl: LoadingController) {
    this.isAndroid = platform.is('android', );
  }
  page3 = ($event, n) => {
    this.presentLoadingDefault()
    setTimeout(() => {
      this.navCtrl.push(ChiTietTinPage, n)

    }, 500);
  }
  trove = () => {
    this.navCtrl.push(HomePage)
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
  // xoa(id: number) {
  //   this._newservice.xoaTinTuc(id)
  //     .then(t => {
  //       if (t) {
  //         return this.navCtrl.push(AboutPage)
  //       }
  //     })
  //     .catch(error => {
  //       console.error('Error: ', error);
  //     });
  // }

  // quanTam = (news: INews) => {
  //   this.tinOffLine.push(news);
  // }

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
  // phuchoi = (news: INews) => {
  //   this._newservice.phuchoi(news.id, news.ArrayQuanTam, news.ArrayDaXoa)
  //     .then(result => {
  //       console.log('Da phuc hoi')
  //     })
  //     .catch(error => {
  //       alert('Loi' + error.message);
  //     })
  // }
  qt = (news: INews) => {
    this._newservice.themtin(news.id, news.ArrayQuanTam, news.ArrayDaXoa)
      .then(result => {
        alert("Da them");
        this.tinOffLine.push(news);
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

  //  this._newservice.updateTinTuc(news.id,idUser).
  //             then(result => {
  //               this.tinOffLine.push(news);
  //             })
  //             .catch(error => {
  //               alert('Loi: ' + error.mesage)
  //             })
  //   }
}
