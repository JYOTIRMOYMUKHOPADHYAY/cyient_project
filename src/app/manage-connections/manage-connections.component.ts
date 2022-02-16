import { Component, OnInit, AfterViewInit } from '@angular/core';
// import { AfterViewInit, Component } from ‘@angular/core’;
import * as L from 'leaflet';
import * as geojson from 'geojson';
import { saveAs } from 'file-saver';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'leaflet-geoserver-request';
@Component({
  selector: 'app-manage-connections',
  templateUrl: './manage-connections.component.html',
  styleUrls: ['./manage-connections.component.css'],
})
export class ManageConnectionsComponent implements OnInit {
  map: any;
  someHTML: any;
  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    // console.log(L)
    // this.map = L.map('map', {
    //   center: L.latLng(43,6),
    //   zoom: 10
    // });
    const headers = new HttpHeaders()
      .set(
        'Content-Type',
        'text/html; charset=UTF-8'

        // {
        //   'Content-Type': 'text/html; charset=UTF-8',
        //   'Referer': 'http://localhost:4200',
        //   'Origin': 'http://localhost:4200',
        //   'Accept': 'application/json',
        // }
      )
      .set('Accept', 'text/html');

    // this.httpClient.get('https://stackoverflow.com/questions/tagged/angular',{observe: 'body', responseType: 'text'});
    this.httpClient
      .get(
        `http://localhost:8080/geoserver/cite/wms?service=WMS&version=1.1.0&request=GetMap&layers=cite%3Adp_clip&bbox=496841.25%2C370088.96875%2C497990.03125%2C370718.625&width=768&height=420&srs=EPSG%3A27700&styles=&format=application/openlayers`,
        { observe: 'body', responseType: 'text' }
      )
      .subscribe(
        (res) => {
          console.log(res);
          this.someHTML = res;
        },
        (err) => {
          console.log(err);
          // this.someHTML = err.error.text
          // console.log(this.someHTML)
        }
      );

    // console.log(x)
    // .subscribe(res => {
    //   console.log(res)
    //   this.someHTML = res
    // }, err => {
    //   console.log(err)
    //   this.someHTML = err.error.text
    //   console.log(this.someHTML)
    // }
  }

  ngAfterViewInit(): void {
    this.map = L.map('map', {
      zoom:1,
      zoomControl:true, maxZoom:28, minZoom:1
    }).fitBounds([[53.21997825788432,-0.5452508263805933],[53.22305537611916,-0.538037276509812]]);;
    // var openStreetLayer = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //  minZoom: 3,
    //  maxZoom: 18,
    //  attribution: '<a href=”http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    // });

    // openStreetLayer.addTo(this.map);
    let i;

    // for (i= 0; i <10; i++) {
    //   // const element = array[index];
    //   L.marker([22.822 + Math.random(), 90.37 + + Math.random()],
    //   {title: "point " + i,
    //   alt: "Point " + i,
    //   draggable: true}
    //   ).addTo(this.map)

    // }
    var wmsLayer = L.Geoserver.wms('http://localhost:8080/geoserver/wms', {
      layers: 'cite:dp_clip',
    });
    wmsLayer.addTo(this.map);

    var wmsLayer2 = L.Geoserver.wms('http://localhost:8080/geoserver/wms', {
      layers: 'cite:st_clip',
    });
    wmsLayer2.addTo(this.map);

    this.addGeoJSonMarker();
  }

  addGeoJSonMarker() {
    // Add custom icon
    var icon = L.icon({
      iconUrl: 'assets/leaf-red.png',
      shadowUrl: 'assets/leaf-shadow.png',
      iconSize: [38, 95],
      shadowSize: [50, 64],
      iconAnchor: [22, 94],
      shadowAnchor: [4, 62],
      popupAnchor: [-3, -76],
    });
    var geojsonPoint: geojson.Point = {
      type: 'Point',
      coordinates: [5.9, 43.13],
    };
    var marker = L.geoJSON(geojsonPoint, {
      pointToLayer: (point, latlon) => {
        return L.marker(latlon, { icon: icon });
      },
    });
    //Add popup message
    marker.bindPopup('Parceque TOULON !');
    marker.addTo(this.map);
  }
}
