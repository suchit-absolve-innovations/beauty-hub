import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContentService } from 'src/app/Shared/service/content.service';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-detail',
  templateUrl: './admin-detail.component.html',
  styleUrls: ['./admin-detail.component.css']
})
export class AdminDetailComponent implements OnInit {
  adminDetail:any;
  adminId :any;
  rootUrl: any;

  constructor(
    private spinner: NgxSpinnerService,
    private content: ContentService,
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location,
  ) { }

  ngOnInit(): void {
 
    this.adminId = this.route.snapshot.paramMap.get('id');
    this.getAdminDetail();
    this.rootUrl = environment.rootPathUrl;
  }

  getAdminDetail(){

    this.spinner.show();
  this.content.UserAdminDetail(this.adminId).subscribe((response:any) => {
      if (response.isSuccess) {
        this.adminDetail = response.data;
        this.spinner.hide();
  }

  

  console.log('Admin Detail:', this.adminDetail);
});
  }

  backClicked() {
    this._location.back();
  }

  }

