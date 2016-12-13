import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewsService } from '../shared/services/news.service';
import { INews } from '../shared/models/news.model'
import { ChiTietTinPage } from '../chitiettin/chitiettin';
import { ITinMoi } from '../shared/variables'
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
    @Input() IDuser: number;

    // Set Text
    Text_Undo = ITinMoi.Undo;

    daxoa: INews;
    vitricu: number = -1;
    constructor(public navCtrl: NavController, private _newservice: NewsService) { }

    ionViewDidLoad() {
        console.log("Tin tức Pages")
    }

    del = (news: INews, i) => {

        this.daxoa = news;
        let index = this.news.findIndex(x => x.IDTinTuc === news.IDTinTuc ? true : false)

        this.news[index].Undo = true;

        console.log(this.news[index].Undo)

        this._newservice.xoatin(news.IDTinTuc, this.IDuser)
            .then(result => {
                // xóa vị trí trước
                if (this.vitricu !== -1) {
                    this.news[this.vitricu].Undo = false
                    console.log(`Đã xóa vị trí ${this.vitricu}`)
                    this.news.splice(this.vitricu, 1);
                }
                console.log(`Đã xóa vị trí: ${index} Tin: ${this.news[index].TieuDe} trên server`)
                // this.daxoa = this.news.splice(index, 1);
                this.vitricu = index;
                this._newservice.ShowToastOK(ITinMoi.ShowToast_Xoa, { position: "middle" })
                return

            })
            .catch(error => {
                console.log(error);
            })
    }

    Undo = (news: INews, i: number, arr) => {
        let index = this.news.findIndex(x => x.IDTinTuc === news.IDTinTuc ? true : false)
        console.log(`Vị trí ${index}`)
        this._newservice.boxoa(news.IDTinTuc, this.IDuser)
            .then(() => {
                this.daxoa.Undo = false
                return this.vitricu = -1;//trả 
            })
            .catch(err => console.log(err))
    }

    qt = (news: INews) => {

        this._newservice.themtin(news.IDTinTuc,this.IDuser)
            .then(result => {
                return this._newservice.ShowToastOK(ITinMoi.ShowToast_Them)
            })
            .catch(error => {
                console.log('Loi' + error.message);
            })
    }

    daxem = (news: INews) => {
        this._newservice.daxem(news.IDTinTuc,this.IDuser)
            .then(result => {
                return
            })
            .catch(error => {
                return console.log('Loi' + error.message);

            })
    }

    goDetail($event, index, arr) {
        console.log("index " + index);
        this.news = arr
        this.news[index].ChuaXem = false;
        this.navCtrl.push(ChiTietTinPage, { index, news: this.news, IDuser: this.IDuser });
        return
    }

}
