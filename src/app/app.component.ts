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
  
  rootPage = HomePage;
  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // StatusBar.styleDefault();
      // Splashscreen.hide();
    });
   
  } 
    
}
