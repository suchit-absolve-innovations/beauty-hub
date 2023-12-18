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
  bannerTypeControl: FormControl = new FormControl('');
  previewImage: string = '';
  urls1: any = [];
  image1: any;
  imageUrl: any;
  imageUrl1: any;
  errorMessage: string = '';
  isValid: boolean = false;
  submitted = false;
  constructor(private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private content: ContentService,
    private router: Router,
    private ngZone: NgZone,
    private toasterService: ToastrService,
    private formBuilder: FormBuilder,
    private _location: Location,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.vendorId = localStorage.getItem('vendorId');
    this.salonId = localStorage.getItem('salonId');
    this.getcategoryList();
    this.form = this.formBuilder.group({
      bannerType: this.bannerTypeControl,
      ShopCategoryBanner: [''],
      mainCategoryId: [''],
      subCategoryId: [''],    
    })
    this.form.get('mainCategoryId').valueChanges.subscribe(() => {
      // Reset subCategoryId when mainCategoryId changes
      this.form.get('subCategoryId').setValue('');
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
        // this.form.get('subCategoryId').setValue(''); 
        // this.subCategoryList =[];
        this.spinner.hide();
      } else {
        this.spinner.hide();
        this.toaster.error(response.messages);
      }
    });
  }


  /*** Sub  Category List ***/

  getSubcategoryList(data: any) {
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
    const fileType = event.target.files[0].type;
    if ((fileType === 'image/jpeg' || fileType === 'image/png') && fileType !== 'image/jfif') {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const imageSize = file.size / 1024; // in KB
  
      const reader = new FileReader();
      reader.onload = (_event: any) => {
        const image = new Image();
        image.src = _event.target.result as string;
        image.onload = () => {
          if (image.width === 1280 && image.height === 720 && imageSize <= 1024) {
            this.imageFile = {
              link: _event.target.result,
              file: file,
              name: file.name,
              type: file.type
            };
            this.isValid = true;
            this.errorMessage = ''; // No error message if the image meets criteria
          } else {
            this.isValid = false;
            this.errorMessage = 'Please select a 1280x720 pixels (width×height) image .'; // Error message for invalid image
            // You can add further handling if needed for invalid images
          }
        };
      };
      reader.readAsDataURL(file);
    }
  } else {
    this.errorMessage = 'Please select a valid JPEG or PNG image.';
      }
}
  

  // Shop Detail

  fileChangeEvent() {
 
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
    this.fileChangeEvent();
  }


  // Function to handle banner type change
  onBannerTypeChange() {
    const selectedBannerType = this.bannerTypeControl.value;
    // Determine if the subcategory dropdown should be visible
    this.visible = selectedBannerType === 'SalonCategoryBanner';
    this.form.get('mainCategoryId').setValue('');
    this.form.get('subCategoryId').setValue('');
    this.subCategoryList = [];
  }


}
