import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import { SearchService } from 'src/app/Shared/service/search.service';
import { environment } from 'src/environments/environment';
declare var $: any;

@Component({
  selector: 'app-shop-banner-list',
  templateUrl: './shop-banner-list.component.html',
  styleUrls: ['./shop-banner-list.component.css']
})
export class ShopBannerListComponent implements OnInit {
  // serach 
  public searchText: any = '';
  page: number = 0;
  itemsPerPage!: number;
  totalItems!: number;
  rootUrl: any;
  shopBannerList: any;
  vendorDetail: any;
  vendorId: any;
  shopId: any;
  id: any;
  form: any;
  SubSubcategoryList: any;
  subCategoryList: any;
  categoryList: any;
  salonBannerId: any;
  selectedFilter: any;
  showBrandDiv: boolean = false;
  search: any;
  itemToDelete: any;


  constructor(private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private content: ContentService,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private searchService: SearchService,
    private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.vendorId = localStorage.getItem('id');
    this.rootUrl = environment.rootPathUrl;

    // this.getSalonBannerList();
    this.getcategoryList();
    this.route.queryParams.subscribe((params) => {
      this.search = params['search'] || '';
      this.page = params['page'] ? parseInt(params['page'], 10) : 1;

      // Fetch data based on the search term and page
      this.getSalonBannerList();
    });
    this.form = this.formBuilder.group({
      mainCategoryId : [''],
      subCategoryId  : [''],
      salonBannerType: [''],
      categoryType: ['']
      //  brandId       : [''],
    });
    this.searchText = this.searchService.getSearchCriteria();
  }

  get f() {
    return this.form['controls'];
  }

  get s() {
    return this.form['controls'];
  }

  get fb() {
    return this.form['controls'];
  }

  get ssb() {
    return this.form['controls'];
  }

  searchlist(): void {
    this.searchService.setSearchCriteria(this.searchText); 
  }

  onSearch(searchTerm: string): void {
    // Update query parameters for search
    this.router.navigate([], {
      queryParams: { search: searchTerm, page:1 }, // Reset to the first page when searching
      queryParamsHandling: 'merge',
    });
  }

  onPageChange(page: number): void {
    // Update query parameters for pagination
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: null },
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


  onBannerTypeChange(selectedValue: string) {
    this.searchText = '';
    if(selectedValue == ''){
      window.location.reload();
    }
    this.showBrandDiv = selectedValue === 'SalonCategoryBanner';
    this.selectedFilter = selectedValue === 'SalonCategoryBanner' ? 'Main' : selectedValue === 'SalonCategoryBanner' ? 'Sub' :  '';
    this.filterAllBannersList(); 
    this.clearAllCategories();
    this.performSearch();
  }
  onCategoryFilterChange(filter: string) {
    this.selectedFilter = filter;
    if (filter === 'Main') {
      // Clear the values of subcategory and sub-subcategory when "Main" is selected
      this.form.get('subCategoryId').setValue('');
    }
}

clearAllCategories(){
  this.form.get('mainCategoryId').setValue('');  
  this.form.get('subCategoryId').setValue('');  
  this.subCategoryList = [];
}

clearSubCategories() {
  this.form.get('subCategoryId').setValue('');  
  this.subCategoryList = [];
}


  getSalonBannerList() {
    let payload = {
      salonId: localStorage.getItem('salonId'),
      salonBannerType: 'All'
    }
    // this.spinner.show();
    this.content.getShopBanner(payload).subscribe(response => {
      if (response.isSuccess) {
        this.shopBannerList = response.data;
        // this.spinner.hide();
      }
    });
  }



  delet(data: any) {
    this.itemToDelete = data;
    
    $('#list-cross-mess').modal('show');
  }
  
  deleteSalonBanners() {
    this.spinner.show();
    if (this.itemToDelete) {
      const itemId = this.itemToDelete.salonBannerId;

    this.content.deleteSalonBanner(itemId).subscribe(response=> {
      if (response.isSuccess) {
        this.spinner.hide();
        // Remove the deleted item from the local list
        this.shopBannerList = this.shopBannerList.filter((item: { salonBannerId: any; }) => item.salonBannerId !== itemId);
        // Close the modal
        $('#list-cross-mess').modal('hide');
        this.toaster.success(response.messages);
      } else {
        this.spinner.hide();
        this.toaster.error(response.messages);
      }
    });
  }
  }


  getcategoryList() {
    this.spinner.show();
    this.content.getcategory().subscribe(response => {
      if (response.isSuccess) {
        this.categoryList = response.data;

        this.spinner.hide();
        this.clearSubCategories();
      } else {
        this.spinner.hide();
        this.toaster.error(response.messages);
      }
    });
  }



  // getSubcategoryList(mainCategoryId: any) {
  //   this.content.SubCategory(mainCategoryId).subscribe(response => {
  //     if (response.isSuccess) {
  //       this.subCategoryList = response.data;

  //       // this.SubSubcategoryList = []
  //       this.spinner.hide();
  //     } else {
  //       this.subCategoryList = [];
  //       this.toaster.error(response.messages);
  //     }
  //   });
  // }
  getSubcategoryList(data: any) {
    // this.spinner.show();
    if (data === '') {
      this.clearSubCategories();
      this.filterAllBannersList(); 
    } else {
      this.content.SubCategory(data).subscribe(response => {
        if (response.isSuccess) {
          this.subCategoryList = response.data;
          // this.spinner.hide();
          this.filterAllBannersList(); 
        } else {
          this.subCategoryList = [];
          // this.spinner.hide();
        }
      });
    }
  }


  filterAllBannersList() {
    let payload = {
      salonId: localStorage.getItem('salonId'),
      mainCategoryId: this.form.value.mainCategoryId ? this.form.value.mainCategoryId : '',
      subCategoryId: this.form.value.subCategoryId ? this.form.value.subCategoryId : '',
      salonBannerType: this.form.value.salonBannerType ? this.form.value.salonBannerType : '',
      // brandId: this.form.value.brandId ? this.form.value.brandId : '',
    }
    this.content.filterAllBanners(payload).subscribe(response => {
      if (response.isSuccess) {
        this.shopBannerList = response.data;

        //    this.spinner.hide();
        //   this.toaster.success(response.messages)
      } else {
        //   this.spinner.hide();
        this.toaster.error(response.messages);
        this.shopBannerList = [];
      }
    });
  }


  addSpaceAfterText() {
    this.searchText = this.searchText.trim();
    }


}
