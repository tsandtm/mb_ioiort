import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import 'rxjs';
@Injectable()
export class Service {
    private url = `http://test3.hutech.edu.vn/quantrac/api/Static/`
    constructor(private _http: Http, private _toast: ToastController) {
        this._http = _http
    }

    public LoginToSever(user: any, pass: any, url: string): Promise<any> {
        let body = new URLSearchParams()
        body.set("Username", user)
        body.set("pass", pass)
        return this._http.post(`${this.url}${url}`, body)
            .toPromise()
            .then(respone => respone['_body'])
            .catch(this.handleError)
    }

    /**
     * Get_DataInfo_Service
     */
    public GetData(url: string) {
        return this._http.get(`${this.url}${url}`)
            .toPromise()
            .then(respone => { JSON.parse(respone['_body']) })
            .catch(this.handleError)
    }

    private handleError(error: Error): Promise<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Promise.reject(error.message || error);
        // return Observable.throw(error.json().error || 'Server error');

    }
    public ShowToastOK = (mess: string) => {
        let toast = this._toast.create({
            position: `middle`,
            duration: 2000,
            message: mess
        })
        toast.present()
    }
}
