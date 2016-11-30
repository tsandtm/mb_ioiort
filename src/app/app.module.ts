import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { MyApp } from './app.component';
import { TinTucPage } from '../pages/tintuc/tintuc';
import { ChiTietTinPage } from '../pages/chitiettin/chitiettin';
import { HomePage } from '../pages/homepage/homepage';
import { ChuyenMucPage } from '../pages/chuyenmuc/chuyenmuc';
import { WebsService } from '../pages/shared/website.service';
import { NewsService } from '../pages/shared/news.service';
import { HomeFilterPipe } from '../pages/homepage/homepage-filter.pipe';
import { UserWebService } from '../pages/shared/user_website.service';
import { LoginPage } from '../pages/login-page/login-page';
import {LoginService} from '../pages/login-page/login-page.service'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TinTucPage,
    ChiTietTinPage,
    ChuyenMucPage,
    HomeFilterPipe,
    LoginPage,
    
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
    ChuyenMucPage,
    LoginPage
  ],
  providers: [WebsService, NewsService, UserWebService,LoginService,Storage]
})
export class AppModule { }
