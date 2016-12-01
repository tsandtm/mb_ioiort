import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewsService } from '../shared/news.service';
import { INews } from '../shared/news.model'
import{TinTucPage} from '../tintuc/tintuc'
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
 new:INews[];
public start: number = 6;
  constructor(public navCtrl: NavController,private _newservice: NewsService) {}

  ngOnInit():void{
    this._newservice.lktindaxoa(0)
      .then(news=>this.new=news)
      .catch(errorMessage=>{
        console.log(errorMessage.message)
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
  boxoa = (news: INews, i) => {
    this._newservice.boxoa(news.id, news.ArrayQuanTam, news.ArrayDaXoa)
      .then(result => {
        console.log('Da xoa')
        this.new.splice(i, 1)
      })
      .catch(error => {
        alert('Loi' + error.message);
      })
  }
  trove=()=>{
    this.navCtrl.push(TinTucPage)
  }
  ionViewDidLoad() {
    console.log('Hello LktindaxoaPage Page');
  }

}