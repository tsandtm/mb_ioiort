import { Component, Input } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';

import { NewsService } from '../shared/services/news.service';
import { INews } from '../shared/models/news.model'
import { ChiTietTinPage } from '../chitiettin/chitiettin';

/*
  Generated class for the Tinnoibat page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-tinnoibat',
    templateUrl: 'tinnoibat.html'
})
export class TinnoibatPage {
    @Input()
    newtinnoibat: INews[];
    constructor(public navCtrl: NavController, private _newservice: NewsService) { }

    ngOnInit(): void {
        //
    }

    // del = (news: INews, i) => {
    //     this._newservice.xoatin(news.id)
    //         .then(result => {
    //             console.log('Da xoa')
    //             this.newtinnoibat.splice(i, 1)
    //         })
    //         .catch(error => {
    //             alert('Loi' + error.message);
    //         })
    // }
    // qt = (news: INews) => {
    //     this._newservice.themtin(news.id)
    //         .then(result => {
    //         })
    //         .catch(error => {
    //             alert('Loi' + error.message);
    //         })
    // }
    // tinnoibat($event, index) {
    //     this.newtinnoibat[index].ChuaXem = false;
    //     this.navCtrl.push(ChiTietTinPage, { index, news: this.newtinnoibat });
    // }

    // daxem = (news: INews) => {
    //     this._newservice.daxem(news.id)
    //         .then(result => {

    //         })
    //         .catch(error => {
    //             alert('Loi' + error.message);
    //         })
    // }

    ionViewDidLoad() {
        console.log('Hello TinnoibatPage Page');
    }


}
