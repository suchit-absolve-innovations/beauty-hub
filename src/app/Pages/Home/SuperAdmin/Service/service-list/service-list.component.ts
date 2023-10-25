import { Component, NgZone, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContentService } from 'src/app/Shared/service/content.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';

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
 
  constructor(private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private content: ContentService,
    private router: Router,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _location: Location) { }

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
    this.id = localStorage.getItem('salonId');
    this.role = localStorage.getItem('user')
    this.route.queryParams.subscribe(params => {
      this.page = +params['page'] || 0; // Use the 'page' query parameter value, or default to 1
    });

    this.salonId = this.route.snapshot.queryParams
    // this.salonIds = localStorage.setItem('salonid',this.salonId.id)
    this.getList();
    this.getcategoryList();
    this.filterListForm();
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
    this.content.getservice(payload).subscribe(response => {
      if (response.isSuccess) {
        this.list = response.data.dataList

        this.spinner.hide();
      }
    });
  }


  getServiceListVendor() {
    let payload = {
      pageNumber: 1,
      pageSize: 1000,
      salonId: this.id
    }
    this.content.getservice(payload).subscribe(response => {
      if (response.isSuccess) {
        this.list = response.data.dataList

        this.spinner.hide();
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
    this.postActiveServiceStatus(data)
  } else if (this.isActive == false) {
    this.postUnActiveServiceStatus(data)
  }
}

checkInactiveStatus(data: any) {
  this.unActive = !this.unActive;
  if (this.unActive == true) {
    this.postActiveServiceStatus(data)
  } else if (this.unActive == false) {
    this.postUnActiveServiceStatus(data)
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

    this.serviceId = data.serviceId;

  }
  serviceDelete() {
    this.spinner.show();
    this.content.deleteService(this.serviceId).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();
        this.ngZone.run(() => { this.getServiceList(); })
        this.toaster.success(response.messages);
        window.location.reload();
      } else {
        this.spinner.hide();
        this.toaster.error(response.messages)
      }
    });
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
      ageRestrictions: ['']
    });
  }

  get f() {
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

        //  this.spinner.hide();
      } else {
        // this.spinner.hide();
        this.toaster.error(response.messages);
      }
    });
  }


  getSubcategoryList(MainCategoryId: any) {

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

  serviceListFilter() {
    this.spinner.show();
    let payload;
    if (this.role === 'Vendor') {
      payload = {
        pageNumber: 1,
        pageSize: 1000,
        salonId: this.id,
        ageRestrictions: this.form.value.ageRestrictions ? this.form.value.ageRestrictions : '',
        mainCategoryId: this.form.value.mainCategoryId ? this.form.value.mainCategoryId : '',
        subCategoryId: this.form.value.subCategoryId ? this.form.value.subCategoryId : '',
        genderPreferences : this.form.value.genderPreferences ? this.form.value.genderPreferences : ''

      };
    } else if (this.role === 'SuperAdmin') {
      payload = {
        pageNumber: 1,
        pageSize: 1000,
        salonId: this.salonId.id,
        ageRestrictions: this.form.value.ageRestrictions ? this.form.value.ageRestrictions : '',
        mainCategoryId: this.form.value.mainCategoryId ? this.form.value.mainCategoryId : '',
        subCategoryId: this.form.value.subCategoryId ? this.form.value.subCategoryId : '',
        genderPreferences : this.form.value.genderPreferences ? this.form.value.genderPreferences : ''

      };
    }
    this.content.filterServiceList(payload).subscribe(response => {
      if (response.isSuccess) {
        this.list = response.data.dataList;
        this.spinner.hide();
      } else {
        this.list = [];

      }
    });
  }
}
