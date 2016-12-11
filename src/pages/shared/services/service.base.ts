import { ToastController, LoadingController } from 'ionic-angular';
import { urllog } from '../variables'
import { Platform } from 'ionic-angular';
import { Http, URLSearchParams } from '@angular/http';
export abstract class ServiceBase {

    constructor(private _toast?: ToastController, private _loadingCtrl?: LoadingController, private _http?: Http, private _platfrom?: Platform) {

    }

    public handleError = (error: Error): Promise<any> =>{
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        this.LogError(error,"Lỗi")
        return Promise.reject(error.message || error);

    }
    /**
     * hiện thông báo nhỏ
     */
    public ShowToastOK = (mess: string,
        option: { position?: string, duration?: number } = {}) => {
        let position = option.position || 'bottom';
        let duration = option.duration || 2000;
        let toast = this._toast.create({
            position: position,
            duration: duration,
            message: mess
        })
        toast.present()
    }

    /**
     * dismissOnPageChange: true
     */
    public ShowLoading = (mess: string) => {
        let load = this._loadingCtrl.create({
            content: mess,
            dismissOnPageChange: true
        });
        load.present();
    }
    public LogError(err: Error, TieuDeLog?: string) {
        let body = new URLSearchParams()
        body.set("TextLog", JSON.stringify(err) || err.message );
        let platfrom = (this._platfrom.is('ios')) ? 'ios' : this._platfrom.is('android') ? 'android' : this._platfrom.is('windows') ? 'windows' : 'thiet bi con lai';
        body.set("Platform", platfrom)
        body.set("TieuDeLog","Lỗi")
        body.set("UngDung", "App Tin tức siêu thân thiện")
        this._http.post(`${urllog}log`, body).toPromise()
            .then(result => {
                (result.status === 200) ?
                    console.log(`send LogError`) : console.log(`Error khi send Log`)
            })
            .catch(this.handleError)
    }
}