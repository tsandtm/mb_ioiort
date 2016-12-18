import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs'
import 'rxjs/add/operator/toPromise';
import { User_Web } from '../models/user_website.model';
import { Platform } from 'ionic-angular';
import { ServiceBase } from './service.base';
import { url } from '../variables';
@Injectable()
export class UserWebService extends ServiceBase {
    user_webs: User_Web[];

    constructor(private http: Http,private platform:Platform) {
        super(null,null,http,platform);
    }

    public createUserWebSite(idUser: number, idDanhMuc: number, createdDate: Date): Promise<User_Web> {
        let user_web = new User_Web();
        user_web.IDUser = idUser;
        user_web.IDDanhMucSite = idDanhMuc;
        user_web.CreatedDate = createdDate;
        return this.http.post(`${url}/userwebsite`, user_web)
            .toPromise()
            .then(result => user_web as User_Web)
            .catch(this.handleError);
    }

    public deleteUserWebSite(idUser: any, idDanhMuc: any): Promise<boolean> {
        return this.http.get(`${url}/deleteuserwebsite?idUser=${idUser}&idDanhMuc=${idDanhMuc}`)
            .toPromise()
            .then(() => true)
            .catch(this.handleError);
    }


    public selectuser(id: any): Promise<boolean> {
        return this.http.get(`${url}/userwebsite?idUser=${id}`)
            .toPromise()
            .then((mess) => {
                if (mess.status == 200)
                    return true
                if (mess.status == 400)
                    return false
            })
            .catch(this.handleError);
    }

}
