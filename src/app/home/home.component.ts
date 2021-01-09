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

  public isLoadingData: boolean
  public someError: boolean
  public someErrorMessage: String

  public loadingSub;

  public streamingData: String;
  
  constructor(private homeService: HomeService) {
    this.isLoadingData = false;
    this.someError = false;
   }

  ngOnInit() {
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
      }); 
    });
  }

  public stopStream() {
    this.loadingSub.unsubscribe();
    this.isLoadingData = false;
  }

}
