import { Component, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Platform } from 'ionic-angular';

import { ChiTietTinPage } from '../chitiettin/chitiettin';

import { ChuyenMucPage } from '../chuyenmuc/chuyenmuc';
import { NewsService } from '../shared/news.service';
import { INews } from '../shared/news.model'


@Component({
    selector: 'page-tintuc',
    templateUrl: 'tintuc.html'
})
export class TinTucPage implements OnInit {

    t: string = "tinmoi";
    isAndroid: boolean = false;
    rootchitiet: any = ChiTietTinPage;
    news: INews[];
    public start: number = 4;
    arr:any[];


    constructor(private _newsService: NewsService, platform: Platform, public navCtrl: NavController) {
        this.isAndroid = platform.is('android');
    }

    ngOnInit(): void {
        this._newsService.getNews(0)
            .then(nw => this.news = nw)
            .catch(errorMessage => {
                console.error(errorMessage.message)
            });

    }
    doInfinite(infiniteScroll) {
        setTimeout(() => {
            this._newsService.getNews(this.start)
                .then(
                (res) => {
                    if (res.length !== 0) {
                        for (let x of res)
                            this.news.push(x);
                        // this.webs1.concat(res);
                        this.start += 4;
                    }
                })
                .catch(errorMessage => {
                    console.error(errorMessage.message)
                });
            infiniteScroll.complete();
        }, 2000);
    }



    goDetail($event, index) {

        this.navCtrl.push(ChiTietTinPage, { index, news: this.news })
        // this.navCtrl.push(ChiTietTinPage,dnew);
    }

    chuyenmuc() {
        this.navCtrl.push(ChuyenMucPage);
    }

}
