import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login-page/login-page';
import { Service } from '../pages/share/variables';
import { NK_Navigation } from '../pages/NK_Navigation/NK_Navigation'
import { PageGoogleMapPage } from '../pages/page-google-map/page-google-map';
import { TabsViewPage } from '../pages/tabs-view/tabs-view';
import {PageChartPage} from '../pages/chart/chart'
import {ChartModule} from 'angular2-highcharts';
import {LogoutPage} from '../pages/logout/logout';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NK_Navigation,
    PageGoogleMapPage,
    TabsViewPage,
    LoginPage,
    PageChartPage,
    LogoutPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    ChartModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    NK_Navigation,
    PageGoogleMapPage,
    LoginPage,
    TabsViewPage,
    PageChartPage,
    LogoutPage
  ],
  providers: [Service]
})
export class AppModule { }
