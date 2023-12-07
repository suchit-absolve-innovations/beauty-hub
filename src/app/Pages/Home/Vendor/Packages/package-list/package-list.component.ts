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

  isActive: boolean = true;
  unActive: boolean = false;
  serviceId: any;

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

  checkActiveStatus(data: any) {
    this.isActive = !this.isActive;
    if (this.isActive == true) {
      this.postActiveServiceStatus(data)
    } else if (this.isActive == false) {
      this.postUnActiveServiceStatus(data)
    }
  }

  checkInactiveStatus(data: any) {
    this.unActive = !this.unActive;
    if (this.unActive == true) {
      this.postActiveServiceStatus(data)
    } else if (this.unActive == false) {
      this.postUnActiveServiceStatus(data)
    }
  }


  postActiveServiceStatus(data: any) {

    let payload = {
      serviceId: data,
      status: 1
    }
    this.spinner.show();
    this.content.statusServicePost(payload).subscribe(response => {
      this.spinner.hide();
    });
  }

  postUnActiveServiceStatus(data: any) {

    let payload = {
      serviceId: data,
      status: 0
    }
    this.spinner.show();
    this.content.statusServicePost(payload).subscribe(response => {
      this.spinner.hide();
    });
  }




  /*** Delete Package  ***/

  delet(data: any) {

    this.serviceId = data.serviceId;

  }

  deletePackageService() {

    this.spinner.show();

    this.content.deleteService(this.serviceId).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();
        this.ngZone.run(() => { this.getPackagesList(); })
        this.toaster.success(response.messages);
        window.location.reload();
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

  addSpaceAfterText() {
    this.searchText = this.searchText.trim();
    }

}
