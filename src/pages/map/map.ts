import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Service } from '../share/variables'
import { Geolocation } from 'ionic-native';

declare var google;

@Component({
  selector: 'map-page',
  templateUrl: 'map.html'
})
export class Map {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public service: Service) {

  }

  ionViewDidLoad() {
    this.service.GetData(`Get_ThongTinDiaDiem`).then(data => {
      this.loadMap(parseFloat(data[0].map_lat), parseFloat(data[0].map_long),data[0])

    })
  }

  loadMap(lat, long,data:{}) {

    console.log('Lat: ' + lat);
    console.log('Long: ' + long);
    // let latLng = new google.maps.LatLng(-34.9290, 138.6010);

    // let mapOptions = {
    //   center: latLng,
    //   zoom: 15,
    //   mapTypeId: google.maps.MapTypeId.ROADMAP
    // }

    // this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    Geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(lat, long);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.addMarker(data)

    }, (err) => {
      console.log(err);
    });

  }

  addMarker(data:{}) {

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = `
    <h3>${data['TenGoi']}</h3>
    <p>Địa chỉ: ${data['DiaChi']}</p>
    `;

    this.addInfoWindow(marker, content);

  }

  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }
}
