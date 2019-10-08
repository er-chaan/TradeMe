import { Component, OnInit } from '@angular/core';
import { stockList } from "../../data/stockList";
import { InplayService } from "../../services/inplay.service";
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-inplay',
  templateUrl: './inplay.component.html',
  styleUrls: ['./inplay.component.css']
})
export class InplayComponent implements OnInit {

  stockList: any;
  selectedStock: any;
  stockStatus: any;

  constructor(private inplayService: InplayService) { }

  ngOnInit() {
    $('.select2').select2({
      // theme: "bootstrap"
    });
    $('#transactionBook').DataTable({
      'paging'      : false,
      'lengthChange': false,
      'searching'   : false,
      'ordering'    : false,
      'info'        : true,
      'autoWidth'   : false
    });
    this.stockList = stockList;
  }

  getStockStatus(){
    this.selectedStock = $('#stockList').val();
    this.inplayService.getStockStatus(this.selectedStock).subscribe(data => {this.stockStatus=data;console.log(data)});

  }

}
