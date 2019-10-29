import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AdminService } from "../../services/admin.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  data:any;
  mobile:any;
  settings:any;
  settingsForm:FormGroup;
  mobileError:any;
  emailError:any;
  passwordError:any;
  newPasswordError:any;

  constructor(private formBuilder:FormBuilder, private adminService:AdminService, private toastr: ToastrService) { }

  ngOnInit() {
    if(sessionStorage.getItem('mobile')){
      this.mobile = sessionStorage.getItem('mobile');
    }
    this.adminService.getSettings(this.mobile).subscribe(data => {
      this.settings=data;
      this.settingsForm = this.formBuilder.group({
        mobile : [this.settings.data.mobile, [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]],
        email: [this.settings.data.email,[Validators.required, Validators.email]],
        password:["",[Validators.required]],
        newPassword:["",[Validators.required]],
      });
    });
    this.mobileError=false;
    this.emailError=false;
    this.passwordError=false;
    this.newPasswordError=false;
  }
  get f() { return this.settingsForm.controls; }
  putSettings(){
    this.mobileError=false;
    this.emailError=false;
    this.passwordError=false;
    this.newPasswordError=false;
    if(this.settingsForm.invalid){
      if(this.f.mobile.errors){
        this.mobileError = "invalid mobile";
      }
      if(this.f.email.errors){
        this.emailError = "invalid email";
      }
      if(this.f.password.errors){
        this.passwordError = "invalid password";
      }
      if(this.f.newPassword.errors){
        this.newPasswordError = "invalid password";
      }
      return;
    }
    if(this.settingsForm.valid){
      this.adminService.putSettings(this.settingsForm.value).subscribe(data => {
        this.data = data;
        this.toastr.success(this.data.message ,'SUCCESS');
      }, error=>{});
    }
  }

}
