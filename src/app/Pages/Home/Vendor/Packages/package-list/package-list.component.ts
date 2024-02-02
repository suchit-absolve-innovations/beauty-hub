import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { ContentService } from 'src/app/Shared/service/content.service';
import { SearchService } from 'src/app/Shared/service/search.service';
import { environment } from 'src/environments/environment';
declare var $: any;



@Component({
  selector: 'app-package-list',
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.css']
})
export class PackageListComponent implements OnInit {
  private debouncer = new Subject<string>();
  public searchText: any = '';
  page: number = 1;
  itemsPerPage!: number;
  totalItems!: number;
  packagesList: any;
  rootUrl!: string;

  isActive: boolean = true;
  unActive: boolean = false;
  serviceId: any;
  search: any;
  itemToDelete: any;

  constructor(
    private toasterService: ToastrService,
    private spinner: NgxSpinnerService,
    private content: ContentService,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private searchService: SearchService
  ) { 
    this.debouncer.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchText => {
      this.searchService.setSearchCriteria(searchText);
      if (searchText.trim() === '') {
        this.getPackagesList();
      } else {
        // Assuming this.list contains the original unfiltered list
        this.packagesList = this.packagesList.filter((service: any) => this.matchService(service, searchText));
      }
    });
  }

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
    this.getPackagesList()
    this.route.queryParams.subscribe((params) => {
      this.search = params['search'] || '';
      this.page = params['page'] ? parseInt(params['page'], 10) : 1;

      // Fetch data based on the search term and page
      this.getPackagesList();
    });
    this.searchText = this.searchService.getSearchCriteria();
  }
  onSearch(searchTerm: string): void {
    // Update query parameters for search
    this.router.navigate([], {
      queryParams: { search: searchTerm, page: 1 }, // Reset to the first page when searching
      queryParamsHandling: 'merge',
    });
  }
  searchlist(): void {
  
    // Assuming this.list contains the original unfiltered list
    this.debouncer.next(this.searchText.trim().toLowerCase());
    this.searchService.setSearchCriteria(this.searchText);  
}

  onPageChange(page: number): void {
    // Update query parameters for pagination
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: page },
      queryParamsHandling: 'merge',
    });
  }
  performSearch() {

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: null },
      queryParamsHandling: 'merge'
    });
  }
  matchService(service: any, searchTerm: string): boolean {
    const propertiesToSearch = ['genderPreferences', 'listingPrice', 'serviceName']; // Add more properties as needed
  
    for (const property of propertiesToSearch) {
      const propertyValue = service[property];
  
      if (typeof propertyValue === 'string' &&
          propertyValue.toLowerCase().startsWith(searchTerm.toLowerCase())) {
        return true; // Return true if the search term is found at the beginning of any string property
      } else if (typeof propertyValue === 'number' &&
                 propertyValue.toString().startsWith(searchTerm.toLowerCase())) {
        return true; // Return true if the search term is found at the beginning of any numeric property
      }
    }
  
    return false;
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

  delet(data: any) {
    this.itemToDelete = data;
    $('#list-cross-mess').modal('show');
  }
  

  deletePackageService() {
    this.spinner.show();
    if (this.itemToDelete) {
      const itemId = this.itemToDelete.serviceId;
    this.content.deleteService(itemId).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();
        // Remove the deleted item from the local list
        this.packagesList = this.packagesList.filter((item: { serviceId: any; }) => item.serviceId !== itemId);
        // Close the modal
        $('#list-cross-mess').modal('hide');
        this.toasterService.success(response.messages);
      } else {
        this.spinner.hide();
        this.toasterService.error(response.messages);
      }
    });
  }
  }

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
