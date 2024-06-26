import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';

@Component({
  selector: 'app-membership-list',
  templateUrl: './membership-list.component.html',
  styleUrls: ['./membership-list.component.css']
})
export class MembershipListComponent implements OnInit {
  planList: any;
  // serach 
  public searchText: any = '';
  membershipPlanId: any;
  membershipPlanList: any;
  form: any;
  userRole= localStorage.getItem('user')



  constructor(private toasterService: ToastrService,
    private spinner: NgxSpinnerService,
    private content: ContentService,
    private router: Router,
    private ngZone: NgZone,
    private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this. getmembershipPlan();
    this.filterListForm();
  }


  filterListForm() {
    this.form = this.formBuilder.group({
      planType: ['', [Validators.required]],
    });
  }


  getmembershipPlan() {
    
    if (this.userRole == 'SuperAdmin') {
      this.getPlanList();
    }
    else (this.userRole == 'Vendor')
    this.getMembershipPlanList();
  }

  getPlanList() {
    this.spinner.show();
    this.content.getPlansList().subscribe(response => {
      if (response.isSuccess) {
        this.planList = response.data;
        // this.planType = response.data.planType
        this.spinner.hide();
      }
    });
  }

  getMembershipPlanList() {
    this.spinner.show();
   let vendorId= localStorage.getItem('vendorId')
    this.content.getBuyMemberShipPlanListvendor(vendorId).subscribe(response => {
      if (response.isSuccess) {
        this.membershipPlanList = response.data;
        // this.planType = response.data.planType
        this.spinner.hide();
      }
    });
  }

  getPlanListFilter() {
    this.spinner.show();
    this.content.getPlansListFilter(this.form.value.planType).subscribe(response => {
      if (response.isSuccess) {
        this.planList = response.data;
        this.spinner.hide();
      }
    });
  }

  backClickedreload() {
    this.router.navigateByUrl('/plan-list')
      .then(() => {
        window.location.reload();
      });
  }

  delet(data: any) {
    this.membershipPlanId = data.membershipPlanId;

  }
  deleteAddedPlan() {
    
    this.spinner.show();
    return this.content.deletePlan(this.membershipPlanId).subscribe(response => {
      if (response.isSuccess) {

        this.spinner.hide();
        // this.ngZone.run(() => { this.getPlanList() })
        window.location.reload();
        this.toasterService.success(response.messages);

      } else {
        this.spinner.hide();
        this.toasterService.error(response.message);
      }
    });
  }

  editPlan(data: any) {
    this.router.navigate(['/plan-list/add-edit-plan'],
      {
        queryParams: {
          id: data.membershipPlanId
        }
      });
  }

  addSpaceAfterText() {
    this.searchText = this.searchText.trim();
    }
}
