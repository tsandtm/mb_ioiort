import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login-page/login-page';
import { LoginsuccessPage} from '../pages/loginsuccess/loginsuccess';
import { DemomodalPage} from '../pages/demomodal/demomodal';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    LoginsuccessPage,
    DemomodalPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    LoginsuccessPage,
    DemomodalPage
  ],
  providers: []
})
export class AppModule {}
