import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs'
import 'rxjs/add/operator/toPromise';

import { User_Web } from './user_website.model';

@Injectable()
export class UserWebService {
    user_webs: User_Web[];

    constructor(private http: Http) { }

    public createUserWebSite(idUser: number, idDanhMuc: number, createdDate: Date): Promise<User_Web> {
        let user_web = new User_Web();
        user_web.IDUser = idUser;
        user_web.IDDanhMucSite = idDanhMuc;
        user_web.CreatedDate = createdDate;
        return this.http.post('http://localhost:8080/api/userwebsite', user_web)
            .toPromise()
            .then(result => user_web)
            .catch(error => {
                console.error('Error: ', error);
                return Promise.reject(error);
            });
    }

    public deleteUserWebSite(idUser: any, idDanhMuc: any): Promise<boolean> {
        // let user_web = new User_Web();
        // user_web.IDUser = idUser;
        // user_web.IDDanhMucSite = idDanhMuc;
        // let headers = new Headers();
        // headers.set('Content-Type', 'application/x-www-form-urlencoded')
        // let body = new URLSearchParams();
        // body.set(`IDUser`,idUser);
        // body.set('IDDanhMucSite',idDanhMuc);
        return this.http.delete('http://localhost:8080/api/userwebsite?idUser=' + idUser + '&idDanhMuc=' + idDanhMuc)
            .toPromise()
            .then(() => true)
            .catch(error => {
                console.error('Error: ', error);
                return Promise.reject(error);
            });
    }

}
