import { Http } from '@angular/http';
import { ToastController } from 'ionic-angular';
import { Injectable } from '@angular/core';

import { ServiceBase } from '../shared/service.base';

@Injectable()
export class LoginService extends ServiceBase {
  urlAPI = `localhost:8080/tintuc/`
 
  constructor(private _http: Http,private toast:ToastController) {
    super(toast)
  }
  public LoginToSever(user: any, pass: any): Promise<any> {
    let U = new User()
    U.TaiKhoan = user;
    U.Password = pass;
    return this._http.post(`http://localhost:8080/tintuc/login`, U)
      .toPromise()
      .then(respone => {
        if (respone.status == 200) {
          console.log();
          return `OK`;
        }
        if(respone.status == 400)
          return `Khong Co`
      })
      .catch(this.handleError)
  }
}

/**
 * User
 */
class User {
  TaiKhoan: string
  Password: string
  constructor() { }
}