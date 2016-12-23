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

    /**
     * @function Kiểm tra trước khi chạy trang
     * 
     */
    ionViewCanEnter = () => {
        this.navCtrl.viewWillEnter.toPromise()
            .then(res => console.log(res))
        // Load danh mục site 
        this._webService.GetList(this.IDuser, this.start)
            .then(res => {
                this.count = res[0].DaChon;
                this.storage.set("count", this.count);
                if (this.count > 0 && this.flag === 1) {
                    this._webService.ShowLoading(IHomePage.ShowLoading);
                    this.navCtrl.push(TinTucPage, { id: this.IDuser });
                    return;
                } else {
                    this.webs1 = res;
                    this.webs2 = res;
                    // this.webs1.forEach(x => x.GiaTri ? this.count++ : this.count);
                }
                //Tạo grid view
                // console.log("chieu dai 1 : " + res.length);
                // this.gridview(res.length);
                return
            })
            .catch(err => console.log(err));
    }

    /**
     * @function Hàm tìm kiếm danh sách danh mục trên server
     *Truyền vào chuỗi tìm kiếm và ID user
     */

    search() {
        this._webService.getName(this.listFilter, this.IDuser)
            .then(web => {
                this.webs1 = web;
                // this.gridview(web.length)
            }).catch(errorMessage => {
                console.error(errorMessage.message)
            });

    }

    //Thành : 17/12/2016 19h40p Fix khi load thêm dữ liệu mới vào
    /**
     * @function Sự kiện cho hàm scollview khi kéo thêm load hêm dữ liệu vào danh sách
     */
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

    /**
     * @function Qua trang TinTucPage
     */
    nextToPage() {
        this._webService.ShowLoading(IHomePage.ShowLoading)
        this.navCtrl.push(TinTucPage, { id: this.IDuser });
    }

    /**
     * @function Sự kiện cho mỗi lần click vào sản phẩm để chọn
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

    /**
     * @function Sự kiện fillter khi ấn nút ẩn hiện
     */
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
