import { Component, OnInit } from '@angular/core';

import { NavController, LoadingController,ModalController ,ToastController } from 'ionic-angular';

import { Platform } from 'ionic-angular';

import { ChiTietTinPage } from '../chitiettin/chitiettin';

import { HomePage } from '../homepage/homepage';
import { NewsService } from '../shared/news.service';
import { INews } from '../shared/news.model'
import { LoginPage } from '../login-page/login-page';
import { LktinxoaPage } from '../lktinxoa/lktinxoa';
import { Storage } from '@ionic/storage';
import { TinquantamPage } from '../tinquantam/tinquantam';
@Component({
  selector: 'page-tintuc',
  templateUrl: 'tintuc.html'
})
export class TinTucPage implements OnInit {
  t: string = "tinmoi";
  listFilter: string = "";
  public start: number = 6;
  rootchitiet: any = ChiTietTinPage;
  tinOffLine: INews[] = [];
  new: INews[];
  arr: any[];
  constructor(private _newservice: NewsService, platform: Platform, public navCtrl: NavController, public loadingCtrl: LoadingController,private storage: Storage,public modalCtrl: ModalController,public toastCtrl: ToastController) {
  }


  trove = () => {
    this.navCtrl.push(HomePage)
  }
  // lktindaxoa=()=>{
  //   this.navCtrl.push(LktinxoaPage)
  // }
  lktindaxoa(characterNum) {

    let modal = this.modalCtrl.create(LktinxoaPage, characterNum);
    modal.present();
  }
  lktinquantam() {

    this.navCtrl.push(TinquantamPage);
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
    const toast = this.toastCtrl.create({
      message: 'Xóa xong rồi ^^!',
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    this._newservice.xoatin(news.id, news.ArrayQuanTam, news.ArrayDaXoa)
      .then(result => {
        this.new.splice(i, 1)
      })
      .catch(error => {
        alert('Loi' + error.message);
      })
      toast.present();
  }
  qt = (news: INews) => {
    const toast = this.toastCtrl.create({
      message: 'Them roi do!!',
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    this._newservice.themtin(news.id, news.ArrayQuanTam, news.ArrayDaXoa)
      .then(result => {
      })
      .catch(error => {
        alert('Loi' + error.message);
      })
      toast.present();
  }

  daxem = (news: INews) => {
    this._newservice.daxem(news.id, news.ArrayQuanTam, news.ArrayDaXoa)
      .then(result => {

      })
      .catch(error => {
        alert('Loi' + error.message);
      })
  }

  goDetail($event, index) {
    this.navCtrl.push(ChiTietTinPage, { index: index, news: this.new })

    // this._newservice.getNew(index)
    //   .then(nw => {
    //     this.arr = nw;
    //   })
    //   .catch(errorMessage => {
    //     console.error(errorMessage.message)
    //   });
    // this.navCtrl.push(ChiTietTinPage,dnew);
  }


}
