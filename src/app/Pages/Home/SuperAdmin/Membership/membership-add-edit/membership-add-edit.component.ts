import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-membership-add-edit',
  templateUrl: './membership-add-edit.component.html',
  styleUrls: ['./membership-add-edit.component.css']
})
export class MembershipAddEditComponent implements OnInit {
  planForm!: FormGroup;
  isPopular!: boolean;
  formPayload: any = {};
  membershipPlanId: any;
  planDetail: any;
  submitted = false;


  constructor( private fb: FormBuilder,
    private contentService: ContentService,
    private toasterService: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location,) { }

  ngOnInit(): void {
    this.membershipPlanId = this.route.snapshot.queryParams;
    this.setPlanForm();
    this.getPlanDetail()
  }


  setPlanForm() {
    this.planForm = this.fb.group({
      planName: ['', [Validators.required]],
      planPrice: ['', [Validators.required]],
      planDuration: ['', [Validators.required]],
      discountInPercentage: ['0'],
      gsttype: ['Exclusive', [Validators.required]],
      gstinPercentage: ['', [Validators.required]],
      planDescription: ['null'],
      planType: [],
      isPopular: [''],
    });
  }
  
  get f() {
    return this.planForm['controls'];
  }
  backClicked() {
    this._location.back();
  }

  checkPopularPlan(event: any) {

    if (event.currentTarget?.checked) {
      this.isPopular = true;
    } else {
      this.isPopular = false;
    }
  }



  addUpdatePlan() {
    this.submitted = true;
    if (this.planForm.invalid) {
      this.toasterService.error("Form Incomplete: Please fill in all the required fields correctly");
      return;
    }
  
    if (this.planDetail) {
      
      let checkStatus: any;
      if (this.isPopular == true) {
        checkStatus = true;
      } else {
        if (this.isPopular == false) {
          checkStatus = false;
        } else {
          checkStatus = false;
        }
      }

      let data1 = {
        status: checkStatus
      }
      let planPrice = parseInt(this.planForm.value.planPrice)
     let Payload = {
        membershipPlanId: parseInt(this.membershipPlanId.id),
        planName: this.planForm.value.planName,
        planDuration: this.planForm.value.planDuration,
        discountInPercentage: this.planForm.value.discountInPercentage,
        gsttype: this.planForm.value.gsttype,
        gstinPercentage: this.planForm.value.gstinPercentage,
        planDescription: this.planForm.value.planDescription,
        planPrice: planPrice,
        planType: this.planForm.value.planType,
        isPopular: data1.status,
      }
      // this.formPayload.planDuration = parseInt(this.planForm.value.planDuration, 10);
      this.spinner.show()
      this.contentService.planUpdate(Payload).subscribe((response) => {
        if (response.isSuccess) {
          this.spinner.hide()
          this.toasterService.success(response.messages);
          this.router.navigateByUrl('/plan-list')
   
        } else {
          this.toasterService.error(response.messages)
          this.spinner.hide()
        } 
        // this.toasterService.success(response.messages);
        //   this.router.navigateByUrl('/plan-list')
        //   this.spinner.hide()
        });

        } else {
          
          let checkStatus: any;
          if (this.isPopular == true) {
            checkStatus = true;
          } else {
            if (this.isPopular == false) {
              checkStatus = false;
            } else {
              checkStatus = false;
            }
          }
    
          let data1 = {
            status: checkStatus
          }
          let planPrice = parseInt(this.planForm.value.planPrice)
          this.formPayload = {
            planName: this.planForm.value.planName,
            planDuration: this.planForm.value.planDuration,
            discountInPercentage:this.planForm.value.discountInPercentage,
            gsttype:this.planForm.value.gsttype,
            gstinPercentage:this.planForm.value.gstinPercentage,
            planDescription: this.planForm.value.planDescription,
            planPrice: planPrice,
            planType: this.planForm.value.planType,
            isPopular: data1.status,
          }
          this.formPayload.planDuration = parseInt(this.planForm.value.planDuration, 10);
          this.spinner.show()
          this.contentService.addPlan(this.formPayload).subscribe((response) => {
            if (response.isSuccess) {
              this.spinner.hide()
              this.toasterService.success(response.messages);
              this.router.navigateByUrl('/plan-list')
       
            } else {
              this.toasterService.error(response.messages)
              this.spinner.hide()
            } 

          })
    }
  }

  getPlanDetail() {
    
    // this.spinner.show()
    this.contentService.planDetail(this.membershipPlanId.id).subscribe((response) => {
      if (response.isSuccess) {
        this.planDetail = response.data;
        this.planForm.patchValue({
          planName: this.planDetail.planName,
          planDuration: this.planDetail.planDuration,
          discountInPercentage: this.planDetail.discountInPercentage,
          gsttype: this.planDetail.gsttype,
          gstinPercentage:this.planDetail.gstinPercentage,
          planDescription: this.planDetail.planDescription,
          planPrice: this.planDetail.planPrice,
          planType: this.planDetail.planType,
          isPopular: this.planDetail.isPopular,

        })
        //  this.data = response.data.planDescription  

        this.spinner.hide();
      }

    });
  }

  cancel(){
    this.router.navigateByUrl('/plan-list')
    .then(() => {
      window.location.reload();
    });
  }


}
