import { Component } from '@angular/core';

import { NavController, NavParams, Platform, InfiniteScroll, Refresher } from 'ionic-angular';

import { ChiTietTinPage } from '../chitiettin/chitiettin';

import { HomePage } from '../homepage/homepage';
import { NewsService } from '../shared/services/news.service';
import { INews } from '../shared/models/news.model'
import { LoginPage } from '../login-page/login-page';
import { LktinxoaPage } from '../lktinxoa/lktinxoa';
import { Storage } from '@ionic/storage';
import { TinquantamPage } from '../tinquantam/tinquantam';

import { IBienToanCuc } from '../shared/variables'

@Component({
    selector: 'page-tintuc',
    templateUrl: 'tintuc.html'
})
export class TinTucPage {
    loadingText = IBienToanCuc.Loading_Infinity;
    rootchitiet: any = ChiTietTinPage;
    newstinmoi: INews[];
    news: INews[];
    start: number = IBienToanCuc.Start;
    arr: any[];
    IDuser: number;
    constructor(private _newservice: NewsService, public navParams: NavParams,
        platform: Platform, public navCtrl: NavController, private storage: Storage) {
        this.IDuser = this.navParams.get('id');
        console.log("id user: " + this.IDuser);
    }


    trove = () => {
        this.navCtrl.push(HomePage, { id: this.IDuser })
    }

    lktindaxoa = () => {
        this.navCtrl.push(LktinxoaPage, { id: this.IDuser });
    }
    lktinquantam() {
        this.navCtrl.push(TinquantamPage, { id: this.IDuser });
    }
    dangxuat = () => {
        this.storage.clear()
        this.navCtrl.push(LoginPage)
    }
    doInfinite(infiniteScroll: InfiniteScroll) {
        setTimeout(() => {
            this._newservice.getWebs(this.IDuser, this.start)
                .then(
                (res) => {
                    if (res.length !== 0) {
                        for (let x of res) {
                            x.ChuaXem = true
                            x.Undo = false;
                            this.newstinmoi.push(x);
                        }
                        this.start += IBienToanCuc.Start;
                    }
                })
                .catch(errorMessage => {
                    console.error(errorMessage.message)
                });
            infiniteScroll.complete();
        }, 2000);
    }

    presentLoadingDefault() {
        this._newservice.ShowLoading(IBienToanCuc.Loading_Text)
    }

    ionViewDidLoad() {
        this._newservice.getWebs(this.IDuser, 0)
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

    doRefresh = (refresher: Refresher) => {
        // console.log('DOREFRESH', refresher);
        setTimeout(() => {
            this._newservice.getWebs(this.IDuser, 0, 3)
                .then(nw => {
                    nw.forEach(value => {
                        value.ChuaXem = true;
                        value.Undo = false;
                    })
                    refresher.complete();
                    return Promise.resolve(nw);
                })
                .then((res) => {
                    this.newstinmoi.forEach(x=>{
                        res.forEach((value,index) => {
                            if(x.IDTinTuc === value.IDTinTuc){
                                this.newstinmoi.unshift(value);
                                res.splice(index,1);
                                return;
                            }
                            res.splice(index,1);
                        })
                    })
                })
                .catch(errorMessage => {
                    console.error(errorMessage.message)
                })
        }, 2000);
    }
// !(this.newstinmoi[i].IDTinTuc === res[j].IDTinTuc) ? this.newstinmoi.unshift(res[j]) : console.log(`${res[j].IDTinTuc} Đã có`)
    doPulling(refresher: Refresher) {
        // console.log('DOPULLING', refresher.progress);
    }
}
