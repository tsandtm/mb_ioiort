import { Component, OnInit } from '@angular/core';

import { NavController, LoadingController, ModalController, ToastController } from 'ionic-angular';

import { Platform } from 'ionic-angular';

import { ChiTietTinPage } from '../chitiettin/chitiettin';

import { HomePage } from '../homepage/homepage';
import { NewsService } from '../shared/services/news.service';
import { INews } from '../shared/models/news.model'
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
    rootchitiet: any = ChiTietTinPage;
    news: INews[];
    newstinnoibat: INews[] = [];
    public start: number = 6;
    public start2: number = 6;
    arr: any[];
    constructor(private _newservice: NewsService, platform: Platform, public navCtrl: NavController, public loadingCtrl: LoadingController, private storage: Storage, public modalCtrl: ModalController, public toastCtrl: ToastController) {
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
        //Tin Mới hiện thông tin nhưng trang chưa xem
        this._newservice.getWebs(0)
            .then(nw => {
                nw.forEach(value => {
                    value.ChuaXem = true;
                })
                return this.news = nw;
            })
            .catch(errorMessage => {
                console.error(errorMessage.message)
            })

        // Tin nổi bật hiện tất cả các tin từ tin đã xóa xếp theo thứ tự số lượng xem
        this._newservice.tinnoibat(0)
            .then(nw => {
                console.log(nw)
                nw.forEach(value => {

                    (value.ArrayDaXem) ? value.ChuaXem = false : value.ChuaXem = true
                })
                return this.newstinnoibat = nw;
            })
            .catch(errorMessage => {
                console.error(errorMessage.message)
            })
    }

    doInfinite(infiniteScroll) {
        setTimeout(() => {
            this._newservice.getWebs(this.start)
                .then(
                (res) => {
                    if (res.length !== 0) {
                        for (let x of res) {
                            this.news.push(x);
                            x.ChuaXem = true
                        }
                        this.start += 6;
                    }
                })
                .catch(errorMessage => {
                    console.error(errorMessage.message)
                });
            infiniteScroll.complete();
        }, 2000);
    }

    doInfinite2 = (infiniteScroll) => {
        setTimeout(() => {
            this._newservice.tinnoibat(this.start2)
                .then(
                (res) => {
                    console.log(res)
                    if (res.length !== 0) {
                        for (let x of res) {
                            (x.ArrayDaXem) ? x.ChuaXem = false : x.ChuaXem = true;
                            this.newstinnoibat.push(x);
                        }
                        this.start2 += 6;
                    }
                })
                .catch(errorMessage => {
                    console.error(errorMessage.message)
                });
            infiniteScroll.complete();
        }, 2000);
    }

    presentLoadingDefault() {
        this._newservice.ShowLoading('Loading...!')
    }

    /**
     * Xóa
     */
    del = (news: INews, i) => {
        this._newservice.xoatin(news.id)
            .then(result => {
                console.log('Da xoa')
                this.news.splice(i, 1)
                this._newservice.ShowToastOK("Đã xóa xong")
            })
            .catch(error => {
                alert('Loi' + error.message);
            })
    }

    qt = (news: INews) => {
        
        this._newservice.themtin(news.id)
            .then(result => {
                this._newservice.ShowToastOK(`Đã thêm`)
            })
            .catch(error => {
                alert('Loi' + error.message);
            })
    }

    daxem = (news: INews) => {
        this._newservice.daxem(news.id)
            .then(result => {
            })
            .catch(error => {
                alert('Loi' + error.message);
            })
    }

    goDetail($event, index) {
        console.log("index " + index);
        this.news[index].ChuaXem = false;
        this.navCtrl.push(ChiTietTinPage, { index, news: this.news });
    }

}
