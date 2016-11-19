import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login-page/login-page';
import { Service } from '../pages/share/variables';
import {PageChartPage} from '../pages/chart/chart'
import {ChartModule} from 'angular2-highcharts';
import {Map} from '../pages/map/map';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    PageChartPage,
    Map
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
    LoginPage,
    PageChartPage,
    Map
  ],
  providers: [Service]
})
export class AppModule { }
