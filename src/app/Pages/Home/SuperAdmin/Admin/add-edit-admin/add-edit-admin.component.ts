import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common'; 

@Component({
  selector: 'app-add-edit-admin',
  templateUrl: './add-edit-admin.component.html',
  styleUrls: ['./add-edit-admin.component.css'],
})
export class AddEditAdminComponent implements OnInit {
  form!: FormGroup ;

  // Image Upload

  imageFile!: { link: any, file: any, name: any, type: any };
  id: any;
  countriesList: any;
  countryIds: any;
  statesLists: any;
  detail: any;
  editImages: any;
  rootUrl!: string;
  submitted: boolean = false;
  toggleValue: boolean = true;


  // showEnterMessage = false;
  // enterMessageTimeout: any;
  
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private contentService: ContentService,
    private toasterService: ToastrService,
    private route: ActivatedRoute,
    private _location: Location,
    ){
    
  }
  
  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
    this.route.queryParams.subscribe((params: any) => {
      if (params.id) {
        this.getAdminDetail(params.id);
      }
    });
    this.setValidationOfForm();
    this.getStateList();
    
    
  }
  
   setValidationOfForm() {
    this.form = this.formBuilder.group({
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
    return this.form.controls;
  }
  get stateId() {
    return this.form.get('stateId');
  }

  

  onPhoneNumberInput(event: any) {
    const inputValue = event.target.value;
    if (inputValue.length === 10) {
      this.form.controls['phoneNumber'].setErrors(null);
    } else {
      this.form.controls['phoneNumber'].setErrors({ pattern: true });
    }
  }


    phoneNumberHasError(errorName: string) {
      return (
        this.form.controls['phoneNumber'].hasError(errorName) &&
        (this.form.controls['phoneNumber'].dirty || this.submitted)
      );
    }
    
  /** get state list */
  getStateList() {
    this.contentService.getAllStates(101).subscribe((response) => {
      if (response.statusCode) {
        this.statesLists = response.data;
        var stateListData = this.statesLists?.find((y: { stateName: any; }) => y.stateName == this.detail?.stateName);
        this.form.patchValue({
          stateId: stateListData?.stateId,
        })
      }
    });
  }


  /*** Image Upload ***/
  // image upload 
  imagesUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (_event: any) => {
        this.imageFile = {
          link: _event.target.result,
          file: event.srcElement.files[0],
          name: event.srcElement.files[0].name,
          type: event.srcElement.files[0].type
        };
      };
      reader.readAsDataURL(event.target.files[0]);

    }
  }

  backClicked() {
    this._location.back();
  }

  fileChangeEvent() {
    let formData = new FormData();
    formData.append("ProfilePic", this.imageFile?.file);
    formData.append("Id", this.id);
    this.contentService.uploadImage(formData).subscribe(response => {
    });
  }
  /*** Post Admin User  ***/
  postAdmin() {
    this.submitted = true;
    if (this.form.invalid) {
      this.toasterService.error("Form Incomplete: Please fill in all the required fields correctly");
      return;
    }
    if (this.detail) {
      let payload = {
        email: this.form.value.email,
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        gender: this.form.value.gender,
        phoneNumber: this.form.value.phoneNumber,
        countryId: this.form.value.countryId,
        stateId: this.form.value.stateId,
        dialCode:this.form.value.dialCode,
        id: this.detail.id
      }
      this.contentService.updateAdminUser(payload).subscribe(response => {
        this.id = response.data?.id;
        this.fileChangeEvent();
        this.updateAfterResponse(response);
        
        
      });

    } else {
      let payload = {
        email: this.form.value.email,
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        gender: this.form.value.gender,
        phoneNumber: this.form.value.phoneNumber,
        countryId: this.form.value.countryId,
        stateId: this.form.value.stateId,
        dialCode:this.form.value.dialCode
      }
      this.spinner.show();
      this.contentService.postAdminUser(payload).subscribe(response => {
        this.id = response.data?.id;
        this.fileChangeEvent();
        this.addAfterResponse(response);
        this.spinner.hide();
      });
    }
  }

  // for status message
  updateAfterResponse(response: any) {
    if (response && response.statusCode == 200) {
      if (response.isSuccess) {
        
        this.toasterService.success(response.messages);
      
      }
      else {
        this.toasterService.error(response.messages);
      }
    }
  }

  addAfterResponse(response: any) {
    if (response && response.statusCode == 200) {
      if (response.isSuccess) {
        this.form.reset();
        this.toasterService.success(response.messages);
        this._location.back();
        setTimeout(() => {
          window.location.reload();
        }, 500); 
      }
      else {
        this.toasterService.error(response.messages);
      }
    }
  }
  // get detail 
  getAdminDetail(id: string) {
    this.spinner.show();
    this.contentService.UserAdminDetail(id).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();
        this.detail = response.data;
        this.editImages = this.rootUrl + this.detail?.profilePic;
        this.getStateList();
        this.form.patchValue({
          firstName: this.detail.firstName,
          lastName: this.detail.lastName,
          gender: this.detail.gender,
          phoneNumber: this.detail.phoneNumber,
          countryName: this.detail.countryName,
          email: this.detail.email,
          dialCode: this.detail.dialCode,
        })
      }
    });
  }
  cancel(){
    this.router.navigateByUrl('/admin-list')
    .then(() => {
      window.location.reload();
    });
  }

}
