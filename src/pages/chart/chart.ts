import { Component } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { NavController, ViewController } from 'ionic-angular';
import { ThongTinQuanTrac } from './thongtinquantrac';

/*
  Generated class for the PageChart page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-page-chart',
  templateUrl: 'chart.html'
})
export class PageChartPage {
  settime:any
  options: any;
  chart: any;
  past: any = {};
  isLoading = true;
  errorMessage: string = "";
  summary: {
    time: Date,
    info: Array<{ name: string, value: number, DonViTinh: string }>
  };



  constructor(public navCtrl: NavController, private _http: Http, public viewCtrl: ViewController) {

  }



  ionViewDidLoad() {
    this.options = this.createChartOption();

    this.callApi();
  }

/**
 *  tạo biểu đồ
 */
  private createChartOption() {
    let options = {
      chart: {
        type: 'spline',
        spacingLeft: 3,
        width: 350,
        height: 400
      },
      title: { text: null },
      series: [],
      credits: {
        enabled: false
      },
      xAxis: {
        title: {
          text: null
        },
        type: 'datetime',
        tickInterval: 300000,
        dateTimeLabelFormats: {
          day: '%H:%M'
        }
      },
      yAxis: {
        title: {
          text: null
        }
      }
    };
    return options;
  }

  public saveInstance(charInstance) {
    this.chart = charInstance;
  }

/**
 * Gọi đến api get để lấy 60 giá trị đầu
 */
  callApi() {
    this.service(60)
      .subscribe(
      (ttqt: ThongTinQuanTrac[]) => {
        this.isLoading = false;
        this.addDataToChart(ttqt);
      },
      (error) => {
        console.error('Error: ', error);
        this.showError(error._body);
       })
  }

  showError(message: string){
    this.isLoading = false;
    this.errorMessage = message;
  }

/**
 * cái service để gọi xuống api
 */
  private service(sl: number) {
    return this._http
      .get('http://quantrac.nkengineering.com.vn/api/Static/GET_ListThongTinQuanTrac?checkfirst=1&dodo=%27coldata12%27,%27coldata9%27,%27coldata13%27,%27coldata10%27&diemquantrac=2&tongsododo=' + sl)
      .map(res => res.json())
      .map(json => {
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

/**
 * tạo và update Summary
 */
  private createAndUpdateSummary(ttqt: ThongTinQuanTrac[]) {
    let a = [];
    ttqt.forEach(qt => {
      a.push({ name: qt.DoDo_Name, value: qt.PropertyValueDecimal, DonViTinh: qt.DonViTinh });
    })
    this.summary = {
      time: ttqt[0].time,
      info: a,
    };
  }

/**
 * thêm dữ liệu vào biểu đồ và đặt thời gian chạy update
 */
  private addDataToChart(thongtinquantrac: ThongTinQuanTrac[]) {
    for (let i = 0; i < 4; i++) {
      this.chart.addSeries({
        name: thongtinquantrac[i].DoDo_Name,
        data: []
      }, false);
      this.past[thongtinquantrac[i].DoDo_Name] = thongtinquantrac[i].time;
    }

    this.createAndUpdateSummary(thongtinquantrac.slice(0, 4))

    thongtinquantrac.forEach(ttqt => {
      this.chart.series.forEach(sery => {
        if (sery.name === ttqt.DoDo_Name) {
          sery.addPoint([Date.UTC(ttqt.time.getFullYear(),
            ttqt.time.getMonth(),
            ttqt.time.getDate(),
            ttqt.time.getHours(),
            ttqt.time.getMinutes(),
            ttqt.time.getSeconds()), ttqt.PropertyValueDecimal], false);
        }
      })
    });

    this.chart.redraw();

    this.settime = setInterval(() => {
      this.checkPast();
    }, 20000);
  }

/**
 * kiểm tra dữ liệu có thay đổi
 */
  private checkPast() {
    console.log('chay');
    let qtToUpdate: ThongTinQuanTrac[] = [];
    this.service(4).subscribe(
      (ttqt) => {
        ttqt.forEach(qt => {
          if (this.past[qt.DoDo_Name].getTime() !== qt.time.getTime()) {
            console.log('past: ' + this.past[qt.DoDo_Name].getTime())
            console.log('now: ' + qt.time.getTime())
            qtToUpdate.push(qt);
            this.past[qt.DoDo_Name] = qt.time;
          }
        })

        if (qtToUpdate.length !== 0) {
          this.createAndUpdateSummary(ttqt)
          this.updateChart(qtToUpdate);
        }
      },
      (error) => {
        console.error('Error: ', error);
        this.showError(error._body);
       }
    )
  }

/**
 * update cái biểu đồ
 */
  private updateChart(qt: ThongTinQuanTrac[]) {
    qt.forEach(ttqt => {
      this.chart.series.forEach(sery => {
        if (sery.name === ttqt.DoDo_Name) {
          sery.addPoint([Date.UTC(ttqt.time.getFullYear(),
            ttqt.time.getMonth(),
            ttqt.time.getDate(),
            ttqt.time.getHours(),
            ttqt.time.getMinutes(),
            ttqt.time.getSeconds()), ttqt.PropertyValueDecimal], false, true);
        }
      })
    })
    this.chart.redraw();
  }

/**
 *
 */
  public dismiss(){
    clearInterval(this.settime);
    this.viewCtrl.dismiss();
  }

}
