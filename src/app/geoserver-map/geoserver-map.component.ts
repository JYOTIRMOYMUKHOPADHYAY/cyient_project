import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
// import * as geojson from 'geojson';
import 'leaflet-geoserver-request';
@Component({
  selector: 'app-geoserver-map',
  templateUrl: './geoserver-map.component.html',
  styleUrls: ['./geoserver-map.component.css'],
})
export class GeoserverMapComponent implements OnInit {
  map: any;
  layerArry = ['cite:dp_clip', 'cite:st_clip'];
  constructor() {}

  ngOnInit(): void {
    this.addmaptoInterface();

    this.layerArry.forEach((data) => {
      this.wmsLayes(data);
    });
  }

  addmaptoInterface() {
    this.map = L.map('map', {
      zoom: 1,
      zoomControl: true,
      maxZoom: 28,
      minZoom: 1,
    }).fitBounds([
      [53.21997825788432, -0.5452508263805933],
      [53.22305537611916, -0.538037276509812],
    ]);

    var osm = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution:
          "&copy; <a href='https://openstreetmap.org/copyright'> Openstreet map</a> contributors",
      }
    );
    osm.addTo(this.map);
  }

  wmsLayes(layer) {
    var wms = L.Geoserver.wms('http://localhost:8080/geoserver/wms', {
      layers: layer,
    });

    wms.addTo(this.map);
  }
  // addGeoJSonMarker() {
  //   // Add custom icon
  //   var icon = L.icon({
  //     iconUrl: 'assets/leaf-red.png',
  //     shadowUrl: 'assets/leaf-shadow.png',
  //     iconSize: [38, 95],
  //     shadowSize: [50, 64],
  //     iconAnchor: [22, 94],
  //     shadowAnchor: [4, 62],
  //     popupAnchor: [-3, -76],
  //   });
  //   var geojsonPoint: geojson.Point = {
  //     type: 'Point',
  //     coordinates: [5.9, 43.13],
  //   };
  //   var marker = L.geoJSON(geojsonPoint, {
  //     pointToLayer: (point, latlon) => {
  //       return L.marker(latlon, { icon: icon });
  //     },
  //   });
  //   //Add popup message
  //   marker.bindPopup('Parceque TOULON !');
  //   marker.addTo(this.map);
  // }
}
