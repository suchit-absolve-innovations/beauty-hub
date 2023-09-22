
import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import {  FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-super-notification-list',
  templateUrl: './super-notification-list.component.html',
  styleUrls: ['./super-notification-list.component.css']
})
export class SuperNotificationListComponent implements OnInit {
  notificationList: any;
  value: any;
  selectControl: any;
  form: any;
  notificationId: any;
 

  constructor(private toasterService: ToastrService,
    private spinner: NgxSpinnerService,
    private content: ContentService,
    private formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,) { }

  ngOnInit(): void {
    this.getBroadList();
    this.notification();
  }

  notification() {
    this.form = this.formBuilder.group({
      data: ['', [Validators.required]],
    });
  }

  getBroadList() {
    
    let payload = {
      pageNumber: 1,
      pageSize: 1000
    }
    this.content.getBroadNotification(payload).subscribe(response => {
      if (response.isSuccess) {
        
        this.notificationList = response.data.dataList
        this.toasterService.success(response.messages);

      } else {
        this.toasterService.error(response.messages)
      }
    });
  }

  // filterBroad list

  filterBroadList() {
    
    let payload = {
      pageNumber: 1,
      pageSize: 1000,
      searchByRole: this.form.value.data
    }
    this.spinner.show();
    this.content.getBroadNotificationFilter(payload).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();

        this.notificationList = response.data.dataList
        this.toasterService.success(response.messages);

      } else {
        this.notificationList = [];
      }
    });
  }

  backClickedreload() {
    this.router.navigateByUrl('/super-notification-list')
      .then(() => {
        window.location.reload();
      });
  }

  // delete notification 
  delet(data:any){
    
    this.notificationId = data.notificationId;
  
    
      }

  deleteNotification() {
    
    this.spinner.show();
    this.content.deleteNotification( this.notificationId).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();
        this.toasterService.success(response.messages);
        window.location.reload();      
      } else {
        this.spinner.hide();
        this.toasterService.error(response.messages)

      }
    })

  }

}