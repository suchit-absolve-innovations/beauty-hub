import { Component, NgZone, OnInit, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContentService } from 'src/app/Shared/service/content.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
// import { PaymentServiceService } from 'src/app/Shared/service/payment-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
declare var $: any;

@Component({
  selector: 'app-buy-mebership-plan-list',
  templateUrl: './buy-mebership-plan-list.component.html',
  styleUrls: ['./buy-mebership-plan-list.component.css']
})
export class BuyMebershipPlanListComponent implements OnInit {

  planList: any;
  membershipPlanIds: any;
  membershipRecordId!: string;
  login = localStorage.getItem('role');
  vendorId = localStorage.getItem('id');
  plandetail: any;
  rootUrl: any;
  accountDetail: any;
  editImages: any
  imageFile!: { link: any; file: any; name: any; type: any; };
  paymentReceiptIds: any;
  private isRefreshed: boolean = false;
  x!: any;
  userRole= localStorage.getItem('user')

  merchantId!: void;
  transactionId!: any;
  data: any;
  planType: any;

  constructor(private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private content: ContentService,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private _location: Location,
    private elementRef: ElementRef,
    // private paymentService: PaymentServiceService,
    private http: HttpClient) { }

  ngOnInit(): void {
    
    this.getMembershipPlan();
    this.rootUrl = environment.rootPathUrl;
   
    // this.route.queryParams.subscribe((params: any) => {
    //   this.data = params.planType
    //   if (params.planType) {
    //     // this.getBrandDetail(params.id);
    //     // this.plan();
       
       
    //   }
    // });
  }

    //Submit Payment

    // pay(data: any) {
     
    //   this.transactionId = localStorage.getItem('merchantId')
    //   let payload = {
    //     membershipPlanId: data.membershipPlanId,
    //     transactionId: parseInt(this.transactionId),
    //     createdBy: localStorage.getItem('id'),
    //     paymentMethod: 'paybyupi'
    //   }
    //   this.content.planBuy(payload).subscribe(response => {
    //     if (response.isSuccess) {
    //       // this.toaster.success(response.messages)
  
    //       this.membershipRecordId = response.data.membershipRecordId
    //       localStorage.setItem('membershipRecordId', this.membershipRecordId)
    //       // if (this.login == 'Distributor') {
    //       //   this.router.navigateByUrl('/distributor-vendor-list/add/' + this.membershipRecordId)
    //       //     .then(() => {
    //       //       window.location.reload();
    //       //     });
    //       // } else {
    //       //   this.router.navigateByUrl('/super-vendor-list/super-add-vendor/' + this.membershipRecordId)
    //       //     .then(() => {
    //       //       window.location.reload();
    //       //     });
    //       // }
    //     } else {
    //       this.toaster.error(response.messages)
    //     }
    //   });
    // }

   // Final Payment 

  //  payment(amount: any) {
    
  //   let payload = {
  //     amount: amount.totalAmount
  //   }
  //   this.content.getPayment(payload).subscribe(response => {
      
  //     if (response.isSuccess) {
  
  //       this.merchantId = localStorage.setItem('merchantId', response.data.merchantTransactionId)
  //       this.merchantId = sessionStorage.setItem('merchantId', response.data.merchantTransactionId)
  //       this.pay(amount)
  //       // window.open(data);
    
  //   // window.location.href = response.data.url;
  //   window.open(response.data.url, '_blank', 'noopener noreferrer');

  //     } else {
  //       this.toaster.error(response.messages);

  //     }
  //   });
  // }

  backClicked() {
    this._location.back();
  }
  // to get list conditionally
  // plan() {
  //   if (this.login == 'SuperAdmin') {
  //     this.getPlanListSuper();
  //   } else if (this.login == 'Vendor') {

  //     // this.getPlanListVendor();

  //   } else if (this.login == 'Admin') {
  //     this.getPlanListSuper();

  //   } else if (this.login == 'Distributor') {
  //     this.getPlanListSuper();
  //   }

  // }

  getMembershipPlan() {
    
    if (this.userRole == 'SuperAdmin') {
      this.getBuyMemberShipPlan();
    }
    if (this.userRole == 'Vendor') {
      this.getMembershipPlanList();
    }
    if (this.userRole == 'Admin') {
      this.getMembershipPlanList();
    }
  }


  getBuyMemberShipPlan() {

    // window.location.reload();
    this.ngZone.run(() => {
      this.spinner.show();
     
      
     
      this.content.getBuyMemberShipPlanList().subscribe(response => {
        if (response.isSuccess) {
          this.planList = response.data;
          // this.membershipPlanIds = response.data.membershipPlanId
       
          this.spinner.hide();
        } else {
          this.spinner.hide();
        }
      });
    });
  }

//for vendor//
getMembershipPlanList() {
  
      // window.location.reload();
      this.ngZone.run(() => {
        this.spinner.show();
        let vendorId= localStorage.getItem('vendorId')
        
       
        this.content.getBuyMemberShipPlanListvendor(vendorId).subscribe(response => {
          if (response.isSuccess) {
            this.planList = response.data;
            // this.membershipPlanIds = response.data.membershipPlanId
         
            this.spinner.hide();
          } else {
            this.spinner.hide();
          }
        });
      });
    }


 


  showModal() {
    $('#myModalpayment').modal('show')
  }



  // Pay by cash

  // payCash() {
  //   if (this.login == 'SuperAdmin') {
  //     this.paybycashSuper();
  //   } else if (this.login == 'Vendor') {
  //     this.paybycashVendor();
  //   } else if (this.login == 'Admin') {
  //     this.paybycashAdmin();
  //   }
  // }

  // paybycashSuper() {
  //   
  //   let payload = {
  //     vendorId: null,
  //     membershipPlanId: this.membershipPlanId,
  //     paymentReceiptId: 0,
  //     paymentMethod: 'InCash',
  //     createdBy: null
  //   }
  //   this.content.bycashPayment(payload).subscribe(response => {
  //     if (response.isSuccess) {
  //       this.toaster.success(response.messages)

  //       this.router.navigateByUrl('/super-vendor-list/super-add-vendor/' + this.membershipRecordId)
  //         .then(() => {
  //           window.location.reload();
  //         });
  //     } else {
  //       this.toaster.error(response.messages)
  //     }
  //   });
  // }




  // free route

  free() {
    if (this.login == 'Distributor') {
      this.router.navigateByUrl('/distributor-vendor-list/add/' + 0)
        .then(() => {
          window.location.reload();
        });
    } else {
      this.router.navigateByUrl('/super-vendor-list/super-add-vendor/' + 0)
        .then(() => {
          window.location.reload();
        });
    }
  }


  // get plan id 

  getPlanId(data:any){
this.membershipPlanIds = data
  }





  buyMemberShip() {

    let payload = {
   
      membershipPlanId: this.membershipPlanIds,
      paymentReceiptId: this.paymentReceiptIds,
      paymentMethod: 'PayByUPI',
      createdBy: null
     
    }
    this.content.buyMemberShipPlan(payload).subscribe(response => {
      if (response.isSuccess) {
        this.toaster.success(response.messages)
        // this.membershipRecordId = response.data.membershipRecordId

        // this.router.navigateByUrl('/salon-list/buy-membership-plan/add-salon')
         this.membershipRecordId = response.data.membershipRecordId
         localStorage.setItem('membershipRecordId', this.membershipRecordId)
         if (this.userRole == 'SuperAdmin') {
        this.router.navigateByUrl('/salon-list/buy-membership-plan/add-salon')
          .then(() => {
            window.location.reload();
          });
        }
        if (this.userRole == 'Vendor') {
          this.router.navigateByUrl('/subscription/buy-membership-plan/add-salon')
            .then(() => {
              window.location.reload();
            });
          }
          if (this.userRole == 'Admin') {
            this.router.navigateByUrl('/subscription/buy-membership-plan/add-salon')
              .then(() => {
                window.location.reload();
              });
            }
      } else {
        this.toaster.error(response.messages)
      }
    });
  }



  // Payment Options

  // paymentOptionally() {
  //   this.spinner.show();
  //   this.content.paymentOptions(this.membershipPlanId).subscribe(response => {
  //     if (response.isSuccess) {
  //       this.spinner.hide();
  //       // this.toaster.success(response.messages)
  //       this.plandetail = response.data;

  //       this.accountDetail = response.data.accountDetail
  //     }
  //     //  else {
  //     //   this.toaster.error(response.messages)
  //     // }
  //   });
  // }


  /* To copy any Text */
  copyItem(item: string): void {
    navigator.clipboard.writeText(item)
      .then(() => {
        // console.log('Item copied to clipboard:', item);
        // Add any further actions or notifications here
      })
      .catch((error) => {
  
        // Handle error or show appropriate error message
      });
  }

  /*** Image Upload ***/
  // image upload //
  imagesUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (_event: any) => {
        this.imageFile = {
          link: _event.target.result,
          file: event.srcElement.files[0],
          name: event.srcElement.files[0].name,
          type: event.srcElement.files[0].type
        };
        this.fileChangeEvent();
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }


  fileChangeEvent() {
    let formData = new FormData();
    formData.append("paymentReceipt", this.imageFile?.file);
    this.content.uploadReceiptImage(formData).subscribe(response => {

      if (response.isSuccess) {
        this.toaster.success(response.messages);

        this.paymentReceiptIds = response.data.paymentReceiptId

      } else {
        this.toaster.error(response.error)
      }
    });
  }


  myFunction() {
    this.x = document.getElementById("myDIV");
    if (this.x.style.display == "none") {
      this.x.style.display = "block";
    } else {
      this.x.style.display = "none";
    }
  }


  // Phone Payment Service 
  // initiatePayment(totalAmount: any) {

  //   this.paymentService.initiatePayment(totalAmount).subscribe(
  //     (response) => {
  //       // Handle the payment response, such as redirecting to PhonePe payment page
  //       window.location.href = response.paymentUrl;
  //     },
  //     (error) => {
  //       // Handle any errors during payment initiation
  //       console.error('Error initiating payment:', error);
  //     }
  //   );
  // }

  /// check 

  // click(){
   
  //   const url = 'https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay';
  //   const payload = {
  //     request: "DQogICAgICAgIHsNCiAgICAgICAgICAgICJtZXJjaGFudElkIjogIlNWQlBPTkxJTkUiLA0KICAgICAgICAgICAgIm1lcmNoYW50VHJhbnNhY3Rpb25JZCI6ICIxMDgxMDk3IiwNCiAgICAgICAgICAgICJtZXJjaGFudFVzZXJJZCI6ICJjNGY3YTBhYi01OGVhLTQ0OGYtODRkYS0wYWVlYzZjMDEzMGYiLA0KICAgICAgICAgICAgImFtb3VudCI6IDEwMCwNCiAgICAgICAgICAgICJyZWRpcmVjdFVybCI6ICJodHRwczovL2QxeTBwZHI3a3VwZ3Z4LmNsb3VkZnJvbnQubmV0LyMvbWVtYmVyc2hpcC1zdWNjZXNzIiwNCiAgICAgICAgICAgICJyZWRpcmVjdE1vZGUiOiAiUkVESVJFQ1QiLA0KICAgICAgICAgICAgImNhbGxiYWNrVXJsIjogImh0dHBzOi8vOGZndmpmZjd4NC5leGVjdXRlLWFwaS5hcC1zb3V0aC0xLmFtYXpvbmF3cy5jb20vYXBpL1ZlbmRvci9DaGVja1BheW1lbnRTdGF0dXM/bWVyY2hhbnRUcmFuc2FjdGlvbklkPTEwODEwOTciLA0KICAgICAgICAgICAgIm1vYmlsZU51bWJlciI6ICI4MTQ2ODEyNzM2IiwNCiAgICAgICAgICAgICJwYXltZW50SW5zdHJ1bWVudCI6IHsNCiAgICAgICAgICAgICAgICAidHlwZSI6ICJQQVlfUEFHRSINCiAgICAgICAgICAgIH0NCiAgICAgICAgfQ=="
  //   };

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'X-VERIFY': '5ed9a68c4cf25dd5116607cfca902b83307ce15101e8c0ca60db1e4ac6a78f65###1',
  //     'accept': 'application/json'
  //   });

  //   this.http.post(url, payload, { headers: headers })
  //     .subscribe(response => {
  //       console.log(response);
  //     });
  // }

}
