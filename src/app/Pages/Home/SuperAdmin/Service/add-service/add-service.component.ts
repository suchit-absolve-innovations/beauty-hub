import { Component, NgZone, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit {
  form!: FormGroup;
  submitted!: true;  

  id: any;
  SubSubcategoryList: any;
  subCategoryList: any;
  categoryList: any;
  salonBannerId: any;


  // isFieldInvalid(field: AbstractControl): boolean {
  //   return field.errors !== null && field.touched;
  // }

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private contentService: ContentService,
    private toasterService: ToastrService,
    private toaster: ToastrService,
   private spinner: NgxSpinnerService,
   private route: ActivatedRoute,
   private ngZone: NgZone,
  
  ) { }

  ngOnInit(): void {
   this.serviceForm()
  }

  serviceForm() {
    this.submitted = true;
    this.form = this.formBuilder.group({
      serviceName: ['', [Validators.required]],
      basePrice: ['', [Validators.required]],
      discount: ['', [Validators.required]],
      listingPrice: ['', [Validators.required]],
      mainCategory: ['', [Validators.required]],
      subCategory: ['', [Validators.required]],
      age: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      countDuration: ['', [Validators.required]],
      timeStart: ['', [Validators.required]],
      timeEnd: ['', [Validators.required]],
      discription: ['', [Validators.required]],

    })
}

  
  /*** for validation ***/
  get f() {
    return this.form.controls;
  }

  // getcategoryList(){
  //   // this.spinner.show();
  //     this.content.getcategory().subscribe(response => {
  //       if (response.isSuccess) {
  //         this.categoryList = response.data;
        
  //       //  this.spinner.hide();
  //       } else {
  //         // this.spinner.hide();
  //         this.toaster.error(response.messages);
  //       }
  //     });
  //   }

  //   getFilterMainCategoryList(data:any){

  //     // this.spinner.show();

  //     let payload = {
  //       salonId:localStorage.getItem('salonId'),
  //       mainCategoryId: data
      
  //     }
  //       this.content.getFilterShopMain(payload).subscribe(response => {
  //         if (response.isSuccess) {
          
  //            this.shopBannerList = response.data;
            
       
  //         } else {
      
  //        this.shopBannerList = [];
    
  //         }
  //       });
  //     }



//    getSubcategoryList(MainCategoryId:any){
//   debugger

//    this.content.SubCategory(MainCategoryId).subscribe(response => {
//      if (response.isSuccess) {
//        this.subCategoryList = response.data;
//        console.log( this.subCategoryList)
     
//        // this.SubSubcategoryList = []
//        this.spinner.hide();
//      } else {
//        this.subCategoryList = [];
//        this.toaster.error(response.messages);
//      }
//    });
//  }

//  getFilterSubCategoryList(data:any){
//   this.spinner.show();
//   let payload = {
 
//     salonId:localStorage.getItem('salonId'),
//     subCategoryId: data
  
//   }

//  this.content.getfilerShopSub(payload).subscribe(response => {
//    if (response.isSuccess) {
//     this.shopBannerList = response.data;
//    this.spinner.hide();
//   } else {
//     this.spinner.hide();
//     // this.data = response.isSuccess == 'false'

//     // this.toaster.error(response.messages);
//   }
//  });
// }

}