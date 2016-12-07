import { Component } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';
import { NewsService } from '../shared/services/news.service';
import { INews } from '../shared/models/news.model'
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
  IDuser:number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _newservice: NewsService, private toastCtrl: ToastController) {
    this.IDuser = this.navParams.get('id');
  }

  ngOnInit(): void {
    this._newservice.tinnoibat(this.IDuser,0)
      .then(nw => this.new = nw)
      .catch(errorMessage => {
        console.error(errorMessage.message)
      })
  }

  del = (news: INews, i) => {
    const toast = this.toastCtrl.create({
      message: 'Đã xóa',
      duration: 200,
      // showCloseButton: true,
      // closeButtonText: 'Ok'
    });

    this._newservice.xoatin(news.id,this.IDuser)
      .then(result => {
        console.log('Da xoa');
        this.new.splice(i, 1);
        toast.present();

      })
      .catch(error => {
        alert('Loi' + error.message);
      })
  }
  qt = (news: INews) => {
    this._newservice.themtin(news.id,this.IDuser)
      .then(result => {
      })
      .catch(error => {
        alert('Loi' + error.message);
      })
  }
   daxem = (news: INews) => {
        this._newservice.daxem(news.id,this.IDuser)
            .then(result => {

            })
            .catch(error => {
                alert('Loi' + error.message);
            })
    }
  tinnoibat($event, index) {
    this.navCtrl.push(ChiTietTinPage, { index, news: this.new });
  }


  ionViewDidLoad() {
    console.log('Hello TinnoibatPage Page');
  }

}
