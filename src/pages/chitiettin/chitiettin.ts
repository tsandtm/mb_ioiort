import { Component, Input, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { NewsService } from '../shared/services/news.service';
import { INews } from '../shared/models/news.model';

@Component({
  selector: 'page-chitiettin',
  templateUrl: 'chitiettin.html'
})
export class ChiTietTinPage implements OnInit {

  dnew: INews;

  constructor(private _newsService: NewsService, public navCtrl: NavController, public navParams: NavParams) {
    this.dnew = this.navParams.data;
    console.log("**params : ", this.navParams);
  }
  ngOnInit() {

  }

  goBack() {
    this.navCtrl.pop();
  }

}
