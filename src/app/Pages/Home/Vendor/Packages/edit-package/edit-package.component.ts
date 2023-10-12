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



@Component({
  selector: 'app-edit-package',
  templateUrl: './edit-package.component.html',
  styleUrls: ['./edit-package.component.css']
})
export class EditPackageComponent implements OnInit {
  rootUrl: any;
  form!: FormGroup;
  submitted!: boolean
  id: any;

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
  serviceList: any;
  packageDetailPatch: any;
  includeServicePatch: any;
  options: any;
  base64Image: any;
  selectedImageData: any[] = [];
  ServiceImage: any;
  serviceIconImage: any;
  imageUrl1: any;



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

  ) { }

  ngOnInit(): void {
    this.role = localStorage.getItem('user')
    this.salonIds = localStorage.getItem('salonId');
    this.serviceId = this.route.snapshot.queryParams;
    console.log(this.salonIds)
    this.rootUrl = environment.rootPathUrl;
    this.serviceForm();
    this.getcategoryList();
    this.getServicesList();
    this.getServiceDetail() 
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

  }

  onItemSelect(item: any) { }

  onSelectAll(items: any) { }


  serviceForm() {
    this.form = this.formBuilder.group({
      serviceName          : ['', [Validators.required]],
      basePrice            : ['', [Validators.required]],
      discount             : ['', [Validators.required]],
      listingPrice         : ['', [Validators.required]],
      mainCategoryId       : ['', [Validators.required]],
      subCategoryId        : ['', [Validators.required]],
      ageRestrictions      : ['', [Validators.required]],
      genderPreferences    : ['', [Validators.required]],
      totalCountPerDuration: ['', [Validators.required]],
      durationInMinutes    : ['', [Validators.required]],
      lockTimeStart        : ['', [Validators.required]],
      lockTimeEnd          : ['', [Validators.required]],
      serviceDescription   : ['', [Validators.required]],
      serviceId            : [],
      includeServiceId     : [],


    },{ validator: this.timeValidator });
}
timeValidator(control: AbstractControl): ValidationErrors | null {
  const startTime = control.get('lockTimeStart')?.value;
  const endTime = control.get('lockTimeEnd')?.value;

  if (startTime && endTime) {
    if (startTime >= endTime) {
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

  getcategoryList(){
    // this.spinner.show();
      this.contentService.getcategory().subscribe(response => {
        if (response.isSuccess) {
          this.categoryList = response.data;
        
        //  this.spinner.hide();
        } else {
          // this.spinner.hide();
          this.toaster.error(response.messages);
        }
      });
    }


   getSubcategoryList(mainCategoryId:any){
   this.contentService.SuperSubCategory(mainCategoryId).subscribe(response => {
     if (response.isSuccess) {
       this.subCategoryList = response.data;
       console.log( this.subCategoryList)
     
       // this.SubSubcategoryList = []
       this.spinner.hide();
     } else {
       this.subCategoryList = [];
      //  this.toaster.error(response.messages);
     }
   });
 }

 getServicesList() {
debugger
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

convertSelectedItemsToString(): string {
  return this.selectedItems.map(item => item.item_id).join(',');
  
}



getServiceDetail() {

 debugger
 let payload ={
  serviceId: this.serviceId.id,
  serviceType: this.serviceId.type
 }

  this.spinner.show();
  this.contentService.getPackageDetail( payload).subscribe(response => {
    this.spinner.hide();
    if (response.isSuccess) {
      this.spinner.hide();
      this.imageConvert64();
      this.packageDetailPatch = response.data
      this.ServiceImage = this.packageDetailPatch.serviceImage
      this.imageUrl1 = this.rootUrl + this.packageDetailPatch.serviceIconImage
      debugger
      this.options = this.packageDetailPatch.includeServiceId
      let serviceListData: { item_id: any; item_text: any; }[] = [];
      this.serviceList.forEach((element: { serviceId: any; serviceName: any; }) => {
        this.packageDetailPatch.includeServiceId.split(',').forEach((x: any) => {
          if (element.serviceId == x) {
            serviceListData.push(  
              { item_id: element.serviceId, item_text: element.serviceName }
            )
          }
        })
      });
      this.form.patchValue({
        serviceName: this.packageDetailPatch.serviceName,
        basePrice: this.packageDetailPatch.basePrice,
        discount: this.packageDetailPatch.discount,
        listingPrice: this.packageDetailPatch.listingPrice,
        mainCategoryId: this.packageDetailPatch.mainCategoryId,
        ageRestrictions: this.packageDetailPatch.ageRestrictions,
        genderPreferences: this.packageDetailPatch.genderPreferences,
        duration: this.packageDetailPatch.duration,
        totalCountPerDuration: this.packageDetailPatch.totalCountPerDuration,
        durationInMinutes: this.packageDetailPatch.durationInMinutes,
        lockTimeStart: this.packageDetailPatch.lockTimeStart,
        lockTimeEnd: this.packageDetailPatch.lockTimeEnd,
        serviceDescription: this.packageDetailPatch.serviceDescription,
        includeServiceId: serviceListData,
       
      });
      this.getSubcategoryList(this.packageDetailPatch?.mainCategoryId);
   

    }
  });
}

imageConvert64() {
  debugger
  this.contentService.imageConvert(this.serviceId.id).subscribe(response => {
    if (response.isSuccess) {
      this.base64Image = response.data
      console.log(this.base64Image)
    }
  });
}

 // submit 

 postSubmit(){
 debugger
  if(this.role == 'SuperAdmin') {
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
    serviceId            : 0,
    salonId              : parseInt(this.salonId.id),
    serviceName          : this.form.value.serviceName,
    basePrice            : parseInt(this.form.value.basePrice),
    discount             : parseInt(this.form.value.discount),
    listingPrice         : parseInt(this.form.value.listingPrice),
    mainCategoryId       : this.form.value.mainCategoryId,
    subCategoryId        : this.form.value.subCategoryId,
    ageRestrictions      : this.form.value.ageRestrictions,
    genderPreferences    : this.form.value.genderPreferences,
    totalCountPerDuration: this.form.value.totalCountPerDuration,
    durationInMinutes    : this.form.value.durationInMinutes,
    lockTimeStart        : this.time,
    lockTimeEnd          : this.time2,
    serviceDescription   : this.form.value.serviceDescription,
    includeServiceId     : this.selectedItems,
    
  }
  this.spinner.show()
  this.contentService.addNewService(payload).subscribe(response => {

    this.serviceId = response.data?.serviceId
    this.fileChangeEvent();
    this.fileChangeEvents();
    this.spinner.hide()
    if (response.isSuccess) {
      this.toaster.success(response.messages);
       this._location.back();
    } else {
      this.toaster.error(response.messages)
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
  const selectedItemsString = this.convertSelectedItemsToString();
  let payload = {
    serviceId            : this.serviceId.id,
    salonId              : localStorage.getItem('salonId'),
    serviceName          : this.form.value.serviceName,
    basePrice            :  parseInt(this.form.value.basePrice),
    discount             :  parseInt(this.form.value.discount),
    listingPrice         :  parseInt(this.form.value.listingPrice),
    mainCategoryId       : this.form.value.mainCategoryId,
    subCategoryId        : this.form.value.subCategoryId,
    ageRestrictions      : this.form.value.ageRestrictions,
    genderPreferences    : this.form.value.genderPreferences,
    totalCountPerDuration: this.form.value.totalCountPerDuration,
    durationInMinutes    : this.form.value.durationInMinutes,
    lockTimeStart        : this.form.value.lockTimeStart,
    lockTimeEnd          : this.form.value.lockTimeEnd,
    serviceDescription   : this.form.value.serviceDescription,
    status               : 1,
    includeServiceId     : selectedItemsString,
    serviceType          : 'Package'

  

  }
  this.spinner.show()
  this.contentService.addNewService(payload).subscribe(response => {

    this.serviceId = response.data?.serviceId
    this.fileChangeEvent();
    this.fileChangeEvents();
    this.spinner.hide()
    if (response.isSuccess) {
      this.toaster.success(response.messages);
       this._location.back();
    } else {
      this.toaster.error(response.messages)
    }
  });
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
this.time = formattedTime
  console.log('Formatted Time:', formattedTime);
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
  this.time2 = formattedTime
  console.log('Formatted Time:', formattedTime);

  // Now 'formattedTime' contains the time in "hh:mm tt" format with 12-hour time
}




handleFileInput(event: any) {
    
  const files = event.target.files;
  for (let e = 0; e < files.length; e++) {
    const file = files[e];
    this.image1 = file
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const imageDataUrl1 = reader.result as string;
      this.imageUrl1 = imageDataUrl1;
      this.urls1.push(imageDataUrl1);
    };
  }
}


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



onselect(event: any) {   
  const files = event.target.files;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const imageDataUrl = reader.result as string;
      this.urls.push(imageDataUrl);
    };
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


removeImage(index: any) {
  this.selectedImageData.splice(index, 1);
  this.base64Image.splice(index, 1);
}

cancel(){
  this.router.navigateByUrl('/salon-list')
  .then(() => {
    window.location.reload();
  });
}

}