import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.css']
})
export class EditServiceComponent implements OnInit {
  rootUrl: any;
  serviceId: any;
  submitted!: boolean;
  form: any;
  image :any;
  subCategoryList: any;
  categoryList: any;
  serviceDetailPatch: any;
  editImages: string = '';
 
  time2!: string;
  time1!: string;

  salonId: any;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private contentService: ContentService,
    private toasterService: ToastrService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private ngZone: NgZone,) { }

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
    debugger
    this.serviceId = this.route.snapshot.queryParams;
    this.salonId = this.route.snapshot.queryParams;
    this.serviceForm();
    this.getcategoryList();
    this.getServiceDetail()
  }

  serviceForm() {
    this.submitted = true;
    this.form = this.formBuilder.group({
      serviceName: ['', [Validators.required]],
      basePrice: ['', [Validators.required]],
      discount: ['', [Validators.required]],
      listingPrice: ['', [Validators.required]],
      mainCategoryId: ['', [Validators.required]],
      subCategoryId: [''],
      ageRestrictions: ['', [Validators.required]],
      genderPreferences: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      totalCountPerDuration: ['', [Validators.required]],
      durationInMinutes: ['', [Validators.required]],
      lockTimeStart: ['', [Validators.required]],
      lockTimeEnd: ['', [Validators.required]],
      serviceDescription: ['', [Validators.required]],
    })
  }



  get f() {
    return this.form.controls;
  }

  getcategoryList() {
    debugger
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

  getSubcategoryList(mainCategoryId: any) {
    debugger

    this.contentService.SuperSubCategory(mainCategoryId).subscribe(response => {
      if (response.isSuccess) {
        this.subCategoryList = response.data;
        console.log(this.subCategoryList)

        // this.SubSubcategoryList = []
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
    debugger
    this.spinner.show();
    this.contentService.getServiceDetail(this.serviceId.id2).subscribe(response => {
      this.spinner.hide();
      if (response.isSuccess) {
        this.spinner.hide();

        this.serviceDetailPatch = response.data
        console.log(this.serviceDetailPatch)
        this.editImages = this.rootUrl + this.serviceDetailPatch?.serviceImage[0]?.salonServiceImage;

        console.log (this.editImages)
debugger

        this.form.patchValue({
          serviceName: this.serviceDetailPatch.serviceName,
          basePrice: this.serviceDetailPatch.basePrice,
          discount: this.serviceDetailPatch.discount,
          listingPrice: this.serviceDetailPatch.listingPrice,
          mainCategoryId: this.serviceDetailPatch.mainCategoryId,
        //   subCategoryId: this.serviceDetailPatch.subCategoryId,
          ageRestrictions: this.serviceDetailPatch.ageRestrictions,
          genderPreferences: this.serviceDetailPatch.genderPreferences,
          duration: this.serviceDetailPatch.duration,
          totalCountPerDuration: this.serviceDetailPatch.totalCountPerDuration,
          durationInMinutes: this.serviceDetailPatch.durationInMinutes,
          lockTimeStart: this.time1,
          lockTimeEnd: this.time2,
          serviceDescription: this.serviceDetailPatch.serviceDescription,
          

        });
        this.getSubcategoryList(this.serviceDetailPatch?.mainCategoryId);
        this.patchTimeValue(this.serviceDetailPatch.lockTimeStart);
        this.patchTimeValue1(this.serviceDetailPatch.lockTimeEnd);
      }
    })
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
this.time1 = formattedTime
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

patchTimeValue(data:any) {
  // Convert "10:00 AM" to "10:00"
  debugger
  const formattedTime = this.convertTo24HourFormat(data);
  
  // Patch the formatted time into the form control
  this.form.get('lockTimeStart')?.patchValue(formattedTime);
}

// Function to convert AM/PM time to 24-hour format
private convertTo24HourFormat(time: string): string {
  const [timePart, ampmPart] = time.split(' ');
  const [hours, minutes] = timePart.split(':');
  
  let formattedHours = parseInt(hours, 10);
  
  if (ampmPart.toLowerCase() === 'pm' && formattedHours !== 12) {
    formattedHours += 12;
  }
  
  if (ampmPart.toLowerCase() === 'am' && formattedHours === 12) {
    formattedHours = 0;
  }
  
  const formattedTime = `${formattedHours.toString().padStart(2, '0')}:${minutes}`;
  this.time1 = formattedTime
  return formattedTime;
}



patchTimeValue1(data:any) {
  // Convert "10:00 AM" to "10:00"
  debugger
  const formattedTime = this.convertTo24HourFormat1(data);
  
  // Patch the formatted time into the form control
  this.form.get('lockTimeEnd')?.patchValue(formattedTime);
}

// Function to convert AM/PM time to 24-hour format
private convertTo24HourFormat1(time: string): string {
  const [timePart, ampmPart] = time.split(' ');
  const [hours, minutes] = timePart.split(':');
  
  let formattedHours = parseInt(hours, 10);
  
  if (ampmPart.toLowerCase() === 'pm' && formattedHours !== 12) {
    formattedHours += 12;
  }
  
  if (ampmPart.toLowerCase() === 'am' && formattedHours === 12) {
    formattedHours = 0;
  }
  
  const formattedTime = `${formattedHours.toString().padStart(2, '0')}:${minutes}`;
  this.time2 = formattedTime
  return formattedTime;
}


updateService(){
 


    debugger
      let payload = {
        serviceId:parseInt(this.serviceId.id2),
        salonId:parseInt(this.salonId.id),
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
        lockTimeStart: this.time1,
        lockTimeEnd: this.time2,
        serviceDescription: this.form.value.serviceDescription, 
      
    
      }
      this.spinner.show()
      this.contentService.addNewService(payload).subscribe(response => {
        this.spinner.hide()
        // this.productId = response.data?.productId
        // this.fileChangeEvent();
        if (response.isSuccess) {
          this.toaster.success(response.messages);
          // this._location.back();
        } else {
          this.toaster.error(response.messages)
        }
      });
    }



}
