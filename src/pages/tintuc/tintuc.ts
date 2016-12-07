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
    news: INews[];
    public start: number = 6;
    arr: any[];
    IDuser: number;
    constructor(private _newservice: NewsService,public navParams: NavParams ,platform: Platform, public navCtrl: NavController, public loadingCtrl: LoadingController, private storage: Storage, public modalCtrl: ModalController, public toastCtrl: ToastController) {
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
            .then(nw => this.news = nw)
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
                        for (let x of res)
                            this.news.push(x);
                        this.start += 6;
                    }
                })
                .catch(errorMessage => {
                    console.error(errorMessage.message)
                });
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
            message: 'Đã xóa',
            duration: 200,
        });
        this._newservice.xoatin(news.id,this.IDuser)
            .then(result => {
                console.log('Da xoa');
                this.news.splice(i, 1);
                toast.present();
            })
            .catch(error => {
                alert('Loi' + error.message);
            })

    }

    qt = (news: INews) => {
        const toast = this.toastCtrl.create({
            message: 'Them roi do!!',
            showCloseButton: true,
            closeButtonText: 'Ok'
        });
        this._newservice.themtin(news.id,this.IDuser)
            .then(result => {
            })
            .catch(error => {
                alert('Loi' + error.message);
            })
        toast.present();
    }

    daxem = (news: INews) => {
        this._newservice.daxem(news.id,this.IDuser)
            .then(result => {

            })
            .catch(error => {
                alert('Loi' + error.message);
            })
    }

    goDetail($event, index) {
        console.log("index " + index);
        // this._newservice.getNew(index)
        //   .then(nw => {
        //     this.arr = nw;
        //     this.navCtrl.push(ChiTietTinPage, { index, news: this.arr });
        //   })
        //   .catch(errorMessage => {
        //     console.error(errorMessage.message)
        //   });
        this.navCtrl.push(ChiTietTinPage, { index, news: this.news });
    }
 
  
}
