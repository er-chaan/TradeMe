import { Component, OnInit } from '@angular/core';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  paymentTab:any;
  constructor() { }

  ngOnInit() {
    this.paymentTab="";
    $('#transactionBook').DataTable({
      'paging'      : true,
      'lengthChange': false,
      'searching'   : true,
      'ordering'    : true,
      'info'        : true,
      'autoWidth'   : false
    })
  }

  togglePaymentTab(tab: String):void {
    this.paymentTab=tab;
  }



}
