import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { ThongTinQuanTrac } from '../chart/thongtinquantrac';
import 'rxjs';
@Injectable()
export class Service {
  private url = `http://quantrac.nkengineering.com.vn/api/Static/`
  // private url = `http://test3.hutech.edu.vn/quantrac/api/Static/`
  constructor(private _http: Http, private _toast: ToastController) {
    this._http = _http
  }

  public LoginToSever(user: any, pass: any, url: string): Promise<any> {
    let body = new URLSearchParams()
    body.set("UserName", user)
    body.set("pass", pass)
    return this._http.post(`${this.url}${url}`, body)
      .toPromise()
      .then(respone => {
        console.log(respone.json());
        return respone.json();
      })
      .catch(this.handleError)


  }


  /**
   * Get_DataInfo_Service
   */
  public GetData(url: string) {
    return this._http.get(`${this.url}${url}`)
      .toPromise()
      .then(respone => {
        return JSON.parse(respone['_body'])
      })
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
      position: `bottom`,
      duration: 2000,
      message: mess
    })
    toast.present()
  }

  public getThongTinQuanTrac(url: string) {
    return this._http.get(this.url + url)
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
      qt.time = new Date(value.time);
      return qt;
    })

    return ttqt;
  }
}
