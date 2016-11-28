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
    webs2: IWeb[];
    count: number = 0;
    listFilter: string = '';
    public start: number = 12;
    public click: boolean = false;
    index: number;

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
        setTimeout(() => {
            this._webService.getWebs(this.start)
                .then(
                (res) => {
                    if (res.length !== 0) {
                        for (let x of res)
                            this.webs1.push(x);
                        // this.webs1.concat(res);
                        this.start += 12;
                    }
                })
                .catch(errorMessage => {
                    console.error(errorMessage.message)
                });
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

        let web = this.webs1[index];

        if (!web.chontin) {
            console.log('post :D');
            console.log('id: ' + id);
            this.count++;
            this.userWebSite.createUserWebSite(1, id, new Date())
                .then(() => {
                    console.log('da them');
                    web.chontin = true;
                    this.webs1[index] = web;
                    console.log('chon ' + web.chontin);
                })
                .catch(error => {
                    console.error('Error: ', error);
                })
        } else {
            console.log('delete :D');
            console.log('id: ' + id);
            this.count--;
            this.userWebSite.deleteUserWebSite(1, id)
                .then(() => {
                    console.log('da xoa');
                    web.chontin = false;
                    this.webs1[index] = web;
                    console.log('chon ' + web.chontin);

                })
                .catch(error => {
                    console.error('Error: ', error);
                })
        }
    }

    dschon(): void {
        this.click = !this.click;
        console.log('hien tai 1: ' + this.click);

        if (this.click) {
            console.log('hien tai 2: ' + this.click);
            this._webService.getList_user()
                .then(web => {
                    this.webs1 = web;
                    this.webs2 = this.webs1;
                })
                .catch(errorMessage => {
                    console.error(errorMessage.message)
                });

        } else {
            console.log('hien tai 3: ' + this.click);
            this._webService.getWebs(0)
                .then(web => {
                    this.webs1 = web;
                    // console.log("chieu dai webs1 " + this.webs1.length);
                    for (var i = 0; i < this.webs2.length; i++) {
                        let web2 = this.webs2[i];
                        for (var j = 0; j < this.webs1.length; j++) {
                            let web1 = this.webs1[j];
                            if (web1.IDDanhMucSite == web2.IDDanhMucSite) {
                                // console.log("web1.IDDanhMucSite " + web1.IDDanhMucSite);
                                // console.log("web2.IDDanhMucSite " + web2.IDDanhMucSite);
                                // console.log("mảng thứ " + j + "bị đổi");
                                web1.chontin = true;
                                this.webs1[j] = web1;
                            }
                        }
                    }
                })
                .catch(errorMessage => {
                    console.error(errorMessage.message)
                });



        }
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
