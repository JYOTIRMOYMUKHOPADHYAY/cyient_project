import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
// import * as geojson from 'geojson';

import 'leaflet-geoserver-request';
import { GisfileuploadfireService } from '../gisfileuploadfire.service';
@Component({
  selector: 'app-geoserver-map',
  templateUrl: './geoserver-map.component.html',
  styleUrls: ['./geoserver-map.component.css'],
})
export class GeoserverMapComponent implements OnInit {
  baseMapObj = {};
  CLS:string = "NODE_7432:node_boundary"
  map: any;
  dataJSON: any;
  layerArry = ['SAMPLE_DATA_TWO_234:sample_flask'];
  loadingData = false;
  constructor(
    private dataShare: GisfileuploadfireService,
    private http: HttpClient
  ) {
    this.dataShare.data$.subscribe((res) => {
      console.log(res);
      if (res) {
        res['table_name'].forEach((element) => {
          this.x(res['workspace_name'] + ':' + 'sample_flask_' + element);
          console.log(res['workspace_name'] + ':' + 'sample_flask_' + element)
        });
      }
    });

    this.dataShare.nodeBoundary$.subscribe((res) => {
      if (res) this.x(res['workspace'] + ':' + res['sample_flask']);
      // }
    });
  }

  ngOnInit(): void {
    this.addmaptoInterface();
    // this.wmsLayes("UAT_1:sample_flask_cluster_output_1")
    this.map.on('click', (e) => {


      let LAAT = e;
      var X = Math.trunc(this.map.layerPointToContainerPoint(e.layerPoint).x);
      var Y = Math.trunc(this.map.layerPointToContainerPoint(e.layerPoint).y);

      console.log(X)
      console.log(Y)
      var sw = this.map.options.crs.project(
        this.map.getBounds().getSouthWest()
      );
      var ne = this.map.options.crs.project(
        this.map.getBounds().getNorthEast()
      );
      var BBOX = sw.x + ',' + sw.y + ',' + ne.x + ',' + ne.y;
      var WIDTH = this.map.getSize().x;
      var HEIGHT = this.map.getSize().y;
        console.log(WIDTH)
        console.log(HEIGHT)
        console.log(BBOX)

      //   this.http.get("http://localhost:8080/geoserver/wms?&INFO_FORMAT=application/json&REQUEST=GetFeatureInfo&EXCEPTIONS=application/vnd.ogc.se_xml&SERVICE=WMS&VERSION=1.1.1&WIDTH="+WIDTH+"&HEIGHT="+HEIGHT+"&X="+X+"&Y="+Y+"&BBOX=496841.25,370088.96875,497990.03125,370718.625&LAYERS=cite:dp_clip&QUERY_LAYERS=cite:dp_clip&TYPENAME=cite:dp_clip")
      this.http
        .get(
          'http://45.35.14.184:8080/geoserver/wms/?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&layers='+this.CLS+'&BBOX=497259.53125%2C370117.0625%2C497958.5%2C370483.03125&FEATURE_COUNT=1&info_format=application/json&HEIGHT=' +
            HEIGHT +
            '&WIDTH=' +
            WIDTH +
            '&query_layers='+this.CLS+'&SRS=EPSG%3A27700&buffer=15&X=' +
            Y +
            '&Y=' +
            X
        )
        .subscribe((res) => {
          console.log(res);

          L.popup()
            .setLatLng([e.latlng.lat, e.latlng.lng])
            .setContent(
              `
      <p>GIS ToolID: ${res['features'][0]['properties']['gistool_id']}<p>
      <p>Cluster ID: ${res['features'][0]['properties']['cluster_id']}<p>

      `
            )
            .openOn(this.map);

          this.dataShare.passGIStoolid(
            res['features'][0]['properties']['gistool_id']
          );
        });
    });
  }

  x(data) {

    this.loadingData = true;
    this.wmsLayes(data);
  }
  addmaptoInterface() {
    this.map = L.map('map').fitBounds([
      [53.21997825788432, -0.5452508263805933],
      [53.22305537611916, -0.538037276509812],
    ])

    var osm = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution:
          "&copy; <a href='https://openstreetmap.org/copyright'> Openstreet map</a> contributors",
          maxZoom: 18,
          // zoomOffset: -1
      }
    );
    osm.addTo(this.map);
  }

  wmsLayes(layer) {
    console.log(layer)
    var wms = L.Geoserver.wms('http://45.35.14.184:8080/geoserver/wms', {

      layers: layer,
    });
    console.log(wms)
    wms.addTo(this.map);
    // console.log(wms.getBounds())

    // var baseMaps = {
    //   x: wms,
    // };
    // L.control.layers(baseMaps).addTo(this.map);
  }
}



// http://http://45.35.14.184:8080/geoserver/wms?&INFO_FORMAT=application/json&REQUEST=GetFeatureInfo&EXCEPTIONS=application/vnd.ogc.se_xml&SERVICE=WMS&VERSION=1.1.1&WIDTH=770&HEIGHT=485&X=522&Y=341&BBOX=496841.25,370088.96875,497990.03125,370718.625&LAYERS=OUT_LAYER_1:sample_flask_cluster_output&QUERY_LAYERS=OUT_LAYER_1:sample_flask_cluster_output&TYPENAME=OUT_LAYER_1:sample_flask_cluster_output
