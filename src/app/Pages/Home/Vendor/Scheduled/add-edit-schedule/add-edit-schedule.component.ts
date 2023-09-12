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

  constructor(
    private formBuilder: FormBuilder,
    private contentService: ContentService,
    private router: Router,

    private spinner: NgxSpinnerService,
    private toasterService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.scheduleform();
    // this.getSchedule();

  }


  scheduleform() {

    this.Form = this.formBuilder.group({
      monday: [false, [Validators.required]],
      tuesday: [false, [Validators.required]],
      wednesday: [false, [Validators.required]],
      thursday: [false, [Validators.required]],
      friday: [false, [Validators.required]],
      saturday: [false, [Validators.required]],
      sunday: [false, [Validators.required]],
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

    if (event.currentTarget?.checked) {
      this.monday == true;
    } else {
      this.monday = false;
    }

 }


  // tuesday value select true and false 
  planTuesday(event: any) {

    if (event.currentTarget?.checked) {
      this.tuesday = true;
    } else {
      this.tuesday = false;
    };

  }

  // wednesday value select true and false 
  planWednesday(event: any) {

    if (event.currentTarget?.checked) {
      this.wednesday = true;
    } else {
      this.wednesday = false;
    }

  }


  // thursday value select true and false 
  planThrusday(event: any) {

    if (event.currentTarget?.checked) {
      this.thursday = true;
    } else {
      this.thursday = false;
    }

  }

  // friday value select true and false 
  planFriday(event: any) {

    if (event.currentTarget?.checked) {
      this.friday = true;
    } else {
      this.friday = false;
    }

  }


  // Saturday value select true and false 
  planSaturday(event: any) {

    if (event.currentTarget?.checked) {
      this.saturday = true;
    } else {
      this.saturday = false;
    }

  }


  // sunday value select true and false 
  planSunday(event: any) {

    if (event.currentTarget?.checked) {
      this.sunday = true;
    } else {
      this.sunday = false;
    }

  }


  // get schedule 

  // getSchedule() {
    
  //   this.spinner.show();
  //   this.contentService.patchSchedule().subscribe(response => {
  //     this.spinner.hide();
  //     if (response.status) {
  //       this.schedule = response.data;
  //       this.Form.patchValue({
  //         monday: response.data.monday,
  //         tuesday: response.data.tuesday,
  //         wednesday: response.data.wednesday,
  //         thursday: response.data.thursday,
  //         friday: response.data.friday,
  //         saturday: response.data.saturday,
  //         sunday: response.data.sunday,
  //         fromTime: response.data.fromTime,
  //         toTime: response.data.toTime,
  //       })
  //     }
  //       else {
  //         this.spinner.hide();
  //     }
  //   });
  // }


  // cancel 

  cancel() {
    this.router.navigateByUrl('/home')
  }
}
