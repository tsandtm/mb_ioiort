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
    dnew: any[];
    nnew: any[];
    str: string = "";
    index: number;
    start: number = 1;

    constructor(private _newsService: NewsService, public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController) {
        this.nnew = this.navParams.get('news');
        this.index = this.navParams.get('index');
        console.log("news: ", this.nnew );
    }
    ngOnInit() {
    }

    ionViewDidLoad() {
        this.url = this.nnew[this.index].URLNews ;
    }

    nextto(){
        console.log("news: ", this.nnew );
        
         this._newsService.getNew(this.start)
            .then(nw => {
                this.dnew = nw;
                this.navCtrl.push(ChiTietTinPage, { index: this.index, news: this.dnew});
                this.start += 1;
            })
            .catch(errorMessage => {
                console.error(errorMessage.message)
            });
        // this.navCtrl.push(ChiTietTinPage, { index: this.index, news: this.dnew })      
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

    Next(event) {
        console.log(event)
        this.url = this.dnew[this.index+1].URLNews;
    }

    onLoad(event) {

        this.link = event
        if (!event)
            this.spinner = true
        else
            this.spinner = false
    }


}
