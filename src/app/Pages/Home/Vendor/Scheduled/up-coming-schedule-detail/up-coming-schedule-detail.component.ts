import { Component, ElementRef, NgZone, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-up-coming-schedule-detail',
  templateUrl: './up-coming-schedule-detail.component.html',
  styleUrls: ['./up-coming-schedule-detail.component.css']
})
export class UpComingScheduleDetailComponent implements OnInit {
  scheduleDetail: any;
  date:any;
  id: any;
  constructor(
    private spinner: NgxSpinnerService,
    private content: ContentService,
    private route: ActivatedRoute,
    private toasterService: ToastrService,
    private _location: Location,
  ) { }

  ngOnInit(): void {
    this.date = this.route.snapshot.paramMap.get('date');
   this.getScheduleDetail();
  }

  backClicked() {
    this._location.back();
  }
  getScheduleDetail() {
    this.spinner.show();
    this.content.getScheduleDetail(this.date).subscribe(response => {
      if (response.isSuccess) {
        this.toasterService.success(response.messages)
        this.scheduleDetail = response.data;
        this.spinner.hide();
      } else {
        this.toasterService.error(response.messages);
        this.spinner.hide();
      }
    });
  }
  }
