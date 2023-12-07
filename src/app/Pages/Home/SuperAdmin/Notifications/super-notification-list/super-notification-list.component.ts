
import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import {  FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Renderer2 } from '@angular/core';
@Component({
  selector: 'app-super-notification-list',
  templateUrl: './super-notification-list.component.html',
  styleUrls: ['./super-notification-list.component.css']
})
export class SuperNotificationListComponent implements OnInit {

   public searchText: any = '';
  notificationList: any;
  value: any;
  selectControl: any;
  form: any;
  notificationId: any;
  page: number = 0;
  
 

  constructor(private toasterService: ToastrService,
    private spinner: NgxSpinnerService,
    private content: ContentService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _location: Location,
    private renderer: Renderer2,
    private route: ActivatedRoute,
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
  refresh(): void {
    // Perform refresh actions

    // Update the query parameter with the current page index
    
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: this.page },
      queryParamsHandling: 'merge'
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
    debugger
    let payload = {
      pageNumber: 1,
      pageSize: 1000,
      searchByRole: this.form.value.data
    }
    this.spinner.show();
    this.content.getBroadNotificationFilter(payload).subscribe(response => {
      if (response.isSuccess) {
        // this.router.navigateByUrl('/super-notification-list')
        // this.hideFilterModal(); 
        this.spinner.hide();
        this.notificationList = response.data.dataList
        this.toasterService.success(response.messages);
      
      } else {
        this.notificationList = [];
      }
    });
  }
  // showFilterModal() {
  //   const modalElement = document.getElementById('myModalpurchase-membership');
  //   this.renderer.addClass(modalElement, 'show');
  // }
  // hideFilterModal() {
  //   debugger
  //   const modalElement = document.getElementById('myModalpurchase-membership');

  //   if (modalElement) {
  //     this.renderer.removeClass(modalElement, 'show'); 
  //     // Change the z-index to hide the modal
  //     modalElement.style.zIndex = '-1 !important' ;  // Set z-index to a value that hides it
  //   }

  // }
  
  // hideFilterModal() {
  //   const modalElement = document.getElementById('myModalpurchase-membership');
  //   this.renderer.removeClass(modalElement, 'show')
  //   modalElement.style.zIndex = '-1';
  // }

 

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

  addSpaceAfterText() {
    this.searchText = this.searchText.trim();
    }

}