import { Component, ViewChild } from '@angular/core';
import { NavController, Nav, NavParams, InfiniteScroll } from 'ionic-angular';
import { TinTucPage } from '../tintuc/tintuc';
import { WebsService } from '../shared/services/website.service';
import { UserWebService } from '../shared/services/user_website.service';
import { IWeb } from '../shared/models/website.model';
import { IHomePage, IBienToanCuc } from '../shared/variables';
import { Storage } from '@ionic/storage';

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
    start: number = 0;
    click: boolean = false;
    IDuser: number;
    flag: number; //móc cờ : 1 là login 
    // grid: Array<IWeb[]>;
    // length: number = 0;

    constructor(private _webService: WebsService,
        public navParams: NavParams, public navCtrl: NavController,
        private userWebSite: UserWebService, private storage: Storage) {
        this.IDuser = this.navParams.get('id');
        this.flag = this.navParams.get('flag');

    }

    ionViewDidLoad() {
        // Load danh mục site 
        this._webService.GetList(this.IDuser, this.start)
            .then(res => {
                // đánh móc nếu đã chọn thì vào thẳng tin tức
                if (res.length > 0 && this.flag == 1) {
                    this._webService.ShowLoading(IHomePage.ShowLoading);
                    this.navCtrl.push(TinTucPage, { id: this.IDuser });
                    return;
                } else {
                    this.webs1 = res;
                    this.webs2 = res;
                    this.count = this.webs1[0].DaChon;
                    this.storage.set("count", this.count);
                    // this.webs1.forEach(x => x.GiaTri ? this.count++ : this.count);
                    // console.log(this.count);
                }
                //Tạo grid view
                // console.log("chieu dai 1 : " + res.length);
                // this.gridview(res.length);
                return
            })
            .catch(err => console.log(err));
    }

    // gridview(length: number) {
    //         this.length += length;
    //     // console.log("chieu dai 2 : " + this.length);
    //     if (this.webs1[this.length - 1]) {
    //         this.grid = Array(Math.ceil(this.length / 3));
    //         let rowNum = 0; //counter to iterate over the rows in the grid
    //         let num = this.length % 3 === 0 ? 3 : 2;
    //         for (let i = 0; i < this.length; i += 3) { //iterate images
    //             this.grid[rowNum] = Array(num); //declare two elements per row
    //             if (this.webs1[i]) { //check file URI exists
    //                 this.grid[rowNum][0] = this.webs1[i] //insert image
    //             }
    //             if (this.webs1[i + 1]) { //repeat for the second image
    //                 this.grid[rowNum][1] = this.webs1[i + 1]
    //             }
    //             if (this.webs1[i + 2]) { //repeat for the third image
    //                 this.grid[rowNum][2] = this.webs1[i + 2]
    //             }
    //             rowNum++; //go on to the next row
    //         }
    //     }
    // }


    /**
     *Hàm tìm kiếm trong danh mục site
     Tìm kiếm từ server 
     Truyền vào chuỗi tìm kiếm và ID user 
     */

    search() {
        this._webService.getName(this.listFilter, this.IDuser)
            .then(web => {
                this.webs1 = web;
            }).catch(errorMessage => {
                console.error(errorMessage.message)
            });

    }

    //Thành : 17/12/2016 19h40p Fix khi load thêm dữ liệu mới vào
    doInfinite(infiniteScroll: InfiniteScroll) {
        setTimeout(() => {
            this.start += 12;
            this._webService.GetList(this.IDuser, this.start)
                .then(result => {
                    result.some((value, index) => {
                        let a = this.webs1.find(x => +x.IDDanhMucSite === +value.IDDanhMucSite);
                        (a) ? result.splice(index, 1) : this.webs1.push(value);
                        if (result.length === 0) {
                            return true
                        } else {
                            return false
                        }
                    })
                })
            infiniteScroll.complete();
        }, 2000);
    }

    nextToPage() {
        this._webService.ShowLoading(IHomePage.ShowLoading)
        this.navCtrl.push(TinTucPage, { id: this.IDuser });
    }
    /**
     * function chọn và bỏ chọn danh mục site
     * truyền id website
     */
    chon(id: number, w: IWeb) {
        let i = this.webs1.findIndex(i => (i.IDDanhMucSite === id) ? true : false)
        let web = this.webs1[i];

        // console.log('tin dang chon: ' + web.GiaTri);

        if (!web.GiaTri) {
            // console.log('post :D');
            // console.log('id: ' + id);
            // console.log('index: ' + i);

            this.userWebSite.createUserWebSite(this.IDuser, id, new Date())
                .then(() => {
                    // console.log('da them');
                    web.GiaTri = true;
                    this.count++;
                    this.storage.set("count", this.count);

                    // console.log('chon ' + web.GiaTri);
                })
                .catch(error => console.error('Error: ', error))
        } else {
            // console.log('delete :D');
            // console.log('id: ' + id);
            // console.log('index: ' + i);
            this.userWebSite.deleteUserWebSite(this.IDuser, id)
                .then(() => {
                    // console.log('da xoa');
                    web.GiaTri = false;
                    this.count--;
                    this.storage.set("count", this.count);

                    // console.log('chon ' + web.GiaTri);
                })
                .catch(error => console.error('Error: ', error))
        }
    }

    dschon(): void {
        this.click = !this.click;
        if (this.click) {
            this._webService.GetList(this.IDuser, this.start, 'all')
                .then(res => {
                    let web = [];
                    for (let x of res) {
                        if (x.GiaTri)
                            web.push(x)
                    }
                    this.webs1 = web;
                })
        } else {
            this.webs1 = this.webs2;
        }
        // console.log('hien tai 1: ' + this.click);
    }
}
