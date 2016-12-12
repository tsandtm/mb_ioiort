import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs'
import 'rxjs/add/operator/toPromise';
import { INews } from '../models/news.model';
import { url } from '../variables';
import { ServiceBase } from './service.base'
import { LoadingController, ToastController, Platform } from 'ionic-angular';

@Injectable()
export class NewsService extends ServiceBase {

    private limit: number = 6;
    constructor(private http: Http, private toast: ToastController, private load: LoadingController, private platfrom: Platform) {
        super(toast, load, http, platfrom);
    }

    /**api load tat ca cac tin moi tru nhung tin minh da xoa */
    getWebs(id, start: number,limit:number = this.limit): Promise<INews[]> {
        return this.http.get(`${url}/tintuc/${id}?limit=${limit}&offset=${start}`)
                .toPromise()
                .then(res => res.json() as INews[])
                .catch(this.handleError)
       
    }


    /**key api cua tin quan tam lay tu server */

    tinquantam(id, start: number, IDUser?): Promise<INews[]> {
        return this.http.get(`${!IDUser ? ` ${url}/tinquantam/${id}?limit=${this.limit}&offset=${start}` :
                ` ${url}/tinquantam/${id}/${IDUser}?limit=${this.limit}&offset=${start}`}   `)
                .toPromise()
                .then(res => res.json() as INews[])
                .catch(this.handleError)
       
    }
    //xoa tin quan tam minh` moi them vao

    public xoatinquantam(id: number, IDUser): Promise<number> {
        return this.http.post(`${url}/xoa`, { id: id, IDUser: IDUser }).toPromise()
            .then(result => id)
            .catch(this.handleError)
    }
    //load api tin noi bat 

    tinnoibat(id, start: number): Promise<INews[]> {
        return  this.http.get(`${url}/tinnoibat/${id}?limit=${this.limit}&offset=${start}`)
                .toPromise()
                .then(res => res.json())
                .catch(this.handleError)
        
    }
    //bo xoa nhung tin minh moi xoa luu trong lich su xoa

    public boxoa(id: number, IDUser): Promise<number> {
        return this.http.post(`${url}/boxoa`, { id: id, IDUser: IDUser }).toPromise()
            .then(result => id as number)
            .catch(this.handleError)
    }
    //api liet ke nhung tin minh moi xoa xong

    lktindaxoa(id, start: number): Promise<INews[]> {
        return  this.http.get(`${url}/tindaxoa/${id}?limit=${this.limit}&offset=${start}`)
                .toPromise()
                .then(res => res.json() as INews[])
                .catch(this.handleError)
       
    }
    public daxem(id: number, IDUser): Promise<number> {
        return this.http.post(`${url}/daxem`, { id: id, IDUser: IDUser }).toPromise()
            .then(result => id as number)
            .catch(this.handleError);
    }

    public themtin(id: number, IDUser): Promise<number> {
        return this.http.post(`${url}/tintuc`, { id: id, IDUser: IDUser }).toPromise()
            .then(result => id as number)
            .catch(this.handleError);
    }

    public xoatin(id: number, IDUser): Promise<number> {
        return this.http.post(`${url}/xoatin`, { id: id, IDUser: IDUser }).toPromise()
            .then(result => id)
            .catch(this.handleError);
    }
}