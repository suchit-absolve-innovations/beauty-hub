
import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import {  FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Renderer2 } from '@angular/core';
declare var $: any;
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
  search: any;
  itemToDelete: any;
  itemsPerPage!        : number;
  totalItems!          : number;
  page                 : number = 0;
  
 

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
    this.route.queryParams.subscribe((params) => {
      this.search = params['search'] || '';
      this.page = params['page'] ? parseInt(params['page'], 10) : 1;

      // Fetch data based on the search term and page
      this.getBroadList();
    });
  }

  notification() {
    this.form = this.formBuilder.group({
      data: ['', [Validators.required]],
    });
  }
  onSearch(searchTerm: string): void {
    // Update query parameters for search
    this.router.navigate([], {
      queryParams: { search: searchTerm, page: 1 }, // Reset to the first page when searching
      queryParamsHandling: 'merge',
    });
  }

  onPageChange(page: number): void {
    // Update query parameters for pagination
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: page },
      queryParamsHandling: 'merge',
    });
  }
  performSearch() {

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: null },
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
  

 

  backClickedreload() {
    this.router.navigateByUrl('/super-notification-list')
      .then(() => {
        window.location.reload();
      });
  }

  // delete notification 
  // delet(data:any){
    
  //   this.notificationId = data.notificationId;
  
    
  //     }
  delet(data: any) {
    this.itemToDelete = data;
    $('#list-cross-mess').modal('show');
  }
  

  deleteNotification() {
    this.spinner.show();
    if (this.itemToDelete) {
      const itemId = this.itemToDelete.notificationId;
    this.spinner.show();
    this.content.deleteNotification( itemId).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();
        // Remove the deleted item from the local list
        this.notificationList = this.notificationList.filter((item: { notificationId: any; }) => item.notificationId !== itemId);
        // Close the modal
        $('#list-cross-mess').modal('hide');
        this.toasterService.success(response.messages);
      } else {
        this.spinner.hide();
        this.toasterService.error(response.messages);
      }
    });
  }
  }

  addSpaceAfterText() {
    this.searchText = this.searchText.trim();
    }

}