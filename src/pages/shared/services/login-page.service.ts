import { Http } from '@angular/http';
import { ToastController, Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { ServiceBase } from './service.base';
import { urllogin,url,urlLoginFace } from '../variables'

@Injectable()
export class LoginService extends ServiceBase {

    constructor(private http: Http, private toast: ToastController, private platfrom: Platform) {
        super(toast, null, http, platfrom)
    }
    public LoginToSever(user: any, pass: any): Promise<any> {
        return this.http.post(`${urllogin}/login`,{TaiKhoan:user,Password:pass})
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

    public GetCount(id: number): Promise<any> {
        return this.http.post(`${url}/getCountNews`, { id }).toPromise().then(res => { return res.json() }).catch(err => { return 0 });
    }
    public GetCountFacebook(Facebook): Promise<any> // sua nay lai
    {
        return this.http.post(`${urlLoginFace}/GetUserFacebook`, { Facebook: Facebook }).toPromise().then(res => { console.log(res); return res.json(); });
    }
    public InserUserFacebook(Facebook, name, email, token): Promise<any> // sua nay lai
    {
        console.log("facebook:" + Facebook);
        return this.http.post(`${urlLoginFace}/InsertUserFacebook`, { Facebook: Facebook, name: name, email: email, token: token }).toPromise().then(res => { console.log(res); return res.json(); }).catch(err => { return 0 });
    }
}

