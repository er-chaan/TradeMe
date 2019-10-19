import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { AccountsService } from "../../services/accounts.service";
import { UserService } from "../../services/user.service";
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit, OnDestroy {

  response:any;
  paymentTab:any;
  mobile:any;
  payInForm:FormGroup;
  payOutForm:FormGroup;
  payInAmountError:any;
  payOutAmountError:any;
  passbook:any;
  balance:any;
  alive:any;

  constructor(private formBuilder:FormBuilder, private userService:UserService, private accountService:AccountsService, private toastr: ToastrService) { }

  ngOnInit() {
    this.alive=true;
    if(localStorage.getItem('mobile')){
      this.mobile = localStorage.getItem('mobile');
    }
    if(sessionStorage.getItem('mobile')){
      this.mobile = sessionStorage.getItem('mobile');
    }
    this.paymentTab="";
    this.payInForm = this.formBuilder.group({
      mobile : [this.mobile, [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]],
      amount: ["",[Validators.required, Validators.maxLength(5)]],
    });
    this.payOutForm = this.formBuilder.group({
      mobile : [this.mobile, [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]],
      amount: ["",[Validators.required, Validators.maxLength(5)]],
    });
    this.payInAmountError=false;
    this.payOutAmountError=false;
    this.transactionBook();
    this.accountService.passbook(this.mobile).subscribe(data => {
      // this.passbook = data.data;
      if(data.data){
        $('#transactionBook').DataTable({
          "pageLength": 10,
          'paging'      : true,
          'lengthChange': true,
          'searching'   : true,
          'ordering'    : true,
          'order' : [0,'desc'],
          'info'        : true,
          'autoWidth'   : true,
          "lengthMenu": [[5, 10, 25, -1], [5, 10, 25, "All"]]        
        });
      }
    });
    setInterval(() => {
      if(this.alive){
              // this.transactionBook();
      }
    }, 10000);
  }
  get pi() { return this.payInForm.controls; }
  get po() { return this.payOutForm.controls; }

  togglePaymentTab(tab: String):void {
    this.paymentTab=tab;
  }

  transactionBook(){
    this.accountService.passbook(this.mobile).subscribe(data => {
      this.passbook = data.data;
    });
    this.userService.getBalance(this.mobile).subscribe(response => {
      this.balance=response.data.balance;
    });
  }

  payIN(){
    this.payInAmountError=false;
    this.payOutAmountError=false;
    if(this.payInForm.invalid){
      if(this.pi.amount.errors){
        this.payInAmountError = "invalid amount";
      }
      return;
    }
    if(this.payInForm.valid){
      this.accountService.payin(this.payInForm.value).subscribe(data => {
        this.response = data;
        this.transactionBook();
        this.toastr.success(this.response.message ,'SUCCESS');
        this.payInForm.reset(true);
        location.reload();
      }, error=>{});
    }
  }

  payOUT(){
    this.payInAmountError=false;
    this.payOutAmountError=false;
    if(this.payOutForm.invalid){
      if(this.po.amount.errors){
        this.payOutAmountError = "invalid amount";
      }
      return;
    }
    if(this.payOutForm.valid){
      this.accountService.payout(this.payOutForm.value).subscribe(data => {
        this.response = data;
        this.transactionBook();
        this.toastr.success(this.response.message ,'SUCCESS');
        this.payOutForm.reset(true);
        location.reload();
      }, error=>{});
    }
  }

  identify(index, p){
    return p.id; 
  }

  ngOnDestroy(){
    this.alive=false;
  }
}
