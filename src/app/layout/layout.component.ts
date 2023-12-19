import { Component, OnInit, ViewChild, Renderer2, EventEmitter, Output, NgZone } from '@angular/core';
import { AuthService } from '../Shared/service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContentService } from '../Shared/service/content.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  notificationList: any;
  count: any;
  show: boolean = false;
  @Output() collapseSideNav = new EventEmitter();

  showToggle: boolean = false;
  notification: any;
  unreadNotificationCount: any;
  constructor(private auth: AuthService,
    private ngZone: NgZone,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private contentservice: ContentService) { }

  ngOnInit(): void {
  
    setInterval(() => {
      this.getNotificationList();
    }, 20000); 

  }
  /********* Toggle side nav **********/
  sideNavDisplay(event: any) {
    /* Storing user's device details in a variable*/
    let details = navigator.userAgent;

    /* Creating a regular expression 
    containing some mobile devices keywords 
    to search it in details string*/
    let regexp = /android|iphone|kindle|ipad/i;

    /* Using test() method to search regexp in details
    it returns boolean value*/
    let isMobileDevice = regexp.test(details);

    if (isMobileDevice) {
      var element = document.getElementById("sideBar");
      if (element?.classList.contains("sidebar-mobile-open")) {
        element?.classList?.remove("sidebar-mobile-open");
        this.showToggle = !this.showToggle;
      } else {
        this.showToggle = !this.showToggle;
        element?.classList?.add("sidebar-mobile-open");
      }

      console.log("You are using a Mobile Device");
    } else {

      var element = document.getElementById("sideBar");

      if (element?.classList.contains("closed-sidebar")) {
        element?.classList?.remove("closed-sidebar");
      } else {
        element?.classList?.add("closed-sidebar");
      }


      console.log("You are using Desktop");
    }

    // this.show = event.target.value;
  }



  sideNav() {
    /* Storing user's device details in a variable*/
    let details = navigator.userAgent;

    /* Creating a regular expression 
    containing some mobile devices keywords 
    to search it in details string*/
    let regexp = /android|iphone|kindle|ipad/i;

    /* Using test() method to search regexp in details
    it returns boolean value*/
    let isMobileDevice = regexp.test(details);
    if (!isMobileDevice) {
      this.show = !this.show;
      this.collapseSideNav.emit(this.show);
    }
  }


  onToggle() {
    this.showToggle = !this.showToggle;
  }


  mainSidebarHeight(_height: any) {
    // this.renderer.setStyle(
    //   this.contentWrapper.nativeElement,
    //   'min-height',
    //   height - 114 + 'px'
    // );
  }

  //  toggleMenuSidebar() {
  //    console.log('sidebarMenuCollapsed', this.sidebarMenuOpened);
  //    if (this.sidebarMenuOpened) {
  //      this.renderer.removeClass(
  //        document.querySelector('app-root'),
  //        'sidebar-open'
  //      );
  //      this.renderer.addClass(
  //        document.querySelector('app-root'),
  //        'sidebar-collapse'
  //      );
  //      this.sidebarMenuOpened = false;
  //    } else {
  //      this.renderer.removeClass(
  //        document.querySelector('app-root'),
  //        'sidebar-collapse'
  //      );
  //      this.renderer.addClass(
  //        document.querySelector('app-root'),
  //        'sidebar-open'
  //      );
  //      this.sidebarMenuOpened = true;
  //    }
  //  }

  /* log-out */
  logouts() {
    localStorage.clear();
    this.auth.logout();
  }
  // notification list
  getNotificationList() {
    
    let payload = {
      pageNumber: 1,
      pageSize: 1000
    }
    // this.spinner.show();
    this.auth.getAllNotifactonList(payload).subscribe(response => {
      if (response.isSuccess) {

        
        this.notification = response.data;
        // this.unreadNotificationCount = this.notification.unreadnotificationCount
        const newCount = this.notification.unreadnotificationCount
        this.notificationList = this.notification.notificationList.dataList
        console.log(this.unreadNotificationCount)
        this.getNotifictionCount();
        // console.log(this.notificationList)
        // if (newCount !== this.count) {
        //   // Update the count and take any additional actions as needed
        //   this.count = newCount;
        // }
        // this.count = response.totalCount
      }
    });
  }


  getReadNotiction() {
    
    // this.spinner.show();
    this.auth.getReadNotictions().subscribe(response => {
      if (response.isSuccess) {
        this.getNotificationList();
      }

    });
  }

  getNotifictionCount() {
  // this.spinner.show();
  this.auth.getNotifictionsCount().subscribe(response => {
  if (response.isSuccess) {
    // this.getNotifictionCount();
    this.count = response.data.notificationCount
    console.log(this.count)


  }

  });
  }



  deleteAllNotification() {
  this.spinner.show();

  this.auth.deleteNotification().subscribe(response => {
  if (response.isSuccess) {
  this.spinner.hide();
  this.ngZone.run(() => { this.getNotificationList(); })
  this.toaster.success(response.messages);
  } else {
  this.spinner.hide();
  this.toaster.error(response.messages)
  }
  });
  }


  deleteSingleNotification(notificationSentId: any) {

    
    this.spinner.show();
    this.auth.deleteSingleNotifications(notificationSentId).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();
        this.ngZone.run(() => { this.getNotificationList(); })
        this.toaster.success(response.messages);
      } else {
        this.spinner.hide();
        this.toaster.error(response.messages)
      }
    });
  }

  // getCounterMessage(){
  // this.auth.getCounterMessage(this.vendorId).subscribe(response => {
  // if(response.isSuccess){
  // this.daysLeft = response.data.message

  // }
  // })
  // }


  

}