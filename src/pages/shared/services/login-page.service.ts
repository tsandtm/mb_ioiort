import { Http } from '@angular/http';
import { ToastController, Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { ServiceBase } from './service.base';
import { IUser } from '../models/user.model';
import {urllogin} from '../variables'
@Injectable()
export class LoginService extends ServiceBase {

    urlAPI = `localhost:8080/tintuc/`

    constructor(private http: Http, private toast: ToastController, private platfrom: Platform) {
        super(toast, null, http, platfrom)
    }
    public LoginToSever(user: any, pass: any): Promise<any> {
        let U: IUser = {
            TaiKhoan: user,
            Password: pass
        }
        return this.http.post(`${urllogin}/login`, U)
            .toPromise()
            .then(respone => {
                if (respone.status == 200) {
                    console.log("id " + respone);
                    return respone;
                }
                if (respone.status == 400)
                    return 0;
            })
            .catch(this.handleError)
    }
}

