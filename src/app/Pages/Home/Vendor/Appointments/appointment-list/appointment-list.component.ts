import { DatePipe } from '@angular/common';
import { Component, ElementRef, NgZone, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, Observable, Subscription, debounceTime, distinctUntilChanged, interval } from 'rxjs';
import { ContentService } from 'src/app/Shared/service/content.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
  appointmentsList     : any; 
  minToDate            : any;
  page                 : number = 0;
  itemsPerPage!        : number;
  totalItems!          : number;
  form                 : any
  postAppointmentStatus: any;
  PaymentStatus        : any;
  postPaymentsStatus   : any;
  role!                : string | null;
  rootUrl              : any;
  public searchText    : any = '';
  salonImage           : any;
  salonName            : any;
  datePickerConfig     : Partial<BsDatepickerConfig>;
  private refreshSubscription!: Subscription;
  isToDateEnabled = false;
  // Inside your component class
  public isFromDateSelected = false;

  

  constructor(
    private toaster    : ToastrService,
    private spinner    : NgxSpinnerService,
    private content    : ContentService,
    private router     : Router,
    private route      : ActivatedRoute,
    private formBuilder: FormBuilder,
    private ngZone     : NgZone,
    private el: ElementRef,
    public datepipe    : DatePipe) {
      this.datePickerConfig = Object.assign(
        { }
      );
  }

  ngOnInit(): void {
    this.rootUrl    = environment.rootPathUrl;
    this.salonImage = localStorage.getItem('salonImage');
    this.salonName  = localStorage.getItem('salonName');
    this.role       = localStorage.getItem('role');
    this.getAppointmentsList();
    this.getAppointmentsLists();
    this.route.queryParams.subscribe(params => {
      this.page = +params['page'] || 0; // Use the 'page' query parameter value, or default to 1
    });
    
    this.form = this.formBuilder.group({
      // deliveryType: [''],
      paymentStatus    : [''],
      fromDate         : [''],
      toDate           : [{ value: '', disabled: true }],
      paymentMethod    : [''],
      appointmentStatus: [''],
      sortDateBy       : ['1'],

    });
    this.watchFromDateChanges();
  }
  private watchFromDateChanges() {
    const fromDateControl: AbstractControl | null = this.form.get('fromDate');
    const toDateControl: AbstractControl | null = this.form.get('toDate');
  
    if (fromDateControl && toDateControl) {
      fromDateControl.valueChanges
        .pipe(
          debounceTime(200),
          distinctUntilChanged()
        )
        .subscribe((fromDateValue) => {
          this.isFromDateSelected = !!fromDateValue;
  
          if (fromDateValue) {
            toDateControl.enable();
          } else {
            toDateControl.disable();
          }
        });
    }
  }
  
  onToDateClick() {
    if (!this.isFromDateSelected) {
      this.showToastrMessage();
      return;
    }
  
    const toDateControl: AbstractControl | null = this.form.get('toDate');
    if (toDateControl) {
      toDateControl.enable();
    }
  }
  
  private showToastrMessage() {
    this.toaster.info('Please select "From Date" first.');
  }
  
  setScrollPosition() {
    // Get the bottom offset of the clicked row
    const bottomOffset = this.el.nativeElement.offsetTop + this.el.nativeElement.offsetHeight;
  
    // Scroll to the bottom of the clicked row without smooth animation
    window.scrollTo({ top: bottomOffset, behavior: 'auto' });
  }

  clearDate(){
    window.location.reload()
  }

  ngOnDestroy() {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  refresh(): void {
    // Perform refresh actions
    // Update the query parameter with the current page index
    this.router.navigate([], {
      relativeTo         : this.route,
      queryParams        : { page: this.page },
      queryParamsHandling: 'merge'
    });
  }

  performSearch() {
    // Your existing search logic...
    // Clear query parameters
    this.router.navigate([], {
      relativeTo         : this.route,
      queryParams        : { page: null },
      queryParamsHandling: 'merge'
    });
  }
  
  setToDateMinDate(event: Date) {
    this.minToDate = event; // Set the minimum date for the "toDate" field
    
}

  getAppointmentsList() {
    let payload = {
      pageNumber: 1,
      pageSize  : 1000,
      salonId   : localStorage.getItem('salonId'),
    }
    this.spinner.show();
    this.content.getAppointmentList(payload).subscribe(response => {
      if (response.isSuccess) {
        this.appointmentsList = response.data;
        
        this.spinner.hide();
        // this.startRefreshInterval();
      }
    });
  }
  getAppointmentsLists() {
    let payload = {
      pageNumber: 1,
      pageSize  : 1000,
      salonId   : localStorage.getItem('salonId'),
    }
    // this.spinner.show();
    this.content.getAppointmentList(payload).subscribe(response => {
      if (response.isSuccess) {
        this.appointmentsList = response.data;
        this.startRefreshInterval();
        // this.spinner.hide();
        
      }
    });
  }
    // read status 
    read(data: any) {
      let payload = {
        appointmentId: data.appointmentId,
      }
      this.content.comaningAppointmentStatus(payload).subscribe(response => {
        if (response.isSuccess) {
  
        }
      });
    }

  handleSelectChange(item: any) {
    if (item.totalServices == '1') {
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
    this.router.navigate(['/appointment-list/appointment-detail/', item.appointmentId]);
  }

  // appointmentStatus() {
  //   debugger
  //   this.postAppointmentStatus = this.form.value.appointmentStatus
  // }

  getPaymentMethodList() {

    let payload = {
      pageNumber: 1,
      pageSize: 1000,
      salonId: localStorage.getItem('salonId'),
      paymentMethod: this.form.value.paymentMethod
    }
    this.spinner.show();
    this.content.paymentMethodList(payload).subscribe(response => {
      if (response.isSuccess) {
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

  postAppointmentsStatus(data: any) {
    debugger
    let payload = {
      appointmentId    : data.appointmentId,
      appointmentStatus: this.form.value.appointmentStatus,
      setToAll         : true
    }
    this.spinner.show();
    this.content.postStatus(payload).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();
        this.toaster.success(response.messages)
      } else {
        this.spinner.hide();
        this.toaster.error(response.messages);
      }
    });
  }

  paymentsStatus() {
    this.postPaymentsStatus = this.form.value.paymentStatus
  }
  postPaymentStatus(data: any) {
    let payload = {
      appointmentId: data.appointmentId,
      paymentStatus: this.postPaymentsStatus,

    };
    this.spinner.show();
    this.content.postPaymentStatus(payload).subscribe(response => {
      if (response.isSuccess) {
        this.toaster.success(response.messages);
      }
      else {
        this.toaster.error(response.messages)
      }
    }); this.spinner.hide()
  }

  // list all filter 
  filterAllList() {
    debugger
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }

    var fromDate = this.form.value.fromDate
      ? this.datepipe.transform(this.form.value.fromDate, 'dd-MM-yyyy') : '';

    let toDate = this.form.value.toDate
      ? this.datepipe.transform(this.form.value.toDate, 'dd-MM-yyyy') : '';

    if (fromDate !== '' && toDate === '') {
      // If fromDate is provided but toDate is null, set toDate to fromDate
      toDate = fromDate;
    }
    if (fromDate === '' && toDate !== '') {
      // If toDate is provided but fromDate is null, set fromDate to toDate
      fromDate = toDate;
    }

    let payload = {
      pageNumber       : 1,
      pageSize         : 1000,
      salonId          : localStorage.getItem('salonId'),
      fromDate         : fromDate,
      toDate           : toDate,
      sortDateBy       : this.form.value.sortDateBy,
      paymentMethod    : this.form.value.paymentMethod     ? this.form.value.paymentMethod : '',
      appointmentStatus: this.form.value.appointmentStatus ? this.form.value.appointmentStatus : '',
      paymentStatus    : this.form.value.paymentStatus     ? this.form.value.paymentStatus : '',
    }
    this.spinner.show();
    this.content.appointmentPaymentStatusList(payload).subscribe(response => {
      if (response.isSuccess) {
        this.appointmentsList = response.data
        // this.startRefreshInterval();
        this.spinner.hide();
        //   this.toaster.success(response.messages)
      } else {
        this.spinner.hide();
        this.toaster.error(response.messages)
        this.appointmentsList = []
      }
    });
  }
                     
  
  startRefreshInterval() {
    const refreshInterval = 30000;

    // Check if there is an existing subscription and unsubscribe if needed
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }

    // Use interval to call getOrderList every 10 seconds
    this.refreshSubscription = interval(refreshInterval).subscribe(() => {
      this.getAppointmentsLists();
    });
  }
}



