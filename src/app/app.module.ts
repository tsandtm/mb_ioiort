import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login-page/login-page';
import { Service } from '../pages/share/variables';
import { NK_Navigation } from '../pages/NK_Navigation/NK_Navigation'
import { PageGoogleMapPage } from '../pages/page-google-map/page-google-map';
import { TabsViewPage } from '../pages/tabs-view/tabs-view';
import {LogoutPage} from '../pages/logout/logout';
import { ChartPage } from '../pages/chart/chart'
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NK_Navigation,
    PageGoogleMapPage,
    TabsViewPage,
    LogoutPage,
    LoginPage,
    ChartPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    NK_Navigation,
    PageGoogleMapPage,
    LoginPage,
    LogoutPage,
    TabsViewPage,
    ChartPage
  ],
  providers: [Service]
})
export class AppModule { }
