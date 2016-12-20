import { Component } from '@angular/core';
import { NavController, NavParams, Platform, InfiniteScroll, Refresher } from 'ionic-angular';
import { ChiTietTinPage } from '../chitiettin/chitiettin';
import { HomePage } from '../homepage/homepage';
import { NewsService } from '../shared/services/news.service';
import { INews } from '../shared/models/news.model'
import { LoginPage } from '../login-page/login-page';
import { Storage } from '@ionic/storage';
import { LichSuPage } from '../lichsu/lichsu';

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
    }

    ionViewDidLoad() {
        if (this.IDuser === undefined) {
            this.storage.get("IDUser")
                .then(res => {
                    this._newservice.getWebs(res, 0)
                        .then(nw => {
                            nw.forEach(value => {
                                value.Undo = false;
                            })

                            return this.newstinmoi = nw;
                        })
                        .catch(errorMessage => {
                            console.error(errorMessage.message)
                        })
                })
                .catch(err => this._newservice.handleError)
        }
        else {
            this._newservice.getWebs(this.IDuser, 0)
                .then(nw => {
                    nw.forEach(value => {
                        value.Undo = false;
                    })

                    return this.newstinmoi = nw;
                })
                .catch(errorMessage => {
                    console.error(errorMessage.message)
                })
        }
    }


    trove = () => {
        this.navCtrl.push(HomePage, { id: this.IDuser })
    }

    history = () => {
        this.navCtrl.push(LichSuPage, { id: this.IDuser });
    }

    dangxuat = () => {
        this.storage.clear()
        this.navCtrl.push(LoginPage)
    }

    doInfinite(infiniteScroll: InfiniteScroll) {
        setTimeout(() => {
            this._newservice.getWebs(this.IDuser, this.start)
                .then((result) => {
                    result.some((value, index) => {
                        let a = this.newstinmoi.find(x => +x.IDTinTuc === +value.IDTinTuc);
                        if (a) {
                            result.splice(index, 1)
                        } else {
                            value.Undo = false;
                            this.newstinmoi.push(value)
                        }

                        if (result.length === 0) {
                            return true
                        } else {
                            return false
                        }

                    })
                    this.start += IBienToanCuc.Start;
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


    doRefresh = (refresher: Refresher) => {
        // console.log('DOREFRESH', refresher);
        setTimeout(() => {
            this._newservice.getWebs(this.IDuser, 0, 3)
                .then(nw => {
                    nw.forEach(value => {
                        value.Undo = false;
                    })
                    refresher.complete();
                    return Promise.resolve(nw);
                })
                .then((result) => {
                    result.some((value, index) => {
                        let a = this.newstinmoi.find(x => +x.IDTinTuc === +value.IDTinTuc);
                        if (a) {
                            result.splice(index, 1)
                        } else {
                            value.Undo = false;
                            this.newstinmoi.push(value)
                        }
                        if (result.length === 0) {
                            return true
                        } else {
                            return false
                        }
                    })
                })
                .catch(errorMessage => {
                    console.error(errorMessage.message)
                })
        }, 1000);
    }
    // !(this.newstinmoi[i].IDTinTuc === res[j].IDTinTuc) ? this.newstinmoi.unshift(res[j]) : console.log(`${res[j].IDTinTuc} Đã có`)
    doPulling(refresher: Refresher) {
        // console.log('DOPULLING', refresher.progress);
    }
}
