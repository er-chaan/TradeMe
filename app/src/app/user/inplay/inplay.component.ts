import { Component, OnInit } from '@angular/core';
import { stockList } from "../../data/stockList";
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
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
      stockList: [null, Validators.required]
    });
  }

  getStockStatus(){
    console.log(this.getStockForm.value);
  }

}
