import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-edit-banner',
  templateUrl: './add-edit-banner.component.html',
  styleUrls: ['./add-edit-banner.component.css']
})
export class AddEditBannerComponent implements OnInit {
  form!: FormGroup;
  imageFile!: { link: any; file: any; name: any; type: any; };
  editImages: any;
  submitted = false;
  detail: any;
  id: any;
  rootUrl!: string;
  bannerId: any;
  bannerType: any;
  previewImage: string = '';
  errorMessage: string = '';
  isValid: boolean = false;
  constructor(private spinner: NgxSpinnerService,
    private content: ContentService,
    private router: Router,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toasterService: ToastrService,
    private _location: Location,) { }

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
    //  this.bannerForm();
    this.route.queryParams.subscribe((params: any) => {
      if (params.id) {
        this.getBannerDetail(params.id);
      }
    });
  }
  
  backClicked() {
    this._location.back();
  }

  /** Add Category Form **/
  // bannerForm() {

  //   this.form = this.formBuilder.group({
  //     bannerType: [this.imageFile?.file, [Validators.required]],
  //   });
  // }
  imagesUpload(event: any) {
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
  }

Submit() {
  this.spinner.show();
  this.submitted = true;

  if (!this.imageFile || !this.imageFile.file) {
    this.toasterService.error("Form Incomplete: Please upload an image");
    this.spinner.hide();
    return;
  }

  if (this.detail) {
    this.bannerId = this.id;
    this.fileChangeEvents();
    // this.spinner.hide();
  } else {
    this.spinner.show();
    this.fileChangeEvent();
    this.spinner.hide();
  }
}

  // Submit() {
  //   this.spinner.show();
  //   if (this.detail) {
  //     this.bannerId = this.id,
  //       // this.bannerType = this.form.value.bannerType
  //       this.fileChangeEvents();
  //     // this.spinner.hide();
  //   }

  //   else {
  //     this.spinner.show();
  //     // this.bannerType = this.form.value.bannerType
  //     this.fileChangeEvent();
  //     this.spinner.hide();
  //   }

  // }


  /*** Image Upload ***/
  // imagesUpload(event: any) {
  
  //   if (event.target.files && event.target.files[0]) {
  //     const reader = new FileReader();
  //     reader.onload = (_event: any) => {
  //       this.imageFile = {
  //         link: _event.target.result,
  //         file: event.srcElement.files[0],
  //         name: event.srcElement.files[0].name,
  //         type: event.srcElement.files[0].type
  //       };
  //     };
  //     reader.readAsDataURL(event.target.files[0]);

  //   }
  // }

  fileChangeEvents() {

    let formData = new FormData();
    formData.append("bannerId", this.bannerId);
    formData.append("bannerImage", this.editImages);
    formData.append("bannerImage", this.imageFile?.file);
    this.spinner.show();
    this.content.updateBanner(formData).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();
        this.toasterService.success(response.messages);
        this.router.navigateByUrl('/banner-list')
      } else {
        this.spinner.hide();
        this.toasterService.error(response.messages);
      }
    });
  }


  fileChangeEvent() {
    
    let formData = new FormData();
    formData.append("bannerImage", this.imageFile?.file);
    this.spinner.show();
    this.content.addBanner(formData).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();
        this.toasterService.success(response.messages);
         this.router.navigateByUrl('/banner-list')
      } else {
        this.spinner.hide();
        this.toasterService.error(response.messages);

      }
    });
  }


  // Brand Patch

  getBannerDetail(id: string) {
    this.content.bannerDetail(id).subscribe(response => {
      if (response.isSuccess) {
        this.detail = response.data;
        this.id = this.detail.bannerId
        this.editImages = this.rootUrl + this.detail?.bannerImage;
        // this.form.patchValue({
        //   bannerType: this.detail.bannerType,

        // });
      }

    });
  }

}