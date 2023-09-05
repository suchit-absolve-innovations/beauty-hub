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
  selector: 'app-add-edit-shop-banner',
  templateUrl: './add-edit-shop-banner.component.html',
  styleUrls: ['./add-edit-shop-banner.component.css']
})
export class AddEditShopBannerComponent implements OnInit {
  ShopBannerdetail: any;
  shopBannerId: any;
  form!: FormGroup;
  categoryList: any;
  subCategoryList: any;
  SubSubcategoryList: any;
  imageFile!: { link: any; file: any; name: any; type: any; };
  shopId!: any;
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
    this.shopBannerId = this.route.snapshot.paramMap.get('id');
    this.shopId = this.route.snapshot.paramMap.get('id2');
    this.getShopBannerDetail();
    this.getcategoryList();

    this.form = this.formBuilder.group({
      bannerType: [''],
      mainProductCategoryId: [''],
      subProductCategoryId: [''],
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


  // Banner Detail

  getShopBannerDetail() {

    this.spinner.show();
    this.content.shopBannerDetail(this.shopBannerId).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();
        this.ShopBannerdetail = response.data;
        this.editImages = this.rootUrl + this.ShopBannerdetail?.bannerImage;

        this.getSubcategoryList(this.ShopBannerdetail?.subProductCategoryId);
        this.getSubSubcategoryList(this.ShopBannerdetail?.subSubProductCategoryId);
        this.form.patchValue({
          bannerType: this.ShopBannerdetail.bannerType,
          mainProductCategoryId: this.ShopBannerdetail.mainProductCategoryId,
        });


      }

    });
  }



  /*** Category List ***/

  getcategoryList() {
    this.content.getcategory().subscribe(response => {
      if (response.isSuccess) {
        this.categoryList = response.data;
      } else {
        this.toaster.error(response.messages);
      }
    });
  }


  /*** Sub  Category List ***/

  getSubcategoryList(data: any) {

    // this.spinner.show();

    // this.content.SubCategorySuper(data).subscribe(response => {
    //   if (response.isSuccess) {
    //     this.subCategoryList = response.data;
    //     var categoryListData = this.subCategoryList?.find((y: { subProductCategoryName: any; }) => y.subProductCategoryName == this.ShopBannerdetail?.subProductCategoryName);
    //     this.form.patchValue({
    //       subProductCategoryId: categoryListData?.subProductCategoryId,
    //     })

    //     this.SubSubcategoryList = []
    //     this.spinner.hide();
    //   } else {
    //     this.subCategoryList = [];
    //     this.toaster.error(response.messages);
    //   }
    // });
  }


  /*** Sub Sub Category List ***/

  getSubSubcategoryList(data: any) {


    this.content.SubSubCategory(data).subscribe(response => {
      if (response.isSuccess) {
        this.SubSubcategoryList = response.data;
        var subcategoryListData = this.SubSubcategoryList?.find((y: { categoryName: any; }) => y.categoryName == this.ShopBannerdetail?.categoryName);
        this.form.patchValue({
          subSubProductCategoryId: subcategoryListData?.subSubProductCategoryId,
        })


      } else {

        this.toaster.error(response.messages);
      }
    });
  }


  // update banner

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


  fileChangeEvent() {
    
    this.spinner.show();
    let formData = new FormData();
    formData.append("shopBannerId", this.shopBannerId);
    formData.append("bannerImage", this.imageFile?.file);
    formData.append("bannerImage", this.editImages);
    formData.append("bannerType", this.form.value.bannerType);
    formData.append("shopId", this.shopId);
    formData.append("mainProductCategoryId", this.form.value.mainProductCategoryId > 0 ? this.form.value.mainProductCategoryId : 0);
    formData.append("subProductCategoryId", this.form.value.subProductCategoryId > 0 ? this.form.value.subProductCategoryId : 0);
    formData.append("SubSubProductCategoryId", this.form.value.SubSubProductCategoryId > 0 ? this.form.value.SubSubProductCategoryId : 0);
    // this.content.updateShopBanner(formData).subscribe(response => {
    //   if (response.isSuccess) {
    //     this.spinner.hide();
    //     this.toaster.success(response.messages)
    //     this.router.navigateByUrl('/shop-banner-list')
    //   } else {
    //     this.spinner.hide();
    //     this.toaster.error(response.messages)
    //   }
    // });
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
