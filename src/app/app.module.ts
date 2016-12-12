import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { MyApp } from './app.component';
import { TinTucPage } from '../pages/tintuc/tintuc';
import { ChiTietTinPage } from '../pages/chitiettin/chitiettin';
import { HomePage } from '../pages/homepage/homepage';
import { WebsService } from '../pages/shared/services/website.service';
import { NewsService } from '../pages/shared/services/news.service';
import { HomeFilterPipe } from '../pages/homepage/homepage-filter.pipe';
import { UserWebService } from '../pages/shared/services/user_website.service';
import { LoginPage } from '../pages/login-page/login-page';
import { LoginService } from '../pages/shared/services/login-page.service'
import { LktinxoaPage } from '../pages/lktinxoa/lktinxoa';
import { TinquantamPage } from '../pages/tinquantam/tinquantam';
import { Safe } from '../pages/chitiettin/safe'
import { TinmoiPage } from '../pages/tinmoi/tinmoi'
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { HomeFilterNews } from '../pages/homepage/homepage.pipe';
export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any>{
    'swipe': { velocity: 0.4, threshold: 20 } // override default settings
  }

}
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TinTucPage,
    ChiTietTinPage,
    HomeFilterPipe,
    LoginPage,
    Safe,
    LktinxoaPage,
    TinquantamPage,
    TinmoiPage,
    HomeFilterNews
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
    LoginPage,
    LktinxoaPage,
    TinquantamPage,
    TinmoiPage,
  ],
  providers: [
    WebsService,
    NewsService,
    UserWebService,
    LoginService,
    Storage,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
