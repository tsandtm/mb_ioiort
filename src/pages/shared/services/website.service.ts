import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs'
import 'rxjs/add/operator/toPromise';

import { IWeb } from '../models/website.model';
import { url } from '../variables'
import { ServiceBase } from './service.base'
import { LoadingController, ToastController, Platform } from 'ionic-angular';

@Injectable()
export class WebsService extends ServiceBase {
    webs: IWeb[];
    private limit: number = 12;
    constructor(private http: Http, private toast: ToastController, private load: LoadingController, private platfrom: Platform) {
        super(toast, load, http, platfrom)
    }

    getWebs(start: number): Promise<IWeb[]> {
        return this.http.get(`${url}/website?limit=${this.limit}&offset=${start}`)
            .toPromise()
            .then(res => res.json() as IWeb[])
            .catch(this.handleError)
    }


    getList_user(id): Promise<IWeb[]> {
        return this.http.get(`${url}/getWebs/` + id)
            .toPromise()
            .then(response => response.json() as IWeb[])
            .catch(this.handleError);
    }


}