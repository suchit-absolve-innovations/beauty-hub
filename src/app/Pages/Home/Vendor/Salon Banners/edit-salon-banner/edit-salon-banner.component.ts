import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContentService } from 'src/app/Shared/service/content.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-edit-salon-banner',
  templateUrl: './edit-salon-banner.component.html',
  styleUrls: ['./edit-salon-banner.component.css']
})
export class EditSalonBannerComponent implements OnInit {
  ShopBannerdetail: any;
  salonBannerId: any;
  form: any;
  categoryList: any;
  subCategoryList: any;
  SubSubcategoryList: any;
  imageFile!: { link: any; file: any; name: any; type: any; };
  salonId!: any;
  visible!: boolean;
  bannerImage: any;
  rootUrl: any;
  editImages: any;
  selectedFilter: any;
  showBrandDiv: boolean = false;
  previewImage: any;
  urls1: any = [];
  image1: any;
  imageUrl: any;
  imageUrl1: any;
  errorMessage: string = '';
  isValid: boolean = false;
  constructor(private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private content: ContentService,
    private router: Router,
    private ngZone: NgZone,
    private formBuilder: FormBuilder,
    private _location: Location,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
    this.salonBannerId = this.route.snapshot.paramMap.get('id');
    this.salonId = this.route.snapshot.paramMap.get('id2');
    this.getSalonBannerDetail();
    this.getcategoryList();
    this.onBannerTypeChange('SalonCategoryBanner'); 
    this.form = this.formBuilder.group({
      bannerType: [''],
      mainCategoryId: [''],
      subCategoryId: [''],
      bannerImage: ['']

    })
    this.form.get('mainCategoryId').valueChanges.subscribe(() => {
      // Reset subCategoryId when mainCategoryId changes
      this.form.get('subCategoryId').setValue('');
    });
  }
  get d() {
    return this.form['controls'];
  }

  get f() {
    return this.form['controls'];
  }

  get s() {
    return this.form['controls'];
  }

  backClicked() {
    this._location.back();
  }



  getSalonBannerDetail() {

    this.spinner.show();
    this.content.salonBannerDetail(this.salonBannerId).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();
        this.ShopBannerdetail = response.data;
        this.editImages = this.rootUrl + this.ShopBannerdetail?.bannerImage;
        this.getSubcategoryList(this.ShopBannerdetail?.mainCategoryId);

        this.form.patchValue({
          bannerType: this.ShopBannerdetail.bannerType,
          mainCategoryId: this.ShopBannerdetail.mainCategoryId,
          subCategoryId: this.ShopBannerdetail.subCategoryId,
        });
      }

    });
  }


  getcategoryList() {
    this.content.getcategory().subscribe(response => {
      if (response.isSuccess) {
        this.categoryList = response.data;
        this.subCategoryList = [];

      } else {
        this.categoryList = [];
        this.subCategoryList = [];
        this.toaster.error(response.messages);
      }
    });
  }




  getSubcategoryList(data: any) {
    this.content.SubCategory(data).subscribe(response => {
      if (response.isSuccess) {

        this.subCategoryList = response.data;

        this.spinner.hide();
      } else {
        this.subCategoryList = [];
        this.toaster.error(response.messages);
      }
    });
  } 
  imagesUpload(event: any) {
    const file = event.target.files[0];
  
    if (file) {
      const fileType = file.type;
      const fileName = file.name;
  
      if (
        (fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'image/jpg') &&
        (fileName.toLowerCase().endsWith('.jpeg') || fileName.toLowerCase().endsWith('.png') || fileName.toLowerCase().endsWith('.jpg'))
      ) {
        const imageSize = file.size / 1024; // in KB
        const image = new Image();
  
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
              this.previewImage =  image.src;
              this.errorMessage = ''; // No error message if the image meets criteria
            } else {
              this.isValid = false;
              this.errorMessage = 'Please select a 1280x720 pixels (width×height) & JPEG or PNG image.';
              // Further handling for invalid images if needed
            }
          };
        };
        reader.readAsDataURL(file);
      } else {
        this.errorMessage = 'Please select a 1280x720 pixels (width×height) & JPEG or PNG image.';
      }
    }
  }

  // imagesUpload(event: any) {
  //   const fileType = event.target.files[0].type;
  //   if ((fileType === 'image/jpeg' || fileType === 'image/png') && fileType !== 'image/jfif') {
  //     if (event.target.files && event.target.files[0]) {
  //       const file = event.target.files[0];
  //       const imageSize = file.size / 1024; // in KB
  //       const reader = new FileReader();
  //       reader.onload = (_event: any) => {
  //         const image = new Image();
  //         image.src = _event.target.result as string;
  //         image.onload = () => {

  //           if (image.width === 1280 && image.height === 720 && imageSize <= 1024) {
  //             const imageDataUrl = reader.result as string;
  //             this.imageFile = {
  //               link: _event.target.result,
  //               file: file,
  //               name: file.name,
  //               type: file.type,

  //             };
  //             this.previewImage = imageDataUrl;
  //             this.urls1.push(imageDataUrl);
  //             this.isValid = true;
  //             this.errorMessage = ''; // No error message if the image meets criteria
  //           } else {
  //             this.isValid = false;
  //             this.errorMessage = 'Please select a 1280x720 pixels (width×height) image .'; // Error message for invalid image
  //             // You can add further handling if needed for invalid images
  //           }
  //         };
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   } else {
  //     this.errorMessage = 'Please select a valid JPEG or PNG image.';
  //   }
  // }



  fileChangeEvent() {

    this.spinner.show();
    let formData = new FormData();
    formData.append("salonBannerId", this.salonBannerId);
    formData.append("bannerImage", this.imageFile?.file);
    formData.append("bannerImage", this.editImages);
    formData.append("bannerType", this.form.value.bannerType);
    formData.append("salonId", this.salonId);
    formData.append("mainCategoryId", this.form.value.mainCategoryId > 0 ? this.form.value.mainCategoryId : 0);
    formData.append("subCategoryId", this.form.value.subCategoryId > 0 ? this.form.value.subCategoryId : 0);
    this.content.updateSalonBanner(formData).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();
        this.toaster.success(response.messages)
        this.router.navigateByUrl('/salon-banner-list')
        setTimeout(() => {
          window.location.reload();
        }, 500); 
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

  onBannerTypeChange(selectedValue: string) {
    this.showBrandDiv = selectedValue === 'SalonCategoryBanner';
    this.selectedFilter = selectedValue === 'SalonCategoryBanner';
    // Perform any other actions based on the selected value
    
  }
}
  //onclick toggling both
  // onBannerTypeChange(selectedValue: string) {
  //   this.showBrandDiv = selectedValue === 'SalonCategoryBanner';
  //   // this.Brandlistshow = selectedValue === 'BrandBanner';
  //   this.selectedFilter = selectedValue === 'SalonCategoryBanner';
  //   selectedValue === 'SalonCategoryBanner';

  // }
  // onclick(data: any) {
  //   this.visible = !this.visible
  // }


