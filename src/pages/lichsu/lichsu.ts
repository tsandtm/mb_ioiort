import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NewsService } from '../shared/services/news.service';
import { INews } from '../shared/models/news.model';
import { LktinxoaPage } from '../lktinxoa/lktinxoa';
import { TinquantamPage } from '../tinquantam/tinquantam';
import { TinDaXemPage } from '../tindaxem/tindaxem';

@Component({
    selector: 'page-lichsu',
    templateUrl: 'lichsu.html'
})

export class LichSuPage {
    new: INews[];
    newsxoa: INews[];
    newsquantam: INews[];

    tab1: any;
    tab2: any;
    tab3: any;
    params ;
    IDuser: number;
    c: string = "tindaxoa";
    constructor(public navCtrl: NavController, public navParams: NavParams, private _newservice: NewsService) {
        this.IDuser = this.navParams.get('id');
        this.params = this.IDuser;
        // let params = {
        //     id: this.IDuser
        // }
        this.tab1 = LktinxoaPage;
        this.tab2 = TinquantamPage;
        this.tab3 = TinDaXemPage;
        // this.tab3 = LichSuXemPage;
    }
    ionViewDidLoad() {
        console.log('Hello root Page');
    }

}
