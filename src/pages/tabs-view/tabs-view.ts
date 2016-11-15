import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home'
import { PageGoogleMapPage } from '../page-google-map/page-google-map'
// import { LoginPage } from '../login-page/login-page'
import { NK_Navigation } from '../NK_Navigation/NK_Navigation';
// import { LogoutPage } from '../logout/logout';

/*
  Generated class for the TabsView tabs.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Component({
  selector: 'page-tabs-view',
  templateUrl: 'tabs-view.html'
})
export class TabsViewPage {

  tab1Root: any = HomePage;
  tab2Root: any = PageGoogleMapPage;
  // tab3Root: any = LogoutPage;
  ;

  constructor(public navCtrl: NavController) {

  }


}