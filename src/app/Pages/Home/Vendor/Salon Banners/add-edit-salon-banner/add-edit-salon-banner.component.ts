import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContentService } from 'src/app/Shared/service/content.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-add-edit-salon-banner',
  templateUrl: './add-edit-salon-banner.component.html',
  styleUrls: ['./add-edit-salon-banner.component.css']
})
export class AddEditSalonBannerComponent implements OnInit {
  categoryList: any;
  subCategoryList: any;
  SubSubcategoryList: any;
  form: any;
  imageFile!: { link: any; file: any; name: any; type: any; };
  salonId: any
  vendorDetail: any;
  shopDetail: any;
  vendorId: any;
  visible!: boolean;
  constructor(private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private content: ContentService,
    private router: Router,
    private ngZone: NgZone,
    private formBuilder: FormBuilder,
    private _location: Location,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.vendorId = localStorage.getItem('vendorId');
    this.salonId = localStorage.getItem('salonId');
    this.getcategoryList();


    this.form = this.formBuilder.group({
      bannerType: [''],
      ShopCategoryBanner: [''],
      mainCategoryId: [''],
      subCategoryId: [''],
    

    });
  }


  get f() {
    return this.form['controls'];
  }

  get s() {
    return this.form['controls'];
  }

  get d() {
    return this.form['controls'];
  }

  backClicked() {
    this._location.back();
  }

  /*** Category List ***/

  getcategoryList() {

    this.spinner.show();
    this.content.getcategory().subscribe(response => {
      if (response.isSuccess) {
        this.categoryList = response.data;

        this.spinner.hide();
      } else {
        this.spinner.hide();
        this.toaster.error(response.messages);
      }
    });
  }


  /*** Sub  Category List ***/

  getSubcategoryList(data: any) {
debugger
    // this.spinner.show();

    this.content.SubCategory(data).subscribe(response => {
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




  // Add Shop Banner

  /*** Image Upload ***/
  // image upload 
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

      };
      // this.name = this.imageFile.link
      reader.readAsDataURL(event.target.files[0]);

    }
  }

  // Shop Detail


 

  fileChangeEvent() {
    debugger
    
    this.spinner.show();
    let formData = new FormData();
    formData.append("bannerImage", this.imageFile?.file);
    formData.append("bannerType", this.form.value.bannerType);
    formData.append("salonId", this.salonId);
    formData.append("mainCategoryId", this.form.value.mainCategoryId);
    formData.append("subCategoryId", this.form.value.subCategoryId > 0 ? this.form.value.subCategoryId : 0);
    // formData.append("SubSubProductCategoryId", this.form.value.SubSubProductCategoryId > 0 ? this.form.value.SubSubProductCategoryId : 0);
    this.content.addSalonBanners(formData).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();
        this.toaster.success(response.messages)
        this.router.navigateByUrl('/salon-banner-list')
      } else {
        this.spinner.hide();
        this.toaster.error(response.messages)
      }
    });
  }

  // use to submit data

  Submit() {
    debugger
    this.fileChangeEvent();
  }


  //onclick toggling both
  onclick(data: any) {
    this.visible = !this.visible
  }




}
