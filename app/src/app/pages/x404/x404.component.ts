import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-x404',
  templateUrl: './x404.component.html',
  styleUrls: ['./x404.component.css']
})
export class X404Component implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit() {
  }

  backClick() {
    this._location.back();
  }

}
