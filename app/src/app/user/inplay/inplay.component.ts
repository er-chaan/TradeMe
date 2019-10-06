import { Component, OnInit } from '@angular/core';
import { stockList } from "../../data/stockList";
import { FormControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-inplay',
  templateUrl: './inplay.component.html',
  styleUrls: ['./inplay.component.css']
})
export class InplayComponent implements OnInit {

  stockList: any;
  getStockForm: FormGroup;
  constructor(private formBuilder:FormBuilder) { }

  ngOnInit() {
    $('.select2').select2();
    this.stockList = stockList;
    this.getStockForm = this.formBuilder.group({
      stockListX: ['']
    });

    // this.getStockForm  = new FormGroup({
    //   stockList: new FormControl(this.stockList[1]),
    // });
  }

  getStockStatus(){
    console.log(this.getStockForm.value);
  }

}
