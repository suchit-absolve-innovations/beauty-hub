import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.css']
})
export class EditServiceComponent implements OnInit {
  rootUrl: any;
  serviceId: any;
  submitted!: boolean;
  form: any;
  subCategoryList: any;
  categoryList: any;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private contentService: ContentService,
    private toasterService: ToastrService,
    private toaster: ToastrService,
   private spinner: NgxSpinnerService,
   private route: ActivatedRoute,
   private ngZone: NgZone,) { }

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
    this.serviceId = this.route.snapshot.paramMap.get('id');
    this.serviceForm();
    this.getcategoryList();
  }

  serviceForm() {
    this.submitted = true;
    this.form = this.formBuilder.group({
      serviceName: ['', [Validators.required]],
      basePrice: ['', [Validators.required]],
      discount: ['', [Validators.required]],
      listingPrice: ['', [Validators.required]],
      mainCategoryId: ['', [Validators.required]],
      subcategoryId: ['', [Validators.required]],
      ageRestrictions: ['', [Validators.required]],
      genderPreferences: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      totalCountPerDuration: ['', [Validators.required]],
      durationInMinutes: ['', [Validators.required]],
      lockTimeStart: ['', [Validators.required]],
      lockTimeEnd:  ['', [Validators.required]],
      serviceDescription: ['', [Validators.required]],

    })
}

  
  /*** for validation ***/
  get f() {
    return this.form.controls;
  }

  getcategoryList(){
    debugger
    // this.spinner.show();
      this.contentService.getcategory().subscribe(response => {
        if (response.isSuccess) {
          this.categoryList = response.data;
        
        //  this.spinner.hide();
        } else {
          // this.spinner.hide();
          this.toaster.error(response.messages);
        }
      });
    }





   getSubcategoryList(mainCategoryId:any){
  debugger

   this.contentService.SuperSubCategory(mainCategoryId).subscribe(response => {
     if (response.isSuccess) {
       this.subCategoryList = response.data;
       console.log( this.subCategoryList)
     
       // this.SubSubcategoryList = []
       this.spinner.hide();
     } else {
       this.subCategoryList = [];
       this.toaster.error(response.messages);
     }
   });
 }



}
