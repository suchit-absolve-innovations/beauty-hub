import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-super-admin-dashboard',
  templateUrl: './super-admin-dashboard.component.html',
  styleUrls: ['./super-admin-dashboard.component.css'],
})
export class SuperAdminDashboardComponent implements OnInit {
  vendorList: any;
  adminList:any
  // serach
  public searchText: any = '';
  page: number = 0;
  itemsPerPage!: number;
  totalItems!: number;
  form!: FormGroup;
  rootUrl: any;
  // Get value to set list accept reject condition

  value = localStorage.getItem('user');
  vendorId: any;
  membershipRecordId: any;

  constructor(
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private content: ContentService,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
    this.route.queryParams.subscribe((params) => {
      this.page = +params['page'] || 0; // Use the 'page' query parameter value, or default to 1
    });
    this.getVendorList();
    this.getAdminUserLists();

    this.form = this.formBuilder.group({
      transactionId: [''],
    });
  }

  performSearch() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: null },
      queryParamsHandling: 'merge',
    });
  }
  refresh(): void {
    // Perform refresh actions
    // Update the query parameter with the current page index

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: this.page },
      queryParamsHandling: 'merge',
    });
  }
  getAdminUserLists(){
    let payload = {
      pageNumber : 1,
      pageSize : 1000,
    }
    this.content.getAdminUserList(payload).subscribe((response:any) => {
      if (response.isSuccess) {
        this.adminList = response.data.dataList;
        this.spinner.hide();
  }
});
}

  getVendorList() {
    let payload = {
      pageNumber: 1,
      pageSize: 1000,
    };
    this.spinner.show();
    this.content.getVendorList(payload).subscribe((response) => {
      if (response.isSuccess) {
        this.vendorList = response.data.dataList;
        this.spinner.hide();
      }
    });
  }


  vendorStatusAccept(data: any) {
    
    let payload = {
      vendorId: data.vendorId,
      salonId: data.salonId,
      status: 1,
    };
    this.spinner.show();
    this.content.vendorAcceptReject(payload).subscribe((response) => {
      if (response.isSuccess) {
        this.spinner.hide();
        this.ngZone.run(() => {
          this.getVendorList();
          this.getAdminUserLists();
        });
        this.toaster.success(response.messages);
      } else {
        this.spinner.hide();
        this.toaster.error(response.messages);
      }
    });
  }


  vendorStatusReject(data: any) {
    let payload = {
      vendorId: data.vendorId,
      shopId: data.shopId,
      status: 2,
    };
    this.spinner.show();
    this.content.vendorAcceptReject(payload).subscribe((response) => {
      if (response.isSuccess) {
        this.spinner.hide();
        this.ngZone.run(() => {
          this.getVendorList();
        });
        this.toaster.success(response.messages);
      } else {
        this.spinner.hide();
        this.toaster.error(response.messages);
      }
    });
  }

  // edit user
  editPlan(data: any) {
    this.router.navigate(['/salon-list/buy-membership-plan/add-salon'], {
      queryParams: {
        id: data.vendorId,
      },
    });
  }

  /*** Delete Vendor  ***/
  delet(data: any) {
    this.vendorId = data.vendorId;
  }

  deleteVendor() {
    this.spinner.show();
    this.content.deleteVendor(this.vendorId).subscribe((response) => {
      if (response.isSuccess) {
        this.spinner.hide();
        // this.ngZone.run(() => { this.getVendorList(); })
        this.toaster.success(response.messages);
        window.location.reload();
      } else {
        this.spinner.hide();
        this.toaster.error(response.messages);
      }
    });
  }

  purchaseMembershipRoute(data: any) {
    this.router
      .navigate(['/super-vendor-list/membership-plan-list'], {
        queryParams: {
          planType: data,
        },
      })
      .then(() => {
        window.location.reload();
      });
    // [routerLink]="['/super-vendor-list/membership-plan-list']"
  }
}
