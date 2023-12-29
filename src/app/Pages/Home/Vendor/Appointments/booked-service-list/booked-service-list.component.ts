import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-booked-service-list',
  templateUrl: './booked-service-list.component.html',
  styleUrls: ['./booked-service-list.component.css']
})
export class BookedServiceListComponent implements OnInit {

  bookedServiceList:any;
  rootUrl          :any;
  appointmentDetail:any;
  appointmentId    :any;
  constructor(
    private toaster    : ToastrService,
    private spinner    : NgxSpinnerService,
    private formBuilder: FormBuilder,
    private content    : ContentService,
    private route      : ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
    this.appointmentId = this.route.snapshot.paramMap.get('id');
    this. getApointmentDetail()
  }
  getApointmentDetail() {
    
    this.spinner.show();
    this.content.getAppointmentDetail(this.appointmentId).subscribe(response => {
      if (response.isSuccess) {
        this.appointmentDetail = response.data

        this.bookedServiceList = this.appointmentDetail.bookedServices
        this.spinner.hide();
        this.toaster.success(response.messages);
      
      } else {
        this.spinner.hide();
        this.toaster.error(response.messages);
      }
    });
  }

  setSelectedStatus() {
    let payload = {
      appointmentId     :this.appointmentDetail.appointmentId,
      appointmentStatus : this.appointmentDetail.appointmentStatus,
      setToAll          : true

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
