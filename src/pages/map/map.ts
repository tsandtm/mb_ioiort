import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public service: MapService, private viewCtrl: ViewController) {

  }

  ionViewDidLoad() {
    this.service.layDanhSachDiem()
      .then(data => {
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

    }, (err) => {
      console.log(err);
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
      .catch(error => alert('Lỗi kết nối hãy thử lại sau'));

    google.maps.event.addListener(marker, 'click', () => {

      let infoWindow = new google.maps.InfoWindow({
        content: content
      });
      infoWindow.open(this.map, marker);

    });

  }

  public dismiss() {
    console.log('cancel page')
    this.viewCtrl.dismiss();
  }


}
