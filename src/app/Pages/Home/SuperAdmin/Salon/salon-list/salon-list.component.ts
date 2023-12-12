import { Component, NgZone, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContentService } from 'src/app/Shared/service/content.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
declare var $: any;

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
  search: any;
  itemToDelete: any;

  constructor(private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private content: ContentService,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
   
     this.getVendorList();
     this.route.queryParams.subscribe((params) => {
      this.search = params['search'] || '';
      this.page = params['page'] ? parseInt(params['page'], 10) : 1;
      // Fetch data based on the search term and page
      this.getVendorList();
    });


    this.form = this.formBuilder.group({
      transactionId: ['']
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
//   delet(data:any){
    
// this.vendorId = data.vendorId;

//   }
delet(data: any) {
  this.itemToDelete = data;
  $('#list-cross-mess').modal('show');
}


  deleteVendor() {
    this.spinner.show();
    if (this.itemToDelete) {
      const itemId = this.itemToDelete.vendorId;
    this.content.deleteVendor(itemId).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();
        // Remove the deleted item from the local list
        this.vendorList = this.vendorList.filter((item: { vendorId: any; }) => item.vendorId !== itemId);
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

  addSpaceAfterText() {
    this.searchText = this.searchText.trim();
    }
  // check transiction id 

//   checkTransactionId(){
//     
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
