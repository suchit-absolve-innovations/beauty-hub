import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { MapsAPILoader, AgmMap } from '@agm/core';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {
  form!: FormGroup;
  countriesList: any;
  statesLists: any;
  adminDetailPatch: any;
  rootUrl: any;
  editImages: any;
  userAdminId:any;
  imageFile!: { link: any; file: any; name: any; type: any; };
  id!: string
  submitted: boolean = true;
  

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private contentService: ContentService,
    private toasterService: ToastrService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.rootUrl = environment.rootPathUrl;
    this.userAdminId = localStorage.getItem('userAdminId');
    this.userAdminProfileForm();
    this.getCountry();
    this.getCountriesList();
    this.adminDetail()
  }

  /** Vendor Form **/
  userAdminProfileForm() {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required,Validators.pattern("^[0-9]{10}$")]],
      dialCode: ['', [Validators.required]],
      countryId: [101],
      stateId: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],

    });
  }

  get f() {
    return this.form['controls'];
  }
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
          var stateListData = this.statesLists?.find((y: { stateName: any; }) => y.stateName == this.adminDetailPatch?.stateName);
          this.form.patchValue({
            stateId: stateListData?.stateId,
          })
        }
      });
    }
   

    adminDetail(){
      
      // this.spinner.show();
      this.contentService.getAdminDetail(this.userAdminId).subscribe(response => {
        if (response.isSuccess) {
          this.spinner.hide();
          this.adminDetailPatch = response.data
          console.log( this.adminDetailPatch)
      
          this.editImages = this.rootUrl + this.adminDetailPatch?.profilePic;  
          this.getCountry();
          this.form.patchValue({
            firstName: this.adminDetailPatch.firstName,
            lastName: this.adminDetailPatch.lastName,
            gender: this.adminDetailPatch.gender,
            dialCode: this.adminDetailPatch.dialCode,
            phoneNumber: this.adminDetailPatch.phoneNumber,
            countryName: this.adminDetailPatch.countryName,
            email: this.adminDetailPatch.email,
  
          });
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


  fileChangeEvent() {
    
    let formData = new FormData();
    formData.append("ProfilePic", this.imageFile?.file);
    formData.append("Id", this.id);
    this.contentService.uploadImage(formData).subscribe(response => {

    });
  }

    updateAdminProfile() {
      this.submitted = false;
      if (this.form.invalid) {
        return;
      }
    
      if (this.adminDetailPatch) {
        let payload = {
          id: this.userAdminId,
          email: this.form.value.email,
          firstName: this.form.value.firstName,
          lastName: this.form.value.lastName,
          gender: this.form.value.gender,
          dialCode: this.form.value.dialCode,
          phoneNumber: this.form.value.phoneNumber,
          countryId: this.form.value.countryId,
          stateId: this.form.value.stateId,
        }
        this.spinner.show();
        this.contentService.updateUserAdminProfile(payload).subscribe(response => {
          if (response.isSuccess) {
            this.spinner.hide();
            this.id = response.data?.id;
            
            this.fileChangeEvent();
           this.toasterService.success(response.messages);
            // this.router.navigateByUrl('/vendor-product-list')
          } else {
            this.spinner.hide();
            this.toasterService.error(response.messages);
          }
        });
      }
    }

    cancel(){
      this.router.navigateByUrl('/admin-user-dashboard')
      .then(() => {
        window.location.reload();
      });
    }

}

