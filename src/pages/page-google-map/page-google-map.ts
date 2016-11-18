import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform, ViewController, } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Service } from '../share/variables'
import { Http } from '@angular/http';
import {
    GoogleMap, GoogleMapsEvent, GoogleMapsLatLng,
    CameraPosition, GoogleMapsMarkerOptions,
    GoogleMapsMarker, GoogleMapsAnimation
} from 'ionic-native';
declare var google;
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
    @ViewChild('map') mapElement: ElementRef;
    home = HomePage;
    map: any
    result: any;
    constructor(
        public navCtrl: NavController,
        private service: Service,
        private http: Http,
        public platform: Platform,
        private viewCtrl: ViewController) {
        this.http = http;
        platform.ready().then(() => {
            this.service.GetData(`Get_ThongTinDiaDiem`)
                .then(data => {
                    console.log(data)
                    this.result = data;
                    console.log(this.result)
                    this.LoadMap(parseInt(this.result[0].map_lat), parseInt(this.result[0].map_long), "IONIC")
                    this.LoadMapBrower(parseInt(data[0].map_lat), parseInt(data[0].map_long))
                })
        })
    }

    /**
     * Nếu IOS thì thông báo Alert rồi back về trang trước
     */
    ionViewDidLoad() {
        // if (this.platform.is('ios')) {

        //     this.service.ShowToastOK(`Chưa hộ trợ IOS...vui lòng thử lại sau`)
        //     this.navCtrl.pop()
        // } else {
        //     this.LoadAPI()

        // }

    }

    LoadAPI = () => {



    }

    LoadMapBrower = (lat, long) => {
        let latLng = new google.maps.LatLng(lat, long);
        let mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    }

    LoadMap = (lat: number, lng: number, tieude: string) => {
        // let element: HTMLElement = document.getElementById('map');
        // let map = new GoogleMap(element)
        // map.one(GoogleMapsEvent.MAP_READY).then(() => console.log('Map is ready!'));
        // let ionic: GoogleMapsLatLng = new GoogleMapsLatLng(lat, lng);

        // // create CameraPosition
        // let position: CameraPosition = {
        //     target: ionic,
        //     zoom: 15,
        //     bearing: 50,
        //     tilt: 30
        // };
        // map.moveCamera(position);

        // // create new marker
        // let markerOptions: GoogleMapsMarkerOptions = {
        //     position: ionic,
        //     animation: GoogleMapsAnimation.DROP,
        //     title: tieude
        // };

        // map.addMarker(markerOptions)
        //     .then((marker: GoogleMapsMarker) => {
        //         marker.showInfoWindow();
        //     });
        //let element: HTMLElement = document.getElementById('map');
        let map = new GoogleMap("map");

        // listen to MAP_READY event
        map.one(GoogleMapsEvent.MAP_READY).then(() => console.log('Map is ready!'));


        // create LatLng object
        let ionic: GoogleMapsLatLng = new GoogleMapsLatLng(43.0741904, -89.3809802);

        // create CameraPosition
        let position: CameraPosition = {
            target: ionic,
            zoom: 18,
            tilt: 30
        };

        // move the map's camera to position
        map.moveCamera(position);

        // create new marker
        let markerOptions: GoogleMapsMarkerOptions = {
            position: ionic,
            title: 'Ionic'
        };

        map.addMarker(markerOptions)
            .then((marker: GoogleMapsMarker) => {
                marker.showInfoWindow();
            });
    }


    public dismiss() {
        console.log('cancel map')
        this.viewCtrl.dismiss();
    }
}
