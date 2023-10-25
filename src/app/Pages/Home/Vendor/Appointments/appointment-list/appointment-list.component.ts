import { DatePipe } from '@angular/common';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription, interval } from 'rxjs';
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
  postAppointmentStatus: any;
  PaymentStatus:any;
  postPaymentsStatus: any;
  
  private refreshSubscription!: Subscription;
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
    this.route.queryParams.subscribe(params => {
      this.page = +params['page'] || 0; // Use the 'page' query parameter value, or default to 1
    });
    this.form = this.formBuilder.group({
      // deliveryType: [''],
      paymentStatus    : [''],
      fromDate         : [''],
      toDate           : [''],
      paymentMethod    : [''],
      appointmentStatus: [''],
      sortDateBy       : ['1'],
       
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
  


 

  handleSelectChange(item: any) {
    if (item.totalServices == '1' ) {
    // Handle when totalServices is 1 (e.g., post status)
        this.postAppointmentsStatus(item);
    }
    else {
      // Handle when totalServices is greater than 1 (e.g., navigate to detail page)
      this.navigateToDetailPage(item);
    }
  }  
  
  navigateToDetailPage(item: any) {
    // Navigation logic when totalServices is greater than 1
    // You can use Angular Router to navigate to the detail page
    // Example:
    this.router.navigate(['/appointment-list/appointment-detail/', item.appointmentId]);
  }
  appointmentStatus(){
    this.postAppointmentStatus = this.form.value.appointmentStatus
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

  postAppointmentsStatus(data:any ){
    let payload = {
      appointmentId : data.appointmentId,
      appointmentStatus : this.postAppointmentStatus,
      setToAll : true
    }
    this.spinner.show();
    this.content.postStatus(payload).subscribe(response => {
      if(response.isSuccess) {
        this.spinner.hide();
        this.toaster.success(response.messages)

      } else {
        this.spinner.hide();
        this.toaster.error(response.messages)
      }
    });
  }



  paymentsStatus(){
    this.postPaymentsStatus = this.form.value.paymentStatus
  }
  postPaymentStatus(data:any) {
    let payload = {
      appointmentId : data.appointmentId,
      paymentStatus : this.postPaymentsStatus,

    };
    this.spinner.show();
    this.content.postPaymentStatus(payload).subscribe(response => {
      if (response.isSuccess) {
        
        this.toaster.success(response.messages);
      }
      else {
        this.toaster.error(response.messages)}
    });  this.spinner.hide()
  }


   // list all filter 

   filterAllList() {
    debugger
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  
    var fromDate = this.form.value.fromDate
    ? this.datepipe.transform(this.form.value.fromDate, 'dd-MM-yyyy')
    : '';

  let toDate = this.form.value.toDate
    ? this.datepipe.transform(this.form.value.toDate, 'dd-MM-yyyy')
    : '';

  if (fromDate !== '' && toDate === '') {
   
    // If fromDate is provided but toDate is null, set toDate to fromDate
    toDate = fromDate;
  }

  if (fromDate === '' && toDate !== '') {
  
    // If toDate is provided but fromDate is null, set fromDate to toDate
    fromDate = toDate;
  }

    let payload = {
      pageNumber: 1,
      pageSize: 1000,
      salonId : localStorage.getItem('salonId'),
      fromDate: fromDate ,
      toDate: toDate ,
      sortDateBy: this.form.value.sortDateBy,
      paymentMethod: this.form.value.paymentMethod ? this.form.value.paymentMethod : '',
      appointmentStatus:this.form.value.appointmentStatus ? this.form.value.appointmentStatus : '',
      paymentStatus: this.form.value.paymentStatus ? this.form.value.paymentStatus : '',
    }
   this.spinner.show();
    this.content.appointmentPaymentStatusList(payload).subscribe(response => {
      if (response.isSuccess) {
        this.appointmentsList = response.data
        this.startRefreshIntervallist5();
       this.spinner.hide();
     //   this.toaster.success(response.messages)
      } else {
       this.spinner.hide();
        this.toaster.error(response.messages)
        this.appointmentsList = []
      }
    });
  }


  startRefreshIntervallist5() {
    const refreshInterval = 60000; // 4 seconds
 
    // Use interval to call getOrderListType every 4 seconds
    this.refreshSubscription = interval(refreshInterval).subscribe(() => {
    this.filterAllList();
    });
  }
}



