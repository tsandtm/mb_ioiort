
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NewsService } from '../shared/services/news.service';
import { NavController, NavParams } from 'ionic-angular';


import { INews } from '../shared/models/news.model';

@Component({
    selector: 'page-chitiettin',
    templateUrl: 'chitiettin.html'
})
export class ChiTietTinPage implements OnInit {

    @ViewChild('iframe') iframe: ElementRef;
    url: string;
    link: string;
    spinner: boolean = true;
    dnew: any[];
    nnew: INews[];
    str: string = "";
    index: number;
    start: number = 1;
    like: boolean;
    SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
    IDuser:number
    mySlideOptions = {
        initialSlide: 1,
        loop: true
    };

    constructor(private _newsService: NewsService, public navCtrl: NavController, public navParams: NavParams) {
        this.nnew = this.navParams.get('news');
        this.index = this.navParams.get('index');
        this.IDuser = this.navParams.get('IDuser');
        console.log("news: ", this.nnew);
        console.log("index: ", this.index);
    }
    ngOnInit() {
    }

    ionViewDidLoad() {
        this.url = this.nnew[this.index].URLNews;
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
        this.like = !this.like
        if (this.like) {
            this._newsService.ShowToastOK("Đã Like", { position: "middle", duration: 3000 })
            this._newsService.themtin(this.nnew[this.index].id,this.IDuser)
                .then(result => {
                })
                .catch(error => {
                    console.log('Loi' + error.message);
                })

        } else {
            this._newsService.ShowToastOK("Đã Like", { position: "middle", duration: 3000 })
            this._newsService.xoatinquantam(this.nnew[this.index].id,this.IDuser)
                .then(result => {
                    console.log('Da xoa')
                })
                .catch(error => {
                     console.log('Loi' + error.message);
                })
        }

    }

    onLoad(event) {
        this.link = event

        if (!event)
            this.spinner = true;
        else
            this.spinner = false;

        this._newsService.tinquantam(this.IDuser,0,this.nnew[this.index].id)
            .then(nw => {

                nw.length > 0 ? this.like = !this.like : this.like

            })
            .catch(errorMessage => {
                console.error(errorMessage.message)
            })
    }

    swipe = (currentIndex: number, action = this.SWIPE_ACTION.RIGHT) => {
        // if (this.nnew[this.index + 1] > this.nnew.length) {
        //     this._newsService.getNew(this.index).then(result => {
        //         this.nnew.push(result)
        //         console.log(this.nnew)
        //     })
        // }

        if (action === this.SWIPE_ACTION.LEFT) {
            this.like = false
            if ((this.index + 1) < this.nnew.length) {
                console.log(this.index + 1)
                this.index++
                this.url = this.nnew[this.index].URLNews;
                this.nnew[this.index].ChuaXem = false;
            }
            else {
                console.log(this.index + 1)
                this.url = this.nnew[this.index].URLNews;
            }
            return
        }

        if (action === this.SWIPE_ACTION.RIGHT) {
            this.like = false
            if ((this.index - 1) >= 0) {
                this.index--
                this.url = this.nnew[this.index].URLNews
                console.log(this.index)
                this.nnew[this.index].ChuaXem = false;

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
