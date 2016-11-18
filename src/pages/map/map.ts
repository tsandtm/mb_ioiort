import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform, ViewController, } from 'ionic-angular';
import { Service } from '../share/variables'

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
      this.loadMap(parseInt(data[0].map_lat), parseInt(data[0].map_long))

    })
  }

  loadMap(lat,long) {

    let latLng = new google.maps.LatLng(-34.9290, 138.6010);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

  }
}
