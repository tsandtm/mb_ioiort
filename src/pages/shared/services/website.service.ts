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

    getName(value: string,IDUser:number): Promise<IWeb[]> {
        return new Promise(resolve => {
            this.http.get(`${url}/getName?string=${value}&IDUser=${IDUser}`)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                });
        });
    }

    GetList(id: number, offset: number): Promise<IWeb[]> {
        return this.http.get(`${url}/GetList/${id}?limit=${this.limit}&offset=${offset}`)
            .toPromise()
            .then(res => res.json() as IWeb[])
            .catch(this.handleError)
    }
}