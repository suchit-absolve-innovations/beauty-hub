import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';


@Component({
  selector: 'app-vendor-notification-list',
  templateUrl: './vendor-notification-list.component.html',
  styleUrls: ['./vendor-notification-list.component.css']
})
export class VendorNotificationListComponent implements OnInit {

  public searchText: any = '';
  notificationList: any;
  notificationId: any;
  constructor(
    private toasterService: ToastrService,
    private spinner: NgxSpinnerService,
    private content: ContentService,
    private formBuilder: FormBuilder,
    private router: Router,
    // private ngZone: NgZone,
  ) { }

  ngOnInit(): void {
    this.getBroadList();
  }

  getBroadList() { 
    let payload = {
      pageNumber: 1,
      pageSize: 1000
    }
    this.spinner.show();
    this.content.getBroadNotification(payload).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();
        
        this.notificationList = response.data.dataList
        this.toasterService.success(response.messages);

      } else {
        this.toasterService.error(response.messages)
      }
    });
  }
  // delete notification 
  delet(data:any){
    
    this.notificationId = data.notificationId;
    
      }

  deleteNotification() {
    
    this.spinner.show();
    this.content.deleteNotification(this.notificationId).subscribe(response => {
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
