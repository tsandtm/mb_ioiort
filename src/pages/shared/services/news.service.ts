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
    getWebs(start: number): Promise<INews[]> {
        return new Promise(resolve => {
            this._http.get(`${url}/tintuc?limit=${this.limit}&offset=${start}`)
                .map(res => res.json())
                .subscribe(data => {

                    resolve(data);

                });
        });
    }


    /**key api cua tin quan tam lay tu server */
    tinquantam(id?: number): Promise<INews[]> {


        return new Promise(resolve => {
            this._http.get(`${(id) ? `${url}/tinquantam/${id}` : `${url}/tinquantam/`}`)
                .map(res => res.json())
                .subscribe(data => {

                    resolve(data);

                });
        });
    }
    //xoa tin quan tam minh` moi them vao
    public xoatinquantam(id: number): Promise<number> {
        return this._http.post(`${url}/api/xoa`, { id: id }).toPromise()
            .then(result => id)
            .catch(error => {
                console.error('Error: ', error);
                return Promise.reject(error);
            });
    }
    //load api tin noi bat 
    tinnoibat(start: number): Promise<INews[]> {
        return new Promise(resolve => {
            this._http.get(`${url}/tinnoibat?limit=${this.limit}&offset=${start}`)
                .map(res => res.json())
                .subscribe(data => {
                    console.log(data)
                    resolve(data);
                });
        });
    }
    //bo xoa nhung tin minh moi xoa luu trong lich su xoa
    public boxoa(id: number): Promise<number> {
        return this._http.post(`${url}/boxoa`, { id: id }).toPromise()
            .then(result => id)
            .catch(error => {
                console.error('Error: ', error);
                return Promise.reject(error);
            });
    }
    //api liet ke nhung tin minh moi xoa xong
    lktindaxoa(start: number): Promise<INews[]> {
        return new Promise(resolve => {
            this._http.get(`${url}/tindaxoa?limit=${this.limit}&offset=${start}`)
                .map(res => res.json())
                .subscribe(data => {

                    resolve(data);

                });
        });
    }
    /**
     * Xóa array đã xem
     */
    public daxem(id: number): Promise<number> {
        return this._http.post(`${url}/daxem`, { id: id }).toPromise()
            .then(result => id)
            .catch(error => {
                console.error('Error: ', error);
                return Promise.reject(error);
            });
    }
    /**
     * Xóa array đã xem
     */
    public themtin(id: number): Promise<number> {

        return this._http.post(`${url}/tintuc`, { id: id }).toPromise()
            .then(result => id)
            .catch(error => {
                console.error('Error: ', error);
                return Promise.reject(error);
            });
    }
    public xoatin(id: number): Promise<number> {
        return this._http.post(`${url}/xoatin`, { id: id }).toPromise()
            .then(result => id)
            .catch(error => {
                console.error('Error: ', error);
                return Promise.reject(error);
            });
    }
}