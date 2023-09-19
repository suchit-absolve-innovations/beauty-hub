import { Injectable } from "@angular/core";
import { AngularFireMessaging } from "@angular/fire/compat/messaging";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class MessagingService {
    
    currentMessage = new BehaviorSubject<any>(null);

    constructor(private angularfireMessaging: AngularFireMessaging) { }
    requestPermission() {
        debugger
        this.angularfireMessaging.requestToken.subscribe((token: any) => {
            debugger
             localStorage.setItem('token', token);
            console.log(token)
        }, (err) => {

        });
    }

    receiveMessaging() {
        debugger
        this.angularfireMessaging.messages.subscribe((payload) => {

            this.currentMessage.next(payload)
        });
    }

}