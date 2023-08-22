import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-banner-list',
  templateUrl: './banner-list.component.html',
  styleUrls: ['./banner-list.component.css']
})
export class BannerListComponent implements OnInit {
// serach 
public searchText: any = '';
page: number = 0;
itemsPerPage!: number;
totalItems!: number;
rootUrl: any;
  bannerList: any;
  bannerId: any;

constructor(private toaster: ToastrService,
  private spinner: NgxSpinnerService,
  private content: ContentService,
  private router: Router,
  private ngZone: NgZone,) { }

ngOnInit(): void {
  this.rootUrl = environment.rootPathUrl;
  this.getBannerList();
}

/*** Brand List ***/

getBannerList(){
let payload = {
  pageNumber: 1,
  pageSize: 1000,
}
this.spinner.show();
  this.content.getBanner(payload).subscribe(response => {
    if (response.isSuccess) {
      this.bannerList = response.data;
    
     this.spinner.hide();
    }
  });
}


   // edit user 
   edit(data: any) {
    this.router.navigate(['/banner-list/add-edit-banner'],
      {
        queryParams: {
          id: data.bannerId
        }
      });
  }

  delet(data:any){
    
this.bannerId = data.bannerId;
this.deleteHomeBanners()


  }

  deleteHomeBanners() {
    this.spinner.show();
    this.content.deleteBanners(this.bannerId).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();
        // this.ngZone.run(() => { this.getBannerList(); })
        window.location.reload();
        this.toaster.success(response.messages);
      } else {
        this.spinner.hide();
        this.toaster.error(response.messages)
      }
    });
  }

}
