import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  constructor(private spinner: NgxSpinnerService, private swUpdate: SwUpdate) {}
  ngOnInit() {
    // this.spinner.show();
    this.spinner.show("mySpinner", {
      type: "line-scale-party",
      size: "large",
      bdColor: "rgba(51,51,51,0.8)",
      color: "white"
    });
 
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
          if(confirm("New version available. Load New Version?")) {
              window.location.reload();
          }
      });
    }

    setTimeout(() => {
      // this.spinner.show();
      this.spinner.hide("mySpinner");
    }, 2000);
  }
}
