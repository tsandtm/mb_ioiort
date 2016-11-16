import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Service } from '../share/variables'
import { Http } from '@angular/http';
import {
  GoogleMap, GoogleMapsEvent, GoogleMapsLatLng,
  CameraPosition, GoogleMapsMarkerOptions,
  GoogleMapsMarker, GoogleMapsAnimation
} from 'ionic-native';
/*
  Generated class for the PageGoogleMap page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-page-google-map',
  templateUrl: 'page-google-map.html'
})
export class PageGoogleMapPage {

  home = HomePage;
  result: any;
  constructor(public navCtrl: NavController, private service: Service, private http: Http) { this.http = http }

  ionViewDidLoad() {
    this.LoadAPI()
  }

  LoadAPI = () => {
    // this.http.get("http://test3.hutech.edu.vn/quantrac/api/Static/Get_ThongTinDiaDiem")
    //   .subscribe(data => {
    //     this.result = JSON.parse(data['_body']);//Bind data to items object
    //     console.log(this.result)

    //     // console.log(this.result[0].DiaChi);
    //     // this.TieuDe = this.result[0].TenGoi;
    //     // this.DiaChi = this.result[0].DiaChi;
    //     this.LoadMap(parseInt(this.result[0].map_lat), parseInt(this.result[0].map_long), "IONIC")
    //     // this.LoadMapBrower(this.result[0].map_lat, this.result[0].map_long)
    //   }, error => {
    //     console.log(error);
    //   });
    this.service.GetData(`Get_ThongTinDiaDiem`)
      .then(data => {
        console.log(data)
        this.result = data;
        console.log(this.result)
        this.LoadMap(parseInt(this.result[0].map_lat), parseInt(this.result[0].map_long),"IONIC")
      })
  }

  LoadMap = (lat: number, lng: number, tieude: string) => {
    let ionic: GoogleMapsLatLng = new GoogleMapsLatLng(lat, lng);
    let element: HTMLElement = document.getElementById('map');
    let map = new GoogleMap(element, {
      'backgroundColor': 'white',
      'controls': {
        'compass': true,
        'myLocationButton': true,
        'indoorPicker': true,
        'zoom': true
      },
      'gestures': {
        'scroll': true,
        'tilt': true,
        'rotate': true,
        'zoom': true
      },
    })
    map.one(GoogleMapsEvent.MAP_READY).then(() => console.log('Map is ready!'));

    // create CameraPosition
    let position: CameraPosition = {
      target: ionic,
      zoom: 15,
      bearing: 50,
      tilt: 30
    };
    map.moveCamera(position);

    // create new marker
    let markerOptions: GoogleMapsMarkerOptions = {
      position: ionic,
      animation: GoogleMapsAnimation.DROP,
      title: tieude
    };

    map.addMarker(markerOptions)
      .then((marker: GoogleMapsMarker) => {
        marker.showInfoWindow();
      });
  }
}
