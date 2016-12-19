import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, ViewController, AlertController, Alert } from 'ionic-angular';
import { ThongTinQuanTrac } from './thongtinquantrac';
import { ChartService } from './chart.service';

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
  settime: any
  options: any;
  chart: any;
  past: any = {};
  isLoading = true;
  errorMessage: string = "";
  summary: {
    time: Date,
    info: Array<{ name: string, value: number, DonViTinh: string }>
  };



  constructor(public navCtrl: NavController,
    private _http: Http,
    public viewCtrl: ViewController,
    private service: ChartService,
    private alertCrl: AlertController) {

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
        spacingLeft: 3
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
      },
      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              align: 'center',
              verticalAlign: 'bottom',
              layout: 'horaizontal'
            },
            yAxis: {
              labels: {
                align: 'left',
                x: 0,
                y: -5
              },
              title: {
                text: null
              }
            },
            subtitle: {
              text: null
            },
            credits: {
              enable: false
            }
          }
        }]
      }
    };
    return options;
  }

  public saveInstance(charInstance) {
    this.chart = charInstance;
  }

  private showAlert(title: string, message: string) {
    let alert = this.alertCrl.create({
      title: title,
      message: message
    })

    alert.present();
  }

  /**
   * Gọi đến api get để lấy 60 giá trị đầu
   */
  callApi() {
    this.getData(75)
      .subscribe((ttqt: ThongTinQuanTrac[]) => {
        this.isLoading = false;
        if (ttqt.length !== 0) {
          this.addDataToChart(ttqt);
        } else {
          this.showAlert('Lỗi khi lấy dữ liệu', 'Hiện tại không có dữ liệu')
          this.showError('Hiện tại không có dữ liệu');
        }

      }, (error) => {
        console.error('Error: ', error);
        this.showError(error._body);
        this.showAlert('Lỗi khi lấy dữ liệu', JSON.stringify(error));
      }, () => {

        this.showAlert('Hoàn thành lấy dữ liệu', 'Success')
      })
  }

  showError(message: string) {
    this.isLoading = false;
    this.errorMessage = message;
  }

  /**
   * cái service để gọi xuống api
   */
  private getData(sl: number) {
    return this.service.getThongTinQuanTrac('GET_ListThongTinQuanTrac?checkfirst=1&dodo=%27coldata12%27,%27coldata9%27,%27coldata13%27,%27coldata10%27,%27coldata32%27&diemquantrac=2&tongsododo=' + sl)
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

    this.showAlert('Summary duoc tao', JSON.stringify(this.summary));
  }

  /**
   * thêm dữ liệu vào biểu đồ và đặt thời gian chạy update
   */
  private addDataToChart(thongtinquantrac: ThongTinQuanTrac[]) {

    this.showAlert('So luong du lieu duoc luu vao', thongtinquantrac.length.toString())

    for (let i = 0; i < 4; i++) {
      this.chart.addSeries({
        name: thongtinquantrac[i].DoDo_Name,
        data: []
      }, false);
      this.past[thongtinquantrac[i].DoDo_Name] = thongtinquantrac[i].time;
    }

    this.past[thongtinquantrac[4].DoDo_Name] = thongtinquantrac[4].time;

    this.createAndUpdateSummary(thongtinquantrac.slice(0, 5))

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
    let qtToUpdate: ThongTinQuanTrac[] = [];
    this.getData(5).subscribe(
      (ttqt) => {
        ttqt.forEach(qt => {
          if (this.past[qt.DoDo_Name].getTime() !== qt.time.getTime()) {
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
        this.showAlert('Lỗi khi cap nhat du lieu', JSON.stringify(error))
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

  onPageWillLeave() {
    console.log('leave page')
    this.dismiss();
  }

  /**
   *
   */
  public dismiss() {
    console.log('cancel page')
    clearInterval(this.settime);
    this.viewCtrl.dismiss();
  }

}
