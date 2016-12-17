import { Http } from '@angular/http';
import { ToastController, Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { ServiceBase } from './service.base';
import { IUser } from '../models/user.model';
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
        return this.http.post(`http://localhost:8080/tintuc/login`, U)
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
    // login bebinh nay` nua ne 
    // public GetLogin(user: any, pass: any): Promise<any> {
    //     let U: IUser = {
    //         TaiKhoan: user,
    //         Password: pass
    //     }

    //     return this._http.post(`http://localhost:8080/tintuc/login`, U)
    //         .toPromise()
    //         .then(respone => {
    //             let id = respone.json().id;
    //             return id;
    //         })
    //         .catch(this.handleError)
    // }
    public GetCount(id: number): Promise<any> {
        return this._http.post(`http://localhost:8080/api/getCountNews`, { id }).toPromise().then(res => { return res.json() }).catch(err => { return 0 });
    }
    //login bebinh
    //login facebook
    public GetCountFacebook(Facebook): Promise<any> // tra ve id user
    {
        return this.http.post(`${urlLoginFace}/GetUserFacebook`, { Facebook: Facebook }).toPromise().then(res => { console.log(res); return res.json(); });
    }
    public InserUserFacebook(Facebook, name, email, token): Promise<any> // them user neu chua co
    {
        console.log("facebook:" + Facebook);
        return this.http.post(`${urlLoginFace}/InsertUserFacebook`, { Facebook: Facebook, name: name, email: email, token: token }).toPromise().then(res => { console.log(res); return res.json(); }).catch(err => { return 0 });
    }
    //login facebook
}

