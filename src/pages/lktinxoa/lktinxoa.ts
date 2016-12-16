import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NewsService } from '../shared/services/news.service';
import { INews } from '../shared/models/news.model';
import { TinTucPage } from '../tintuc/tintuc';
import { IBienToanCuc, ITinQuanTam } from '../shared/variables'
import { ChiTietTinPage } from '../chitiettin/chitiettin';

/*
  Generated class for the Lktindaxoa page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-lktinxoa',
  templateUrl: 'lktinxoa.html'
})
export class LktinxoaPage {
  new: INews[];
  IDuser: number;
  public start: number = 6;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _newservice: NewsService) {
    this.IDuser = this.navParams.data;
    console.log("id xoa: " + navParams.data);
  }

  ngOnInit(): void {
    this._newservice.lktindaxoa(this.IDuser, 0)
      .then(news => this.new = news)
      .catch(errorMessage => {
        console.log(errorMessage.message)

      })
  }
  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    setTimeout(() => {
      this._newservice.lktindaxoa(this.IDuser, this.start)
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
  goDetail($event, index) {
    console.log("index " + index);
    this.navCtrl.push(ChiTietTinPage, { index, news: this.new });
  }
  boxoa = (news: INews, i) => {
    this._newservice.boxoa(news.IDTinTuc, this.IDuser)
      .then(result => {
        console.log('Da xoa');
        this.new.splice(i, 1);
        this._newservice.ShowToastOK(IBienToanCuc.ShowToast_Xoa, { position: "middle" })

      })
      .catch(error => {
        alert('Loi' + error.message);

      })
  }

  ionViewDidLoad() {
    console.log('Hello LktindaxoaPage Page');
  }

}