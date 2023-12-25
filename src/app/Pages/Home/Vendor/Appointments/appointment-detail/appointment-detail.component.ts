import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';

@Component({
  selector: 'app-appointment-detail',
  templateUrl: './appointment-detail.component.html',
  styleUrls: ['./appointment-detail.component.css']
})
export class AppointmentDetailComponent implements OnInit {
  @ViewChild('scrollToElement')
  scrollToElement!     : ElementRef;
  rootUrl              : any;
  product              : any;
  data                 : any;
  orderDetails         : any;
  appointmentDetail    : any;
  appointmentId        : any;
  services             : any;
  form                 : any
  postAppointmentStatus: any;
  searchTerm! : string;

  constructor(
    private spinner    : NgxSpinnerService,
    private content    : ContentService,
    private toaster    : ToastrService,
    private route      : ActivatedRoute,
    private router     : Router,
    private formBuilder: FormBuilder,
    private _location  : Location,
   ) { }

    ngAfterViewInit() {
      // Scroll to the desired element when the view is initialized
      this.scrollTo();
    }
    scrollTo() {
      if (this.scrollToElement) {
        this.scrollToElement.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }


  ngOnInit(): void {
    this.rootUrl       = environment.rootPathUrl;
    this.route.paramMap.subscribe((params) => {
      this.appointmentId = params.get('id');
    });
    this.route.queryParams.subscribe((params) => {
      this.searchTerm = params['searchTerm'];
      

      // Use the retrieved parameters as needed
      console.log('Search Term:', this.searchTerm);
      
    });
    // this.appointmentId = this.route.snapshot.paramMap.get('id');

    this.getApointmentDetail();
    this.form = this.formBuilder.group({
      appointmentStatus: [''],
    });
  }
  
  backClicked() {
    this._location.back();
    // this.router.navigate(['/appointment-list'], {
    //   queryParamsHandling: 'preserve'
    // });
  }

  getApointmentDetail() {  
    this.spinner.show();
    this.content.getAppointmentDetail(this.appointmentId).subscribe(response => {
      if (response.isSuccess) {
        this.appointmentDetail = response.data
         this.spinner.show();
        this.services = this.appointmentDetail.bookedServices
        this.spinner.hide();
        this.toaster.success(response.messages);
      } else {
        this.spinner.hide();
        this.toaster.error(response.messages);
      }
    });
  }

  appointmentStatus(){
    this.postAppointmentStatus = this.form.value.appointmentStatus

  }

  setSelectedStatus(data:any) {
    let payload = {
      appointmentId    : data.appointmentId,
      appointmentStatus: this.postAppointmentStatus,
      slotIds          : data.slotId.toString()
    };
    this.spinner.show();
    this.content.postStatus(payload).subscribe(response => {
      if (response.isSuccess) {
        this.toaster.success(response.messages);
        setTimeout(() => {
          window.location.reload();
        }, 500); 
      }
      else {
        this.toaster.error(response.messages)}
    });  this.spinner.hide();
  }
}



