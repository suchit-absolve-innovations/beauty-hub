import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-super-admin-profile',
  templateUrl: './super-admin-profile.component.html',
  styleUrls: ['./super-admin-profile.component.css']
})
export class SuperAdminProfileComponent implements OnInit {
  form!: FormGroup;
  countriesList: any;
  statesLists: any;
  superAdminDetailPatch: any;
  bankDetailPatch: any;
  upiDetailPatch: any;
  editImages: any;
  rootUrl: any;
  item:any; 
  image: any;
  urls: any = [];
 
  imageFile!: { link: any, file: any, name: any, type: any };
  isActive!: boolean;
  superAdminId: any;
  submitted: boolean = false;
 
  
  isFieldInvalid(field: AbstractControl): boolean {
    return field.errors !== null && field.touched;
  }


  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private contentService: ContentService,
    private toaster: ToastrService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
    this.superAdminProfileForm();
    this.getCountry();
    this.getCountriesList();
    this.detail()
  }


  
   superAdminProfileForm() {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required,Validators.pattern("^[0-9]{10}$")]],
      dialCode: ['+91', [Validators.required]],
      countryId: [101],
      stateId: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      upiDetail: null,
      bankDetail: this.formBuilder.array([
        this.bankDetails(),
      ]),
      // upiDetail: this.formBuilder.array([
      //   this.upiDetails(),
      // ])
    });
  }


  bankDetails() {
    return this.formBuilder.group({
      bankName: ['', [Validators.required]],
      bankAccountHolderName: ['', [Validators.required]],
      bankAccountNumber: ['', [Validators.required]],
      branchName: ['', [Validators.required]],
      ifsc: ['', [Validators.required,Validators.pattern(/^[A-Z]{4}0[A-Z0-9]{6}$/)]],
      // confirmbankAccountNumber: ['', [Validators.required]],
    },
      // {
      //   validator: this.MustMatch('bankAccountNumber', 'confirmbankAccountNumber')
      // }
      );
  }


  // upiDetails(){
  //   return this.formBuilder.group({
  //     upiid: ['', [Validators.required]],
  //     // qrcode: ['', [Validators.required]],
  //     isActive: ['', [Validators.required]],
  //     // bankName: ['', [Validators.required]],
  //     accountHolderName: ['', [Validators.required]],
     
  //   });
  // }


  // onPhoneNumberInput(event: any) {
  //   const inputValue = event.target.value;
  //   if (inputValue.length === 10) {
  //     this.form.controls['phoneNumber'].setErrors(null);
  //   } else {
  //     this.form.controls['phoneNumber'].setErrors({ pattern: true });
  //   }
  // }


  //   phoneNumberHasError(errorName: string) {
  //     return (
  //       this.form.controls['phoneNumber'].hasError(errorName) &&
  //       (this.form.controls['phoneNumber'].dirty || this.submitted)
  //     );
  //   }

 
   MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  List1(): FormArray {
    return (<FormArray>this.form.get("upiDetail"));
  }

  // add() {
  //   this.List1().push(this.upiDetails());
  // }

  deleteHomeData(data: any, id: any) {   
      this.List1().removeAt(id)
  }

  checkStatus(event: any) {
   
    if (event.currentTarget?.checked) {
      this.isActive = true;
    
    } else {
      this.isActive = false;
 
    }
  }



  get bankDetail(): FormArray {
    return this.form.get('bankDetail') as FormArray;
  }

  get upiDetail(): FormArray {
    return this.form.get('upiDetail') as FormArray;
  }

  get firstName() {
    return this.form.get('firstName');
  }

  get lastName() {
    return this.form.get('lastName');
  }


  get gender() {
    return this.form.get('gender');
  }
  get dialCode() {
    return this.form.get('dialCode');
  }

  get phoneNumber() {
    return this.form.get('phoneNumber');
  }

  get countryId() {
    return this.form.get('countryId');
  }

  get stateId() {
    return this.form.get('stateId');
  }

  get email() {
    return this.form.get('email');
  }

  get f() {
    return this.form['controls'];
  }

  /** get country list */
  getCountriesList() {
    this.contentService.getAllCountries().subscribe((response) => {
      if (response.statusCode) {
        this.countriesList = response.data;
      }
    });
  }



  getCountry() {
    // this.countryIds = this.form.controls['countryId'].value;
    this.contentService.getAllStates(101).subscribe((response) => {
      if (response.statusCode) {
        this.statesLists = response.data;
        var stateListData = this.statesLists?.find((y: { stateName: any; }) => y.stateName == this.superAdminDetailPatch?.stateName);
        this.form.patchValue({
          stateId: stateListData?.stateId,
        });
      }
    });
  }



    DisableCut(event: any) {
      event.preventDefault();
    }
    DisableCopy(event: any) {
      event.preventDefault();
    }
    DisablePaste(event: any) {
      event.preventDefault();
    }

    patchBankDetail() {
      let data = {
        bankDetail: [{
          bankName: this.bankDetailPatch[0]?.bankName,
          bankAccountHolderName: this.bankDetailPatch[0]?.bankAccountHolderName,
          bankAccountNumber: this.bankDetailPatch[0]?.bankAccountNumber,
          branchName: this.bankDetailPatch[0]?.branchName,
          ifsc: this.bankDetailPatch[0]?.ifsc,
          bankId: this.bankDetailPatch[0]?.bankId,
          // confirmbankAccountNumber: this.bankDetailPatch[0]?.bankAccountNumber,
          // confirmbankAccountNumber = this.addBank.bankAccountNumber
  
        }]
      }
      this.form.patchValue(data)
    }


    detail(){
      this.spinner.show();
      this.contentService.getSuperAdminDetail().subscribe(response => {
        if (response.isSuccess) {
          this.spinner.hide();
       //   this.clearFormArray(this.List1());
          this.superAdminDetailPatch = response.data
          this.superAdminId = response.data.id
          this.bankDetailPatch = this.superAdminDetailPatch.bankResponses
          this.upiDetailPatch = this.superAdminDetailPatch.upiResponses
          this.editImages = this.rootUrl + this.superAdminDetailPatch?.profilePic;
          this.getCountry();
          this.patchBankDetail();
          this.form.patchValue({
            firstName: this.superAdminDetailPatch.firstName,
            lastName: this.superAdminDetailPatch.lastName,
            gender: this.superAdminDetailPatch.gender,
            dialCode: this.superAdminDetailPatch.dialCode,
            phoneNumber: this.superAdminDetailPatch.phoneNumber,
            countryName: this.superAdminDetailPatch.countryName,
            email: this.superAdminDetailPatch.email,
  
          });
          // if (this.superAdminDetailPatch.upiResponses) {
          //   this.superAdminDetailPatch.upiResponses.forEach((element: any) => {
          //     var listGroup = this.upiDetails();
          //     listGroup.patchValue({ upiid: element.upiid, accountHolderName: element.accountHolderName,
          //       bankName: element.bankName, isActive:element.isActive , qrcode:element.qrcode});
          //     this.List1().push(listGroup)
          //   });
          // }
  
        }
      });
    }
    // clearFormArray = (formArray: FormArray) => {
    //   while (formArray.length !== 0) {
    //     formArray.removeAt(0)
    //   }
    // }



  
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
      // this.name = this.imageFile.link
      reader.readAsDataURL(event.target.files[0]);

    }
  }


  fileChangeEvent() {    
    
    let formData = new FormData();
    formData.append("ProfilePic", this.imageFile?.file);
    formData.append("Id", this.superAdminId);
    this.contentService.uploadImage(formData).subscribe(response => {
    });
  }

    // QR Image 
    handleQrFileInput(event: any) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        this.image = file
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const imageDataUrl = reader.result as string;
          this.item= imageDataUrl;
          this.urls.push(imageDataUrl);
        };
      }
    }
  postSuperAdmimProfile() {
    debugger
    this.submitted = true;
    if (this.form.invalid && this.form.get('upidetail')?.value !== null) {
      return;
  }
   
    let checkStatus: any;
    if (this.isActive == true) {
      checkStatus = true;
    } else {
      if (this.isActive == false) {
        checkStatus = false;
      } else {
        checkStatus = false;
      }
    }

    let data1 = {
      status: checkStatus
    }
    
    if (this.superAdminDetailPatch) {
      let payload = {
        id: this.superAdminId,
        email: this.form.value.email,
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        gender: this.form.value.gender,
        dialCode: this.form.value.dialCode,
        phoneNumber: this.form.value.phoneNumber,
        countryId: this.form.value.countryId,
        stateId: this.form.value.stateId,
        // vendorId: this.superAdminDetailPatch.vendorId,
        bankDetail: [{
          bankName: this.form.value.bankDetail[0]?.bankName,
          bankAccountHolderName: this.form.value.bankDetail[0]?.bankAccountHolderName,
          bankAccountNumber: this.form.value.bankDetail[0]?.bankAccountNumber,
          branchName: this.form.value.bankDetail[0]?.branchName,
          ifsc: this.form.value.bankDetail[0]?.ifsc,
          bankId: this.bankDetailPatch[0]?.bankId,

        }],
        upiDetail : null
        // upiDetail: [{
        //   // upidetailId :this.form.value.upiDetail[0].upidetailId,
        //   upiid: this.form.value.upiDetail[0]?.upiid,
        //   bankName: this.form.value.upiDetail[0]?.bankName,
        //   accountHolderName: this.form.value.upiDetail[0]?.accountHolderName,
        //   isActive: data1.status

        // }]

      }
      this.contentService.updateSuperAdmimProfile(payload).subscribe(response => {
        if (response.isSuccess) {
          // this.imageId = this.vendorDetailPatch.vendorId;
          // this.upidetail = response.data.upiResponses;
          // this.getItemById();
          
          // this.ids = this.getItemById();
          this.fileChangeEvent();
          // this.fileChangeEvents();
          // this.fileQrChangeEvents();
          this.toaster.success(response.messages);
          // this.router.navigateByUrl('/vendor-product-list')
        } else {
          this.spinner.hide();
          this.toaster.error(response.messages);
        }
      });
    }
  }
  
  cancel(){
    this.router.navigateByUrl('super-Admin-Dashboard')
    .then(() => {
      window.location.reload();
    });
  }


}
