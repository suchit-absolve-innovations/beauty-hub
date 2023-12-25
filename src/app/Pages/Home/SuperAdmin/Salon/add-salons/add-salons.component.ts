import { Component, OnInit, HostListener, NgZone, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
 import { MapsAPILoader, AgmMap } from '@agm/core';

@Component({
  selector: 'app-add-salons',
  templateUrl: './add-salons.component.html',
  styleUrls: ['./add-salons.component.css']
})
export class AddSalonsComponent implements OnInit {


  
  form!: FormGroup;
  countriesList: any;
  countryIds: any;
  statesLists: any;
  submitted: boolean | null = null;
  editImages: any;
  selectedCountryId: any = 'india';
  toggleValue: boolean = true;
 

  // Image Upload

  imageFile!: { link: any, file: any, name: any, type: any };
  category:any;
  Item:any;
  isValidFormSubmitted: boolean | null = null;
  vendorId: any;
  vendorDetailPatch: any;
  shopDetailPatch: any;
  bankDetailPatch: any;
  rootUrl: any;
  imageId: any;

  // Banner Image
  fileToUpload: any;
  imageUrl: any;
  item:any;
  name: any;
  SalonId: any;
  imageFiles!: { link: any; file: any; name: any; type: any; };
  Salon: any;
  ShopImage: any;
  upidetail: any;
  upidetailId: any = [];
  urls: any = [];
  
  ids: any[] = [];
  upiDetailPatch: any;
  image: any;
  isActive!: boolean;
  upidetailIds: any;
  membershipRecordId!: any;
  recordId!: number;
  role!: string | null;

  // // Google Map
  addressLat!: number;
  addressLong!: number;
  zoom!: number;
  addressCountry!: string;
   addressStreet!: string;
  private geoCoder!: google.maps.Geocoder;
  @ViewChild('search')
  public searchElementRef!: ElementRef;
  inputAddress: string | undefined;
  lati: any;
  long: any;
  // Inside your component class
  uploadedImages: { file: File; previewUrl: string }[] = [];

  constructor(private router: Router,
    private ngZone: NgZone,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private contentService: ContentService,
    private toaster: ToastrService,
    private route: ActivatedRoute,
    private _location: Location,
    private mapsAPILoader: MapsAPILoader,
    ) { 
      
    }

    ngOnInit(): void {
      this.route.queryParams.subscribe((params: any) => {
        if (params.id) {
          this.getVendorDetail(params.id);
        }
      });
      this.role = localStorage.getItem('user')
      
      this.membershipRecordId = localStorage.getItem('membershipRecordId');
      this.recordId = parseInt(this.membershipRecordId)
      // maps
      this.mapsAPILoader.load().then(() => {
        this.setCurrentLocation();
        this.geoCoder = new google.maps.Geocoder;
        let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();
            this.inputAddress = place.formatted_address
  
  
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
            this.addressLat = place.geometry.location.lat();
            this.addressLong = place.geometry.location.lng();
          
            this.zoom = 12;
          });

  
        });
        
      });
      

      
   
      this.vendorForm();
      this.getCountry();
      this.rootUrl = environment.rootPathUrl;
    
      this.getCountriesList();
    }
    backClicked() {
      this._location.back();
    }
  
    mapReady(map: any) {
  
      map.setOptions({
        zoomControl: "true",
        zoomControlOptions: {
          position: google.maps.ControlPosition.TOP_RIGHT
        }
      });
      //this.loader = true;
      map.addListener("dragend", () => {
   
        // do something with centerLatitude/centerLongitude
        //api call to load dynamic marker for your application
        //this.loader = false;
      });
    }

    getlocation() {
      // Assuming this.lati and this.long are strings, convert them to numbers
      this.addressLat = parseFloat(this.lati);
      this.addressLong = parseFloat(this.long);
      this.zoom = 14;
      this.getAddress(this.addressLat, this.addressLong);
    }
  
  
     setCurrentLocation() {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.addressLat = position.coords.latitude;
          this.addressLong = position.coords.longitude;
          this.zoom = 14;
  
          this.getAddress(this.addressLat, this.addressLong);
        });
      }
    }
  
  
  
    getAddress(addressLat: number, addressLong: number) {
      this.geoCoder.geocode({ 'location': { lat: addressLat, lng: addressLong } }, (results, status) => {
        console.log(results);
        if (status === 'OK') {
          if (results[0]) {
            this.zoom = 12;
    
            // Get the address components
            const addressComponents = results[0].address_components;
    
            // Filter out components you want to exclude (e.g., postal code and country)
            const filteredAddressComponents = addressComponents.filter(component =>
              !['postal_code', 'country'].includes(component.types[0])
            );
    
            // Concatenate the formatted parts
            this.addressStreet = filteredAddressComponents.map(component => component.long_name).join(', ');
    
            console.log(this.addressStreet);
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      });
    }
    
  

    vendorForm() {
      this.form = this.formBuilder.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        gender: ['', [Validators.required]],
        phoneNumber: ['', [Validators.required,Validators.pattern("^[0-9]{10}$")]],
        dialCode: ['+91', [Validators.required]],
        deviceType:['laptop'],
        countryId: [101],
        stateId: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        membershipRecordId: [this.recordId],
  


        
        salonDetail: this.formBuilder.array([
          this.businessDetail(),
        ]),
  
        bankDetail: this.formBuilder.array([
          this.bankDetails(),
        ]),
  
        upiDetail: this.formBuilder.array([
         this.upiDetails(),
        ])
  
      });
    }
  
    // List1(): FormArray {
    //   return (<FormArray>this.form.get("upiDetail"));
    // }

    // Function to get the upiDetail form array
List1(): FormArray {
  return this.form.get('upiDetail') as FormArray;
}
  
add() {
  const newItem = this.formBuilder.group({
    accountHolderName: [''], // Add any validations or default values
    upiid: [''],
    isActive: [false],
    imageFile: [''], // This control will store the uploaded image file
  });
  this.List1().push(newItem);
}

  
    deleteHomeData(data: any, id: any )   {
      this.List1().removeAt(id)
      this.uploadedImages.splice(1);

    }

    deleteUploadedImage(index: number) {
      this.List1().at(index).get('imageFile')?.setValue(null);
      this.List1().at(index).get('imagePreviewUrl')?.setValue(null);
      this.uploadedImages.splice(index, 1);
    }

   

  
    businessDetail() {
      return this.formBuilder.group({
        salonName: ['', [Validators.required]],
        salonType: ['',[Validators.required]],
        salonDescription: ['', [Validators.required]],
        gstnumber: ['', [Validators.required,Validators.pattern("^[a-zA-Z0-9]{15}$")]],
        businessPAN: ['', [Validators.required,Validators.pattern("^[a-zA-Z0-9]{10}$")]],
        city: ['', [Validators.required]],
        zip: ['', [Validators.required]],
        landmark: ['', [Validators.required]],
        salonAddress: [null,],
      });
    }
  
    bankDetails() {
      return this.formBuilder.group({
        bankName: ['', [Validators.required]],
        bankAccountHolderName: ['', [Validators.required]],
        bankAccountNumber: ['', [Validators.required]],
        branchName: ['', [Validators.required]],
        ifsc: ['', [Validators.required,Validators.pattern(/^[A-Z]{4}0[A-Z0-9]{6}$/)]],
        confirmbankAccountNumber: ['', [Validators.required]],
      },
        {
          validator: this.MustMatch('bankAccountNumber', 'confirmbankAccountNumber')
        });
    }
  
    upiDetails() {
      return this.formBuilder.group({
        upiid: ['', [Validators.required]],
        accountHolderName: ['', [Validators.required]],
        isActive: [],
        imageFile: [null],
        imagePreviewUrl: [''] 
      });
    }
  
  //  password match validation
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
  
    maxLengthValidator(maxLength: number) {
      return (control: { value: any; }) => {
        const value = control.value;
        if (value && value.length > maxLength) {
          return { maxLengthExceeded: true };
        }
        return null;
      };
    }
    // myapp.directive('numbersOnly', function() {
    //   return {
    //     require: 'ngModel',
    //     link: function(scope, element, attrs, modelCtrl) {
    //       modelCtrl.$parsers.push(function(inputValue) {
    //         if (inputValue == undefined) return ''
    //         var onlyNumeric = inputValue.replace(/[^0-9]/g, '');
    //         if (onlyNumeric != inputValue) {
    //           modelCtrl.$setViewValue(onlyNumeric);
    //           modelCtrl.$render();
    //         }
    //         return onlyNumeric;
    //       });
    //     }
    //   };
    // });

  
    get salonDetail(): FormArray {
      return this.form.get('salonDetail') as FormArray;
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
          var stateListData = this.statesLists?.find((y: { stateName: any; }) => y.stateName == this.vendorDetailPatch?.stateName);
          this.form.patchValue({
            stateId: stateListData?.stateId,
          })
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
  
  
  
  
    postVendor() {
      
      this.submitted = false;
    if (this.form.invalid) {
      this.toaster.error("Form Incomplete: Please fill in all the required fields correctly");
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
      
      if (this.vendorDetailPatch) {
        let payload = {
          email: this.form.value.email,
          firstName: this.form.value.firstName,
          lastName: this.form.value.lastName,
          gender: this.form.value.gender,
          dialCode: this.form.value.dialCode,
          phoneNumber: this.form.value.phoneNumber,
          countryId: this.form.value.countryId,
          stateId: this.form.value.stateId,
          vendorId: this.vendorDetailPatch.vendorId,
          upiDetail: this.form.value.upiDetail,
          salonDetail: [{
            salonName: this.form.value.salonDetail[0]?.salonName,
            salonDescription: this.form.value.salonDetail[0]?.salonDescription,
            salonType:this.form.value.salonDetail[0]?.salonType,
            salonAddress: this.addressStreet,
            landmark: this.form.value.salonDetail[0]?.landmark,
            city: this.form.value.salonDetail[0]?.city,
            zip: this.form.value.salonDetail[0]?.zip,
            gstnumber: this.form.value.salonDetail[0]?.gstnumber,
            businessPAN: this.form.value.salonDetail[0]?.businessPAN,
            salonId: this.shopDetailPatch[0]?.salonId,
            addressLatitude: this.addressLat.toString(),
            addressLongitude: this.addressLong.toString(),
          }],
  
          bankDetail: [{
            bankName: this.form.value.bankDetail[0]?.bankName,
            bankAccountHolderName: this.form.value.bankDetail[0]?.bankAccountHolderName,
            bankAccountNumber: this.form.value.bankDetail[0]?.bankAccountNumber,
            branchName: this.form.value.bankDetail[0]?.branchName,
            ifsc: this.form.value.bankDetail[0]?.ifsc,
            bankId: this.bankDetailPatch[0]?.bankId,
          }],
          upiDetails: [{
             upidetailId :this.form.value.upiDetail[0].upidetailId,
            upiid: this.form.value.upiDetail.upiid,
            bankName: this.form.value.upiDetail.bankName,
            accountHolderName: this.form.value.upiDetail.accountHolderName,
            isActive: data1.status
  
          }]
  
        }
        this.contentService.editVendor(payload).subscribe(response => {
          if (response.isSuccess) {
            this.deleteUploadedImage
            this.imageId = this.vendorDetailPatch.vendorId;
            this.Salon = response.data.salonResponses;
            this.SalonId = this.Salon[0];
            this.upidetail = response.data.upiResponses;
            this.getItemById();
            this.ids = this.getItemById();
            this.fileChangeEvent();
            this.fileChangeEvents();
            this.fileQrChangeEvents();
            this.toaster.success(response.messages);
            // this.router.navigateByUrl('/salon-list');
            // setTimeout(() => {
            //   window.location.reload();
            // }, 500); 
          } else {
            this.spinner.hide();
            this.toaster.error(response.messages);
          }
        });
      } else {
        
        this.spinner.show();
        let payload1 = {
          email: this.form.value.email,
          firstName: this.form.value.firstName,
          lastName: this.form.value.lastName,
          gender: this.form.value.gender,
          dialCode: this.form.value.dialCode,
          phoneNumber: this.form.value.phoneNumber,
          countryId: this.form.value.countryId,
          stateId: this.form.value.stateId,
          membershipRecordId: this.recordId,
          upiDetail: this.form.value.upiDetail,
          deviceType: this.form.value.deviceType,
          salonDetail: [{
            salonName: this.form.value.salonDetail[0]?.salonName,
            salonDescription: this.form.value.salonDetail[0]?.salonDescription,
            salonType:this.form.value.salonDetail[0]?.salonType,
            salonAddress: this.addressStreet,
            landmark: this.form.value.salonDetail[0]?.landmark,
            city: this.form.value.salonDetail[0]?.city,
            zip: this.form.value.salonDetail[0]?.zip,
            gstnumber: this.form.value.salonDetail[0]?.gstnumber,
            businessPAN: this.form.value.salonDetail[0]?.businessPAN,
            addressLatitude: this.addressLat.toString(),
           addressLongitude: this.addressLong.toString(),
          }],
          bankDetail: [{
            bankName: this.form.value.bankDetail[0]?.bankName,
            bankAccountHolderName: this.form.value.bankDetail[0]?.bankAccountHolderName,
            bankAccountNumber: this.form.value.bankDetail[0]?.bankAccountNumber,
            branchName: this.form.value.bankDetail[0]?.branchName,
            ifsc: this.form.value.bankDetail[0]?.ifsc,
          }],
          upiDetails: [{
            upidetailId :this.form.value.upiDetail[0].upidetailId,
            upiid: this.form.value.upiDetail.upiid,
            bankName: this.form.value.upiDetail.bankName,
            accountHolderName: this.form.value.upiDetail.accountHolderName,
            isActive: data1.status
  
          }]
  
        }
        
        this.spinner.show();
        this.contentService.addVendor(payload1).subscribe(response => {
          if (response.isSuccess) {
            this.spinner.hide();
            this.toaster.success(response.messages);
            this.imageId = response.data.vendorId;
            this.Salon = response.data.shopResponses;
            this.SalonId = this.Salon[0];
            this.upidetail = response.data.upiResponses;
            this.getItemById();
  
            this.ids = this.getItemById();
            this.fileChangeEvent();
            this.fileChangeEvents();
            this.fileQrChangeEvents();
            this.toaster.success(response.messages);
            this.router.navigateByUrl('/salon-list');
            setTimeout(() => {
              window.location.reload();
            }, 500); 
          } else {
            this.spinner.hide();
            this.toaster.error(response.messages);
          }
        });
  
      }
    }
  
    // Shop Image 

    handleFileInput(event: any) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        this.image = file
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const imageDataUrl = reader.result as string;
          this.imageUrl = imageDataUrl;
          this.urls.push(imageDataUrl);
        };
      }
    }
  
  
    fileChangeEvents() {
      // let formData = new FormData();
      const formData = new FormData();
      for (let i = 0; i < this.urls.length; i++) {
        const imageDataUrl = this.urls[i];
        const blob = this.dataURItoBlob1(imageDataUrl);
        formData.append('SalonImage', blob, `image_${i}.png`);
      }
      formData.append("SalonImage", this.imageFiles?.file);
      formData.append("SalonId", this.SalonId.salonId);
      this.contentService.salonImage(formData).subscribe(response => {
      });
    }
    private dataURItoBlob1(dataURI: string): Blob {
  
      const byteString = atob(dataURI.split(',')[1]);
      const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: mimeString });
    }
  
  
  
  

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
        // this.name = this.imageFile.link
        reader.readAsDataURL(event.target.files[0]);
      }
    }
  
    fileChangeEvent() {
      let formData = new FormData();
      formData.append("ProfilePic", this.imageFile?.file);
      formData.append("Id", this.imageId);
      this.contentService.uploadImage(formData).subscribe(response => {
      });
    }
  

   

    handleQrFileInput(event: any, index: number) {
      const files = event.target.files;
      if (files.length > 0) {
        const file = files[0]; // Assuming you only allow uploading one image per item
        const reader = new FileReader();
    
        reader.onload = () => {
          const imageDataUrl = reader.result as string;
    
          // Create an object for the uploaded image
          const uploadedImage = { file, previewUrl: imageDataUrl };
    
          // If the index is greater than the array length, push the image, else update the image at the index
          if (index >= this.uploadedImages.length) {
            this.uploadedImages.push(uploadedImage);
          } else {
            this.uploadedImages[index] = uploadedImage;
          }
    
          // Set the image file and preview URL in the form controls
          const imageFileControl = this.List1().at(index).get('imageFile');
          const imagePreviewUrlControl = this.List1().at(index).get('imagePreviewUrl');
    
          if (imageFileControl && imagePreviewUrlControl) {
            imageFileControl.setValue(file);
            imagePreviewUrlControl.setValue(imageDataUrl);
          }
        };
    
        reader.readAsDataURL(file);
      }
    }
    
    
    
    
    
    

    // handleQrFileInput(event: any) {
    //   const files = event.target.files;
    //   for (let i = 0; i < files.length; i++) {
    //     const file = files[i];
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onload = () => {
    //       const imageDataUrl = reader.result as string;
    //       const newItem: Item = {
    //         name: 'Item Name', // Provide the item name or obtain it dynamically
    //         images: [{ file, previewUrl: imageDataUrl }]
    //       };
    //       this.addItemToCategory(newItem); // Add the new item to your category
    //     };
    //   }
    // }
    // addItemToCategory(newItem: Item) {
    //   // Find the appropriate category and push the new item
    //   // You can add your logic to find the category based on your use case
    //   const categoryIndex = 0; // Replace with the actual category index
    //   this.category.items.push(newItem);
    // }
  
    fileQrChangeEvents() {
      const formData = new FormData();
      for (let i = 0; i < this.urls.length; i++) {
        const imageDataUrl = this.urls[i];
        const blob = this.dataURItoBlob(imageDataUrl);
        formData.append('qrcode', blob, `image_${i}.png`);
      }
      this.upidetailId = this.ids
      formData.append("upidetailIds", this.upidetailId);
      this.contentService.UploadQrImage(formData).subscribe(response => {
      });
    }
  
    private dataURItoBlob(dataURI: string): Blob {
  
      const byteString = atob(dataURI.split(',')[1]);
      const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: mimeString });
    }
  
  
    getItemById(): any[] {
      return this.upidetail.map((item: { upidetailId: any; }) => item.upidetailId);
    }
  
    checkStatus(event: any) {
  
      if (event.currentTarget?.checked) {
        this.isActive = true;
  
      } else {
        this.isActive = false;
      }
    }
  
    checkCondition() {
  
      if (this.toggleValue) {
        // Condition when toggleValue is true
        // console.log("Toggle button is ON");
      } else {
        // Condition when toggleValue is false
        // console.log("Toggle button is OFF");
      }
    }
  


    getVendorDetail(id: string) {
     this.spinner.show();
      
      this.contentService.getVendorDetail(id).subscribe(response => {
        if (response.isSuccess) {
          this.spinner.hide();
         this.clearFormArray(this.List1());
          this.vendorDetailPatch = response.data
          this.imageId = response.data.vendorId
          this.shopDetailPatch = this.vendorDetailPatch.salonResponses
          this.bankDetailPatch = this.vendorDetailPatch.bankResponses
          this.lati = this.shopDetailPatch[0].addressLatitude
          this.long = this.shopDetailPatch[0].addressLongitude
          this.upiDetailPatch = this.vendorDetailPatch.upiResponses
          this.addressStreet = this.shopDetailPatch[0].salonAddress
          //  this.upidetailIds =this.vendorDetailPatch.upiResponses.upidetailId
          this.editImages = this.rootUrl + this.vendorDetailPatch?.profilePic;
          this.imageUrl = this.rootUrl + this.shopDetailPatch[0]?.salonImage
          this.getCountry();
          this.patchShopDetail();
          this.patchBankDetail();
          // this.patchUpiDetail();
          this.getlocation();
          this.form.patchValue({
            firstName: this.vendorDetailPatch.firstName,
            lastName: this.vendorDetailPatch.lastName,
            gender: this.vendorDetailPatch.gender,
            dialCode: this.vendorDetailPatch.dialCode,
            phoneNumber: this.vendorDetailPatch.phoneNumber,
            countryName: this.vendorDetailPatch.countryName,
            email: this.vendorDetailPatch.email,
  
          });
          if (this.vendorDetailPatch.upiResponses) {
            this.vendorDetailPatch.upiResponses.forEach((element: any) => {
              this.clearFormArray(this.List1());
              var listGroup = this.upiDetails();
              listGroup.patchValue({
                upiid: element.upiid, accountHolderName: element.accountHolderName,
                bankName: element.bankName, isActive: element.isActive
              });
              this.List1().push(listGroup)
            });
          }
        }
      });
    }
  
    clearFormArray = (formArray: FormArray) => {
      while (formArray.length !== 0) {
        formArray.removeAt(0)
      }
    }
  
  
    patchShopDetail() {
      var data = {
        salonDetail: [{
          salonId: this.shopDetailPatch[0]?.salonId,
          salonName: this.shopDetailPatch[0]?.salonName,
          salonType: this.shopDetailPatch[0]?.salonType,
          salonDescription: this.shopDetailPatch[0]?.salonDescription,
          salonAddress: this.shopDetailPatch[0]?.salonAddress,
          landmark: this.shopDetailPatch[0]?.landmark,
          city: this.shopDetailPatch[0]?.city,
          zip: this.shopDetailPatch[0]?.zip,
          gstnumber: this.shopDetailPatch[0]?.gstnumber,
          businessPAN: this.shopDetailPatch[0]?.businessPAN,
  
        }]
      }
      this.form.patchValue(data)
    }
  
    patchBankDetail() {
      var data = {
        bankDetail: [{
          bankName: this.bankDetailPatch[0]?.bankName,
          bankAccountHolderName: this.bankDetailPatch[0]?.bankAccountHolderName,
          bankAccountNumber: this.bankDetailPatch[0]?.bankAccountNumber,
          branchName: this.bankDetailPatch[0]?.branchName,
          ifsc: this.bankDetailPatch[0]?.ifsc,
          bankId: this.bankDetailPatch[0]?.bankId,
          confirmbankAccountNumber: this.bankDetailPatch[0]?.bankAccountNumber,
          // confirmbankAccountNumber = this.addBank.bankAccountNumber
  
        }]
      }
      this.form.patchValue(data)
    }
  
    cancel(){
      if(this.role == 'SuperAdmin') {
        this.router.navigateByUrl('/salon-list')
        .then(() => {
          window.location.reload();
        });
          } else if (this.role == 'Vendor') {
            this.router.navigateByUrl('/subscription')
            .then(() => {
              window.location.reload();
            });
          }
  }
  
}
  