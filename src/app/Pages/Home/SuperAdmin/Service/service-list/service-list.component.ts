import { Component, NgZone, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContentService } from 'src/app/Shared/service/content.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {
list: any;
 // serach 
 public searchText: any = '';
 page: number = 0;
 itemsPerPage!: number;
 totalItems!: number; 
 rootUrl: any;
 salonId : any
  serviceId: any;
  constructor(private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private content: ContentService,
    private router: Router,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
    this.route.queryParams.subscribe(params => {
      this.page = +params['page'] || 0; // Use the 'page' query parameter value, or default to 1
    });
    debugger
    this.salonId = this.route.snapshot.queryParams
    this.getServiceList();
  }

  
  performSearch() {

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: null },
      queryParamsHandling: 'merge'
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

  // Service List 

  getServiceList(){
    let payload = {
      pageNumber : 1,
      pageSize : 1000,
      salonId : this.salonId.id
    }
    this.content.getservice(payload).subscribe(response => {
      if (response.isSuccess) {
        this.list = response.data.dataList
      
       this.spinner.hide();
      }
    });
  }



  passId(){
    this.router.navigate(['/salon-list/service-list/add-service'],
    {
      queryParams: {
        id: this.salonId.id
       
      }
    });

   
  }

  edit(data:any){
  debugger
    this.router.navigate(['/salon-list/service-list/edit-service'],
    {
      queryParams: {
        id2 : data.serviceId,
        id: data.salonId
       
      }
    });
  }

  delet(data:any){
    debugger
    this.serviceId = data.serviceId;
    
      }
    
      serviceDelete() {
        debugger
        this.spinner.show();
        debugger
        this.content.deleteService(this.serviceId).subscribe(response => {
          if (response.isSuccess) {
            this.spinner.hide();
            this.ngZone.run(() => { this.getServiceList(); })
            this.toaster.success(response.messages);
              window.location.reload();
          } else {
            this.spinner.hide();
            this.toaster.error(response.messages)
          }
        });
      }



}
