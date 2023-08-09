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
  this.submitted = true;
  if (this.loginForm.invalid) {
    this.toasterService.error('Incorrect Username');
    this.spinner.hide();
    return;
  }
}
}
