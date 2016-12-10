import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

import { NewsService } from '../shared/services/news.service';
import { INews } from '../shared/models/news.model'

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


    ionViewDidLoad() {
        console.log('Hello TinnoibatPage Page');
    }


}
