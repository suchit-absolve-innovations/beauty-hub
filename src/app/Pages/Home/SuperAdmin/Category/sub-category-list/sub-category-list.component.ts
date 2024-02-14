import { Component, NgZone, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContentService } from 'src/app/Shared/service/content.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { FilterService } from 'src/app/Shared/service/filter.service';
import { SearchService } from 'src/app/Shared/service/search.service';

@Component({
  selector: 'app-sub-category-list',
  templateUrl: './sub-category-list.component.html',
  styleUrls: ['./sub-category-list.component.css']
})
export class SubCategoryListComponent implements OnInit {
  rootUrl!: string;
  categoryList: any;
  login = localStorage.getItem('role');
  // serach 
  public searchText: any = '';
  page: number = 0;
  itemsPerPage!: number;
  totalItems!: number;
  Id: any;
  isActive: boolean = true;
  unActive: boolean = false;
  shopDetail: any;
  vendorDetail: any;
  salonId = localStorage.getItem('salonId')
  vendorId= localStorage.getItem('vendorId')
  MainCategoryId: any;
  subCategoryId: any;
  form: any;
  search: any;

  constructor(
    private spinner: NgxSpinnerService,
    private content: ContentService,
    private router: Router,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private toaster: ToastrService,
    private _location: Location,
    private formBuilder: FormBuilder,
    private filterService: FilterService,
    private searchService: SearchService,
  ) { }

  ngOnInit(): void {
    this.Id = this.route.snapshot.paramMap.get('id');
    this.rootUrl = environment.rootPathUrl;
    this.route.queryParams.subscribe((params) => {
      this.search = params['search'] || '';
      this.page = params['page'] ? parseInt(params['page'], 10) : 1;
      this.getList();
    });
    
    this.filterSubListForm();
    this.searchText = this.searchService.getSearchCriteria();
  }

  backClicked() {
    this.router.navigateByUrl('/category-list');
    this.searchService.clearSearchCriteria();
  
  }

  performSearch() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: null },
      queryParamsHandling: 'merge'
    });
  }

  onPageChange(page: number): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: page },
      queryParamsHandling: 'merge',
    });
  }
  searchlist(): void {
    this.searchService.setSearchCriteria(this.searchText);
   
  }
  
  onSearch(searchTerm: string): void {
    this.router.navigate([], {
      queryParams: { search: searchTerm, page: 1 }, // Reset to the first page when searching
      queryParamsHandling: 'merge',
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
      subCategoryId: data,
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
      subCategoryId: data,
      salonId:this.salonId,
      status: false
    }
    this.spinner.show();
    this.content.statusPostCategory(payload).subscribe(response => {
      this.spinner.hide();
    });
  }


     /** Vendor Detail **/

    //  getvendorDetail() {
      
    //       this.spinner.show();
    //       this.content.getVendorDetail(this.vendorId).subscribe(response => {
    //         if (response.isSuccess) {
    //            this.vendorDetail = response.data
    //           this.shopId = this.vendorDetail.shopResponses[0]?.shopId
            
    //           this.getList();
            
    //           // this.bankDetail = this.vendorDetail.bankResponses
    //         }
    //         this.spinner.hide()
    //       })
    //     }


        // set condition to list 

        getList(){
          if(this.login == 'SuperAdmin'){
            this.getSubcategory();
          } else if (this.login == 'Admin'){
            this.getSubcategory();
          } else {
            this. getSubcategoryList();
          }
        }

  /*** Sub  Category List ***/

  // super and admin

  getSubcategory() {
        this.spinner.show();
        // let payload = {
          this.MainCategoryId = parseInt(this.Id),
        
        // }
        this.content.subCategorySuper(this.MainCategoryId).subscribe(response => {
          if (response.isSuccess) {
            this.categoryList = response.data;
            this.toaster.success(response.messages);
            this.spinner.hide();
          }else{
            this.spinner.hide();
            this.toaster.success(response.messages);
          }
        });
      }


      filterSubListForm() {
        this.form = this.formBuilder.group({
          categoryType: ['0'],
        });
      }
      getSubCategoryListFilter() {

        // this.spinner.show();
          let payload = {
          mainCategoryId: parseInt(this.Id),
         
          categoryType:this.form.value.categoryType
        } 
        this.content.getFilterSubCategoryList(payload).subscribe(response => {
          if (response.isSuccess) {
            this.categoryList = response.data;
            this.toaster.success(response.messages);
            this.spinner.hide();
          }else{
            this.spinner.hide();
            this.toaster.success(response.messages);
          }
        });
      }
   

  // Vendor

  getVendorSubCategoryListFilter() {
      let payload = {
      mainCategoryId: parseInt(this.Id),
      salonId: this.salonId,
      categoryType:this.form.value.categoryType
    } 
    this.content.getFilterVendorSubCategoryList(payload).subscribe(response => {
      if (response.isSuccess) {
        this.categoryList = response.data;
        this.toaster.success(response.messages);
        this.spinner.hide();
      }else{
        this.spinner.hide();
        this.toaster.success(response.messages);
      }
    });
  }

  getSubcategoryList() {
    // this.spinner.show();
    // let payload = {
    //   MainCategoryId : parseInt(this.Id),
    //   salonId :  this.salonId
    // }
   this.MainCategoryId = parseInt(this.Id)
    this.content.SubCategory(this.MainCategoryId).subscribe(response => {
      if (response.isSuccess) {
        
        this.categoryList = response.data;

        this.spinner.hide();
      }
    });
  }

  delet(data:any){
  this.subCategoryId = data.subCategoryId;
  }

  deleteSubCategory() {
    this.spinner.show();
    this.content.subCategoryDelete(this.subCategoryId).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();
      window.location.reload();
        this.toaster.success(response.messages);
      } else {
        this.spinner.hide();
        this.toaster.error(response.messages)
      }
    });
  }

  addSpaceAfterText() {
    this.searchText = this.searchText.trim();
    }

}
