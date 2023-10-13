import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-package-detail',
  templateUrl: './package-detail.component.html',
  styleUrls: ['./package-detail.component.css']
})
export class PackageDetailComponent implements OnInit {

  rootUrl: any;
  imageUrl:any;
  serviceId: any;
  packageDetail: any;
  show = false;
  isCollapsed: boolean = true;
  description: any;
  serviceImage :any;
  serviceIconImage :any;
  packageType: any;
  packageservicesList: any;
  constructor(private content: ContentService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location) { }

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
    this.serviceId = this.route.snapshot.paramMap.get('id');
    this.packageType = this.route.snapshot.paramMap.get('type');
    console.log(this.serviceId)
    console.log(this.packageType)
    this.getPackageDetails();
  }

  // toggleCollapsed() {
  //   this.isCollapsed = !this.isCollapsed;
  // }

  backClicked() {
    this._location.back();
  }

  
  /** get product detail **/

  getPackageDetails() {
    debugger
    let payload ={
      serviceId : this.serviceId,
      serviceType : this.packageType
    }
    // this.spinner.show();
    this.content.getPackageDetail(payload).subscribe(response => {
      if (response.isSuccess) {
      
        this.packageDetail = response.data
        this.serviceImage = this.packageDetail.serviceIconImage
        this.packageservicesList = this.packageDetail.includeService
        console.log(this.packageservicesList)
        this.spinner.hide();
        this.toaster.success(response.messages);
        // this.description = response.data.productDescription
      } else {
        this.spinner.hide();
        this.toaster.error(response.messages);
      }
    });

  }



}

