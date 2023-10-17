import { Component, NgZone, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContentService } from 'src/app/Shared/service/content.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

    // serach 
    public searchText: any = '';
    vendorId= localStorage.getItem('vendorId')
    page3: number;
    page4: number;
    page1: number;
    page2: number;
    activeTab: string;
    itemsPerPage!: number;
    totalItems!: number;
    categoryList: any;
    
    rootUrl: any;
    login = localStorage.getItem('role');
  
    isActive: boolean = true;
    unActive: boolean = false;
    shopDetail: any;
    vendorDetail: any;
    salonId = localStorage.getItem('salonId');
    categoryRequestList: any;
    mainCategoryId: any;
    form: any;
    constructor(private toaster: ToastrService,
      private spinner: NgxSpinnerService,
      private content: ContentService,
      private router: Router,
      private ngZone: NgZone,
      private route: ActivatedRoute,
      private formBuilder: FormBuilder,) {
          // Get the initial active tab and pagination values from the query parameters
          const queryParams = this.route.snapshot.queryParams;
          this.activeTab = queryParams['tab'] || 'pills-categorylist';
          this.page1 = queryParams['page1'] ? +queryParams['page1'] : 0;
          this.page2 = queryParams['page2'] ? +queryParams['page2'] : 0;
          this.page3 = queryParams['page3'] ? +queryParams['page3'] : 0;
          this.page4 = queryParams['page4'] ? +queryParams['page4'] : 0;
        
       }
  
  ngOnInit(): void {
 
      this.rootUrl = environment.rootPathUrl;
        // Check if the active tab is not set in the query parameters
        if (!this.activeTab) {
          // Set the default active tab when the page is initially loaded
          this.activeTab = 'pills-categorylist';
          // Update the query parameters with the default active tab
          this.updateQueryParams();
        }
     
      // this.getvendorDetail();
      this.getCategoryRequestList();
      this.getList();
      // this.getsuperlist();
      this.filterListForm();
  }

  getList(){
  
      if(this.login == 'SuperAdmin'){
        this.getsuperlist();
      } else if (this.login == 'Admin'){
        this.getsuperlist();
      } else {
        this.getVendorcategoryList();
      }
  
    }
  
  switchToTab(tabId: string) {
    // Set the active tab
    this.activeTab = tabId;
    
    // Clear the corresponding pagination query parameter
    if (tabId === 'pills-categorylist') {
      this.page1 = 0;
    } else if (tabId === 'pills-categoryrequest') {
      this.page2 = 0;
    }
    
    // Update the query parameters
    this.updateQueryParams();
  }
  
  updateQueryParams() {
    const queryParams = {
      tab: this.activeTab,
      page1: this.page1,
      page2: this.page2,
     
    };
  
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge'
    });
  }
  refresh(): void {
    // Perform refresh actions
  
    // Update the query parameter with the current page index
    const queryParams = {
      page3: this.page3,
    };
    
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge'
    });
  }
  refresh1(): void {
    // Perform refresh actions
    // Update the query parameter with the current page index
    const queryParams = {
      page4: this.page4
    };
    
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge'
    });
  }
  performSearch() { 
    // Clear query parameters
    this.page1 = 1
    this.page2 = 1;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page1: null , page2: null, page3: null , page4:null},
      queryParamsHandling: 'merge'
    });
  }
  
  
    checkActiveStatus(data: any) {
      this.isActive = !this.isActive;
      if (this.isActive == true) {
        this.postActiveStatus(data)
      } else if (this.isActive == false) {
        this.postUnActiveStatus(data)
      }
    }
  
    checkInactiveStatus(data: any) {
      this.unActive = !this.unActive;
      if (this.unActive == true) {
        this.postActiveStatus(data)
      } else if (this.unActive == false) {
        this.postUnActiveStatus(data)
      }
    }
  
  
    postActiveStatus(data: any) {
  
      let payload = {
        mainCategoryId: data,
        salonId:this.salonId,
        status: true
      }
      this.spinner.show();
      this.content.statusPostCategory(payload).subscribe(response => {
  this.spinner.hide();
      });
    }
  
    postUnActiveStatus(data: any) {  
      let payload = {
        mainCategoryId: data,
        salonId:this.salonId,
        status: false
      }
      this.spinner.show();
      this.content.statusPostCategory(payload).subscribe(response => {
        this.spinner.hide();
      });
    }
  
    
    /*** Category List ***/
  
    getsuperlist(){
       this.spinner.show();
       this.deleteMainCategory
      this.content.getcategory().subscribe(response => {
        if (response.isSuccess) {
          this.categoryList = response.data;
        
         this.spinner.hide();
        }
      });
    }

    filterListForm() {
      this.form = this.formBuilder.group({
        CategoryType: [''],
      });
    }
    
    getCategoryListFilter() {
      this.spinner.show();
   
      this.content.getFilterCategoryList(this.form.value.CategoryType).subscribe(response => {
        if (response.isSuccess) {
          this.categoryList = response.data;
          this.spinner.hide();
        }
        else{
          this.toaster.error(response.messages)
          this.spinner.hide();

        }
      });
    }
  
   backClickedreload() {
      this.router.navigateByUrl('/category-list')
        .then(() => {
          window.location.reload();
        });
    }

  
    getVendorcategoryList(){
    // this.spinner.show();
      this.content.getcategoryVendor(this.salonId).subscribe(response => {
        if (response.isSuccess) {
          this.categoryList = response.data;
        
        //  this.spinner.hide();
        }
      });
    }
  
    // Product Category Requests List
    getCategoryRequestList(){
      
      this.content.getRequestList().subscribe(response => {
        if (response.isSuccess) {
          this.categoryRequestList = response.data;
        
         this.spinner.hide();
        }
      });
    }
  
    acceptCategory(data:any){
      let payload = {
        mainCategoryId: data.mainCategoryId,
        subCategoryId: data.subCategoryId,
        status: 1
      }
      // this.spinner.show();
      this.content.acceptRejectCategorys(payload).subscribe(response => {
        if (response.isSuccess) {
          this.spinner.hide();
          this.ngZone.run(() => { this.getCategoryRequestList() });
          this.toaster.success(response.messages);
        } else {
          this.spinner.hide();
          this.toaster.error(response.messages)
        }
      });
    }
  
   rejectCategory(data:any){
      
      let payload = {
        mainCategoryId: data.mainCategoryId,
        subCategoryId: data.subCategoryId,
        status: 2
      }
      // this.spinner.show();
      this.content.acceptRejectCategorys(payload).subscribe(response => {
        if (response.isSuccess) {
          this.spinner.hide();
          this.ngZone.run(() => { this.getCategoryRequestList() });
          this.toaster.success(response.messages);
        } else {
          this.spinner.hide();
          this.toaster.error(response.messages)
        }
      });
    }
   
    delet(data:any){
      
  this.mainCategoryId = data.mainCategoryId;
  
   }
  
    deleteMainCategory() {
      this.spinner.show();
      this.content.mainCategoryDelete(this.mainCategoryId).subscribe(response => {
        if (response.isSuccess) {
          this.spinner.hide();
         //   this.ngZone.run(() => { this.getcategoryList(); })
          //  this.ngZone.run(() => { this.getsuperlist(); })
          window.location.reload();
          this.toaster.success(response.messages);
        } else {
          this.spinner.hide();
          this.toaster.error(response.messages)
        }
      });
    }
  
  
  
     // edit user 
     edit(data: any) {
      this.router.navigate(['/category-list/add-edit-category'],
        {
          queryParams: {
            id: data.mainCategoryId
          }
        });
    }
  
  
     /** Vendor Detail **/
  
    //  getvendorDetail() {
  
    //   // this.spinner.show();
    //   this.content.getVendorDetail(this.vendorId).subscribe(response => {
    //     if (response.isSuccess) {
    //        this.vendorDetail = response.data
    //       this.shopId = this.vendorDetail.shopResponses[0]?.shopId
      
    //       //  this.getList();
    //       // this.bankDetail = this.vendorDetail.bankResponses
    //     }
    //     this.spinner.hide()
    //   })
    // }
   

  
  }
  