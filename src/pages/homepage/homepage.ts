import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';


import { TinTucPage } from '../tintuc/tintuc';
import { WebsService } from '../shared/services/website.service';
import { IWeb } from '../shared/models/website.model';


@Component({
    selector: 'page-home',
    templateUrl: 'homepage.html'
})
export class HomePage {
    webs1: IWeb[];
    count: number = 0;
    listFilter: string = '';
    public start: number = 0;

    constructor(private _webService: WebsService, public navCtrl: NavController, public loadingCtrl: LoadingController) {
    }

    ngOnInit(): void {
      // lay danh sach ban dau
        this._webService.getWebs(0)
            .then(web => this.webs1 = web)
            .catch(errorMessage => {
                console.error(errorMessage.message)
            });
    }

    doInfinite(infiniteScroll) {
        console.log('Begin async operation');
        this.start+=6;
        setTimeout(() => {
            this._webService.getWebs(this.start)
                .then(
                (res) => {
                    for (let x of res) {
                        this.webs1.push(x);
                    }
                })
                .catch(errorMessage => {
                    console.error(errorMessage.message)
                });
            console.log('Async operation has ended');
            infiniteScroll.complete();
        }, 2000);
    }


    nextToPage() {
        let loader = this.loadingCtrl.create({
            content: "Vui lòng chờ...",
            duration: 500
        })
        loader.present();
        this.navCtrl.push(TinTucPage);
    }

}
