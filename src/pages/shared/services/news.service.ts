import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs'
import 'rxjs/add/operator/toPromise';
import { INews } from '../models/news.model';
import { url } from '../variables';
import { ServiceBase } from './service.base'
import { LoadingController, ToastController } from 'ionic-angular';

@Injectable()
export class NewsService extends ServiceBase {

    private limit: number = 6;
    constructor(private _http: Http, private toast: ToastController, private load: LoadingController) {
        super(toast, load);
    }

    /**api load tat ca cac tin moi tru nhung tin minh da xoa */
    getWebs(id, start: number): Promise<INews[]> {
        return new Promise(resolve => {
            this._http.get(`${url}/tintuc/${id}?limit=${this.limit}&offset=${start}`)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                });
        });
    }


    /**key api cua tin quan tam lay tu server */

    tinquantam(id, start: number, IDUser?): Promise<INews[]> {
        return new Promise(resolve => {
            this._http.get(`${!IDUser ? ` ${url}/tinquantam/${id}?limit=${this.limit}&offset=${start}` :
                ` ${url}/tinquantam/${id}/${IDUser}?limit=${this.limit}&offset=${start}`}   `)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                });
        });
    }
    //xoa tin quan tam minh` moi them vao

    public xoatinquantam(id: number, IDUser): Promise<number> {
        return this._http.post(`${url}/xoa`, { id: id, IDUser: IDUser }).toPromise()
            .then(result => id)
            .catch(error => {
                console.error('Error: ', error);
                return Promise.reject(error);
            });
    }
    //load api tin noi bat 

    tinnoibat(id, start: number): Promise<INews[]> {
        return new Promise(resolve => {
            this._http.get(`${url}/tinnoibat/${id}?limit=${this.limit}&offset=${start}`)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);

                });
        });
    }
    //bo xoa nhung tin minh moi xoa luu trong lich su xoa

    public boxoa(id: number, IDUser): Promise<number> {
        return this._http.post(`${url}/boxoa`, { id: id, IDUser: IDUser }).toPromise()
            .then(result => id)
            .catch(error => {
                console.error('Error: ', error);
                return Promise.reject(error);
            });
    }
    //api liet ke nhung tin minh moi xoa xong

    lktindaxoa(id, start: number): Promise<INews[]> {
        return new Promise(resolve => {
            this._http.get(`${url}/tindaxoa/${id}?limit=${this.limit}&offset=${start}`)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                });
        });
    }
    public daxem(id: number, IDUser): Promise<number> {
        return this._http.post(`${url}/daxem`, { id: id, IDUser: IDUser }).toPromise()
            .then(result => id)
            .catch(error => {
                console.error('Error: ', error);
                return Promise.reject(error);
            });
    }

    public themtin(id: number, IDUser): Promise<number> {
        return this._http.post(`${url}/tintuc`, { id: id, IDUser: IDUser }).toPromise()
            .then(result => id)
            .catch(error => {
                console.error('Error: ', error);
                return Promise.reject(error);
            });
    }

    public xoatin(id: number, IDUser): Promise<number> {
        return this._http.post(`${url}/xoatin`, { id: id, IDUser: IDUser }).toPromise()
            .then(result => id)
            .catch(error => {
                console.error('Error: ', error);
                return Promise.reject(error);
            });
    }
}