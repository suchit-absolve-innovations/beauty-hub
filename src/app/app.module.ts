import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { LayoutModule } from './layout/layout.module';
import { ReactiveFormsModule , FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe,AsyncPipe } from '@angular/common';
import { JwtInterceptor } from './Shared/helper/jwt.interceptor';

import { ToastrModule } from 'ngx-toastr';
import { AuthModule } from './Pages/auth/auth.module';
import { HomeModule } from './Pages/Home/home.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AgmCoreModule } from '@agm/core';

import { environment } from '../environments/environment';
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { AngularFireModule } from '@angular/fire/compat';
import { MessagingService } from './Shared/service/messaging-service';
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
















@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    LayoutModule,
    HomeModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAqVkAIpWw38LEG9LghW1s0ZzSW-PUsjt0',
      libraries: ['places']
    }),

    AngularFireAuthModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyBtlN7iOdtANEkPIIWI4tVj4iELAy5Axt8",
      authDomain: "beautyhub-76894.firebaseapp.com",
      projectId: "beautyhub-76894",
      storageBucket: "beautyhub-76894.appspot.com",
      messagingSenderId: "645722580916",
      appId: "1:645722580916:web:fbc8bf19b3d224e57b74e1",
      measurementId: "G-FJ3NE22S1L",
    }),
    AngularFireMessagingModule, 
    BsDatepickerModule.forRoot(),
    

  ],
  providers: [MessagingService,AsyncPipe, DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
