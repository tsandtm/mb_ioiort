import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { LoginService } from '../shared/services/login-page.service';
import { Storage } from '@ionic/storage';
import { TinTucPage } from '../tintuc/tintuc';
import { HomePage } from '../homepage/homepage';
import { LoginPage } from '../login-page/login-page';
/*
  Generated class for the Welcome page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  username: string;
  password: string;
  count: number = 0;
  constructor(public navCtrl: NavController, private service: LoginService, private storage: Storage, private loadingCtrl: LoadingController) {
      let loading = this.loadingCtrl.create({
        content: 'Đang tải'
      });
    this.storage.forEach((value, key) => {
      switch (key) {
        case "TaiKhoan": this.username = value; break;
        case "Password": this.password = value; break;
        case "count": this.count = value; break; // thêm vô
        default: { break; }
      }
    }).then(() => {
      console.log(`username=${this.username} và password=${this.password}`);
        if (this.username && this.password) {
          this.service.LoginToSever(this.username, this.password)
            .then(result => {
            
              if (result !== -1) {
                console.log("id=" + result);
                console.log("count=" + this.count);
                if (this.count == 0) {
                  //  this.service.ShowToastOK(ILoginPage.Toast_ThanhCong, { position: 'top' })
                  console.log("count ==0")
                  this.navCtrl.push(HomePage, { id: result, flag: 1 });
                }
                else {
                  // this.service.ShowToastOK(ILoginPage.Toast_ThanhCong, { position: 'top' })
                  console.log("count >0")
                  this.navCtrl.push(TinTucPage, { id: result });
                }
              }
              else {
                this.navCtrl.push(LoginPage);
              }
          
            })
            .catch(err => {
              console.log(err)
            })
        }
        else{
              this.navCtrl.push(LoginPage);
        }
    });
        loading.dismiss();
  }

  ionViewDidLoad() {
    console.log('Hello WelcomePage Page');
  }

}
