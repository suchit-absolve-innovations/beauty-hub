import { Component, OnInit } from '@angular/core';
import { MessagingService } from './Shared/service/messaging-service';
import { Router, NavigationStart } from '@angular/router';


// import { initializeApp } from 'firebase/compat/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'beauty-hub';
  message: any;
  constructor(private router: Router,private messagingService: MessagingService) { }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.router.events.subscribe((defaultpage) => {
      if (defaultpage instanceof NavigationStart) {
        // tslint:disable-next-line: max-line-length
        if (defaultpage.url === '/login') {
          localStorage.removeItem('currentUser');
          this.disableBackButton();
        }else {
          // Enable back button on other pages
          this.enableBackButton();
        }
      }
    });
   
    this.messagingService.receiveMessaging();
    this.messagingService.requestPermission();
    this.message = this.messagingService.currentMessage
  }
  disableBackButton() {
    window.history.pushState(null, '', window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, '', window.location.href);
    };
 
  }
  enableBackButton() {
    window.onpopstate = null;
  }
}