import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { MessagingService } from './Shared/service/messaging-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'beauty-hub';
  message: any;
  constructor(private router: Router,
    private messagingService: MessagingService) { }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    debugger
    this.router.events.subscribe((defaultpage) => {
      if (defaultpage instanceof NavigationStart) {
        // tslint:disable-next-line: max-line-length
        if (defaultpage.url === '/login') {
          localStorage.removeItem('currentUser');
        }
      }
    });
    debugger
    this.messagingService.requestPermission();
    this.messagingService.receiveMessaging();
    debugger
    this.message = this.messagingService.currentMessage
  }
}