import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NewsService } from '../shared/news.service';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { INews } from '../shared/news.model'
import { } from 'module';
import { Safe } from './chitiettin/safe'



@Component({
    selector: 'page-chitiettin',
    templateUrl: 'chitiettin.html'
})
export class ChiTietTinPage implements OnInit {
    @ViewChild('iframe') iframe: ElementRef
    url: string;
    link: string;
    spinner: boolean = true;
    dnew: INews[];
    str: string = "";
    index : number;

    constructor(private _newsService: NewsService, public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController) {
        this.dnew = this.navParams.get('news');
        this.index = this.navParams.get('index');
        console.log("news: ", this.navParams.get('news'));
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
    // goBack() {
    //     this.navCtrl.pop();
    // }

    ionViewDidLoad() {
        this.url = this.dnew[this.index].URLNews;
    }
    Back() {
        window.history.back(1)
    }
    Forward() {
        window.history.go(1)
    }
    Close() {
        this.navCtrl.pop()
    }
    Like() {
        this.toastCtrl.create({
            message: 'Đã Like',
            duration: 3000,
            position: 'middle'
        }).present();
    }

    Next(event){
        console.log(event)
        // this.url = this.dnew[this.index+1].URLNews;
    }

    onLoad(event) {

        this.link = event
        if (!event)
            this.spinner = true
        else
            this.spinner = false
    }


}
