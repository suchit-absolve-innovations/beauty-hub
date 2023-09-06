import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';

@Component({
  selector: 'app-salon-banner-detail',
  templateUrl: './salon-banner-detail.component.html',
  styleUrls: ['./salon-banner-detail.component.css']
})
export class SalonBannerDetailComponent implements OnInit {
  ShopBannerdetail: any;
  rootUrl: any;
  vendorId: any;
  salonBannerId: any;

  constructor(private spinner: NgxSpinnerService,
    private content: ContentService,
    private toasterService: ToastrService,
    private _location: Location,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.salonBannerId = this.route.snapshot.paramMap.get('id');
    this.rootUrl = environment.rootPathUrl;
    this.getSalonBannerDetail();
  }
  backClicked() {
    this._location.back();
  }


  getSalonBannerDetail() {
    this.spinner.show();
     this.content.salonBannerDetail(this.salonBannerId).subscribe(response => {
       if (response.isSuccess) {
         this.spinner.hide();
         this.ShopBannerdetail = response.data;
        
       }
 
     });
   }

}
