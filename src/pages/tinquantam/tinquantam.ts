import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NewsService } from '../shared/services/news.service'
import { INews } from '../shared/models/news.model'
import { ChiTietTinPage } from '../chitiettin/chitiettin';
import { IBienToanCuc,ITinQuanTam } from '../shared/variables'

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
  Dislike = ITinQuanTam.Button_Dislike
  Title = ITinQuanTam.Title;

  start: number = IBienToanCuc.Start;
  new: INews[];
  IDuser: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _newsService: NewsService) {
    this.IDuser = this.navParams.get('id');
  }
  ngOnInit(): void {
    this._newsService.tinquantam(this.IDuser, 0)
      .then(nw => this.new = nw)
      .catch(errorMessage => {
        console.error(errorMessage.message)
      })
  }
  del = (news: INews, i) => {

    this._newsService.xoatinquantam(news.id, this.IDuser)
      .then(result => {
        console.log('Da xoa');
        this.new.splice(i, 1);
        this._newsService.ShowToastOK(IBienToanCuc.ShowToast_Xoa, { position: "middle" })

      })
      .catch(error => {
        console.log('Loi' + error.message);
      })
  }

  daxem = (news: INews) => {
    this._newsService.daxem(news.id, this.IDuser)
      .then(result => {

      })
      .catch(error => {
        console.log('Loi' + error.message);
      })
  }

  ionViewDidLoad() {
    console.log('Hello TinquantamPage Page');
  }
  doInfinite(infiniteScroll) {
    setTimeout(() => {
      this._newsService.tinquantam(this.IDuser, this.start)
        .then(
        (res) => {
          if (res.length !== 0) {
            for (let x of res)
              this.new.push(x);
            this.start = this.start*2;
          }
        })
        .catch(errorMessage => {
          console.error(errorMessage.message)

        });
      infiniteScroll.complete();
    }, 2000);
  }


  goDetail($event, index) {
    console.log("index " + index);
    this.navCtrl.push(ChiTietTinPage, { index, news: this.new });
  }

}
