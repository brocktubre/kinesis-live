import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as AWS from 'aws-sdk';
import * as uuid from 'uuid';
import { interval } from 'rxjs';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('secretAccessKey') secretAccessKey: ElementRef;
  @ViewChild('streamName') streamName: ElementRef;
  @ViewChild('accessKey') accessKey: ElementRef;
  @ViewChild('region') region: ElementRef;

  public isLoadingData: boolean;
  public someError: boolean;
  public someErrorMessage: String;
  public sampleRecord: String;
  public samplePolicy: String;

  public loadingSub;

  public streamingData: String;

  constructor(private homeService: HomeService) {
    this.isLoadingData = false;
    this.someError = false;
   }

  ngOnInit() {
    this.sampleRecord = '{\n'+
                          '\t"items": [\n' +
                            '\t\t"soda",\n\t\t"specialty chocolate",\n\t\t"dental care"\n\t],\n' +
                          '\t"order_id":"dc2d7929-d80a-4c57-8303-29dae371b9a9",\n' +
                          '\t"total_cost":128.74\n' +
                        '}';
    this.samplePolicy = '{\n'+
                        '\t"Version": "2012-10-17",\n'+
                        '\t"Statement": [\n' +
                        '\t\t{\n' +
                                '\t\t\t"Sid": "VisualEditor0",\n' +
                                '\t\t\t"Effect": "Allow",\n' +
                                '\t\t\t"Action": "kinesis:PutRecord",\n' +
                                '\t\t\t"Resource": "arn:aws:kinesis:<REGION>:<ACCOUNT_ID>:stream/<STREAM_NAME>"\n' +
                        '\t\t}\n' +
                      '\t]\n' +
                    '}\n'
  }

  public startStream() {
    const secretAccessKey = this.secretAccessKey.nativeElement.value;
    const streamName = this.streamName.nativeElement.value;
    const accessKey = this.accessKey.nativeElement.value;
    const region = this.region.nativeElement.value;

    if(secretAccessKey === "" || streamName === "" || accessKey === "" || region === "") {
      this.someErrorMessage = "Please enter in all the fields.";
      this.someError = true;
      return;
    }

    this.loadingSub = interval(1000).subscribe(x => {
        this.homeService.streamData(region, secretAccessKey, accessKey, streamName)
        .subscribe( payload => {
          this.isLoadingData = true;
          this.streamingData = payload;
      }, error => {
          this.isLoadingData = false;
          this.someError = true;
          this.someErrorMessage = error;
          this.loadingSub.unsubscribe();
      });
    });
  }

  public stopStream() {
    this.loadingSub.unsubscribe();
    this.isLoadingData = false;
  }

}
