import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.css']
})
export class ServiceDetailComponent implements OnInit {

  rootUrl: any;
  imageUrl:any;
  serviceId: any;
  serviceDetail: any;
  show = false;
  isCollapsed: boolean = true;
  description: any;
  serviceImage :any;
  serviceIconImage :any;
  constructor(private content: ContentService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location) { }

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
    this.serviceId = this.route.snapshot.queryParams;
    this.getServiceDetail();
  }

  // toggleCollapsed() {
  //   this.isCollapsed = !this.isCollapsed;
  // }

  backClicked() {
    this._location.back();
  }

  
  /** get product detail **/

  getServiceDetail() {
    // this.spinner.show();
    this.content.getServiceDetail(this.serviceId.id).subscribe(response => {
      if (response.isSuccess) {
        this.serviceDetail = response.data
        this.serviceImage = this.serviceDetail.serviceIconImage
        this.spinner.hide();
        this.toaster.success(response.messages);
        // this.description = response.data.productDescription
      } else {
        // this.spinner.hide();
        this.toaster.error(response.messages);
      }
    });

  }



}
