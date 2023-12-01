import { Component, NgZone, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContentService } from 'src/app/Shared/service/content.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-add-edit-sub-category',
  templateUrl: './add-edit-sub-category.component.html',
  styleUrls: ['./add-edit-sub-category.component.css']
})
export class AddEditSubCategoryComponent implements OnInit {
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
    private _location: Location,) { }

  ngOnInit(): void {
    this.categoryForm();
    this.rootUrl = environment.rootPathUrl;
    this.Id = this.route.snapshot.paramMap.get('id');
    this.Id2 = this.route.snapshot.paramMap.get('id2');
   
    this.getCategoryDetail();
    this.getCategoryType();
  }
  backClicked() {
    this._location.back();
  }



  /** Add Category Form **/
  categoryForm() {
    this.form = this.formBuilder.group({
      categoryName: ['', [Validators.required]],
      categoryDescription: [''],
      categoryType: ['',[Validators.required]]
   
    });
  }

  getCategoryType(){
    debugger

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
    debugger
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

    } else{

      let payload = {
        mainCategoryId: this.Id,
        categoryName: this.form.value.categoryName,
        categoryDescription: this.form.value.categoryDescription,
        categoryType: this.form.value.categoryType
      
      }
      this.content.addSubCategory(payload).subscribe(response => {
        this.subId = response.data?.subCategoryId

        this.fileChangeEvent();
        this.afterResponse(response);
      
      });
    }
 }

   
 get f() {
  return this.form['controls'];
}

handleImageInput(event: any) {
  const files = event.target.files;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const imageSize = file.size / 1024; // in KB

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const image = new Image();
      image.src = reader.result as string;

      image.onload = () => {
        if (image.width === 512 && image.height === 512 && imageSize <= 512) {
          // Add image to the array and set as valid if it meets criteria
          const imageDataUrl = reader.result as string;
          this.errorMessage = '';
          this.isValid = true;
          this.previewImage = imageDataUrl;
          this.urls1.push(imageDataUrl);
        } else {
          // Set as invalid if criteria not met
          this.errorMessage = 'Please select 512x512 pixels (width×height) image.';
          this.isValid = false;
          this.previewImage = '';
        }
      };
    };
  }
}

afterResponse(response: any) {
  debugger
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
  
    this.content.SubcategoryDetail(payload).subscribe( response => { 
      if (response.isSuccess) {
        this.detail = response.data;
        this.id = this.detail.mainCategoryId
        this.editImages = this.rootUrl + this.detail?.categoryImage;
        this.form.patchValue({
          categoryName: this.detail.categoryName,
          categoryDescription: this.detail.categoryDescription,
          categoryType: this.detail.categoryType
        });
      }

    });
  }



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
    reader.readAsDataURL(event.target.files[0]);

  }
}

fileChangeEvent() {
  
  let formData = new FormData();
  formData.append("CategoryImage", this.imageFile?.file);
  formData.append("SubCategoryId", this.subId);
  this.content.categoryImage(formData).subscribe(response => {

  });
}


}