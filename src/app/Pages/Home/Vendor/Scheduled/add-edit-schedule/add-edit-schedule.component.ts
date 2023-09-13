import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { ContentService } from 'src/app/Shared/service/content.service';

@Component({
  selector: 'app-add-edit-schedule',
  templateUrl: './add-edit-schedule.component.html',
  styleUrls: ['./add-edit-schedule.component.css']
})
export class AddEditScheduleComponent implements OnInit {

  Form!: FormGroup;
  monday!: boolean;
  tuesday!: boolean;
  wednesday!: boolean;
  thursday!: boolean;
  friday!: boolean;
  saturday!: boolean;
  sunday!: boolean;
  schedule: any;
  salonId: any;
  time!: string;
  time1!: string;
  constructor(
    private formBuilder: FormBuilder,
    private contentService: ContentService,
    private router: Router,

    private spinner: NgxSpinnerService,
    private toasterService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.scheduleform();
    this.salonId = localStorage.getItem('salonId');
    this.getScheduleDayTime();

  }


  scheduleform() {

    this.Form = this.formBuilder.group({
      monday: [true, [Validators.required]],
      tuesday: [true, [Validators.required]],
      wednesday: [true, [Validators.required]],
      thursday: [true, [Validators.required]],
      friday: [true, [Validators.required]],
      saturday: [true, [Validators.required]],
      sunday: [true, [Validators.required]],
      fromTime: ['', [Validators.required]],
      toTime: ['', [Validators.required]],

    });

  }


  // book schedule
  // DoctorSchedule() {

  //   let payload = {
  //     fromTime: this.Form.value.fromTime,
  //     toTime: this.Form.value.toTime,
  //     monday: this.Form.value.monday,
  //     tuesday: this.Form.value.tuesday,
  //     wednesday: this.Form.value.wednesday,
  //     thursday: this.Form.value.thursday,
  //     friday: this.Form.value.friday,
  //     saturday: this.Form.value.saturday,
  //     sunday: this.Form.value.sunday,
  //   }
  //   this.spinner.show();
  //   this.contentService.Schedule(payload).subscribe(response => {
  //     if (response.status) {
  //       this.spinner.hide();
  //       this.toasterService.success(response.message);
  //       this.router.navigateByUrl('/home')
  //     } else {
  //       this.spinner.hide();
  //       this.toasterService.error(response.message);
  //     }
  //   });

  // }

  // monday value select true and false 
  planMonday(event: any) {
debugger
    if (event.currentTarget?.checked) {
      this.monday == false;
    } else {
      this.monday = true;
    }

 }


  // tuesday value select true and false 
  planTuesday(event: any) {

    if (event.currentTarget?.checked) {
      this.tuesday = false;
    } else {
      this.tuesday = true;
    };

  }

  // wednesday value select true and false 
  planWednesday(event: any) {

    if (event.currentTarget?.checked) {
      this.wednesday = false;
    } else {
      this.wednesday = true;
    }

  }


  // thursday value select true and false 
  planThrusday(event: any) {

    if (event.currentTarget?.checked) {
      this.thursday = false;
    } else {
      this.thursday = true;
    }

  }

  // friday value select true and false 
  planFriday(event: any) {

    if (event.currentTarget?.checked) {
      this.friday = false;
    } else {
      this.friday = true;
    }

  }


  // Saturday value select true and false 
  planSaturday(event: any) {

    if (event.currentTarget?.checked) {
      this.saturday = false;
    } else {
      this.saturday = true;
    }

  }


  // sunday value select true and false 
  planSunday(event: any) {

    if (event.currentTarget?.checked) {
      this.sunday = false;
    } else {
      this.sunday = true;
    }

  }


  // get schedule 

  getScheduleDayTime() {
    debugger
    this.spinner.show();
    this.contentService.getScheduleDayTimes(this.salonId).subscribe(response => {
      this.spinner.hide();
     
      if (response.isSuccess) {
        this.schedule = response.data;
        console.log( this.schedule)
        
        this.patchTimeValue(this.schedule.fromTime);
        this.patchTimeValue1(this.schedule.toTime);
        this.Form.patchValue({
          monday: response.data.monday,
          tuesday: response.data.tuesday,
          wednesday: response.data.wednesday,
          thursday: response.data.thursday,
          friday: response.data.friday,
          saturday: response.data.saturday,
          sunday: response.data.sunday,
          fromTime: this.time,
          toTime: this.time1,
        })
      }
        else {
          this.spinner.hide();
      }
    });
    
  }
  patchTimeValue(data:any) {
    // Convert "10:00 AM" to "10:00"
    debugger
    const formattedTime = this.convertTo24HourFormat(data);
    
    // Patch the formatted time into the form control
    this.Form.get('fromTime')?.patchValue(formattedTime);
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
    this.time = formattedTime
    return formattedTime;
  }



  patchTimeValue1(data:any) {
    // Convert "10:00 AM" to "10:00"
    debugger
    const formattedTime = this.convertTo24HourFormat1(data);
    
    // Patch the formatted time into the form control
    this.Form.get('fromTime')?.patchValue(formattedTime);
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
    this.time1 = formattedTime
    return formattedTime;
  }



  addUpdateSchedule(){
    debugger
    let payload = {
      salonId : localStorage.getItem('salonId'),
      fromTime: this.Form.value.fromTime,
      toTime: this.Form.value.toTime,
      monday: this.Form.value.monday,
      tuesday: this.Form.value.tuesday,
      wednesday: this.Form.value.wednesday,
      thursday: this.Form.value.thursday,
      friday: this.Form.value.friday,
      saturday: this.Form.value.saturday,
      sunday: this.Form.value.sunday,    
    }
    this.spinner.show();
    this.contentService.addSchedule(payload).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();
        this.toasterService.success(response.messages);
      
      } else {
        this.spinner.hide();
        this.toasterService.error(response.messages);
      }
    });
  }


  // cancel 

  cancel() {
    this.router.navigateByUrl('/home')
  }
}
