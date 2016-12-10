import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewsService } from '../shared/services/news.service';
import { INews } from '../shared/models/news.model'
import { ChiTietTinPage } from '../chitiettin/chitiettin';

/*
  Generated class for the Tinmoi page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-tinmoi',
    templateUrl: 'tinmoi.html'
})
export class TinmoiPage {
    @Input() news: INews[];
    @Input() newtinnoibat: INews[];
    @Input() IDuser: number;
    arr: INews[];
    TimeOut: INews[] = [];
    constructor(public navCtrl: NavController, private _newservice: NewsService) { }

    ionViewDidLoad() {
        console.log("Tin tức Pages")
    }

    del = (news: INews, i, arr) => {
        let index = this.Timvitri(arr, news.id)
        this.arr[index].Undo = true;
        console.log(arr[i].Undo)

        this.arr[index].TimeOut = setTimeout(() => {
            this._newservice.xoatin(this.IDuser, news.id)
                .then(result => {
                    console.log(`Đã xóa vị trí: ${i} Tin: ${arr[i].TieuDe}`)
                    this.arr.splice(index, 1);
                    this._newservice.ShowToastOK("Đã xóa xong", { position: "middle" })
                })
                .catch(error => {
                    console.log('Loi' + error.message);
                })
        }, 5000);
    }

    Undo = (news: INews, i: number, arr) => {
        let index = this.Timvitri(arr, news.id);

        this.arr[index].Undo = false;
        clearTimeout(this.arr[i].TimeOut);
    }

    qt = (news: INews) => {

        this._newservice.themtin(this.IDuser, news.id)
            .then(result => {
                this._newservice.ShowToastOK(`Đã thêm`)
            })
            .catch(error => {
                console.log('Loi' + error.message);

            })
    }

    daxem = (news: INews) => {
        this._newservice.daxem(this.IDuser, news.id)
            .then(result => {
            })
            .catch(error => {
                alert('Loi' + error.message);

            })
    }

    goDetail($event, index, arr) {
        console.log("index " + index);
        this.arr = arr
        this.arr[index].ChuaXem = false;
        this.navCtrl.push(ChiTietTinPage, { index, news: this.arr, IDuser: this.IDuser });
    }

    Timvitri = (arr: INews[], idcantim) => {
        this.arr = arr;
        return this.arr.findIndex(value => {
            if (value.id === idcantim)
                return true
            return false
        })
    }
}
