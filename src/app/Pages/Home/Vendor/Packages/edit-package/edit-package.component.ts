import { DatePipe } from '@angular/common';
import { Component, NgZone, OnInit,Input, Output, EventEmitter  } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-edit-package',
  templateUrl: './edit-package.component.html',
  styleUrls: ['./edit-package.component.css']
})
export class EditPackageComponent implements OnInit {
  rootUrl: any;
  // form!: FormGroup;
  submitted!: boolean
  id: any;
form:any;
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
  endTime: any  ;
  // time2!: string;
  salonId: any;
  role!: string | null;
  urls1: any = [];
  image1: any;
  imageUrl: any;
  dropdownSettings = {};  
  bindServiceList!: any[];
  selectedIndex: number = -1;
  selectedItems: any[] = [];
  serviceList: any[] = [];
  packageDetailPatch: any = {};
  includeServicePatch: any;
  options: any;
  base64Image: any;
  selectedImageData: any[] = [];
  ServiceImage: any;
  serviceIconImage: any;
  imageUrl1: any;
  imageFiles!: { link: any; file: any; name: any; type: any; };
  errorMessage: string = '';
  errorMessages: string = '';
  isValid: boolean = false;
  previewImage: string = '';
  serviceIds: any;
  basePrice: any;
  discount : any = 0 ;
  listingPrice: any = 0 ;
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
    private http: HttpClient,
    private sanitizer: DomSanitizer

  ) { }

  ngOnInit(): void {
    this.role = localStorage.getItem('user')
    this.salonIds = localStorage.getItem('salonId');
    this.serviceId = this.route.snapshot.queryParams;
    this.rootUrl = environment.rootPathUrl;
    this.getServiceDetail() 
    this.serviceForm();
    this.getcategoryList();
    this.getServicesList();
   
    this.salonId = this.route.snapshot.queryParams
    this.dropdownSettings = {
      singleSelection: false,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      itemsShowLimit: 5,
      idField: 'item_id',
      textField: 'item_text',
    };
    this.form.get('mainCategoryId').valueChanges.subscribe(() => {
      // Reset subCategoryId when mainCategoryId changes
      this.form.get('subCategoryId').setValue('');
    });
  }

  onItemSelect(item: any) { }

  onSelectAll(items: any) { }


  serviceForm() {
    this.form = this.formBuilder.group({
      serviceName          : ['', [Validators.required]],
      basePrice            : ['', [Validators.required]],
      discount             : ['', [Validators.required]],
      listingPrice         : ['', [Validators.required]],
      mainCategoryId       : [''],
      subCategoryId        : [''],
      ageRestrictions      : ['', [Validators.required]],
      genderPreferences    : ['', [Validators.required]],
      totalCountPerDuration: ['', [Validators.required]],
      durationInMinutes    : ['', [Validators.required]],
      lockTimeStart        : [''],
      lockTimeEnd          : [''],
      serviceDescription   : ['', [Validators.required, this.maxLengthValidator(160)]],
      serviceId            : [],
      includeServiceId     : [],


    },{ validator: this.timeValidator });
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

  
  get f() {
    return this.form.controls;
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

  getcategoryList(){
    this.spinner.show();
      this.contentService.getcategory().subscribe(response => {
        if (response.isSuccess) {
          this.categoryList = response.data;
          this.subCategoryList = [];
         this.spinner.hide();
        } else {
          this.spinner.hide();
          this.toaster.error(response.messages);
        }
      });
    }


   getSubcategoryList(mainCategoryId:any){
   this.contentService.SuperSubCategory(mainCategoryId).subscribe(response => {
     if (response.isSuccess) {
       this.subCategoryList = response.data;
       this.spinner.hide();
     } else {
       this.subCategoryList = [];
      //  this.toaster.error(response.messages);
     }
   });
 }

 getServicesList() {
  this.spinner.show();

  let payload = {
    pageNumber: 1,
    pageSize: 1000,
    salonId: this.salonIds
  }
  this.contentService.getservice(payload).subscribe(response => {
    if (response.isSuccess) {
      this.serviceList = response.data.dataList
      this.bindServiceList = [];
      this.serviceList.forEach((element: { serviceId: any; serviceName: any; }) => {
        this.bindServiceList.push(
          { item_id: element.serviceId, item_text: element.serviceName }
        )
      });
      // this.shopId = response.data.dataList.shopId
      // this.getFilterMainCategoryList(this.productList);
      // this.total = response.data;

      this.spinner.hide();
    }
  })
}

getServicesListByCategories() {
    this.spinner.show();
  
    let payload = {
      pageNumber: 1,
      pageSize: 1000,
      salonId: this.salonIds,
      mainCategoryId: this.form.value.mainCategoryId ? this.form.value.mainCategoryId : '',
      subCategoryId: this.form.value.subCategoryId ? this.form.value.subCategoryId : '',
      
    }
    this.contentService.getfilteListBycategories(payload).subscribe(response => {
      if (response.isSuccess) {
        this.serviceList = response.data.dataList
        this.bindServiceList = [];
        this.serviceList.forEach((element: { serviceId: any; serviceName: any; }) => {
          this.bindServiceList.push(
            { item_id: element.serviceId, item_text: element.serviceName }
          )
        });
        // this.shopId = response.data.dataList.shopId
        // this.getFilterMainCategoryList(this.productList);
        // this.total = response.data;
  
        this.spinner.hide();
      }
    })
  }
  

convertSelectedItemsToString(): string {
  return this.selectedItems.map(item => item.item_id).join(',');
  
}



getServiceDetail() {
  this.spinner.show();
 let payload ={
  serviceId: this.serviceId.id,
  serviceType: this.serviceId.type
 }

  
  this.contentService.getPackageDetail( payload).subscribe(response => {

    if (response.isSuccess) {
   
      this.imageConvert64();
      this.packageDetailPatch = response.data
      this.ServiceImage = this.packageDetailPatch.serviceImage
      this.imageUrl = this.rootUrl + this.packageDetailPatch.serviceIconImage
      // this.options = this.packageDetailPatch.includeServiceId
      // let serviceListData: { item_id: any; item_text: any; }[] = [];
      // this.serviceList?.forEach((element: { serviceId: any; serviceName: any; }) => {
      //   this.packageDetailPatch.includeServiceId?.split(',').forEach((x: any) => {
      //     if (element.serviceId == x) {
      //       serviceListData.push(  
      //         { item_id: element.serviceId, item_text: element.serviceName }
      //       )
      //     }
      //   })
      // });
      

     // this.packageDetailPatch.includeService.map((service: any) => service.serviceName, ),
      this.form.patchValue({
        serviceName: this.packageDetailPatch.serviceName,
        basePrice: this.packageDetailPatch.basePrice,
        discount: this.packageDetailPatch.discount,
        listingPrice: this.packageDetailPatch.listingPrice,
        // mainCategoryId: this.packageDetailPatch.mainCategoryId,
        ageRestrictions: this.packageDetailPatch.ageRestrictions,
        genderPreferences: this.packageDetailPatch.genderPreferences,
        duration: this.packageDetailPatch.duration,
        totalCountPerDuration: this.packageDetailPatch.totalCountPerDuration,
        durationInMinutes: this.packageDetailPatch.durationInMinutes,
        lockTimeStart: this.packageDetailPatch.lockTimeStart,
        lockTimeEnd: this.packageDetailPatch.lockTimeEnd,
        serviceDescription: this.packageDetailPatch.serviceDescription,
        includeServiceId: this.packageDetailPatch.includeService.map((element: { serviceId: any; serviceName: any; }) => ({ item_id: element.serviceId, item_text: element.serviceName })),

       
      });
    
      // this.getSubcategoryList(this.packageDetailPatch?.mainCategoryId);
    }
  });
  this.spinner.hide();
}

imageConvert64() {
  this.contentService.imageConvert(this.serviceId.id).subscribe(response => {
    if (response.isSuccess) {
      this.base64Image = response.data
    }
  });
}

 // submit 
 postSubmit() {
  this.submitted = true;
  if (this.form.invalid) {
    this.toasterService.error("Form Incomplete: Please fill in all the required fields correctly");
    return;
  }
  const selectedItemsString = this.convertSelectedItemsToString();
  let payload = {
    serviceId            : this.serviceId.id,
    salonId              : localStorage.getItem('salonId'),
    serviceName          : this.form.value.serviceName,
    basePrice            :  parseInt(this.form.value.basePrice),
    discount             :  parseInt(this.form.value.discount),
    listingPrice         :  parseInt(this.form.value.listingPrice),
    // mainCategoryId       : this.form.value.mainCategoryId,
    // subCategoryId        : this.form.value.subCategoryId,
    ageRestrictions      : this.form.value.ageRestrictions,
    genderPreferences    : this.form.value.genderPreferences,
    totalCountPerDuration: this.form.value.totalCountPerDuration,
    durationInMinutes    : this.form.value.durationInMinutes,
    lockTimeStart        :  this.form.value.lockTimeStart || '',
    lockTimeEnd          : this.form.value.lockTimeEnd || '',
    serviceDescription   : this.form.value.serviceDescription,
    status               : 1,
    includeServiceId     : selectedItemsString,
    serviceType          : 'Package'

  }
  this.spinner.show()
  this.contentService.addNewService(payload).subscribe(response => {
    this.serviceIds = response.data.serviceId
    this.fileChangeEvent();
    this.fileChangeEvents();
    this.spinner.hide()
    if (response.isSuccess) {
      this.toaster.success(response.messages);
       this._location.back();
        setTimeout(() => {
          window.location.reload();
        }, 500); 
    } else {
      this.toaster.error(response.messages)
    }
  });
}


fileChangeEvent() {
  const formData = new FormData();
  for (let i = 0; i < this.base64Image.length; i++) {
    const imageDataUrl = this.base64Image[i];
    const blob = this.dataURItoBlob(imageDataUrl);
    formData.append('salonServiceImage', blob, `image_${i}.png`);
    // formData.append('salonServiceImage', imageDataUrl);
  }
  formData.append('serviceId', this.serviceIds);
  this.contentService.uploadServiceImage(formData).subscribe(response => {
    var a = response;
  });
}


onselect(event: any) {
  const files = event.target.files;
  this.errorMessages = ''; // Clear previous error messages

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const image = new Image();
      image.src = reader.result as string;

      image.onload = () => {
        if (image.width === 1280 && image.height === 720 && file.size / 1024 <= 1000) {
          this.base64Image.push(image.src);
        } else {
          this.errorMessages ;
        }
      };
    }
  }
}
onBannerImageSelect(event: any) {
  const file = event.target.files[0];
  const fileType = event.target.files[0].type;
  if ((fileType === 'image/jpeg' || fileType === 'image/png') && fileType !== 'image/jfif') {
  if (file) {
    const imageSize = file.size / 1024; // in KB
    const image = new Image();

    image.src = URL.createObjectURL(file);

    image.onload = () => {
      if (image.width === 1280 && image.height === 720 && imageSize <= 1020) {
        this.errorMessages = '';
        this.isValid = true;
        this.previewImage = image.src;
      } else {
        this.errorMessages = 'Please select 1280x720 pixels (width×height) image.';
        this.isValid = false;
        this.previewImage = '';
      }
    };
  }
} else {
  this.errorMessage = 'Please select a valid JPEG or PNG image.';
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
            this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(image.src) as SafeUrl;
          } else {
            this.errorMessage = 'Please select 512x512 pixels (width×height) image.';
            this.isValid = false;
            this.imageUrl= '';
          }
        };
      } else {
        this.errorMessage = 'Please select a valid JPEG or PNG image.';
        this.imageUrl = '';
        return;
      }

   
    } else {
      this.errorMessage = 'Please select a valid JPEG or PNG image.';
      this.imageUrl = '';
    }
  }
}
// onImageSelect(event: any) {
//   const file = event.target.files[0];

//   if (file) {
//     const imageSize = file.size / 1024; // in KB
//     const image = new Image();

//     image.src = URL.createObjectURL(file);

//     image.onload = () => {
//       if (image.width === 512 && image.height === 512 && imageSize <= 512) {
//         this.errorMessage = '';
//         this.isValid = true;
//         // this.previewImage = image.src;
//       } else {
//         this.errorMessage = 'Please select 512x512 pixels (width×height) image.';
//         this.isValid = false;
//         this.imageUrl = '';
//       }
//     };
//   }
// }

handleFileInput(event: any) {
  debugger
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
          // Only add the image to the array and update the preview if it meets the dimensions criteria.
          const imageDataUrl = reader.result as string;
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
    }
  }
}

fileChangeEvents() {
  let formData = new FormData();
  formData.append("salonServiceIconImage", this.imageFiles?.file);
  formData.append("serviceId", this.serviceIds);
  this.contentService.uploadServiceIconImage(formData).subscribe(response => {
  });
}

private dataURItoBlob(dataURI: string): Blob {
  const byteString = atob(dataURI.split(',')[1]);
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab)
;
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}
// removeImage(index: any) {
//   this.selectedImageData.splice(index, 1);
//   this.base64Image.splice(index, 1);
// }
removeImage(index: number) {
  if (index >= 0 && index < this.base64Image.length) {
      this.base64Image.splice(index, 1);
      // Check and remove from selectedImageData if necessary
      if (index < this.selectedImageData.length) {
          this.selectedImageData.splice(index, 1);
      }
  }
}
cancel(){
  this.router.navigateByUrl('/package-list')
  .then(() => {
    window.location.reload();
  });
}

}
