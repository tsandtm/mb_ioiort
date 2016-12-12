import { Component, ViewChild } from '@angular/core';
import { NavController, Nav, NavParams, InfiniteScroll } from 'ionic-angular';
import { TinTucPage } from '../tintuc/tintuc';
import { WebsService } from '../shared/services/website.service';
import { UserWebService } from '../shared/services/user_website.service';
import { IWeb } from '../shared/models/website.model';
import { IHomePage, IBienToanCuc } from '../shared/variables'
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
    count: number = 0;
    listFilter: string = '';
    start: number = 0;
    click: boolean = false;
    IDuser: number;
    hientin: boolean = false
    constructor(private _webService: WebsService,
        public navParams: NavParams, public navCtrl: NavController,
        private userWebSite: UserWebService) {
        this.IDuser = this.navParams.get('id');

    }

    ionViewDidLoad() {
        this._webService.GetList(this.IDuser, this.start)
            .then(res => {
                this.webs1 = res
                this.webs1.forEach(x => x.GiaTri ? this.count++ : this.count)
                console.log(this.webs1)
                return
            })
            .catch(err => console.log(err))
    }
    search() {
        this._webService.getName(this.listFilter)
            .then(web => {
                this.webs1 = web;
            }).catch(errorMessage => {
                console.error(errorMessage.message)
            });
        // let val = ev.target.value;
        // if (val && val.trim() != '') {
        //     this.webs1 = this.webs1.filter((item) => {
        //         let a = (item.TenGoi.toLowerCase().indexOf(val.toLowerCase()) > -1);
        //         let b = (item.TenGoi_KoDau.toLowerCase().indexOf(val.toLowerCase()) > -1)
        //         return (a || b) ? true : false
        //     })
        // }

    }

    doInfinite(infiniteScroll: InfiniteScroll) {
        setTimeout(() => {
            this.start += 12;
            this._webService.GetList(this.IDuser, this.start)
                .then(result => {
                    console.log(result)
                    if (result.length != 0) {
                        result.forEach(x => this.webs1.push(x))

                    }
                })
            infiniteScroll.complete();
        }, 2000);
    }

    nextToPage() {
        this._webService.ShowLoading(IHomePage.ShowLoading)
        this.navCtrl.push(TinTucPage, { id: this.IDuser });
    }

    chon(id: number, w: IWeb) {
        let i = this.webs1.findIndex(i => (i.IDDanhMucSite === id) ? true : false)
        let web = this.webs1[i];

        console.log('tin dang chon: ' + web.GiaTri);

        if (!web.GiaTri) {
            console.log('post :D');
            console.log('id: ' + id);
            console.log('index: ' + i);

            this.userWebSite.createUserWebSite(this.IDuser, id, new Date())
                .then(() => {
                    console.log('da them');
                    web.GiaTri = true;
                    this.count++;
                    console.log('chon ' + web.GiaTri);
                })
                .catch(error => console.error('Error: ', error))
        } else {
            console.log('delete :D');
            console.log('id: ' + id);
            console.log('index: ' + i);
            this.userWebSite.deleteUserWebSite(this.IDuser, id)
                .then(() => {
                    console.log('da xoa');
                    web.GiaTri = false;
                    this.count--;
                    console.log('chon ' + web.GiaTri);
                })
                .catch(error => console.error('Error: ', error))
        }
    }

    dschon(): void {
        this.click = !this.click;
        console.log('hien tai 1: ' + this.click);
    }



    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
}
