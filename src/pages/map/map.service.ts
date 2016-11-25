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


  public layDanhSachDiem(): Promise<DiaDiem[]>{
    let url = 'GET_ListDiemQuanTrac';
    return this._http.get(urlApi + url)
        .toPromise()
        .then(res => res.json())
        .catch(this.handleError)
  }

  public layThongTinDoDo(diemQuanTracId: number, soLuongThongSo: number): Promise<DiaDiem>{
    let url = `GET_ThongTinDiemQuanTracVaThongSoDoDo?DiemQuanTrac=${diemQuanTracId}&soLuongThongSo=${soLuongThongSo}`;
    return this._http.get(urlApi + url)
            .toPromise()
            .then(res => {
              return res.json();
            })
            .catch(this.handleError)
  }


}
