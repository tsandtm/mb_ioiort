import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { NewsService } from '../shared/services/news.service';
import { INews } from '../shared/models/news.model'
import { TinTucPage } from '../tintuc/tintuc'
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
  public start: number = 6;

  IDuser: number;
  constructor(public navCtrl: NavController, public navParams: NavParams, private _newservice: NewsService) {
    this.IDuser = this.navParams.get('id');

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

  boxoa = (news: INews, i) => {
    this._newservice.boxoa(news.id, this.IDuser)
      .then(result => {
        console.log('Da xoa');
        this.new.splice(i, 1);
      })
      .catch(error => {
        alert('Loi' + error.message);
      })
  }


  trove = () => {
    this.navCtrl.push(TinTucPage)
  }
  ionViewDidLoad() {
    console.log('Hello LktindaxoaPage Page');
  }

}