import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import { environment } from 'src/environments/environment';
declare var $: any;

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {
  adminList: any;
  // serach 
  public searchText: any = '';
  page: number = 0;
  itemsPerPage!: number;
  totalItems!: number;
  form!: FormGroup;
  rootUrl: any;

  // Get value to set list accept reject condition 

  
   value = localStorage.getItem('user');
  vendorId: any;
  membershipRecordId: any;
  adminId: any;
  itemToDelete: any;
  search: any;

  constructor(
    private toasterService: ToastrService,
    private spinner: NgxSpinnerService,
    private content: ContentService,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private formBuilder: FormBuilder,
  ) { 
    
  }

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
   
     this.getAdminUserLists();
     this.route.queryParams.subscribe((params) => {
      this.search = params['search'] || '';
      this.page = params['page'] ? parseInt(params['page'], 10) : 1;
      this.getAdminUserLists();
    });

    this.form = this.formBuilder.group({
      transactionId: ['']
    });
  }

  onSearch(searchTerm: string): void {
    // Update query parameters for search
    this.router.navigate([], {
      queryParams: { search: searchTerm, page: 1 }, // Reset to the first page when searching
      queryParamsHandling: 'merge',
    });
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

    // edit user 
    editPlan(data: any) {
      this.router.navigate(['/admin-list/add-edit-admin'],
        {
          queryParams: {
            id: data.id
          }
        });
    }

  getAdminUserLists(){
    let payload = {
      pageNumber : 1,
      pageSize : 1000,
    }
    this.content.getAdminUserList(payload).subscribe((response:any) => {
      if (response.isSuccess) {
        this.adminList = response.data.dataList;
        this.spinner.hide();
  }
});
}

    delet(data: any) {
      this.itemToDelete = data;
      $('#list-cross-mess').modal('show');
    }
  
    deleteUser() {
      this.spinner.show();
      if (this.itemToDelete) {
        const itemId = this.itemToDelete.id;
      
      this.content.deleteAdminUser(itemId).subscribe(response => {
        if (response.isSuccess) {
          this.spinner.hide();
          // Remove the deleted item from the local list
          this.adminList = this.adminList.filter((item: { id: any; }) => item.id !== itemId);
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

    addSpaceAfterText() {
      this.searchText = this.searchText.trim();
      }

}