import { Component, OnInit } from '@angular/core';
import { stockList } from "../../data/stockList";
import { InplayService } from "../../services/inplay.service";
import { ToastrService } from 'ngx-toastr';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-inplay',
  templateUrl: './inplay.component.html',
  styleUrls: ['./inplay.component.css']
})
export class InplayComponent implements OnInit {

  mobile:any;
  stockList: any;
  selectedStock: any;
  quantity: any;
  stockStatus: any;
  trade:any;
  response:any;

  constructor(private inplayService: InplayService, private toastr: ToastrService) { }

  ngOnInit() {
    if(localStorage.getItem('mobile')){
      this.mobile = localStorage.getItem('mobile');
    }
    if(sessionStorage.getItem('mobile')){
      this.mobile = sessionStorage.getItem('mobile');
    }
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

    setInterval(() => {
      this.tradeBook();
    }, 5000);
  }

  tradeBook(){
    this.inplayService.tradeBook(this.mobile).subscribe(data => {
      this.tradeBook = data.data;
    });
  }

  getStockStatus(){
    this.selectedStock = $('#stockList').val();
    this.inplayService.getStockStatus(this.selectedStock).subscribe(data => {this.stockStatus=data;console.log(data)});
  }

  getStockStatusInstant(symbol): number{
    let stockPrice:any;
    this.inplayService.getStockStatus(symbol).subscribe(data => {stockPrice=data;console.log(data)});
    return stockPrice;
  }

  buy(){
    this.selectedStock = $('#stockList').val();
    this.quantity = $('#quantity').val();
    this.trade = {mobile: this.mobile, selectedStock : this.selectedStock, quantity:this.quantity, price:this.stockStatus.LastTradedPrice};
    this.inplayService.buy(this.trade).subscribe(data => {
      this.response = data;
      this.toastr.success(this.response.message ,'SUCCESS');
      this.tradeBook();
      $('#quantity').val(0);
    }, error=>{});
  }

  sell(){
    this.selectedStock = $('#stockList').val();
    this.quantity = $('#quantity').val();
    this.trade = {mobile: this.mobile, selectedStock : this.selectedStock, quantity:this.quantity, price:this.stockStatus.LastTradedPrice};
    this.inplayService.buy(this.trade).subscribe(data => {
      this.response = data;
      this.toastr.success(this.response.message ,'SUCCESS');
      this.tradeBook();
      $('#quantity').val(0);
    }, error=>{});
  }



}
