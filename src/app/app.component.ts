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
  isOffline: boolean = false;
  constructor(private router: Router,private messagingService: MessagingService) { }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.router.events.subscribe((defaultpage) => {
      if (defaultpage instanceof NavigationStart) {
        // tslint:disable-next-line: max-line-length
        if (defaultpage.url === '/login') {
          localStorage.removeItem('currentUser');
        }
      }
    });
    this.messagingService.receiveMessaging();
    this.messagingService.requestPermission();
    this.message = this.messagingService.currentMessage
    this.isOffline = !navigator.onLine;

    // Add event listeners to detect changes in online/offline status
    window.addEventListener('online', () => this.handleOnlineStatusChange());
    window.addEventListener('offline', () => this.handleOnlineStatusChange());
  }

  ngOnDestroy(): void {
    // Remove event listeners when the component is destroyed
    window.removeEventListener('online', () => this.handleOnlineStatusChange());
    window.removeEventListener('offline', () => this.handleOnlineStatusChange());
  }

  handleOnlineStatusChange(): void {
    // Update isOffline based on the current online status
    this.isOffline = !navigator.onLine;
  }
 
  
}