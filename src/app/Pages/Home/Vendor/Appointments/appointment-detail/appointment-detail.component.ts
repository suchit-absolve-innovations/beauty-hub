import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-appointment-detail',
  templateUrl: './appointment-detail.component.html',
  styleUrls: ['./appointment-detail.component.css']
})
export class AppointmentDetailComponent implements OnInit {
  rootUrl: any;
  product :any;
  data:any;
  orderDetails:any;
  appointmentDetail: any;
  appointmentId:any;
  services:any;
  appointmentStatus:any;
  form:any

  constructor(
    private spinner: NgxSpinnerService,
    private content: ContentService,
    private toaster: ToastrService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
    this.appointmentId = this.route.snapshot.paramMap.get('id');
    this.getApointmentDetail();

    this.form = this.formBuilder.group({
      setAppointmentStatus : [''],
    })
  }
  getApointmentDetail() {
    
    this.spinner.show();
    this.content.getAppointmentDetail(this.appointmentId).subscribe(response => {
      if (response.isSuccess) {
        this.appointmentDetail = response.data

        this.services = this.appointmentDetail.bookedServices
        this.spinner.hide();
        this.toaster.success(response.messages);
      
      } else {
        this.spinner.hide();
        this.toaster.error(response.messages);
      }
    });
    this.setSelectedStatus()
  
  }
  setSelectedStatus() {
    let payload = {
      appointmentId :this.appointmentDetail.appointmentId,
      appointmentStatus : this.appointmentDetail.appointmentStatus,
      setToAll : true

    };
    this.spinner.show();
    this.content.postStatus(payload).subscribe(response => {
  
      if (response.isSuccess) {
        this.toaster.success(response.messages);
      }
      else {
        this.toaster.error(response.messages)}
    });  this.spinner.hide()
  }
}

//   setAppointmentStatus() {
//     let payload = {
//    
//       appointmentStatus: this.form.value.appointmentStatus
//     }

//     this.spinner.show();
// this.content.setAppointmentStatus(payload).subscribe(response => {
//   if (response.isSuccess) {
//     this.appointmentStatus = response
  
//     this.toaster.success(response.messages);
  
//   }
// })
//   }

