import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  itemsPerPage!        : number;
  totalItems!          : number;
  page                 : number = 0;
  notificationId: any;
  constructor(
    private toasterService: ToastrService,
    private spinner: NgxSpinnerService,
    private content: ContentService,
    private formBuilder: FormBuilder,
    private route      : ActivatedRoute,
    private router: Router,
    // private ngZone: NgZone,
  ) { }

  ngOnInit(): void {
    this.getBroadList();
    this.route.queryParams.subscribe(params => {
      this.page = +params['page'] || 0; // Use the 'page' query parameter value, or default to 1
    });
  }
  refresh(): void {
    // Perform refresh actions
    // Update the query parameter with the current page index
    this.router.navigate([], {
      relativeTo         : this.route,
      queryParams        : { page: this.page },
      queryParamsHandling: 'merge'
    });
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
