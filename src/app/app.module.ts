import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import {TinTucPage} from '../pages/tintuc/tintuc';
import {ChiTietTinPage} from '../pages/chitiettin/chitiettin';
import { HomePage } from '../pages/homepage/homepage';
import{ChuyenMucPage} from '../pages/chuyenmuc/chuyenmuc';
import {WebsService} from '../pages/shared/website.service';
import {NewsService} from '../pages/shared/news.service';
import {HomeFilterPipe} from '../pages/homepage/homepage-filter.pipe';
import {UserWebService} from '../pages/shared/user_website.service';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TinTucPage,
    ChiTietTinPage,
    ChuyenMucPage,
    HomeFilterPipe
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TinTucPage,
    ChiTietTinPage,
    ChuyenMucPage
  ],
  providers: [WebsService,NewsService,UserWebService]
})
export class AppModule {}
