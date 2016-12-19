import { Http, URLSearchParams } from '@angular/http';
import { ToastController } from 'ionic-angular';
import { Injectable } from '@angular/core';

import { ServiceBase } from '../share/service.base';
import { url as urlApi } from '../share/variables';

@Injectable()
export class LoginService extends ServiceBase {
  constructor(private toast: ToastController, private _http: Http) {
    super(toast);
  }

  public LoginToSever(user: any, pass: any): Promise<any> {
    let body = new URLSearchParams()
    body.set("UserName", user)
    body.set("pass", pass)
    return this._http.post(`${urlApi}POST_Login`, body)
      .toPromise()
      .then(respone => {
        console.log(respone.json());
        return respone.json();
      })
      .catch(this.handleError)


  }
}
