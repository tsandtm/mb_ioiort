import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { LoginService } from '../shared/services/login-page.service';
import { Storage } from '@ionic/storage';
import { HomePage } from '../homepage/homepage';
import { ILoginPage, IHomePage } from '../shared/variables'
import { Facebook } from 'ionic-native';
import { WebsService } from '../shared/services/website.service';
import { TinTucPage } from '../tintuc/tintuc';
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
    count: number = 0; // bebinh sua nay
    IDuser: number;
    webs1: any[];

    /**
     * Bé Bình (News)
     * @function su dung loading controller làm hiệu ứng vì trong login nó vẫn bị load css lên trước
     * nên cứ chép các phần hàm trong constructor rồi fix sau nha bạn thành.
     */
    constructor(public navCtrl: NavController, private service: LoginService,
        private storage: Storage, private _webService: WebsService
        , public loadingCtrl: LoadingController
    ) {
        let loading = this.loadingCtrl.create({
            content: 'Đang tải'
        });
        loading.present().then(() => {
            this.storage.forEach((value, key) => {
                switch (key) {
                    case "TaiKhoan": this.username = value; break;
                    case "Password": this.password = value; break;
                    case "Checkbox": this.save = value; break;
                    case "count": this.count = value; break; // thêm vô
                    default:
                }
                if (this.username && this.password) {
                    return this.service.LoginToSever(this.username, this.password)
                        .then(result => {
                            if (result !== -1) {
                                console.log("id=" + result);
                                console.log("count=" + this.count);
                                if (this.count > 0) {
                                    //  this.service.ShowToastOK(ILoginPage.Toast_ThanhCong, { position: 'top' })
                                    console.log("count > 0")
                                    this.navCtrl.push(TinTucPage, { id: result });
                                    return loading.dismiss();
                                }
                                if (this.count === 0) {
                                    // this.service.ShowToastOK(ILoginPage.Toast_ThanhCong, { position: 'top' })
                                    console.log("count == 0")
                                    this.navCtrl.push(HomePage, { id: result, flag: 1 });
                                    return loading.dismiss();
                                }
                            }
                            else {
                                console.log(result)
                                // this.service.ShowToastOK(ILoginPage.Toast_KhongThanhCong, { position: 'top', duration: 3000 })
                                return loading.dismiss();
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
                else {
                    loading.dismiss();
                }
            })
        });
    }

    /**
     * Thành
     * ionViewCanEnter
     * Runs before the view can enter. This can be used as a sort of "guard" in authenticated views 
     * where you need to check permissions before the view can enter
     */

    ionViewCanEnter = () => {
        // return this.SetRootPage()

    }

    /** 
     *  Runs when the page has loaded. This event only happens once per page being created.
     *  If a page leaves but is cached, then this event will not fire again on a subsequent viewing.
     *  The ionViewDidLoad event is good place to put your setup code for the page.
     */
    ionViewDidLoad = () => {

    }
    /**
     * Thành
     * @function Login
     * Request lên server để login to Page
     */

    Login = () => {
        this.service.LoginToSever(this.username, this.password)
            .then(result => {
                if (result !== -1) {
                    this.service.ShowToastOK(ILoginPage.Toast_ThanhCong, { position: 'top' });
                    // this.IDuser = result._body;
                    // console.log("id user:" + this.IDuser);
                    if (this.save) {
                        this.storage.set("TaiKhoan", this.username);
                        this.storage.set("Password", this.password);
                        this.storage.set("Checkbox", this.save);
                        this.storage.set("IDUser", result)
                        this.navCtrl.push(HomePage, { id: result, flag: 1 });
                        this._webService.ShowLoading(IHomePage.ShowLoading)

                    } else {
                        this.navCtrl.push(HomePage, { id: result, flag: 1 });
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

    /**
     * THành
     * @function Kiểm tra sự kiện khi nút Checkbox thay đổi
     */
    Change = () => {
        console.log(`save: ${this.save}`)
    }

    /**
     * Bình
     * @function Login facebook
     */
    LoginFacebook() {
        Facebook.logout();
        Facebook.login(['email']).then((response) => {
            let token = response.authResponse.accessToken;
            Facebook.api('/' + response.authResponse.userID + '?fields=id,name,email', []).then((result) => {
                let name = result.name;
                let email = result.email;
                let facebook = response.authResponse.userID; // sua chu Facebook => facebook
                this.username = facebook; // sua nay 
                this.password = facebook; // sua nay
                this.service.GetCountFacebook(facebook).then(resGet => {
                    if (resGet > 0) {
                        this.service.ShowToastOK(ILoginPage.Toast_ThanhCong, { position: 'top', duration: 3000 })
                        this.IDuser = resGet;
                        // them nay vo nua 1
                        if (this.save) {
                            this.storage.set("TaiKhoan", this.username);
                            this.storage.set("Password", this.password);
                            this.storage.set("Checkbox", this.save);
                            this.storage.set("IDUser", this.IDuser)
                            this.navCtrl.push(HomePage, { id: this.IDuser, flag: 1 });
                        }
                        else {
                            this.navCtrl.push(HomePage, { id: this.IDuser, flag: 1 });
                        }
                        // them nay vo nua 1
                    }
                    else {
                        this.service.InserUserFacebook(facebook, name, email, token).then(resInsert => {
                            this.service.ShowToastOK(ILoginPage.Toast_ThanhCong, { position: 'top', duration: 3000 })
                            this.service.GetCountFacebook(facebook).then(resGetID => {
                                this.IDuser = resGetID;
                                // them nay vo nua 2
                                if (this.save) {
                                    this.storage.set("TaiKhoan", this.username);
                                    this.storage.set("Password", this.password);
                                    this.storage.set("Checkbox", this.save);
                                    this.navCtrl.push(HomePage, { id: this.IDuser, flag: 1 });
                                }
                                else {
                                    this.navCtrl.push(HomePage, { id: this.IDuser, flag: 1 });
                                }
                                // them nay vo nua 2
                            });
                        })
                    }
                });
            }).catch(err => {  // sua nay
                console.log(JSON.stringify(err));
                this.service.ShowToastOK(ILoginPage.Toast_KhongThanhCong, { position: 'top', duration: 3000 })
            });
        }).catch(err => { // sua nay
            console.log(JSON.stringify(err));
            this.service.ShowToastOK(err, { position: 'top', duration: 3000 })
        });
    }



    /**
     * 
     */
    SetRootPage = () => {
        return this.storage.forEach((value, key) => {
            switch (key) {
                case "TaiKhoan": this.username = value; break;
                case "Password": this.password = value; break;
                case "Checkbox": this.save = value; break
                default:
            }
            console.log(`${this.username} va ${this.password}`)
            if (this.username && this.password)
                return this.service.LoginToSever(this.username, this.password)
                    .then(result => {
                        if (result !== -1) {
                            this.storage.set("IDUser", result)
                            this.navCtrl.push(HomePage, { id: result, flag: 1 })
                            return false;
                        }
                        else {
                            console.log(result)
                            return true;
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        return false;
                    })
        })
    }
}
