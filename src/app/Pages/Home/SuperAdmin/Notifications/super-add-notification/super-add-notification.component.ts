import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-super-add-notification',
  templateUrl: './super-add-notification.component.html',
  styleUrls: ['./super-add-notification.component.css']
})
export class SuperAddNotificationComponent implements OnInit {
  form!: FormGroup;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private contentService: ContentService,
    private toasterService: ToastrService,
    private _location: Location) { }

  ngOnInit(): void {
    this.notificationForm();
  }


  // add notification form
  notificationForm() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required,]],
      description: ['', [Validators.required]],
      sendToRole: ['', [Validators.required]],
    });
  }

  postNotification() {
    this.contentService.postBroadNotification(this.form.value).subscribe(response => {
      if (response.isSuccess) {
        this.toasterService.success(response.messages)
        this._location.back();
      } else {
        this.toasterService.error(response.messages)
      }
    });
  }

  backClicked() {
    this._location.back();
  }
  
  backClickedreload() {
    this.router.navigateByUrl('/super-notification-list')
    .then(() => {
      window.location.reload();
    });
  }

}
