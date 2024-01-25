import { DatePipe } from '@angular/common';
import { Component, NgZone, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit {
  form: any;
  submitted!: boolean;
  rootUrl: any;
  id: any;
  sizeErrorMessage: string | null = null;
  dimensionErrorMessage: string | null = null;
  subCategoryList: any;
  categoryList: any;
  salonBannerId: any;
  shopBannerList: any;
  totalItems!: number;
  salonIds: any;
  selectedTime: any;
  time!: string;
  time2!: string;
  urls: any = [];
  imageFile!: { link: any, file: any, name: any, type: any };
  serviceId: any;
  startTime: any;
  endTime: any;
  // time2!: string;
  salonId: any;
  role!: string | null;
  urls1: any = [];
  image1: any;
  imageUrl: any;
  imageUrl1: any;
  errorMessage: string = '';
  errorMessages: string = '';
  isValid: boolean = false;
  previewImage: any;
  previewImages: any;
  basePrice: any;
  discount: any = 0;
  listingPrice: any = 0;
  maxDiscountValue: any;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private contentService: ContentService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private datePipe: DatePipe,
    private toasterService: ToastrService,
    private _location: Location,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer

  ) { }

  ngOnInit(): void {
    this.role = localStorage.getItem('user');
    this.salonIds = localStorage.getItem('salonId');
    this.rootUrl = environment.rootPathUrl;
    this.serviceForm();
    this.getcategoryList();
    this.salonId = this.route.snapshot.queryParams;
    this.form.get('mainCategoryId').valueChanges.subscribe(() => {
      // Reset subCategoryId when mainCategoryId changes
      this.form.get('subCategoryId').setValue('');
      this.subCategoryList = ['select'];
    });

  }

  serviceForm() {
    this.form = this.formBuilder.group({
      serviceName: ['', [Validators.required]],
      basePrice: ['', [Validators.required]],
      discount: ['', [Validators.required]],
      listingPrice: ['', [Validators.required]],
      mainCategoryId: ['', [Validators.required]],
      subCategoryId: [0],
      ageRestrictions: ['', [Validators.required]],
      genderPreferences: ['', [Validators.required]],
      totalCountPerDuration: ['', [Validators.required]],
      durationInMinutes: ['', [Validators.required]],
      lockTimeStart: [''],
      lockTimeEnd: [''],
      bannerimage : ['',[Validators.required]],
      serviceDescription: ['', [Validators.required, this.maxLengthValidator(160)]],

    }, { validator: this.timeValidator });
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
  onTimeInputChange(event: Event) {
    const timeInput = event.target as HTMLInputElement;
    const selectedTime = timeInput.value; // Get the selected time in "hh:mm" format
    // Determine whether it's AM or PM based on a certain condition (e.g., hours)
    const [hours] = selectedTime.split(':');
    let parsedHours = parseInt(hours, 10);
    // Calculate the period (AM or PM)
    let period = 'AM';
    if (parsedHours >= 12) {
      period = 'PM';
      if (parsedHours > 12) {
        parsedHours -= 12;
      }
    }
    if (parsedHours === 0) {
      parsedHours = 12;
    }

    // Format the time as "hh:mm tt"
    const formattedTime = `${parsedHours.toString().padStart(2, '0')}:${selectedTime.slice(3)} ${period}`;
    this.time = formattedTime;

    // Now 'formattedTime' contains the time in "hh:mm tt" format with 12-hour time
  }
  onTimeInputChange2(event: Event) {
    const timeInput = event.target as HTMLInputElement;
    const selectedTime = timeInput.value; // Get the selected time in "hh:mm" format
    // Determine whether it's AM or PM based on a certain condition (e.g., hours)
    const [hours] = selectedTime.split(':');
    let parsedHours = parseInt(hours, 10);
    // Calculate the period (AM or PM)
    let period = 'AM';
    if (parsedHours >= 12) {
      period = 'PM';
      if (parsedHours > 12) {
        parsedHours -= 12;
      }
    }
    if (parsedHours === 0) {
      parsedHours = 12;
    }
    // Format the time as "hh:mm tt"
    const formattedTime = `${parsedHours.toString().padStart(2, '0')}:${selectedTime.slice(3)} ${period}`;
    this.time2 = formattedTime;
    // Now 'formattedTime' contains the time in "hh:mm tt" format with 12-hour time
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

  get f() {
    return this.form.controls;
  }
  backClicked() {
    this._location.back();
  }

  getcategoryList() {
    this.spinner.show();
    this.contentService.getcategory().subscribe(response => {
      if (response.isSuccess) {
        this.categoryList = response.data;
        this.subCategoryList = [];
        this.spinner.hide();
      } else {
        this.categoryList = [];
        this.spinner.hide();
        this.toaster.error(response.messages);
      }
    });
  }


  getSubcategoryList(mainCategoryId: any) {
    this.contentService.SuperSubCategory(mainCategoryId).subscribe(response => {
      if (response.isSuccess) {
        this.subCategoryList = response.data;
        this.spinner.hide();
      } else {
        this.subCategoryList = [];
        this.toaster.error(response.messages);
      }
    });
  }

  //banner image upload//
  onFileSelected(event: any) {
    const file = event.target.files[0];
    const fileType = event.target.files[0].type;
  
    if ((fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'image/jpg') &&
      (file.name.toLowerCase().endsWith('.jpeg') || file.name.toLowerCase().endsWith('.png') || file.name.toLowerCase().endsWith('.jpg'))) {
      if (file) {
        const imageSize = file.size / 1024; // in KB
        const image = new Image();

        image.src = URL.createObjectURL(file);

        image.onload = () => {
          const imageSize = file.size / 1024;

          if (image.width === 1280 && image.height === 720) {
            if (imageSize <= 720) {
              this.errorMessages = '';
              this.previewImage = image.src;
            } else {
              this.errorMessages = 'Please select a 1280x720 pixels (width×height) & maximum 720 KB JPEG or PNG image.';
              this.previewImage = '';
              return;
            }
          }
          else {
            this.errorMessages = 'Please select a 1280x720 pixels (width×height) & maximum 720 KB JPEG or PNG image.';
            this.previewImage = '';
            return;
          }
        };
      }
    } else {
      this.errorMessages = 'Please select a 1280x720 pixels (width×height) & maximum 720 KB JPEG or PNG image.';
      this.previewImage = '';
      return;
    }
  }
  // onFileSelected(event: any) {
  //   const file = event.target.files[0];

  //   if (file) {
  //     const imageSize = file.size / 1024; // in KB
  //     const image = new Image();

  //     image.src = URL.createObjectURL(file);

  //     image.onload = () => {
  //       if (image.width === 1280 && image.height === 720 && imageSize <= 1000) {
  //         this.errorMessages = '';
  //         // this.submitted = true;
  //         this.previewImage = image.src;
  //       } else {
  //         this.errorMessages = 'Please select 1280x720 pixels (width×height) image.';
  //         // this.submitted = false;
  //         this.previewImage = '';
  //       }

  //     };

  //   }
  // }
  onselect(event: any) {
    const files = event.target.files;
    const totalImages = this.urls.length + files.length;

    if (totalImages > 5) {
      this.errorMessages = 'You can only select up to 5 images.';
      this.previewImage = '';
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (
        (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg') &&
        (file.name.toLowerCase().endsWith('.jpeg') || file.name.toLowerCase().endsWith('.png') || file.name.toLowerCase().endsWith('.jpg'))
      ) {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
          const image = new Image();
          image.src = reader.result as string;

          image.onload = () => {
            if (image.width === 1280 && image.height === 720) {
              this.urls.push(image.src);
            } else {
              this.previewImage = '';
              return;
              // Handle cases where the image doesn't meet the required dimensions
            }
          };
        };
      } else {
        // Handle cases where the image format is not supported (not JPG or PNG)
      }
    }
  }
  fileChangeEvent() {
    const formData = new FormData();
    for (let i = 0; i < this.urls.length; i++) {
      const imageDataUrl = this.urls[i];
      const blob = this.dataURItoBlob(imageDataUrl);
      formData.append('salonServiceImage', blob, `image_${i}.png`);
    }
    formData.append('serviceId', this.serviceId);
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


  //////service icon image//
  onImageSelect(event: any) {
    debugger;

    const file = event.target.files[0];

    if (file) {
      const fileType = file.type;
      const fileName = file.name;

      if ((fileType === 'image/jpeg' || fileType === 'image/png')) {
        if (fileName.toLowerCase().endsWith('.jpeg') || (fileName.toLowerCase().endsWith('.png')) || (fileName.toLowerCase().endsWith('.jpg'))) {
          const imageSize = file.size / 1024; // in KB
          const image = new Image();

          image.src = URL.createObjectURL(file);

          image.onload = () => {
            if (image.width === 512 && image.height === 512 && imageSize <= 512) {
              this.errorMessage = '';
              this.isValid = true;
              this.imageUrl1 = this.sanitizer.bypassSecurityTrustUrl(image.src) as SafeUrl;
            } else {
              this.errorMessage = 'Please select 512x512 pixels (width×height) & JPEG or PNG image.';
              this.isValid = false;
              this.imageUrl1 = '';
            }
          }
        } else {
          this.errorMessage = 'Please select 512x512 pixels (width×height) & JPEG or PNG image.';
          this.imageUrl1 = '';
        }
      }
    }
  }
  handleFileInput(event: any) {
    const files = event.target.files;
    for (let e = 0; e < files.length; e++) {
      const file = files[e];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const image = new Image();
        image.src = reader.result as string;

        image.onload = () => {
          if (image.width === 512 && image.height === 512) {
            // Only add the image to the array if it meets the dimensions criteria.
            const imageDataUrl1 = reader.result as string;
            this.imageUrl = imageDataUrl1;
            this.urls1.push(imageDataUrl1);
          } else {
            this.errorMessage = 'Please select 512x512 pixels (width×height) & JPEG or PNG image.';
            this.imageUrl1 = '';
          }
        };
      }
    }
  }
  // handleImageInput(event: any) {
  //   const files = event.target.files;
  //   const file = event.target.files[0];

  //   if (file) {
  //     const fileType = file.type;
  //     const fileName = file.name;

  //     if ((fileType === 'image/jpeg' || fileType === 'image/png')) {
  //       if (fileName.toLowerCase().endsWith('.jpeg') || (fileName.toLowerCase().endsWith('.png')) || (fileName.toLowerCase().endsWith('.jpg'))) {
  //         const imageSize = file.size / 1024; // in KB
  //         const image = new Image();
  //         const reader = new FileReader();
  //         reader.readAsDataURL(file);
  //         reader.onload = () => {
  //           const image = new Image();
  //           image.src = reader.result as string;
  //           image.onload = () => {
  //             if (image.width === 512 && image.height === 512 && imageSize <= 512) {
  //               // Add image to the array and set as valid if it meets criteria
  //               const imageDataUrl = reader.result as string;
  //               this.errorMessage = '';
  //               this.isValid = true;
  //               this.previewImages = image.src;
  //               this.urls1.push(imageDataUrl);
  //             } else {
  //               // Set as invalid if criteria not met
  //               this.errorMessage = 'Please select 512x512 pixels (width×height) image.';
  //               this.isValid = false;
  //               this.previewImages = '';
  //             }
  //           };
  //         };
  //       }
  //     } else {
  //       this.errorMessage = 'Please select a valid JPEG or PNG image.';
  //     }
  //   }
  // }
  fileChangeEvents() {
    const formData = new FormData();
    for (let e = 0; e < this.urls1.length; e++) {
      const imageDataUrl1 = this.urls1[e];
      const blob = this.dataURItoBlob1(imageDataUrl1);
      formData.append('salonServiceIconImage', blob, `image_${e}.png`);
    }
    // formData.append("SalonImage", this.imageFiles?.file);
    formData.append('serviceId', this.serviceId);
    this.contentService.uploadServiceIconImage(formData).subscribe(response => {
    });
  }
  private dataURItoBlob1(dataURI: string): Blob {

    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let e = 0; e < byteString.length; e++) {
      ia[e] = byteString.charCodeAt(e);
    }
    return new Blob([ab], { type: mimeString });
  }


  removeImage(index: any) {
    this.urls.splice(index, 1);
  }
  // submit 
  postSubmit() {
    debugger
    if (this.role == 'SuperAdmin') {
      this.submit();
    } else if (this.role == 'Vendor') {
      this.submitVendor();
    }
  }

  submit() {
    this.submitted = true;
    if (this.form.invalid) {
      this.toasterService.error("Form Incomplete: Please fill in all the required fields correctly");
      return;
    }

    let payload = {
      serviceId: 0,
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
      lockTimeStart: this.time,
      lockTimeEnd: this.time2,
      serviceDescription: this.form.value.serviceDescription,
    }
    this.spinner.show()
    this.contentService.addNewService(payload).subscribe(response => {

      this.serviceId = response.data?.serviceId
      this.fileChangeEvent();
      this.fileChangeEvents();
      this.spinner.hide();
      if (response.isSuccess) {
        this.toaster.success(response.messages);
        this._location.back();
      } else {
        this.spinner.hide();
        this.toaster.error(response.messages);
      }
    });
  }

  submitVendor() {
    debugger
    this.submitted = true;
    if (this.form.invalid) {
      this.toasterService.error("Form Incomplete: Please fill in all the required fields correctly");
      return;
    }

    let payload = {
      serviceId: 0,
      salonId: localStorage.getItem('salonId'),
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
      lockTimeStart: this.form.value.lockTimeStart,
      lockTimeEnd: this.form.value.lockTimeEnd,
      serviceDescription: this.form.value.serviceDescription,
      status: 1
    }
    this.spinner.show()
    this.contentService.addNewService(payload).subscribe(response => {

      this.serviceId = response.data?.serviceId
      this.fileChangeEvent();
      this.fileChangeEvents();
      this.spinner.hide();
      if (response.isSuccess) {
        this.toaster.success(response.messages);
        this._location.back();
      } else {
        this.spinner.hide();
        this.toaster.error(response.messages);
      }
    });
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
