import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  constructor(private spinner: NgxSpinnerService) {}
  ngOnInit() {
    // this.spinner.show();
    this.spinner.show("mySpinner", {
      type: "line-scale-party",
      size: "large",
      bdColor: "rgba(51,51,51,0.8)",
      color: "white"
    });
 
    setTimeout(() => {
      // this.spinner.show();
      this.spinner.hide("mySpinner");
    }, 2500);
  }
}
