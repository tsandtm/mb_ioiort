import { Component,ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';


import {  HomePage } from '../pages/homepage/homepage';
import {  ChuyenMucPage } from '../pages/chuyenmuc/chuyenmuc';
import {  TinTucPage } from '../pages/tintuc/tintuc';


@Component({
  selector:'my-app',
  templateUrl: 'app.html'
})
export class MyApp {
   @ViewChild(Nav) nav: Nav;
  rootPage = HomePage;
  pages: Array<{title: string, component: any}>;
  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
    this.pages = [
      { title: 'Trang Chủ', component: HomePage }, 
      {title:'Chuyên mục', component: ChuyenMucPage  } ,   
      { title: 'Tin Tức', component: TinTucPage }
    ];
  } 
     openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
