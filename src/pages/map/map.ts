import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ViewController, AlertController } from 'ionic-angular';

import { MapService } from './map.service';
import { DiaDiem } from './diadiem.model';

declare var google;

@Component({
  selector: 'map-page',
  templateUrl: 'map.html'
})
export class Map {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController,
    public service: MapService,
    private viewCtrl: ViewController,
    private alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    this.service.layDanhSachDiem()
      .then(data => {
        this.loadMap(data);
      })
  }

  loadMap(data: DiaDiem[]) {

    this.alertCtrl.create({
      title: 'Thông báo',
      message: 'Đang load map',
      buttons: ['Ok'],
      cssClass: 'alertSuccess'
    }).present();

    let latLng = new google.maps.LatLng(parseFloat(data[0].map_lat), parseFloat(data[0].map_long));

    let mapOptions = {
      center: latLng,
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    data.forEach(diaDiem => {
      this.addMarker(diaDiem);
    })


  }

  addMarker(data: DiaDiem) {

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: new google.maps.LatLng(parseFloat(data.map_lat), parseFloat(data.map_long))
    }, (error) => {
      this.showErrorAlert(JSON.stringify(error))
      console.error(error)
    });

    let content = `
      <h4>${data.TenGoi}</h4>
      <p>Địa chỉ: ${data.DiaChi}</p>
      <p>Người phụ trách: ${data.NguoiPhuTrach}</p>
    `;

    this.service.layThongTinDoDo(data.DiemQuanTracID, 4)
      .then(data => {
        content += data;
      })
      .catch(error => this.showErrorAlert('Lỗi mạng: kết nối không được xin thử lại sau'));

    google.maps.event.addListener(marker, 'click', () => {

      let infoWindow = new google.maps.InfoWindow({
        content: content
      });
      infoWindow.open(this.map, marker);

    });

  }

  private showErrorAlert(message: string) {
    let alert = this.alertCtrl.create({
      title: 'Error',
      message: message,
      cssClass: 'alertError',
      buttons: ['Ok']
    });

    alert.present();
  }

  public dismiss() {
    console.log('cancel page')
    this.viewCtrl.dismiss();
  }


}
