import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-tail',
  templateUrl: './footer-tail.component.html',
  styleUrls: ['./footer-tail.component.css']
})
export class FooterTailComponent implements OnInit {
  public year = new Date().getFullYear();
  
  constructor() { }

  ngOnInit(): void {
  }

}
