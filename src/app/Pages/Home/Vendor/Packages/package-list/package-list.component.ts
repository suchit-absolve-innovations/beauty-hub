import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-package-list',
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.css']
})
export class PackageListComponent implements OnInit {

  public searchText: any = '';
  page: number = 1;
  itemsPerPage!: number;
  totalItems!: number;
  packagesList: any;
  rootUrl!: string;

  constructor(
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private content: ContentService,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone,
  ) { }

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
    this.getPackagesList()
  }


  getPackagesList(){
    debugger
    let payload = {
      pageNumber: 1,
      pageSize: 1000,
      salonId: localStorage.getItem('salonId'),
      serviceType: 'Package'
    }
    this.spinner.show();

    this.content.getPackageList(payload).subscribe(response => {
      if (response.isSuccess) {
        this.packagesList = response.data.dataList;
        this.spinner.hide();
      }
    });

  }
  /*** Delete Collection  ***/

  deleteCollection(data: any) {
    this.spinner.show();
    
    this.content.deleteCollections(data).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();
        this.ngZone.run(() => { this.getPackagesList(); })
        this.toaster.success(response.messages);
      } else {
        this.spinner.hide();
        this.toaster.error(response.messages)
      }
    });
  }

     // edit user 
     editPackage(data: any) {

      this.router.navigate(['/package-list/edit-package'],
        {
          queryParams: {
            id: data.serviceId,
            type: data.serviceType
          }
        });
    }

}
