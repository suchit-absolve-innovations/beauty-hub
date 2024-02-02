import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentService } from 'src/app/Shared/service/content.service';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
declare var $: any;


@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.css']
})
export class AddEditCategoryComponent implements OnInit {
  form!: FormGroup;
  detail: any;
  rootUrl: any;
  editImages: any;
  submitted: boolean = false;
  imageFile!: { link: any; file: any; name: any; type: any; };
  imageFile1!: { link: any; file: any; name: any; type: any; };
  id: any;
  mainId: any;
  categoryType: any;
  login = localStorage.getItem('role');
  role!: string | null;
  previewImage: string = '';
  urls1: any = [];
  urls2: any = [];
  image1: any;
  imageUrl: any;
  imageUrl1: any;
  errorMessage: string = '';
  isValid: boolean = false;
  previewImage1: any;
  previewImage2: any;
  isValid1: any;
  isValid2: any;
  errorMessage2: any;
  constructor(
    private formBuilder: FormBuilder,
    private contentService: ContentService,
    private route: ActivatedRoute,
    private toasterService: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private _location: Location,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
    this.role = localStorage.getItem('user');
    this.categoryForm();
  }
  backClicked() {
    this._location.back();
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

  get f() {
    return this.form['controls'];
  }
  categoryForm() {
    this.form = this.formBuilder.group({
      categoryName: ['', [Validators.required]],
      categoryDescription: ['', [this.maxLengthValidator(160)]],
      categoryType: ['1', [Validators.required]],
      categoryImageMale: [''],
      categoryImageFemale: [''],
    });
  }

  postCategory() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    let payload = {
      categoryName: this.form.value.categoryName,
      categoryDescription: this.form.value.categoryDescription,
      categoryType: this.form.value.categoryType
    }
    this.contentService.addCategory(payload).subscribe(response => {

      this.mainId = response.data?.mainCategoryId;
      this.fileChangeEvent();
      this.afterResponse(response);
    });
  }

  afterResponse(response: any) {
    if (response && response.statusCode == 200) {
      if (response.isSuccess) {
        if (this.login == 'SuperAdmin') {
          this._location.back();
          this.toasterService.success(response.messages);
        }
        if (this.login == 'Vendor') {
          this.showModal();
        }
        else if (this.login == 'Admin')
          this.showModal();

      }
      else {
        this.toasterService.error(response.messages);
      }
    }
  }
  ok() {
    this.router.navigate(['/category-list'])
      .then(() => {
        window.location.reload();
      });

  }
  showModal() {
    $('#myModal').modal('show');
  }


  imagesUpload1(event: any) {
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
                  this.previewImage1 = imageDataUrl;
                  this.urls1.push(imageDataUrl);
                  this.isValid1 = true;
                  this.errorMessage = ''; // No error message if the image meets criteria
                } else {
                  this.isValid1 = false;
                  this.errorMessage = 'Please select a 512x512 pixels (width×height) & JPEG or PNG image.'; // Error message for invalid image
                  // You can add further handling if needed for invalid images
                }
              };
            };
            reader.readAsDataURL(file);
          }
        } else {
                 this.errorMessage = 'Please select a 512x512 pixels (width×height) & JPEG or PNG image.';
                this.isValid1 = false;
                 this.imageUrl1 = '';
                 return;
               }
        
      }
    }
  }
  imagesUpload2(event: any) {
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
                  this.imageFile1 = {
                    link: _event.target.result,
                    file: file,
                    name: file.name,
                    type: file.type
                  };
                  this.previewImage2 = imageDataUrl;
                  this.urls2.push(imageDataUrl);
                  this.isValid2 = true;
                  this.errorMessage2 = ''; // No error message if the image meets criteria
                } else {
                  this.isValid2 = false;
                  this.errorMessage2 = 'Please select a 512x512 pixels (width×height) & JPEG or PNG image.'; // Error message for invalid image
                  // You can add further handling if needed for invalid images
                }
              };
            };
            reader.readAsDataURL(file);
          }
        } else {
                 this.errorMessage2 = 'Please select a 512x512 pixels (width×height) & JPEG or PNG image.';
                this.isValid2 = false;
                 this.imageUrl1 = '';
                 return;
               }
        
      }
    }
  }

  fileChangeEvent() {
    let formData = new FormData();
    formData.append("categoryImageMale", this.imageFile?.file);
    formData.append("categoryImageFemale", this.imageFile1?.file);
    formData.append("MainCategoryId", this.mainId);
    this.contentService.categoryImage(formData).subscribe(response => {
    });
  }

  onGenderChange(event: any) {
    const selectedGender = event.target.value;
    if (selectedGender === '1') {
      this.categoryType = this.form.patchValue({ male: true, female: false });
    } else if (selectedGender === '2') {
      this.categoryType = this.form.patchValue({ male: false, female: true });
    } else if (selectedGender === '3') {
      this.categoryType = this.form.patchValue({ male: true, female: true });
    }
  }
} 
