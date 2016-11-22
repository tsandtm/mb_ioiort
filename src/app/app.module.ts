import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login-page/login-page';
import {PageChartPage} from '../pages/chart/chart'
import {ChartModule} from 'angular2-highcharts';
import {Map} from '../pages/map/map';

import {ChartService} from '../pages/chart/chart.service';
import {MapService} from '../pages/map/map.service';
import {LoginService} from '../pages/login-page/login.service';

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
  providers: [ChartService,MapService,LoginService]
})
export class AppModule { }
