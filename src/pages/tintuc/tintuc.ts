import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';


import { ChiTietTinPage } from '../chitiettin/chitiettin';
import { ChuyenMucPage } from '../chuyenmuc/chuyenmuc';
import { NewsService } from '../shared/services/news.service';
import { INews } from '../shared/models/news.model';


@Component({
  selector: 'page-tintuc',
  templateUrl: 'tintuc.html'
})
export class TinTucPage implements OnInit {

  t: string = "tinmoi";
  isAndroid: boolean = false;
  rootchitiet: any = ChiTietTinPage;
  news: INews[];

  constructor(private _newsService: NewsService, platform: Platform, public navCtrl: NavController) {
    this.isAndroid = platform.is('android');
  }

  ngOnInit(): void {
    this._newsService.getNews()
      .then(nw => this.news = nw)
      .catch(errorMessage => {
        console.error(errorMessage.message)
      });

  }

  goDetail($event, dnew) {
    this.navCtrl.push(ChiTietTinPage, dnew);
  }

  chuyenmuc() {
    this.navCtrl.push(ChuyenMucPage);
  }

}
