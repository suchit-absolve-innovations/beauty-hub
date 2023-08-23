import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Login } from 'src/app/Shared/models/login';
import { AuthService } from 'src/app/Shared/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginModel!: Login;
  submitted!: boolean;
  formPayload: any = {};
  userRole: any;
  password!: any;
  show = false;
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private auth: AuthService,
    private toasterService: ToastrService,) { }

  ngOnInit(): void {
    this.setConfigurationOfLoginForm();  /*** form function ***/
    this.password = 'password';
  }

   // login form
   setConfigurationOfLoginForm() {
    this.loginForm = this.formBuilder.group({
      emailOrPhone: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }


  
  /*** for validation ***/
  get f() {
    return this.loginForm.controls;
  }

  
   // eye icon show password
   onClick() {
    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }

// post login 

onLogin(){
  debugger
  this.submitted = true;
  this.spinner.show();
  if (this.loginForm.invalid) {
    this.toasterService.error('Incorrect Username');
    this.spinner.hide();
    return;
  }
  this.formPayload = {
    emailOrPhone: this.loginForm.value.emailOrPhone,
    password: this.loginForm.value.password,
  }
  this.auth.login(this.formPayload).subscribe((response) => {
    
    if (response.isSuccess) {
      this.userRole = response.data;
      localStorage.setItem('role', this.userRole?.role);
      if (this.userRole?.role == 'SuperAdmin') {
        // this.updateToken();
        this.toasterService.success(response.messages);
        this.router.navigateByUrl('/super-Admin-Dashboard');
        this.spinner.hide();
      }
      if (this.userRole?.role == 'Admin') {
        // this.updateToken();
        this.toasterService.success(response.messages);
        this.router.navigateByUrl('/admin-user-dashboard');
        this.spinner.hide();
      }
      if (this.userRole?.role == 'Vendor') {
        // this.updateToken();
        debugger
        // this.vendorId = localStorage.getItem('vendorId')
        // this.getvendorDetail();
        this.toasterService.success(response.messages);
        this.router.navigateByUrl('orders-list');
        this.spinner.hide();
      }
      if (this.userRole?.role == 'Distributor') {
        // this.updateToken();
        this.toasterService.success(response.messages);
        this.router.navigateByUrl('distributor-vendor-list');
        this.spinner.hide();
      }
    } else {
      this.spinner.hide();
      this.toasterService.error(response.messages);
      this.spinner.hide();
    }
  });
}
}