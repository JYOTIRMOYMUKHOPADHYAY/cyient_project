import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-geoserver-data',
  templateUrl: './geoserver-data.component.html',
  styleUrls: ['./geoserver-data.component.css'],
})
export class GeoserverDataComponent implements OnInit {

  clusteringFormShow:boolean = true
  nodeBoundaryShow:boolean = false
  clusterCorrectionShow:boolean = false
  files = []
  constructor(
    private httpClient:  HttpClient
  ) {}

  ngOnInit(): void {



  }

  submitCLusturing(){
    this.clusteringFormShow = false
    this.nodeBoundaryShow = true
    this.clusterCorrectionShow = false

    const formData = new FormData();
    this.files.forEach(element => {
      formData.append("file",  element)
    })

    this.httpClient.post("http://45.35.14.184:5000/", formData).subscribe(res =>  {
      console.log(res);
      // alert('Files uploaded Successfully!');
  })


  }

  submitNodeBoundary(){
    this.clusteringFormShow = false
    this.nodeBoundaryShow = false
    this.clusterCorrectionShow = true
  }

  fallbackClusterCorrection(){
    this.clusteringFormShow = true
    this.nodeBoundaryShow = false
    this.clusterCorrectionShow = false
  }

  filesDropped2(event) {
    console.log(event.target.files)
    // event.target.files.forEach(element => {
    //     this.files.push(element)
    // });
    for (let i = 0; i <  event.target.files.length; i++) {
      this.files.push( event.target.files[i])
    }
  }
}
