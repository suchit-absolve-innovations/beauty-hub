import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.css']
})
export class EditServiceComponent implements OnInit {
  rootUrl: any;
  serviceId: any;
  submitted: boolean = false;
  form: any;
  image: any;
  subCategoryList: any;
  categoryList: any;
  serviceDetailPatch: any;
  editImages: string = '';
  urls: any = [];
  time2!: string;
  time1!: string;
  urls1: any[] = [];
  image1: any;
  imageUrl: any;
  serviceIconImage: any;
  role!: string | null;
  // errorMessage: string | null = null;
  errorMessage: string = '';
  error: string = '';
  isValid: boolean = false;
  previewImage: any;
  errorMessages: string = '';
  salonId: any;
  base64Image: string[] = [];
  selectedImageData: any[] = [];
  imageFiles!: { link: any; file: any; name: any; type: any; };
  basePrice: any;
  discount: any = 0;
  listingPrice: any = 0;
  maxDiscountValue: any;
  imageUrl1!: any;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private contentService: ContentService,
    private toasterService: ToastrService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private http: HttpClient,
    private _location: Location,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
    this.role = localStorage.getItem('user');
    this.serviceId = this.route.snapshot.queryParams;
    this.salonId = this.route.snapshot.queryParams;
    this.serviceForm();
    this.getcategoryList();
    this.getServiceDetail();
  }

  serviceForm() {
    // this.submitted = true;
    this.form = this.formBuilder.group({
      serviceName: ['', [Validators.required]],
      basePrice: ['', [Validators.required]],
      discount: ['', [Validators.required]],
      listingPrice: ['', [Validators.required]],
      mainCategoryId: ['', [Validators.required]],
      subCategoryId: [0],
      ageRestrictions: ['', [Validators.required]],
      genderPreferences: ['', [Validators.required]],
      // duration: ['', [Validators.required]],
      totalCountPerDuration: ['', [Validators.required]],
      durationInMinutes: ['', [Validators.required]],
      lockTimeStart: [''],
      lockTimeEnd: [''],
      serviceDescription: ['', [Validators.required, this.maxLengthValidator(160)]],
    }
      , { validator: this.timeValidator });
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
    return this.form.controls;
  }
  timeValidator(control: AbstractControl): ValidationErrors | null {
    const startTime = control.get('lockTimeStart')?.value;
    const endTime = control.get('lockTimeEnd')?.value;
    if (startTime && endTime) {
      if (startTime === endTime) {
        return { timeOrder: true };
      }
    }
    return null;
  }

  backClicked() {
    this._location.back();
  }
  calculateSellingPrice() {
    const basePrice = parseFloat(this.basePrice);
    let discount = parseFloat(this.discount);

    if (isNaN(discount)) {
      discount = 0; // Set discount to 0 if it's NaN
    }
    if (isNaN(discount) || discount > basePrice) {
      discount = 0; // Set discount to 0 if it's NaN
    }
    if (discount > basePrice || discount > this.maxDiscountValue) {
      discount = Math.min(basePrice, this.maxDiscountValue);
    }
    this.listingPrice = basePrice - discount;
    if (discount === basePrice) {
      discount = 0;

    }
    // Update the discount property with the validated discount value
    this.discount = discount;
  }

  resetDiscount() {
    this.listingPrice = this.basePrice - this.discount;
  }

  getcategoryList() {
    // this.spinner.show();
    this.contentService.getcategory().subscribe(response => {
      if (response.isSuccess) {
        this.categoryList = response.data;
        this.subCategoryList = [];
        //  this.spinner.hide();
      } else {
        // this.spinner.hide();
        this.toaster.error(response.messages);
      }
    });
  }

  getSubcategoryList(mainCategoryId: any) {
    this.contentService.SuperSubCategory(mainCategoryId).subscribe(response => {
      if (response.isSuccess) {
        this.subCategoryList = response.data;
        var categoryListData = this.subCategoryList?.find((y: { subCategoryId: any; }) => y.subCategoryId == this.serviceDetailPatch.subCategoryId);
        this.form.patchValue({
          subCategoryId: categoryListData?.subCategoryId,
        })
        this.spinner.hide();
      } else {
        this.subCategoryList = [];
        this.toaster.error(response.messages);
      }
    });
  }

  getServiceDetail() {
    this.spinner.show();
    this.contentService.getServiceDetail(this.serviceId.id2).subscribe(response => {
      this.spinner.hide();
      if (response.isSuccess) {
        this.spinner.hide();
        this.imageConvert64();

        this.serviceDetailPatch = response.data
        this.imageUrl1 = this.rootUrl + this.serviceDetailPatch.serviceIconImage


        this.form.patchValue({
          serviceName: this.serviceDetailPatch.serviceName,
          basePrice: this.serviceDetailPatch.basePrice,
          discount: this.serviceDetailPatch.discount,
          listingPrice: this.serviceDetailPatch.listingPrice,
          mainCategoryId: this.serviceDetailPatch.mainCategoryId,
          ageRestrictions: this.serviceDetailPatch.ageRestrictions,
          genderPreferences: this.serviceDetailPatch.genderPreferences,
          duration: this.serviceDetailPatch.duration,
          totalCountPerDuration: this.serviceDetailPatch.totalCountPerDuration,
          durationInMinutes: this.serviceDetailPatch.durationInMinutes,
          lockTimeStart: this.serviceDetailPatch.lockTimeStart,
          lockTimeEnd: this.serviceDetailPatch.lockTimeEnd,
          serviceDescription: this.serviceDetailPatch.serviceDescription,
        });
        this.getSubcategoryList(this.serviceDetailPatch?.mainCategoryId);

      }
    });
  }

  updateService() {
    debugger
    this.submitted = true;
    if (this.form.invalid) {
      this.toasterService.error("Form Incomplete: Please fill in all the required fields correctly");
      return;
    }
    let payload = {
      serviceId: parseInt(this.serviceId.id2),
      salonId: parseInt(this.salonId.id),
      serviceName: this.form.value.serviceName,
      basePrice: parseInt(this.form.value.basePrice),
      discount: parseInt(this.form.value.discount),
      listingPrice: parseInt(this.form.value.listingPrice),
      mainCategoryId: this.form.value.mainCategoryId,
      subCategoryId: this.form.value.subCategoryId,
      ageRestrictions: this.form.value.ageRestrictions,
      genderPreferences: this.form.value.genderPreferences,
      totalCountPerDuration: this.form.value.totalCountPerDuration,
      durationInMinutes: this.form.value.durationInMinutes,
      lockTimeStart: this.form.value.lockTimeStart || '',
      lockTimeEnd: this.form.value.lockTimeEnd || '',
      serviceDescription: this.form.value.serviceDescription
    }
    this.spinner.show();
    this.contentService.addNewService(payload).subscribe(response => {
      this.spinner.hide();
      // this.productId = response.data?.productId
      this.fileChangeEvent();
      this.fileChangeEvents();
      if (response.isSuccess) {
        this.toaster.success(response.messages);
        // this._location.back();
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        this.spinner.hide();
        this.toaster.error(response.messages);
      }
    })
  }

  imageConvert64() {
    this.contentService.imageConvert(this.serviceId.id2).subscribe(response => {
      if (response.isSuccess) {
        this.base64Image = response.data;
      }
    });
  }

  fileChangeEvent() {
    debugger
    const formData = new FormData();
    for (let i = 0; i < this.base64Image.length; i++) {
      const imageDataUrl = this.base64Image[i];
      const blob = this.dataURItoBlob(imageDataUrl);
      formData.append('salonServiceImage', blob, `image_${i}.png`);
      // formData.append('salonServiceImage', imageDataUrl);
    }
    formData.append('serviceId', this.serviceId.id2);
    this.contentService.uploadServiceImage(formData).subscribe(response => {

    });
  }
  private dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }
  onselect(event: any) {
    const files = event.target.files;
    this.errorMessages = ''; // Clear previous error messages
  
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
  
      if (
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/jpg'
      ) {
        if (
          file.name.toLowerCase().endsWith('.jpeg') ||
          file.name.toLowerCase().endsWith('.png') ||
          file.name.toLowerCase().endsWith('.jpg')
        ) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
  
          reader.onload = () => {
            const image = new Image();
            image.src = reader.result as string;
  
            image.onload = () => {
              if (image.width === 1280 && image.height === 720 && file.size / 1024 <= 1000) {
                this.base64Image.push(image.src);
              } else {
                this.errorMessages = 'Please select a 1280x720 pixels (width×height) & JPEG or PNG image.';
                this.previewImage = '';
              }
            };
          };
        } else {
          this.errorMessages = 'Please select a 1280x720 pixels (width×height) & JPEG or PNG image.';
          this.previewImage = '';
        }
      } else {
        this.errorMessages = 'Please select a 1280x720 pixels (width×height) & JPEG or PNG image.';
        this.previewImage = '';
      }
    }
  }
  

  onBannerImageSelect(event: any) {
    debugger
    const file = event.target.files[0];
  
    if (file) {
      const fileType = file.type;
      const fileName = file.name;
  
      if ((fileType === 'image/jpeg' || fileType === 'image/png')) {
        if (fileName.toLowerCase().endsWith('.jpeg') || (fileName.toLowerCase().endsWith('.png')) ||  (fileName.toLowerCase().endsWith('.jpg'))) {
          const imageSize = file.size / 1024; // in KB
          const image = new Image();
    
        image.src = URL.createObjectURL(file);

        image.onload = () => {
          if (image.width === 1280 && image.height === 720 && imageSize <= 1020) {
            this.errorMessages = '';
            this.isValid = true;
            this.previewImage = this.sanitizer.bypassSecurityTrustUrl(image.src) as SafeUrl;
          } else {
            this.errorMessages = 'Please select a 1280x720 pixels (width×height) & JPEG or PNG image.';
            this.isValid = false;
            this.previewImage = '';
          }
        }
      }
      } else {
        this.errorMessages = 'Please select a 1280x720 pixels (width×height) & JPEG or PNG image.';
        this.previewImage = '';
        return;
    }
     
    } 
   
  }
  convertImageToBase64(url: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.http.get(url, { responseType: 'blob' })
        .subscribe(response => {
          const reader = new FileReader();
          reader.onloadend = () => {
            if (reader.result !== null && reader.result !== undefined) {
              const base64data = reader.result.toString().split(',')[1];
              resolve(base64data);
            } else {
              reject(new Error('Error converting image to Base64.'));
            }
          };
          reader.onerror = () => {
            reject(new Error('Error converting image to Base64.'));
          };
          reader.readAsDataURL(response);
        }, error => {
          reject(error);
        });
    });
  }
  onImageSelect(event: any) {
    debugger;
  
    const file = event.target.files[0];
  
    if (file) {
      const fileType = file.type;
      const fileName = file.name;
  
      if ((fileType === 'image/jpeg' || fileType === 'image/png')) {
        if (fileName.toLowerCase().endsWith('.jpeg') || (fileName.toLowerCase().endsWith('.png')) ||  (fileName.toLowerCase().endsWith('.jpg'))) {
          const imageSize = file.size / 1024; // in KB
          const image = new Image();
    
          image.src = URL.createObjectURL(file);
    
          image.onload = () => {
            if (image.width === 512 && image.height === 512 && imageSize <= 512) {
              this.errorMessage = '';
              this.isValid = true;
              this.imageUrl1 = this.sanitizer.bypassSecurityTrustUrl(image.src) as SafeUrl;
            } else {
              this.errorMessage = 'Please select 512x512 pixels (width×height) image.';
              this.isValid = false;
              this.imageUrl1 = '';
            }
          };
        } else {
          this.errorMessage = 'Please select a valid JPEG or PNG image.';
          this.imageUrl1 = '';
          return;
        }
  
     
      } else {
        this.errorMessage = 'Please select a valid JPEG or PNG image.';
      }
    }
  }
  
  
  

  handleFileInput(event: any) {
    const files = event.target.files;
    const file = files[0]; // Assuming you only care about the first file
  
    const reader = new FileReader();
  
    reader.readAsDataURL(file);
    if (file) {
      const fileType = file.type;
      const fileName = file.name;
  
      if ((fileType === 'image/jpeg' || fileType === 'image/png')) {
        if (fileName.toLowerCase().endsWith('.jpeg') || (fileName.toLowerCase().endsWith('.png')) ||  (fileName.toLowerCase().endsWith('.jpg'))) {
          const imageSize = file.size / 1024; // in KB
          const image = new Image();
    
          image.src = URL.createObjectURL(file);
    
          image.onload = () => {
            if (image.width === 512 && image.height === 512 && imageSize <= 512) {
              this.errorMessage = '';
              this.isValid = true;
              this.imageUrl1 = this.sanitizer.bypassSecurityTrustUrl(image.src) as SafeUrl;
            } else {
              this.errorMessage = 'Please select 512x512 pixels (width×height) image.';
              this.isValid = false;
              this.imageUrl1 = '';
            }
          };
        } else {
          this.errorMessage = 'Please select a valid JPEG or PNG image.';
          this.imageUrl1 = '';
          return;
        }
  
     
      } else {
        this.errorMessage = 'Please select a valid JPEG or PNG image.';
      }
    }
    reader.onload = () => {
      const image = new Image();
      image.src = reader.result as string;
  
      image.onload = () => {
        if (image.width === 512 && image.height === 512) {
          // Only add the image to the array and update the preview if it meets the dimensions criteria.
          const imageDataUrl = reader.result as string;
  
          // Update serviceDetailPatch.serviceIconImage with the new image URL
          this.serviceDetailPatch.serviceIconImage = file.name;
  
          // You can keep the rest of your logic here if needed
          this.imageUrl = imageDataUrl;
          this.imageFiles = {
            link: imageDataUrl,
            file: file,
            name: file.name,
            type: file.type
          };
        } else {
          // Handle the case where the image doesn't meet the criteria (optional).
          // You can add error messages or any other handling you prefer.
        }
      };
    };
  }
  


  fileChangeEvents() {
    debugger
    let formData = new FormData();
    formData.append("salonServiceIconImage", this.imageFiles?.file);
    formData.append("serviceId", this.serviceId.id2);
    this.contentService.uploadServiceIconImage(formData).subscribe(response => {
    });
  }


  removeImage(index: number) {
    if (index >= 0 && index < this.base64Image.length) {
      this.base64Image.splice(index, 1);
      // Check and remove from selectedImageData if necessary
      if (index < this.selectedImageData.length) {
        this.selectedImageData.splice(index, 1);
      }
    }
  }
  
  cancel() {
    if (this.role == 'SuperAdmin') {
      this.router.navigateByUrl('/salon-list')
        .then(() => {
          window.location.reload();
        });
    } else if (this.role == 'Vendor') {
      this.router.navigateByUrl('/vendor-service-list')
        .then(() => {
          window.location.reload();
        });
    }
  }
}
