import { Component, OnInit,ViewChild, Renderer2, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../Shared/service/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  show: boolean = false;
  @Output() collapseSideNav = new EventEmitter();

  showToggle: boolean = false;
 constructor(private auth: AuthService,) { }

 ngOnInit(): void {
  
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

}