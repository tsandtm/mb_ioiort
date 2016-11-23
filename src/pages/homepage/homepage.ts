import { Component } from '@angular/core';

import { NavController, LoadingController } from 'ionic-angular';
import { TinTucPage } from '../tintuc/tintuc';
import { WebsService } from '../shared/website.service';
import { UserWebService } from '../shared/user_website.service';
import { IWeb } from '../shared/website.model';
import { HomeFilterPipe } from './homepage-filter.pipe'


@Component({
    selector: 'page-home',
    templateUrl: 'homepage.html'
})
export class HomePage {
    // webs: IWeb[];
    webs1: IWeb[];
    count: number = 0;
    listFilter: string = '';
    public start: number = 6;

    constructor(private _webService: WebsService, public navCtrl: NavController, public loadingCtrl: LoadingController, private userWebSite: UserWebService) {
    }
    ngOnInit(): void {
        // this._webService.getListWebs() //lấy danh sách web dùng duyệt tin
        //     .then(web => this.webs = web)
        //     .catch(errorMessage => {
        //         console.error(errorMessage.message)
        //     });
        this._webService.getWebs(0) //lấy danh sách web ban đầu
            .then(web => this.webs1 = web)
            .catch(errorMessage => {
                console.error(errorMessage.message)
            });
    }

    doInfinite(infiniteScroll) {
        console.log('Begin async operation');
        setTimeout(() => {
            this._webService.getWebs(this.start)
                .then(
                (res) => {
                    if (res.length !== 0) {
                        for (let x of res)
                            this.webs1.push(x);
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


    nextToPage() {
        let loader = this.loadingCtrl.create({
            content: "Vui lòng chờ...",
            duration: 500
        })
        loader.present();
        this.navCtrl.push(TinTucPage);
    }

    chon(id: number, index: number) {
        console.log('I run :D');
        console.log('id: ' + id);
        this.count++;
        this.userWebSite.createUserWebSite(1, id, new Date())
            .then(() => {
                console.log('da them');

            })
            .catch(error => {
                console.error('Error: ', error);
            })
    }

    // chon(id: number, index) {

    //     let web = this.webs1[index]; // web mặc định là false
    //     if (web.show) {
    //         console.log('Show: ' + web.show);
    //         this.count--;
    //         web.show = false;
    //         this.webs1[index] = web;
    //         this._webService.updateShow_delete(id)
    //             .then(t => {
    //                 if (t) {
    //                     console.log('Show: ' + web.show);
    //                 }
    //             })
    //             .catch(errorMessage => {
    //                 console.error(errorMessage.message)
    //             });
    //     } else {
    //         console.log('Show: ' + web.show);
    //         this.count++;
    //         web.show = true;
    //         this.webs1[index] = web;

    //         this._webService.updateShow_add(id)
    //             .then(t => {
    //                 if (t.show) {
    //                     console.log('Show: ' + t.show);
    //                 }
    //             })
    //             .catch(errorMessage => {
    //                 console.error(errorMessage.message)
    //             });
    //     }

    //}

}
