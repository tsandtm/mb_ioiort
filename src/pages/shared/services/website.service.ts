import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs'
import 'rxjs/add/operator/toPromise';
import { ServiceBase } from './service.base';
import { IWeb } from '../models/website.model';
import { url } from '../variables';
@Injectable()
export class WebsService extends ServiceBase{
    // private _newsUrl = 'api/json/news.json';
    webs: IWeb[];
    constructor(private _http: Http) { 
        super();
    }

    getWebs(limit,start: number): Promise<IWeb[]> {
        return new Promise(resolve => {
            this._http.get(`${url}/website?limit=${limit}&offset=${start}`)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                });
        });
    }

    getList_user(id): Promise<IWeb[]> {
        return this._http.get(`${url}/getWebs/`+id)
            .toPromise()
            .then(response => response.json() as IWeb[])
            .catch(this.handleError);
    }

    
}