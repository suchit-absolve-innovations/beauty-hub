import { DatePipe } from '@angular/common';
import { Component, NgZone, OnInit,Input, Output, EventEmitter  } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit {
  form!: FormGroup;
  submitted!: boolean
  rootUrl: any;
  id: any;

  subCategoryList: any;
  categoryList: any;
  salonBannerId: any;
  shopBannerList: any;
  totalItems!: number;
  salonIds: any;
  selectedTime: any;
  time!: string;
  time2!: string; urls: any = [];
  imageFile!: { link: any, file: any, name: any, type: any };
  serviceId: any;
  startTime: any;
  endTime: any  ;


  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private contentService: ContentService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private datePipe: DatePipe,
    private toasterService: ToastrService,


  ) { }

  ngOnInit(): void {
    this.salonIds = localStorage.getItem('salonId');
    console.log(this.salonIds)
    this.rootUrl = environment.rootPathUrl;
    this.serviceForm();
    this.getcategoryList();
     

  }

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
      duration             : ['', [Validators.required]],
      totalCountPerDuration: ['', [Validators.required]],
      durationInMinutes    : ['', [Validators.required]],
      lockTimeStart        : ['', [Validators.required]],
      lockTimeEnd          : ['', [Validators.required]],
      serviceDescription   : ['', [Validators.required]],

    })
}

  
  get f() {
    return this.form.controls;
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
       this.toaster.error(response.messages);
     }
   });
 }


 submit() {
  // this.submitted = true;
  // if (this.form.invalid) {
  //   this.toasterService.error("Form Incomplete: Please fill in all the required fields correctly");
  //   return;
  // }

  let payload = {
    serviceId: 0,
    salonId:11,
    serviceName: this.form.value.serviceName,
    basePrice:  parseInt(this.form.value.basePrice),
    discount:  parseInt(this.form.value.discount),
    listingPrice:  parseInt(this.form.value.listingPrice),
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
    this.spinner.hide()
    if (response.isSuccess) {
      this.toaster.success(response.messages);
      // this._location.back();
    } else {
      this.toaster.error(response.messages)
    }
  });
}

// onTimeInputChange(event: Event) {
//   const timeInput = event.target as HTMLInputElement;
//   const selectedTime = timeInput.value; // Get the selected time in "hh:mm" format
//   // Determine whether it's AM or PM based on a certain condition (e.g., hours)
//   const [hours] = selectedTime.split(':');
//   let parsedHours = parseInt(hours, 10);
//   // Calculate the period (AM or PM)
//   let period = 'AM';
//   if (parsedHours >= 12) {
//     period = 'PM';
//     if (parsedHours > 12) {
//       parsedHours -= 12;
//     }
//   }
//   if (parsedHours === 0) {
//     parsedHours = 12;
//   }
  
//   // Format the time as "hh:mm tt"
//   const formattedTime = `${parsedHours.toString().padStart(2, '0')}:${selectedTime.slice(3)} ${period}`;
// this.time = formattedTime
//   console.log('Formatted Time:', formattedTime);
//   // Now 'formattedTime' contains the time in "hh:mm tt" format with 12-hour time
// }

 onTimeInputChange(event: Event) {
  const timeInput = event.target as HTMLInputElement;
  const selectedTime = timeInput.value; // Get the selected time in "hh:mm" format
  const id = timeInput.id;

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

  // Set the time in the appropriate field
  if (id === 'startTime') {
    // Handle the start time
    this.startTime = formattedTime;
  } else if (id === 'endTime') {
    // Handle the end time
    this.endTime = formattedTime;

    // Perform validation: End time must be greater than start time
    const startTimeValue = new Date(`2000-01-01T${this.startTime}`);
    const endTimeValue = new Date(`2000-01-01T${this.endTime}`);

    if (endTimeValue <= startTimeValue) {
      alert('End time must be greater than start time');
      // You can reset the end time here if you want
      // this.endTime = '';
    }
  }

  console.log('Formatted Time:', formattedTime);
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
  debugger
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
  this.urls.splice(index, 1);
}

}
