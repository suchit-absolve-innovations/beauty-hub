import { Component, NgZone, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContentService } from 'src/app/Shared/service/content.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { SearchService } from 'src/app/Shared/service/search.service';
import { FilterService } from 'src/app/Shared/service/filter.service';
declare var $: any;

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {
  list: any;
  // serach 
  public searchText: any = '';
  login = localStorage.getItem('role');
  page: number = 0;
  itemsPerPage!: number;
  totalItems!: number;
  rootUrl: any;
  salonId: any
  serviceId: any;
  id: any;
  role: any;
  payload: any;
  form: any;
  subCategoryList: any;
  categoryList: any;
  isActive: boolean = true;
  unActive: boolean = false;
  itemToDelete: any;
  search: any;
  currentPage: any;

 // isFiltered: boolean = false; // Add a flag to track whether the data is being filtered
  constructor(private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private content: ContentService,
    private router: Router,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _location: Location,
    private searchService: SearchService,
    private filterService: FilterService,
    private zone: NgZone) {
  


     }

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
    this.id = localStorage.getItem('salonId');
    this.role = localStorage.getItem('user');
    // this.route.queryParams.subscribe(params => {
    //   this.page = +params['page'] || 0; // Use the 'page' query parameter value, or default to 1
    // });
    this.getcategoryList();
    this.filterListForm();
    this.form.get('mainCategoryId').valueChanges.subscribe(() => {
      this.form.get('subCategoryId').setValue('');
    });
    this.route.queryParams.subscribe((params) => {
      this.search = params['search'] || '';
      this.page = params['page'] ? parseInt(params['page'], 10) : 1;
    



// ...

// Retrieve filtered data from the service
const storedData = this.filterService.getFilteredData();

if (storedData && storedData.length > 0) {
  this.list = storedData;
  debugger
  const firstItem = storedData[0].mainCategoryId;
  const secondItem = storedData[0].subCategoryId;
  const thirdItem = storedData[0].ageRestrictions;
  const fourthItem = storedData[0].genderPreferences;

  this.form.patchValue({
    mainCategoryId: firstItem,
    ageRestrictions: thirdItem,
    genderPreferences: fourthItem
  });


  // Use setTimeout to ensure that the patchValue is applied before calling getSubcategoryList
  this.spinner.show();
  setTimeout(() => {
    // Code to be executed after the specified timeout
    this.zone.run(() => {
      this.getSubcategoryList(firstItem);
      this.spinner.hide(); // Hide the spinner after getSubcategoryList completes
    });
  }, 2000);

  if (secondItem > 0) {
    this.form.patchValue({
      subCategoryId: secondItem
    });
  }

} else {
  this.getList(); // Fetch initial data
}
    });   

    this.salonId = this.route.snapshot.queryParams
    this.searchText = this.searchService.getSearchCriteria();
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
      queryParams: { page: page },
      queryParamsHandling: 'merge',
    });
  }

  backClicked() {
    this._location.back();
  }
  

  performSearch() {

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: null },
      queryParamsHandling: 'merge'
      
    });
    this.form.get('mainCategoryId').setValue('');
    this.form.get('subCategoryId').setValue('');
    this.form.get('ageRestrictions').setValue('');
    this.form.get('genderPreferences').setValue('');
    this.subCategoryList = [];
    this. getList();
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

  // Service List 

  getList() {

    if (this.role == 'SuperAdmin') {
      this.getServiceList();
    } else if (this.role == 'Vendor') {
      this.getServiceListVendor();
    }
  }



  getServiceList() {

    let payload = {
      pageNumber: 1,
      pageSize: 1000,
      salonId: this.salonId.id
    }
    this.spinner.show();
    this.content.getservice(payload).subscribe(response => {
      if (response.isSuccess) {
        this.list = response.data.dataList;

        this.spinner.hide();
      } else {
        this.spinner.hide();
      }
    });
  }


  getServiceListVendor() {
    let payload = {
      pageNumber: 1,
      pageSize: 1000,
      salonId: this.id,
      
    }
  //  this.spinner.show();
    this.content.getservice(payload).subscribe(response => {
      if (response.isSuccess) {
        this.list = response.data.dataList;

    //    this.spinner.hide();
      } else {
     //   this.spinner.hide();
      }

    });
  }

  passId() {
    if (this.role == 'SuperAdmin') {
      this.router.navigate(['/salon-list/service-list/add-service'],
        {
          queryParams: {
            id: this.salonId.id

          }
        })
    }
    else if (this.role == 'Vendor') {
      this.router.navigate(['/vendor-service-list/add-service'],
        {
          queryParams: {
            id: this.salonId.id

          }
        })
    }
  }
  details(data: any) {
    if (this.role == 'SuperAdmin') {
      this.router.navigate(['/salon-list/service-list/service-detail'],
        {
          queryParams: {
            id: data.serviceId
          }
        })
    }
    else if (this.role == 'Vendor') {
      this.router.navigate(['/vendor-service-list/service-detail'],
        {
          queryParams: {
            id: data.serviceId
          }
        })
    }
  }
  edit(data: any) {
    if (this.role == 'SuperAdmin') {
      this.router.navigate(['/salon-list/service-list/edit-service'],
        {
          queryParams: {
            id2: data.serviceId,
            id: data.salonId

          }
        })
    }
    else if (this.role == 'Vendor') {
      this.router.navigate(['vendor-service-list/edit-service'],
        {
          queryParams: {
            id2: data.serviceId,
            id: data.salonId

          }
        })
    }
  }

checkActiveStatus(data: any) {
  this.isActive = !this.isActive;
  if (this.isActive == true) {
    this.postActiveServiceStatus(data);
  } else if (this.isActive == false) {
    this.postUnActiveServiceStatus(data);
  }
}

checkInactiveStatus(data: any) {
  this.unActive = !this.unActive;
  if (this.unActive == true) {
    this.postActiveServiceStatus(data);
  } else if (this.unActive == false) {
    this.postUnActiveServiceStatus(data);
  }
}


postActiveServiceStatus(data: any) {

  let payload = {
    serviceId: data,
    status: 1
  }
  this.spinner.show();
  this.content.statusServicePost(payload).subscribe(response => {
    this.spinner.hide();
  });
}

postUnActiveServiceStatus(data: any) {

  let payload = {
    serviceId: data,
    status: 0
  }
  this.spinner.show();
  this.content.statusServicePost(payload).subscribe(response => {
    this.spinner.hide();
  });
}

  delet(data: any) {

    this.itemToDelete = data;

    $('#list-cross-mess').modal('show');
    

  }


  serviceDelete() {
    this.spinner.show();
    if (this.itemToDelete) {
      const itemId = this.itemToDelete.serviceId;
      this.content.deleteService(itemId).subscribe(response => {
        if (response.isSuccess) {
          this.spinner.hide();
          // Remove the deleted item from the local list
          this.list = this.list.filter((item: { serviceId: any; }) => item.serviceId !== itemId);
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
  
 
  backClickedreload() {
    this.router.navigateByUrl('/category-list')
      .then(() => {
        window.location.reload();
      });
  }

  filterListForm() {
    this.form = this.formBuilder.group({
      genderPreferences: [''],
      mainCategoryId: [''],
      subCategoryId: [''],
      ageRestrictions: [''],
      searchQuery: ['']
    });
  }

  get f() {
    return this.form['controls'];
  }

  get l(){
    return this.form['controls'];
  }

  get s() {
    return this.form['controls'];
  }

  getListFilter() {
    this.spinner.show();
    let payload;

    if (this.role === 'Vendor') {
      payload = {
        pageNumber: 1,
        pageSize: 1000,
        salonId: this.id,
        genderPreferences: this.form.value.genderPreferences
      };
    } else if (this.role === 'SuperAdmin') {
      payload = {
        pageNumber: 1,
        pageSize: 1000,
        salonId: this.salonId.id,
        genderPreferences: this.form.value.genderPreferences
      };
    }
    this.content.getserviceGender(payload).subscribe(response => {
      if (response.isSuccess) {
        this.list = response.data.dataList;
        this.spinner.hide();
      }
      else {

        this.toaster.error(response.messages)
        this.spinner.hide();

      }
    });
  }

  getcategoryList() {
    // this.spinner.show();
    this.content.getcategory().subscribe(response => {
      if (response.isSuccess) {
        this.categoryList = response.data;
        this.subCategoryList = [];

        //  this.spinner.hide();
      } else {
        // this.spinner.hide();
        this.subCategoryList = [];
        this.toaster.error(response.messages);
      }
    });
  }


  getSubcategoryList(MainCategoryId: any) {
    // this.details
    debugger
    if (!MainCategoryId) {
    window.location.reload();
    
    }
    this.spinner.show();
    this.content.SubCategory(MainCategoryId).subscribe(response => {
      if (response.isSuccess) {
        this.subCategoryList = response.data;

        // this.SubSubcategoryList = []
        this.spinner.hide();
      } else {
        this.subCategoryList = [];
        this.toaster.error(response.messages);
      }
    });
  }



  searchlist(): void {
    this.searchService.setSearchCriteria(this.searchText);
    // Other search logic...
    this.serviceListFilter();
  }



  serviceListFilter() {
   // this.spinner.show();
   
    let payload;
    if (this.role === 'Vendor') {
      payload = {
        pageNumber: 1,
        pageSize: 1000,
        salonId: this.id,
        ageRestrictions: this.form.value.ageRestrictions ? this.form.value.ageRestrictions : '',
        mainCategoryId: this.form.value.mainCategoryId ? this.form.value.mainCategoryId : '',
        subCategoryId: this.form.value.subCategoryId ? this.form.value.subCategoryId : '',
        genderPreferences : this.form.value.genderPreferences ? this.form.value.genderPreferences : '',
      };
    } else if (this.role === 'SuperAdmin') {
      payload = {
        pageNumber: 1,
        pageSize: 1000,
        salonId: this.salonId.id,
        ageRestrictions: this.form.value.ageRestrictions ? this.form.value.ageRestrictions : '',
        mainCategoryId: this.form.value.mainCategoryId ? this.form.value.mainCategoryId : '',
        subCategoryId: this.form.value.subCategoryId ? this.form.value.subCategoryId : '',
        genderPreferences : this.form.value.genderPreferences ? this.form.value.genderPreferences : '',
      };
    }
    this.content.filterServiceList(payload).subscribe(response => {
      if (response.isSuccess) {
        this.list = response.data.dataList;
        this.filterService.setFilteredData(this.list);
   //     this.spinner.hide();
      } else {
        this.list = [];
      }
    });
  }


  addSpaceAfterText() {
    this.searchText = this.searchText.trim();
    }

 
    clear(){  
      this.subCategoryList = []
    }
}
