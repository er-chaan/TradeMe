import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from "../../services/admin.service";
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  response:any;
  mobile:any;
  usersData:any;
  totalUsers:any;

  constructor(private adminService:AdminService, private toastr: ToastrService) { }

  ngOnInit() {
    if(sessionStorage.getItem('mobile')){
      this.mobile = sessionStorage.getItem('mobile');
    }
    this.getUsers();
    this.adminService.getUsers().subscribe(data => {
      if(data.data){
        $('#usersData').DataTable({
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
  }

  getUsers(){
    this.adminService.getUsers().subscribe(data => {
      this.usersData = data.data;
      this.totalUsers = this.usersData.length;
    });
  }

  identify(index, p){
    return p.id; 
  }

  controlUsers(id:any,status:any){
    let data = {id:id,status:status};
    this.adminService.controlUsers(data).subscribe(data => {
      this.toastr.success(data.message ,'SUCCESS');
      location.reload();
    });
  }

}
