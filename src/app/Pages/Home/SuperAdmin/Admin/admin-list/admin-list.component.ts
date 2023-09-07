import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import { environment } from 'src/environments/environment';

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

  constructor(
    private toaster: ToastrService,
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
    this.route.queryParams.subscribe(params => {
      this.page = +params['page'] || 0; // Use the 'page' query parameter value, or default to 1
    });
     this.getAdminUserLists();

    this.form = this.formBuilder.group({
      transactionId: ['']
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


}