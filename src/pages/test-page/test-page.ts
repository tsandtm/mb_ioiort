import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewsService } from '../shared/services/news.service';
/*
  Generated class for the TestPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-test-page',
  templateUrl: 'test-page.html'
})
export class TestPagePage {
  noidung: any
  constructor(public navCtrl: NavController, private service: NewsService) { }

  ionViewDidLoad() {
    this.service.test().then(result => {
      console.log(result[0].NoiDung)
      this.noidung = result[0].NoiDung
     
    })
  }
}
