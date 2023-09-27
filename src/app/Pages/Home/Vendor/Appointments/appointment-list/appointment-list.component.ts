import { Component, NgZone, OnInit } from '@angular/core';
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

  constructor(private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private content: ContentService,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone,) {
      this.datePickerConfig = Object.assign(
        {},
      );
     }

  ngOnInit(): void {
    this.getAppointmentsList();
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
   debugger
    let payload = {
      pageNumber : 1,
      pageSize : 1000,
     salonId : localStorage.getItem('salonId'),
    }
    // this.spinner.show();
    this.content.getAppointmentList(payload).subscribe(response => {
      if (response.isSuccess) {
        this.appointmentsList = response.data;
 
  
        this.spinner.hide();
      }
    });
  }
  getFormDate2ToDate() {
    
    // let payload = {
    //   pageNumber: 1,
    //   pageSize: 1000,
    //   vendorId: this.vendorId,
    //   fromDate: this.datepipe.transform(this.form.value.fromDate, 'yyyy-MM-dd'),
    //   toDate: this.datepipe.transform(this.form.value.toDate, 'yyyy-MM-dd'),
    // }
    // this.spinner.show();
    // this.content.FormDate2ToDate(payload).subscribe(response => {
    //   if (response.isSuccess) {
    //     this.orderlist = response.data
    //     this.spinner.hide();
    //     this.toaster.success(response.messages)
    //   } else {
    //     this.spinner.hide();
    //     this.toaster.error(response.messages)
    //     this.orderlist = []
    //   }
    // });
  }



}
