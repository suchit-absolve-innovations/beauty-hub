import { Component, NgZone, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContentService } from 'src/app/Shared/service/content.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
declare var $: any;


@Component({
  selector: 'app-edit-sub-category',
  templateUrl: './edit-sub-category.component.html',
  styleUrls: ['./edit-sub-category.component.css']
})
export class EditSubCategoryComponent implements OnInit {
  Id: any;
  form!: FormGroup;
  detail: any;
  editImages: any;
  submitted: boolean = false;
  imageFile!: { link: any; file: any; name: any; type: any; };
  id: any;
  rootUrl!: string;
  Id2: any;
  subId: any;
  categoryType: any;
  login = localStorage.getItem('role');
  previewImage: string = '';
  urls1: any = [];
  image1: any;
  imageUrl: any;
  imageUrl1: any;
  errorMessage: string = '';
  isValid: boolean = false;
  categoryTypes: any;

  constructor(
    private spinner: NgxSpinnerService,
    private content: ContentService,
    private router: Router,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toasterService: ToastrService,
    private _location: Location,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.categoryForm();
    this.rootUrl = environment.rootPathUrl;
    this.Id = this.route.snapshot.paramMap.get('id');
    this.Id2 = this.route.snapshot.paramMap.get('id2');
    this.getCategoryType();
    this.getCategoryDetail();
  
  }
  backClicked() {
    this._location.back();
  }



  /** Add Category Form **/
  categoryForm() {
    this.form = this.formBuilder.group({
      categoryName: ['', [Validators.required]],
      categoryDescription: ['',[this.maxLengthValidator(160)]],
      categoryType: ['',[Validators.required]],
    });
  }
  maxLengthValidator(maxLength: number) {
    return (control: { value: any; }) => {
      const value = control.value;
      if (value && value.length > maxLength) {
        return { maxLengthExceeded: true };
      }
      return null;
    };
  }

  getCategoryType(){
      this.content.getCategorytypes(this.Id).subscribe( response => { 
        if (response.isSuccess) {
          this.categoryTypes = response.data.mainCategoryType;
          console.log(this.categoryTypes)
        }
      });
    }
  // onGenderChange(event: any) {
    
  //   const selectedGender = event.target.value;
  //   if (selectedGender === '1') {
  //   this.categoryType =  this.form.patchValue({ male: true, female: false });
  //   } else if (selectedGender === '2') {
  //  this.categoryType =   this.form.patchValue({ male: false, female: true });
  //   } else if (selectedGender === '3') {
  //   this.categoryType =  this.form.patchValue({ male: true, female: true });
  //   }
  // }

  postCategory(){
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    if (this.detail) { 
      let payload = {
         subCategoryId: this.Id2,
        categoryName: this.form.value.categoryName,
        categoryDescription: this.form.value.categoryDescription,
        categoryType: this.form.value.categoryType
      }
      this.content.UpdateSubCategory(payload).subscribe(response => {
        this.subId = response.data.subCategoryId
        this.fileChangeEvent();
        this.afterResponse(response);
      });

    } 
 }

   
 get f() {
  return this.form['controls'];
}


afterResponse(response: any) {
if (response && response.statusCode == 200) {
  if(this.login == 'SuperAdmin'){

   this._location.back();
   this.toasterService.success(response.messages);
  }if (this.login == 'Vendor'){
     this.showModal();
     this.toasterService.success(response.messages);
}
else if(this.login == 'Admin')
this.showModal();
this.toasterService.success(response.messages);


}
  else {
    this.toasterService.error(response.messages);
  }
}



ok(){
  this.router.navigate(['/category-list'])
  .then(() => {
   window.location.reload();
 });

}
showModal() {
 $('#myModal').modal('show');
}



  getCategoryDetail(){
    
  let payload = { 
    mainCategoryId : this.Id,
    subCategoryId : this.Id2
  }
  this.spinner.show();
    this.content.SubcategoryDetail(payload).subscribe( response => { 
      if (response.isSuccess) {
        this.detail = response.data;
        this.id = this.detail.mainCategoryId
        this.editImages = this.rootUrl + this.detail?.categoryImage;
        this.form.patchValue({
          categoryType: this.detail.categoryType,
          categoryName: this.detail.categoryName,
          categoryDescription: this.detail.categoryDescription,
         
        });
      }
      this.spinner.hide();

    });
  }



  /*** Image Upload ***/
  imagesUpload(event: any) {
    const file = event.target.files[0];

    if (file) {
      const fileType = file.type;
      const fileName = file.name;

      if ((fileType === 'image/jpeg' || fileType === 'image/png')) {
        if (fileName.toLowerCase().endsWith('.jpeg') || (fileName.toLowerCase().endsWith('.png')) || (fileName.toLowerCase().endsWith('.jpg'))) {
          const imageSize = file.size / 1024; // in KB
          const image = new Image();

          if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const imageSize = file.size / 1024; // in KB
            const reader = new FileReader();
            reader.onload = (_event: any) => {
              const image = new Image();
              image.src = _event.target.result as string;
              image.onload = () => {
                if (image.width === 512 && image.height === 512 && imageSize <= 512) {
                  const imageDataUrl = reader.result as string;
                  this.imageFile = {
                    link: _event.target.result,
                    file: file,
                    name: file.name,
                    type: file.type
                  };
                  this.previewImage = imageDataUrl;
                  this.urls1.push(imageDataUrl);
                  this.isValid = true;
                  this.errorMessage = ''; // No error message if the image meets criteria
                } else {
                  this.isValid = false;
                  this.errorMessage = 'Please select a 512x512 pixels (width×height) & JPEG or PNG image.'; // Error message for invalid image
                  // You can add further handling if needed for invalid images
                }
              };
            };
            reader.readAsDataURL(file);
          }
        } else {
                 this.errorMessage = 'Please select a 512x512 pixels (width×height) & JPEG or PNG image.';
                this.isValid = false;
                 return;
               }
        
      }
    }
  }

fileChangeEvent() {
  let formData = new FormData();
  formData.append("categoryImage", this.imageFile?.file);
  formData.append("subCategoryId", this.subId);
  this.content.categoryImage(formData).subscribe(response => {

  });
}



}