import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs'
import 'rxjs/add/operator/toPromise';

import { IWeb } from '../models/website.model';
import { url as urlApi } from '../shared/variables';
import { ServiceBase } from './service.base';

@Injectable()
export class WebsService extends ServiceBase {


    constructor(private _http: Http) {
        super();
    }

    getWebs(limit: any = 'all', offset: number = 0): Promise<IWeb[]> {
        return this._http.get(urlApi + '/website?limit=' + limit + '&offset=' + offset)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }


    getOneWebById(id: number): Promise<IWeb> {
        return this._http.get(urlApi + 'website?id=' + id)
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }


}
