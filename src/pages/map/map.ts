import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ViewController, AlertController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

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

    this.showAlert('Start', 'bat dau load google map')

    if (google === undefined) {
      this.showAlert('Google undefined', 'google khong hoat dong');
    }

    this.service.layDanhSachDiem()
      .then(data => {
        this.showAlert('du lieu dia diem', JSON.stringify(data))
        this.loadMap(data);
      })
  }

  loadMap(data: DiaDiem[]) {


    Geolocation.getCurrentPosition().then((position) => {

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

      this.showAlert('Google Map', 'load map thành công');

    }, (err) => {
      this.showAlert('Loi geolication', JSON.stringify(err))
    });

  }

  addMarker(data: DiaDiem) {

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: new google.maps.LatLng(parseFloat(data.map_lat), parseFloat(data.map_long))
    }, (error) => {
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
      .catch(error => this.showAlert('Lỗi mạng', 'kết nối không được xin thử lại sau'));

    google.maps.event.addListener(marker, 'click', () => {

      let infoWindow = new google.maps.InfoWindow({
        content: content
      });
      infoWindow.open(this.map, marker);

    });

  }

  private showAlert(title: string, message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message
    })

    alert.present();
  }

  public dismiss() {
    console.log('cancel page')
    this.viewCtrl.dismiss();
  }


}
