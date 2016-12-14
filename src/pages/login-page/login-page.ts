import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginService } from '../shared/services/login-page.service';
import { Storage } from '@ionic/storage';
import { HomePage } from '../homepage/homepage';
import { ILoginPage } from '../shared/variables'

/*
  Generated class for the LoginPage page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-login',
    templateUrl: 'login-page.html',

    animations: [

        //For the logo
        trigger('flyInBottomSlow', [
            state('in', style({
                transform: 'translate3d(0,0,0)'
            })),
            transition('void => *', [
                style({ transform: 'translate3d(0,2000px,0' }),
                animate('2000ms ease-in-out')
            ])
        ]),

        //For the background detail
        trigger('flyInBottomFast', [
            state('in', style({
                transform: 'translate3d(0,0,0)'
            })),
            transition('void => *', [
                style({ transform: 'translate3d(0,2000px,0)' }),
                animate('1000ms ease-in-out')
            ])
        ]),
        //For the login form
        trigger('bounceInBottom', [
            state('in', style({
                transform: 'translate3d(0,0,0)'
            })),
            transition('void => *', [
                animate('2000ms 200ms ease-in', keyframes([
                    style({ transform: 'translate3d(0,2000px,0)', offset: 0 }),
                    style({ transform: 'translate3d(0,-20px,0)', offset: 0.9 }),
                    style({ transform: 'translate3d(0,0,0)', offset: 1 })
                ]))
            ])
        ]),

        //For login button
        trigger('fadeIn', [
            state('in', style({
                opacity: 1
            })),
            transition('void => *', [
                style({ opacity: 0 }),
                animate('1000ms 2000ms ease-in')
            ])
        ])
    ]
})
export class LoginPage {

    //Animation
    logoState: any = "in";
    cloudState: any = "in";
    loginState: any = "in";
    formState: any = "in";
    //set text
    Header = ILoginPage.Header;
    Subheader = ILoginPage.Subheader;
    TaiKhoan = ILoginPage.TaiKhoan;
    MatKhau = ILoginPage.MatKhau;
    GhiNho = ILoginPage.GhiNho;
    Button_DangNhap = ILoginPage.Button_DangNhap;
    
    //Biến toàn cục
    username: string;
    password: string;
    save: boolean = false;
    IDuser: number;

    constructor(public navCtrl: NavController, private service: LoginService,
        private storage: Storage) {
    }


    ionViewDidLoad() {
        this.storage.forEach((value, key) => {
            switch (key) {
                case "TaiKhoan": this.username = value; break;
                case "Password": this.password = value; break;
                case "Checkbox": this.save = value; break
                default:
            }
            console.log(`${this.username}${this.password}`)

            if (this.username && this.password)
                this.service.LoginToSever(this.username, this.password)
                    .then(result => {
                        if (result !== 0) {
                            this.IDuser = result._body;
                            // console.log("id user:" + this.IDuser);
                            this.navCtrl.push(HomePage, { id: this.IDuser });
                            this.service.ShowToastOK(ILoginPage.Toast_ThanhCong, { position: 'top' })
                            return
                        }
                        else {
                            console.log(result)
                            this.service.ShowToastOK(ILoginPage.Toast_KhongThanhCong, { position: 'top', duration: 3000 })
                            return
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
        })
    }


    Login = () => {
        this.service.LoginToSever(this.username, this.password)
            .then(result => {
                if (result !== 0) {
                    // console.log("id " + result._body);
                    this.service.ShowToastOK(ILoginPage.Toast_ThanhCong, { position: 'top' });
                    this.IDuser = result._body;
                    // console.log("id user:" + this.IDuser);
                    if (this.save) {
                        this.storage.set("TaiKhoan", this.username);
                        this.storage.set("Password", this.password);
                        this.storage.set("Checkbox", this.save);
                        this.navCtrl.push(HomePage, { id: this.IDuser });
                    } else {
                        this.navCtrl.push(HomePage, { id: this.IDuser });
                    }
                }

                else {
                    console.log(result)
                    this.service.ShowToastOK(ILoginPage.Toast_KhongThanhCong, { position: 'top', duration: 3000 })
                    return
                }
            })
            .catch(err => console.log(err))
    }
    Change = () => {
        console.log(`save: ${this.save}`)
    }
}