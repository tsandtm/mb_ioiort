import { Component, OnInit } from '@angular/core';
import { NewsService } from '../shared/news.service';
import { INews } from '../shared/news.model'


import { NavController, NavParams } from 'ionic-angular';

@Component({
    selector: 'page-chitiettin',
    templateUrl: 'chitiettin.html'
})
export class ChiTietTinPage implements OnInit {

    dnew: INews;

    constructor(private _newsService: NewsService, public navCtrl: NavController, public navParams: NavParams) {
        this.dnew = this.navParams.data;
        console.log("**params : ", this.navParams);
    }
    ngOnInit() {
        // this._route.params.forEach((params: Params) => {
        //     console.log(params["id"])
        //     let id = +params["id"];
        //     this.getNew(id);
        // })
    }
    //   getNew(id:number){
    //      this._newsService.getNew(id)
    //                 .then(news => this.new = news)
    //                 .catch(errorMessage => {
    //                     console.error(errorMessage.message)
    //                 })
    //   }

    goBack() {
        this.navCtrl.pop();
    }

}
