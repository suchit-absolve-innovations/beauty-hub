import { Component, NgZone, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContentService } from 'src/app/Shared/service/content.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormBuilder } from '@angular/forms';
import { EMPTY, Observable, Subscription, interval } from 'rxjs';
import { SearchService } from 'src/app/Shared/service/search.service';
import { FilterService } from 'src/app/Shared/service/filter.service';



@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  // search 
  public searchText: any = '';
  vendorId = localStorage.getItem('vendorId');
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
  subCategoryId :any;
  form: any;
  search: any;
  
  private refreshSubscription!: Subscription;
  page: any;

  constructor(private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private content: ContentService,
    private router: Router,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private searchService: SearchService,
    private filterService: FilterService,

    ) {
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
    this.route.queryParams.subscribe((params) => {
      this.search = params['search'] || '';
      this.page = params['page'] ? parseInt(params['page'], 10) : 1;

      // Fetch data based on the search term and page
      this.getList();
    });
    // this.getsuperlist();
    this.filterListForm();
    this.searchText = this.searchService.getSearchCriteria();
  }

  searchlist(): void {
    this.searchService.setSearchCriteria(this.searchText);
  }
  onSearch(searchTerm: string): void {
    // Update query parameters for search
    this.router.navigate([], {
      queryParams: { search: searchTerm, page: 1 }, // Reset to the first page when searching
      queryParamsHandling: 'merge',
    });
  }

  clearSearchedData(): void {
    // Call the clearSearchCriteria method when the sidebar is clicked
    this.searchService.clearSearchCriteria();
  }

  getList() {
    if (this.login == 'SuperAdmin') {
      this.getsuperlist();
    } else if (this.login == 'Admin') {
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
    this.searchText = ('');
    } else if (tabId === 'pills-categoryrequest') {
      this.page2 = 0;
      this.searchText = ('');
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
    this.page1 = 1;
    this.page2 = 1;
    this.page3 = 1;
    this.page4 = 1;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page1: null, page2: null, page3: null, page4: null },
      queryParamsHandling: 'merge'
    });
  }
  checkActiveStatus(data: any) {
    this.isActive = !this.isActive;
    if (this.isActive == true) {
      this.postActiveStatus(data);
    } else if (this.isActive == false) {
      this.postUnActiveStatus(data);
    }
  }
  checkInactiveStatus(data: any) {
    this.unActive = !this.unActive;
    if (this.unActive == true) {
      this.postActiveStatus(data);
    } else if (this.unActive == false) {
      this.postUnActiveStatus(data);
    }
  }
  postActiveStatus(data: any) {
    let payload = {
      mainCategoryId: data,
      salonId: this.salonId,
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
      salonId: this.salonId,
      status: false
    }
    this.spinner.show();
    this.content.statusPostCategory(payload).subscribe(response => {
      this.spinner.hide();
    });
  }
  /*** Category List ***/

  getsuperlist() {
    this.spinner.show();
    this.deleteMainCategory;
    this.content.getcategory().subscribe(response => {
      if (response.isSuccess) {
        this.categoryList = response.data;
        this.spinner.hide();
      }
    });
  }

  filterListForm() {
    this.form = this.formBuilder.group({
      categoryType: ['0']
    });
  }

  getCategoryListFilter() {
    this.spinner.show();

    this.content.getFilterCategoryList(this.form.value.categoryType).subscribe(response => {
      if (response.isSuccess) {
        this.categoryList = response.data;
        this.spinner.hide();
      }
      else {
        this.toaster.error(response.messages);
        this.spinner.hide();
      }
    });
  }

  getVendorCategoryListFilter() {
    this.spinner.show();
    let payload = {
      salonId: this.salonId,
      categoryType: this.form.value.categoryType
    }

    this.content.getFilterVendorCategoryList(payload).subscribe(response => {
      if (response.isSuccess) {
        this.categoryList = response.data;
        this.spinner.hide();
      }
      else {
        this.toaster.error(response.messages);
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

  getVendorcategoryList() {
    // this.spinner.show();
    this.content.getcategoryVendor(this.salonId).subscribe(response => {
      if (response.isSuccess) {
        this.categoryList = response.data;

        //  this.spinner.hide();
      }
    });
  }

  // Product Category Requests List
  getCategoryRequestList() {
    this.content.getRequestList().subscribe(response => {
      if (response.isSuccess) {
        this.categoryRequestList = response.data;
        this.startRefreshInterval();
        this.spinner.hide();
      }
    });
  }

  acceptCategory(data: any) {
    let payload = {
      mainCategoryId: data.mainCategoryId,
      subCategoryId: data.subCategoryId,
      status: 1
    }
    this.spinner.show();
    this.content.acceptRejectCategorys(payload).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();
        this.ngZone.run(() => { this.getCategoryRequestList() });
        this.toaster.success(response.messages);
      } else {
        this.spinner.hide();
        this.toaster.error(response.messages);
      }
    });
  }
  rejectCategory(data: any) {
    let payload = {
      mainCategoryId: data.mainCategoryId,
      subCategoryId: data.subCategoryId,
      status: 2
    }
    this.spinner.show();
    this.content.acceptRejectCategorys(payload).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();
        this.ngZone.run(() => { this.getCategoryRequestList() });
        this.toaster.success(response.messages);
      } else {
        this.spinner.hide();
        this.toaster.error(response.messages);
      }
    });
  }

  delet(data: any) {
    this.mainCategoryId = data.mainCategoryId;
    this.subCategoryId = data.subCategoryId;
  }
  deleteSubCategory() {
    this.spinner.show();
    this.content.subCategoryDelete(this.subCategoryId).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();
        //   this.ngZone.run(() => { this.getcategoryList(); })
        //  this.ngZone.run(() => { this.getsuperlist(); })
        window.location.reload();
        this.toaster.success(response.messages);
      } else {
        this.spinner.hide();
        this.toaster.error(response.messages);
      }
    });
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
        this.toaster.error(response.messages);
      }
    });
  }                                                                     
  // edit user 
  edit(data: any) {
    
    this.router.navigate(['/category-list/category-edit'],
    
      {
        queryParams: {
          id: data.mainCategoryId,
          id2 : data.subCategoryId
        }
      });
  }
  // editSubcategoryReq(data: any) {

  //   this.router.navigate(['/category-list/sub-category-edit'],
  //     {
  //       queryParams: {
  //         id: data.mainCategoryId,
  //         id2: data.subCategoryId
  //       }
  //     });
  // }
  startRefreshInterval() {
    const refreshInterval = 40000;
    // Check if there is an existing subscription and unsubscribe if needed
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
    // Use interval to call getOrderList every 10 seconds
    this.refreshSubscription = interval(refreshInterval).subscribe(() => {
      this.getCategoryRequestList();
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

  addSpaceAfterText() {
    this.searchText = this.searchText.trim();
    }
}
