import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GisfileuploadfireService } from '../gisfileuploadfire.service';

@Component({
  selector: 'app-geoserver-data',
  templateUrl: './geoserver-data.component.html',
  styleUrls: ['./geoserver-data.component.css'],
})
export class GeoserverDataComponent implements OnInit {
  connectiopnType: string = ""
  clusteringFormShow: boolean = true;
  nodeBoundaryShow: boolean = false;
  clusterCorrectionShow: boolean = false;
  clusterCorrectionProcess: boolean = false;
  outliers_data: Array<{}> = [];
  loadingLoader: boolean=false
  // outliers_data_sum_pon_homes: Array<string> = []
  clusterCorrectionForm: FormGroup;
  clusteringForm: FormGroup;
  files = [];
  files2 = [];
  toolID: string = ''
  constructor(
    private httpClient: HttpClient,
    private dataShare: GisfileuploadfireService,
    private formBuilder: FormBuilder
  ) {
    this.dataShare.toolid$.subscribe(res => {
      console.log(res)
      this.toolID = res
      this.ngOnInit()
    })
  }

  ngOnInit(): void {
    this.clusterCorrectionForm = this.formBuilder.group({
      input_cluster_id: [''],
      output_cluster_id: [''],
      gis_tool_id: [this.toolID],
    });

    this.clusteringForm = this.formBuilder.group({
      input_cluster_id: [''],
      output_cluster_id: [''],
      gis_tool_id: [''],
    });

  }

  get f() {
    return this.clusterCorrectionForm.controls;
  }

  onSubmitClusterCorrection() {
    console.log(this.clusterCorrectionForm.valid);
    console.log(this.clusterCorrectionForm.value);

    const formData = new FormData();
    formData.append(
      'input_cluster_id',
      this.clusterCorrectionForm.value.input_cluster_id
    );
    formData.append(
      'output_cluster_id',
      this.clusterCorrectionForm.value.output_cluster_id
    );
    formData.append(
      'gis_tool_id',
      this.clusterCorrectionForm.value.gis_tool_id
    );
    this.httpClient
      .post('http://45.35.14.184:5000/update_db', formData)
      .subscribe((res) => {
        console.log(res);
        this.outliers_data = [];
        for (var i = 0; i < res['cluster_id'].length; i++) {
          console.log(res['cluster_id'][i]);
          this.outliers_data.push({
            cluster_id: res['cluster_id'][i],
            sum_pon_homes: res['sum_pon_homes'][i],
          });
          this.dataShare.sharenodeBoundary({
            "workspace":res['workspace_name'],
            "sample_flask": res['table_name']
          });
        }

        // this.dataShare.changeData(res)
        // alert('Files uploaded Successfully!');
      });
  }
  submitCLusturing() {
    this.clusteringFormShow = false;
    this.nodeBoundaryShow = true;
    this.clusterCorrectionShow = true;
    console.log(this.connectiopnType)
    const formData = new FormData();
    this.files.forEach((element) => {
      formData.append('demandpoints', element);
    });
    this.files2.forEach((element) => {
      formData.append('streetlines', element);
    });
    this.loadingLoader = true
    if(this.connectiopnType === "1"){
          this.httpClient
      .post('http://45.35.14.184:5000/aerial_page', formData)
      .subscribe((res) => {
        console.log(res);
        this.dataShare.changeData(res);
        this.loadingLoader = false
      });
    }
    else if(this.connectiopnType === "2"){
      this.httpClient
  .post('http://45.35.14.184:5000/ug_page', formData)
  .subscribe((res) => {
    console.log(res);
    this.dataShare.changeData(res);
  });
}

  }

  //DEMANDPOINTS
  // STREETLINES =>allsmall
  submitNodeBoundary() {
    this.clusteringFormShow = false;
    // this.nodeBoundaryShow = false;
    this.clusterCorrectionShow = true;
    const formData = new FormData();
    this.files.forEach((element) => {
      formData.append('landbndry', element);
    });
    this.loadingLoader = true
    this.httpClient
    .post('http://45.35.14.184:5000/', formData)
    .subscribe((res) => {
      console.log(res);
      this.dataShare.sharenodeBoundary(res);
      this.loadingLoader = false
    });
  }

  fallbackClusterCorrection() {
    this.clusteringFormShow = false;
    this.nodeBoundaryShow = false;
    this.clusterCorrectionShow = false;
    this.clusterCorrectionProcess = true;

    if (this.clusterCorrectionProcess) {
      this.httpClient
        .get('http://45.35.14.184:5000/load_data')
        .subscribe((res) => {
          console.log(res);

          for (var i = 0; i < res['cluster_id'].length; i++) {
            console.log(res['cluster_id'][i]);
            this.outliers_data.push({
              cluster_id: res['cluster_id'][i],
              sum_pon_homes: res['sum_pon_homes'][i],
            });
          }

          console.log(this.outliers_data);
          // this.outliers_data.for
          // this.dataShare.changeData(res)
          // alert('Files uploaded Successfully!');
        });
    }
  }

  filesDropped2(event) {
    console.log(event.target.files);
    // event.target.files.forEach(element => {
    //     this.files.push(element)
    // });
    for (let i = 0; i < event.target.files.length; i++) {
      this.files.push(event.target.files[i]);
    }
  }
  filesDropped3(event) {
    console.log(event.target.files);
    // event.target.files.forEach(element => {
    //     this.files.push(element)
    // });
    for (let i = 0; i < event.target.files.length; i++) {
      this.files2.push(event.target.files[i]);
    }
  }
}
