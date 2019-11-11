import { Component, OnInit } from '@angular/core';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // $("body").removeAttr("style");
    $(".appForgot").hide();
    $(".appLogin").show();
  }

  toggler(){
    $(".appForgot").toggle();
    $(".appLogin").toggle();
  }

}
