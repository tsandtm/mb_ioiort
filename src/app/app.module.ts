import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login-page/login-page';
import {DemoItemSlidingPage} from '../pages/demo-item-sliding/demo-item-sliding';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    DemoItemSlidingPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    DemoItemSlidingPage
  ],
  providers: []
})
export class AppModule {}
