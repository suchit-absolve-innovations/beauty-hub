import { Component, NgZone, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContentService } from 'src/app/Shared/service/content.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-salon-list',
  templateUrl: './salon-list.component.html',
  styleUrls: ['./salon-list.component.css']
})
export class SalonListComponent implements OnInit {
  vendorList: any;
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

  constructor(private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private content: ContentService,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
    this.route.queryParams.subscribe(params => {
      this.page = +params['page'] || 0; // Use the 'page' query parameter value, or default to 1
    });
     this.getVendorList();

    this.form = this.formBuilder.group({
      transactionId: ['']
    });
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



  getVendorList() {
    let payload = {
      pageNumber: 1,
      pageSize: 1000,
    }
    this.spinner.show();
    this.content.getVendorList(payload).subscribe(response => {
      if (response.isSuccess) {
        this.vendorList = response.data.dataList;
        this.spinner.hide();
      }
    });
  }



  vendorStatusAccept(data: any) {
  debugger
    let payload = {
      vendorId: data.vendorId,
      salonId: data.salonId,
      status: 1
    }
    this.spinner.show();
    this.content.vendorAcceptReject(payload).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();
        this.ngZone.run(() => { this.getVendorList(); })
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
      status: 2
    }
    this.spinner.show();
    this.content.vendorAcceptReject(payload).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();
        this.ngZone.run(() => { this.getVendorList(); })
        this.toaster.success(response.messages);
      } else {
        this.spinner.hide();
        this.toaster.error(response.messages)
      }
    });
   }

   
    // edit user 
    editPlan(data: any) {
      this.router.navigate(['/salon-list/buy-membership-plan/add-salon'],
        {
          queryParams: {
            id: data.vendorId
          }
        });
    }

  /*** Delete Vendor  ***/
  delet(data:any){
    
this.vendorId = data.vendorId;

  }

  deleteVendor() {
    this.spinner.show();
    this.content.deleteVendor(this.vendorId).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();
        // this.ngZone.run(() => { this.getVendorList(); })
        this.toaster.success(response.messages);
        window.location.reload();

      } else {
        this.spinner.hide();
        this.toaster.error(response.messages)
      }
    });
  }

  purchaseMembershipRoute(data:any){
    this.router.navigate(['/super-vendor-list/membership-plan-list'],
    {
      queryParams: {
        planType: data
      }
    })
  .then(() => {
    window.location.reload();
  });
    // [routerLink]="['/super-vendor-list/membership-plan-list']"
  }


  // check transiction id 

//   checkTransactionId(){
//     debugger
// this.content.gettransictionID(this.form.value.transactionId).subscribe(response => {
//   if(response.isSuccess) {
//     this.membershipRecordId = response.data.membershipRecordId
//     localStorage.setItem('membershipRecordId', this.membershipRecordId)
//     // localStorage.setItem('membershipRecordId', )
//       this.router.navigate(['/super-vendor-list/super-add-vendor'])
//       .then(() => {
//         window.location.reload();
//       });
    
//   } else {
//     this.toaster.error(response.messages)
//   }
// });
//   }
}
