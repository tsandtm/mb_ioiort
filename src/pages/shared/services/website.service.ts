import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs'
import 'rxjs/add/operator/toPromise';

import { IWeb } from '../models/website.model';
import { url } from '../variables'
import { ServiceBase } from './service.base'
import { LoadingController, ToastController } from 'ionic-angular';

@Injectable()
export class WebsService extends ServiceBase {
    webs: IWeb[];
    private limit: number = 12;
    constructor(private _http: Http, private toast: ToastController, private load: LoadingController) {
        super(toast, load)
    }

    getWebs(start: number,limit:any): Promise<IWeb[]> {
        return new Promise(resolve => {
            this._http.get(`${url}/website?limit=${limit}&offset=${start}`)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                });
        });
    }

     getName(value: string): Promise<IWeb[]> {
        return new Promise(resolve => {
            this._http.get(`${url}/getName?string=${value}`)
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