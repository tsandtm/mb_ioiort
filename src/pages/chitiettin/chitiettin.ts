
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NewsService } from '../shared/news.service';
import { NavController, NavParams, ToastController, Slides } from 'ionic-angular';

import { INews } from '../shared/news.model';

@Component({
    selector: 'page-chitiettin',
    templateUrl: 'chitiettin.html'
})
export class ChiTietTinPage implements OnInit {

    @ViewChild('iframe') iframe: ElementRef;
    @ViewChild('mySlider') slider: Slides;

    url: string;
    link: string;
    spinner: boolean = true;
    dnew: any[];
    nnew: INews[];
    str: string = "";
    index: number;
    start: number = 1;

    SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };

    mySlideOptions = {
        initialSlide: 1,
        loop: true
    };

    constructor(private _newsService: NewsService, public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController) {
        this.nnew = this.navParams.get('news');
        this.index = this.navParams.get('index');
        console.log("news: ", this.nnew);
        console.log("index: ", this.index);
    }
    ngOnInit() {
    }

    ionViewDidLoad() {
        this.url = this.nnew[this.index].URLNews;
    }

    nextto() {

        this._newsService.getNew(this.start)
            .then(nw => {
                this.dnew = nw;
                this.navCtrl.push(ChiTietTinPage, { index: this.index, news: this.dnew });
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
        this.url = this.dnew[this.index + 1].URLNews;
    }

    onLoad(event) {

        this.link = event
        if (!event)
            this.spinner = true
        else
            this.spinner = false
    }

    swipe = (currentIndex: number, action = this.SWIPE_ACTION.RIGHT) => {
        // if (this.nnew[this.index + 1] > this.nnew.length) {
        //     this._newsService.getNew(this.index).then(result => {
        //         this.nnew.push(result)
        //         console.log(this.nnew)
        //     })
        // }

        if (action === this.SWIPE_ACTION.LEFT) {

            if ((this.index + 1) < this.nnew.length) {
                console.log(this.index + 1)
                this.url = this.nnew[this.index + 1].URLNews;
                this.index++
            }
            else {
                console.log(this.index + 1)
                this.url = this.nnew[this.index].URLNews;
            }
            return
        }

        if (action === this.SWIPE_ACTION.RIGHT) {
            if ((this.index - 1) >= 0) {
                this.url = this.nnew[this.index - 1].URLNews
                this.index--
                console.log(this.index)
                
            } else {
                this.url = this.nnew[this.index].URLNews
                console.log(this.index)
            }
            return
        }
        // // swipe left, previous avatar
        // }
        // // console.log(`LEFT`)

    }
}
