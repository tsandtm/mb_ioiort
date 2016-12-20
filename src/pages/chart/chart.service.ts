import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { ToastController, AlertController } from 'ionic-angular';
import * as moment from 'moment';

import { ServiceBase } from '../share/service.base';
import { ThongTinQuanTrac } from './thongtinquantrac';
import { url as urlApi } from '../share/variables';
import 'rxjs';

@Injectable()
export class ChartService extends ServiceBase {
  constructor(private toast: ToastController, private _http: Http, private Alert: AlertController) {
    super(toast);
  }

  /**
   * lấy thông tin quản trắc từ api
   */
  public getThongTinQuanTrac(url: string) {
    return this._http.get(urlApi + url)
      .map(res => res.json())
      .map((json) => {
        let ttqt = this.convertToThongTinQuanTrac(json);
        return ttqt;
      })
  }


  /**
 * chuyển json thành thông tin quản trắc
 */
  private convertToThongTinQuanTrac(json: any[]): ThongTinQuanTrac[] {

    this.Alert.create({
      title: 'json quan trac',
      message: JSON.stringify(json),
    }).present()

    let ttqt = json.map(value => {
      let qt: ThongTinQuanTrac = new ThongTinQuanTrac();
      qt.ColumnName = value.ColumnName;
      qt.DiemQuanTracID = value.DiemQuanTracID;
      qt.DoDo_ID = value.DoDo_ID;
      qt.DoDo_Name = value.DoDo_Name;
      qt.DonViTinh = value.DonViTinh;
      qt.id = value.id;
      qt.PropertyValueDecimal = value.PropertyValueDecimal;
      qt.PropertyValueString = value.PropertyValueString;
      qt.time = moment(value.time).toDate();
      return qt;
    })

    return ttqt;
  }

}
