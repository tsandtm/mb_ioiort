import { Component, ViewChild } from '@angular/core';
import { NavController, Nav, NavParams } from 'ionic-angular';
import { TinTucPage } from '../tintuc/tintuc';
import { WebsService } from '../shared/services/website.service';
import { UserWebService } from '../shared/services/user_website.service';
import { IWeb } from '../shared/models/website.model';
import { IHomePage,IBienToanCuc } from '../shared/variables'
@Component({
    selector: 'page-home',
    templateUrl: 'homepage.html'
})
export class HomePage {
    @ViewChild(Nav) nav: Nav;
    // Set text 
    lbdachon = IHomePage.Label_Dachon;
    btnnext = IHomePage.Button_Next;
    loadtext = IBienToanCuc.Loading_Text;

    // Biến toàn cục
    webs1: IWeb[];
    webs2: IWeb[];
    count: number = 0;
    listFilter: string = '';
    public start: number = IBienToanCuc.Start*2;
    public click: boolean = false;
    index: number;
    IDuser: number;

    constructor(private _webService: WebsService,
        public navParams: NavParams, public navCtrl: NavController,
        private userWebSite: UserWebService) {
        this.IDuser = this.navParams.get('id');
    }

    ionViewDidLoad() {
        this._webService.getList_user(this.IDuser) //danh sach site user da chon
            .then(web => {
                this.webs2 = web;
                this.count = this.webs2.length;
            })
            .catch(errorMessage => {
                console.error(errorMessage.message)
            });
        if (this.count > 0) {
            this.navCtrl.push(TinTucPage, { id: this.IDuser }); //bug flag

        } else {
            this.LoadList()
        }
    }

    doInfinite(infiniteScroll) {
        setTimeout(() => {
            this._webService.getWebs(this.start)
                .then(
                (res) => {
                    if (res.length !== 0) {
                        for (var j = 0; j < res.length; j++) {
                            var x = res[j];
                            for (var i = 0; i < this.webs2.length; i++) {
                                let web2 = this.webs2[i];
                                if (x.IDDanhMucSite == web2.IDDanhMucSite) {
                                    web2.chontin = true;
                                    x.chontin = true;
                                }
                            }
                            this.webs1.push(x);
                        }
                        // this.webs1.concat(res);
                        this.start += IBienToanCuc.Start*2;
                    }
                })
                .catch(errorMessage => {
                    console.error(errorMessage.message)

                });
            infiniteScroll.complete();
        }, 2000);
    }


    nextToPage() {
        this._webService.ShowLoading(IHomePage.ShowLoading)

        this.navCtrl.push(TinTucPage, { id: this.IDuser });
    }

    chon(id: number, index: number) {
        let i = this.webs1.findIndex(i =>
            (i.IDDanhMucSite === id) ? true : false
        )
        let web = this.webs1[i];

        console.log('tin dang chon: ' + web.chontin);

        if (!web.chontin) {
            console.log('post :D');
            console.log('id: ' + id);
            console.log('index: ' + i);

            this.userWebSite.createUserWebSite(this.IDuser, id, new Date())
                .then(() => {
                    console.log('da them');
                    web.chontin = true;
                    this.webs1[i] = web;
                    this.count++;
                    console.log('chon ' + web.chontin);
                    this.webs2.push(web);

                })
                .catch(error => {
                    console.error('Error: ', error);

                })
        } else {
            console.log('delete :D');
            console.log('id: ' + id);
            console.log('index: ' + index);

            this.userWebSite.deleteUserWebSite(this.IDuser, id)
                .then(() => {
                    console.log('da xoa');
                    web.chontin = false;
                    this.webs1[index] = web;
                    this.count--;
                    let i = this.webs2.findIndex(i => {
                        if (i.IDDanhMucSite === web.IDDanhMucSite)
                            return true;
                        else
                            return false;
                    })
                    this.webs2.splice(i, 1)
                    console.log('chon ' + web.chontin);

                })
                .catch(error => {
                    console.error('Error: ', error);

                })
        }
    }

    dschon(): void {
        this.click = !this.click;
        console.log('hien tai 1: ' + this.click);
        if (this.click) {
            console.log('hien tai 2: ' + this.click);
            this.webs1 = this.webs2;
        } else {
            console.log('hien tai 3: ' + this.click);
            this.LoadList()// h
        }
    }

    LoadList() {
        this._webService.getWebs(0)
            .then(web => {
                this.webs1 = web;

                if (this.webs2 != null) {
                    for (var i = 0; i < this.webs2.length; i++) {
                        let web2 = this.webs2[i];
                        for (var j = 0; j < this.webs1.length; j++) {
                            let web1 = this.webs1[j];
                            if (web1.IDDanhMucSite == web2.IDDanhMucSite) {
                                web1.chontin = true;
                                web2.chontin = true;
                                this.webs1[j] = web1;
                            }
                        }
                    }
                }
            })
            .catch(errorMessage => {
                console.error(errorMessage.message)
            });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
}
