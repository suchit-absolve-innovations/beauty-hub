import { DatePipe } from '@angular/common';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
  appointmentsList: any;
  public searchText: any = '';
  page: number = 0;
  itemsPerPage!: number;
  totalItems!: number;
  datePickerConfig: Partial<BsDatepickerConfig>;
  form:any
  selectedPaymentMethod: string = '';
  selectedAppointmentStatus: string = '';
  selectedPaymentStatus: string = '';
  constructor(private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private content: ContentService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    public datepipe: DatePipe) {
      this.datePickerConfig = Object.assign(
        {},
      );
     }

  ngOnInit(): void {
    this.getAppointmentsList();
    this.form = this.formBuilder.group({
      // deliveryType: [''],
      paymentStatus    : [''],
      fromDate         : [''],
      toDate           : [''],
      paymentMethod    : [''],
      appointmentStatus: [''],
      sortDateBy       : ['0'],
  
      

    });
  }

  refresh(): void {
    // Perform refresh actions

    // Update the query parameter with the current page index
    
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: this.page },
      queryParamsHandling: 'merge'
    });
  }
  performSearch() {
    
    // Your existing search logic...
  
    // Clear query parameters
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: null },
      queryParamsHandling: 'merge'
    });
  }



  getAppointmentsList() {
   
    let payload = {
      pageNumber : 1,
      pageSize : 1000,
     salonId : localStorage.getItem('salonId'),
    }
    this.spinner.show();
    this.content.getAppointmentList(payload).subscribe(response => {
      if (response.isSuccess) {
        this.appointmentsList = response.data;
 
  
        this.spinner.hide();
      }
    });
  }
  getFormDate2ToDate() {
    debugger
    let payload = {
      pageNumber: 1,
      pageSize: 1000,
      salonId : localStorage.getItem('salonId'),
      sortDateBy : (this.form.value.sortDateBy),
      fromDate: this.datepipe.transform(this.form.value.fromDate, 'dd-MM-yyyy'),
      toDate: this.datepipe.transform(this.form.value.toDate, 'dd-MM-yyyy'),
    }
    this.spinner.show();
    this.content.FormDate2ToDate(payload).subscribe(response => {
      if (response.isSuccess) {
        this.appointmentsList = response.data
        this.spinner.hide();
        this.toaster.success(response.messages)
      } else {
        this.spinner.hide();
        this.toaster.error(response.messages)
        this.appointmentsList = []
      }
    });
  }

  getPaymentMethodList(){

    let payload ={
      pageNumber:1,
      pageSize:1000,
      salonId : localStorage.getItem('salonId'),
      paymentMethod : this.form.value.paymentMethod
    }
    this.spinner.show();
    this.content.paymentMethodList(payload).subscribe(response => {
      if(response.isSuccess) {
        this.appointmentsList = response.data
        this.spinner.hide();
        this.toaster.success(response.messages)
      } else {
        this.spinner.hide();
        this.toaster.error(response.messages)
        this.appointmentsList = []
      }
    })
  }
  getAppointmentStatusList() {
    
    let payload = {
      pageNumber: 1,
      pageSize: 1000,
      salonId : localStorage.getItem('salonId'),
      appointmentStatus: this.form.value.appointmentStatus
    }
   
    this.spinner.show();
    this.content.appointmentStatusList(payload).subscribe(response => {
      if (response.isSuccess) {
        this.appointmentsList = response.data
        this.spinner.hide();
        this.toaster.success(response.messages)
      } else {
        this.spinner.hide();
        this.toaster.error(response.messages)
        this.appointmentsList = []
      }
    });
  }

  getAppointmentPaymentStatusList() {
    
    let payload = {
      pageNumber: 1,
      pageSize: 1000,
      salonId : localStorage.getItem('salonId'),
      paymentStatus: this.form.value.paymentStatus
    }

     this.form.get('appointmentStatus').valueChanges.subscribe(() => {
       this.form.get('paymentMethod').setValue('');
     }); 
    this.spinner.show();
    this.content.appointmentPaymentStatusList(payload).subscribe(response => {
      if (response.isSuccess) {
        this.appointmentsList = response.data
        this.spinner.hide();
        this.toaster.success(response.messages)
      } else {
        this.spinner.hide();
        this.toaster.error(response.messages)
        this.appointmentsList = []
      }
    });
  }



}

 // this.form.get('appointmentStatus').valueChanges.subscribe(() => {
    //   this.form.get('paymentMethod').setValue('');
    // }); 
    // this.form.get('paymentMethod').setValue('');
    // this.form.get('paymentStatus').setValue('');
