import { Component, OnInit } from '@angular/core';
import { stockList } from "../../data/stockList";
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-inplay',
  templateUrl: './inplay.component.html',
  styleUrls: ['./inplay.component.css']
})
export class InplayComponent implements OnInit {

  stockList: any;
  constructor() { }

  ngOnInit() {
    $('.select2').select2();
    this.stockList = stockList;
  }

}
