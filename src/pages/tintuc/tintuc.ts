import { Component, OnInit } from '@angular/core';

import { NavController, LoadingController, ModalController, ToastController ,NavParams, Platform } from 'ionic-angular';

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
    newstinmoi: INews[];
    newstinnoibat: INews[] = [];
    news: INews[];
    public start: number = 6;
    public start2: number = 6;
    arr: any[];
    IDuser: number;
    constructor(private _newservice: NewsService,public navParams: NavParams ,platform: Platform, public navCtrl: NavController, private storage: Storage) {
        this.IDuser = this.navParams.get('id');        
        console.log("id tin tuc: "+ this.IDuser);


     }


    trove = () => {
        this.navCtrl.push(HomePage,{id:this.IDuser})
    }
    // lktindaxoa=()=>{
    //   this.navCtrl.push(LktinxoaPage)
    // }
    lktindaxoa=()=>{
        this.navCtrl.push(LktinxoaPage,{id:this.IDuser});
    }
    lktinquantam() {
        this.navCtrl.push(TinquantamPage,{id:this.IDuser});
    }
    dangxuat = () => {
        this.storage.clear()
        this.navCtrl.push(LoginPage)
    }
    ngOnInit(): void {
        this._newservice.getWebs(this.IDuser,0)
            .then(nw => {
                nw.forEach(value => {
                    value.ChuaXem = true;
                    value.Undo = false;
                })
                return this.newstinmoi = nw;
            })
            .catch(errorMessage => {
                console.error(errorMessage.message)
            })
    }

    doInfinite(infiniteScroll) {
        setTimeout(() => {
            this._newservice.getWebs(this.IDuser,this.start)
                .then(
                (res) => {
                    if (res.length !== 0) {
                        for (let x of res) {
                            x.ChuaXem = true
                            x.Undo = false;
                            this.newstinmoi.push(x);
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
            this._newservice.tinnoibat(this.IDuser,this.start2)
                .then(
                (res) => {
                    console.log(res)
                    if (res.length !== 0) {
                        for (let x of res) {
                            (x.ArrayDaXem) ? x.ChuaXem = false : x.ChuaXem = true;
                            x.Undo = false;
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

    LoadTinMoi() {
        //Tin Mới hiện thông tin nhưng trang chưa xem
        this._newservice.getWebs(this.IDuser,0)
            .then(nw => {
                nw.forEach(value => {
                    value.ChuaXem = true;
                    value.Undo = false;
                })
                return this.newstinmoi = nw;
            })
            .catch(errorMessage => {
                console.error(errorMessage.message)
            })
    }

    LoadTinNoiBat() {
        // Tin nổi bật hiện tất cả các tin từ tin đã xóa xếp theo thứ tự số lượng xem
        this._newservice.tinnoibat(this.IDuser,0)
            .then(nw => {
                console.log(nw)
                nw.forEach(value => {
                    (value.ArrayDaXem) ? value.ChuaXem = false : value.ChuaXem = true
                    value.Undo = false;
                })
                return this.newstinnoibat = nw;
            })
            .catch(errorMessage => {
                console.error(errorMessage.message)
            })
    }

}
