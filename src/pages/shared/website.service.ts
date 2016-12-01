import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs'
import 'rxjs/add/operator/toPromise';

import { IWeb } from './website.model';

@Injectable()
export class WebsService {
    // private _newsUrl = 'api/json/news.json';
    webs: IWeb[];
    private limit: number = 12;
    constructor(private _http: Http) { }

    getWebs(start: number): Promise<IWeb[]> {
        return new Promise(resolve => {
            this._http.get('http://localhost:8080/api/website?limit=' + this.limit + '&skip=' + start)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                });
        });
    }

    getList_user(): Promise<IWeb[]> {
        return this._http.get('http://localhost:8080/api/getWebs')
            .toPromise()
            .then(response => response.json() as IWeb[])
            .catch(this.handleError);
    }

    getWeb(id: number): Promise<IWeb> {
        return this.getWebs(0)
            .then(inew => inew.find(p => p.IDDanhMucSite === id))
            .catch(this.handleError);
    }




    // //Them website duyet tin
    // updateShow_add(id: number): Promise<IWeb> {

    //     return this._http.put('http://localhost:8080/api/website?id=' + id, { show: true })
    //         .toPromise()
    //         .then(response => response.json() as IWeb)
    //         .catch(this.handleError);
    // }
    // //Xoa website duyet tin
    // updateShow_delete(id: number): Promise<IWeb> {

    //     return this._http.put('http://localhost:8080/api/website?id=' + id, { show: false })
    //         .toPromise()
    //         .then(response => response.json() as IWeb)
    //         .catch(this.handleError);
    // }

    private handleError(error: Error): Promise<any> {
        console.error(error);
        return Promise.reject(error.message || error);
    }
}