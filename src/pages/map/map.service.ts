import { Http } from '@angular/http';
import { ToastController } from 'ionic-angular';
import { Injectable } from '@angular/core';


import { ServiceBase } from '../share/service.base';
import { url as urlApi } from '../share/variables';
import {DiaDiem} from './diadiem.model';

@Injectable()
export class MapService extends ServiceBase {

  constructor(private toast: ToastController, private _http: Http) {
    super(toast);
  }


  /**
   * Get_DataInfo_Service
   */
  public GetData(url: string) {
    return this._http.get(`${urlApi}${url}`)
      .toPromise()
      .then(respone => {
        return JSON.parse(respone['_body'])
      })
      .catch(this.handleError)
  }

  public layDanhSachDiem(url: string): Promise<DiaDiem[]>{
    return this._http.get(urlApi + url)
          .toPromise()
          .then(res => {
            return res.json();
          })
          .catch(this.handleError)
  }

  public layThongTinDoDo(url: string): Promise<DiaDiem>{
    return this._http.get(urlApi + url)
            .toPromise()
            .then(res => {
              return res.json();
            })
            .catch(this.handleError)
  }


}
