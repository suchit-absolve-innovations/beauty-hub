import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContentService } from 'src/app/Shared/service/content.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';


@Component({
  selector: 'app-edit-salon-banner',
  templateUrl: './edit-salon-banner.component.html',
  styleUrls: ['./edit-salon-banner.component.css']
})
export class EditSalonBannerComponent implements OnInit {
  ShopBannerdetail: any;
  salonBannerId: any;
  form!: FormGroup;
  categoryList: any;
  subCategoryList: any;
  SubSubcategoryList: any;
  imageFile!: { link: any; file: any; name: any; type: any; };
  salonId!: any;
  visible!: boolean;
  bannerImage: any;
  rootUrl: any;
  editImages: any;

  constructor(private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private content: ContentService,
    private router: Router,
    private ngZone: NgZone,
    private formBuilder: FormBuilder,
    private _location: Location,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
    this.salonBannerId = this.route.snapshot.paramMap.get('id');
    this.salonId = this.route.snapshot.paramMap.get('id2');
    this.getSalonBannerDetail();
    this.getcategoryList();

    this.form = this.formBuilder.group({
      bannerType: [''],
      mainCategoryId: [''],
      subCategoryId: [''],
      bannerImage: ['']

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
      } else {
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


  //onclick toggling both
  onclick(data: any) {
    this.visible = !this.visible
  }

}
