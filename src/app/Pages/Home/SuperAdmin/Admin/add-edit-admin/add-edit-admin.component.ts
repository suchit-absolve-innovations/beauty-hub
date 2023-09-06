import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContentService } from 'src/app/Shared/service/content.service';


@Component({
  selector: 'app-add-edit-admin',
  templateUrl: './add-edit-admin.component.html',
  styleUrls: ['./add-edit-admin.component.css'],
})
export class AddEditAdminComponent implements OnInit {
  userForm!: FormGroup ;
  firstName: any;
  lastName: any;
  gender: any;
  dialCode : any;
  phoneNumber:any;
  email :any;
  countryId: any;

  submitted: boolean = false;
  toggleValue: boolean = true;
  statesLists: any;
  countryIds: any;

  // showEnterMessage = false;
  // enterMessageTimeout: any;
  
  constructor(private router: Router,
    public formBuilder: FormBuilder,
    private contentService: ContentService,
    ){
    
  }
  
  ngOnInit(): void {

    this. setValidationOfForm()
    this.getCountry();
    
  }
  
   setValidationOfForm() {
    this.userForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        gender: ['', [Validators.required]],
        phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
        dialCode: ['+91', [Validators.required]],
        countryId: ['101'],
        stateId: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]]
    });

   }

  /*** for validation ***/
  get f() {
    return this.userForm.controls;
  }
  get stateId() {
    return this.userForm.get('stateId');
  }


  onPhoneNumberInput(event: any) {
    const inputValue = event.target.value;
    if (inputValue.length === 10) {
      this.userForm.controls['phoneNumber'].setErrors(null);
    } else {
      this.userForm.controls['phoneNumber'].setErrors({ pattern: true });
    }
  }


    phoneNumberHasError(errorName: string) {
      return (
        this.userForm.controls['phoneNumber'].hasError(errorName) &&
        (this.userForm.controls['phoneNumber'].dirty || this.submitted)
      );
    }

  onSubmit() {
    this.submitted = true;

    // Check if the form is valid before submitting
    if (this.userForm.valid) {
      // Your form submission logic here
    }
  }


  saveData(){
    debugger
    this.submitted = true;
    console.log(this.userForm.value)
    if(this.userForm.value){

    }
  }

  getCountry() {
    // this.countryIds = this.form.controls['countryId'].value;
    this.contentService.getAllStates(101).subscribe((response) => {
      if (response.statusCode) {
        this.statesLists = response.data;
      }
    });
  }

}
