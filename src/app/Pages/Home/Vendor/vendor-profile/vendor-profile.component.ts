import { Component, OnInit ,ViewChild,ElementRef, NgZone} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { MapsAPILoader, AgmMap } from '@agm/core';

@Component({
  selector: 'app-vendor-profile',
  templateUrl: './vendor-profile.component.html',
  styleUrls: ['./vendor-profile.component.css']
})
export class VendorProfileComponent implements OnInit {
  form!: FormGroup;
  countryIds: any;
  statesLists: any;
  submitted: boolean = true;
  editImages: any;
  selectedCountryId: any = 'india';

  // image upload

  imageFile!: { link: any, file: any, name: any, type: any };

  isValidFormSubmitted: boolean | null = null;
  vendorId: any;
  vendorDetailPatch: any;
  shopDetailPatch: any;
  bankDetailPatch: any;
  rootUrl: any;
  imageId: any;
  errorMessage:any;

  // Banner Image
  fileToUpload: any;
  imageUrl: any;
  name: any;
  SalonId: any;
  imageFiles!: { link: any; file: any; name: any; type: any; };
  Salon: any;
  ShopImage: any;
  countriesList: any;
  vendorIds = localStorage.getItem('vendorId');
  upiDetailPatch: any;
  toggleValue: boolean = true;
  upidetailId: any = [];
  urls: any = [];
  urls1: any = [];
  ids: any[]= [];
  image1: any;
  image: any;
  isActive!: boolean;
  upidetailIds: any;
  upidetail: any;
   // // Google Map
   addressLat!: number;
   addressLong!: number;
   zoom!: number;
 addressCountry!: string;
 addressStreet!: any;
 private geoCoder!: google.maps.Geocoder;
 @ViewChild('search')
 public searchElementRef!: ElementRef;
 inputAddress: string | undefined;
 lati: any;
 long: any;
  QrimageUrl: any;
  uploadedImages: { file: File; previewUrl: string }[] = [];


  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private contentService: ContentService,
    private toaster: ToastrService,
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private _location: Location,
    private mapsAPILoader: MapsAPILoader,) { }

  ngOnInit(): void {
        this.getVendorDetails();
        //map
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


   /** Vendor Form **/
   vendorForm() {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      dialCode: ['', [Validators.required]],
      countryId: [101],
      stateId: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],

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

  upiDetails(){
    return this.formBuilder.group({
      upiid: ['', [Validators.required]],
      // qrcode: ['', [Validators.required]],
      isActive: [this.isActive],
      // bankName: ['', [Validators.required]],
      accountHolderName: ['', [Validators.required]],
    });
  }


  businessDetail() {
    return this.formBuilder.group({
      salonName: ['', [Validators.required]],
      salonType: ['',[Validators.required]],
      salonDescription: ['', [Validators.required]],
      gstnumber:  ['', [Validators.required,Validators.pattern("^[a-zA-Z0-9]{15}$")]],
      businessPAN: ['', [Validators.required,Validators.pattern("^[a-zA-Z0-9]{10}$")]],
      city: ['', [Validators.required]],
      zip: ['', [Validators.required]],
      landmark: ['', [Validators.required]],
      salonAddress: ['', [Validators.required]]
    });
  }

  bankDetails() {
    return this.formBuilder.group({
      bankName: ['', [Validators.required]],
      bankAccountHolderName: ['', [Validators.required]],
      bankAccountNumber: ['', [Validators.required]],
      branchName: ['', [Validators.required]],
      ifsc: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9]{11}$")]],
      // isActive:[true],
      // confirmbankAccountNumber: ['', [Validators.required]],
    })
      // {
      //   validator: this.MustMatch('bankAccountNumber', 'confirmbankAccountNumber')
      // });
  };




  // password match validation
  // MustMatch(controlName: string, matchingControlName: string) {
  //   return (formGroup: FormGroup) => {
  //     const control = formGroup.controls[controlName];
  //     const matchingControl = formGroup.controls[matchingControlName];

  //     if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
  //       // return if another validator has already found an error on the matchingControl
  //       return;
  //     }

  //     // set error on matchingControl if validation fails
  //     if (control.value !== matchingControl.value) {
  //       matchingControl.setErrors({ mustMatch: true });
  //     } else {
  //       matchingControl.setErrors(null);
  //     }
  //   }
  // }

  List1(): FormArray {
    return (<FormArray>this.form.get("upiDetail"));
  }

  add() {
    this.List1().push(this.upiDetails());
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
  // get f() {
  //   return this.form['controls'];
  // }
  // get gst() {
  //   return this.form.get('gstnumber');
  // }


   /** get country list */
   getCountriesList() {
    this.contentService.getAllCountries().subscribe((response) => {
      if (response.statusCode) {
        this.countriesList = response.data;
      }
    });
  }


  /** get state list */
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


    /** Disable Input cut Copy Paste  **/

    DisableCut(event: any) {
      event.preventDefault();
    }
    DisableCopy(event: any) {
      event.preventDefault();
    }
    DisablePaste(event: any) {
      event.preventDefault();
    }

 
    onMarkerDragEnd(event: any) {

      this.addressLat = event.coords.lat;
      this.addressLong = event.coords.lng;
  
      // Now you have the updated latitude and longitude in this.addressLat and this.addressLong
      // You can use these values as needed.
  }
  // for map
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
  
      // patch vendor

  // Vendor detail 
  getVendorDetails() {
    this.spinner.show();
    this.contentService.getVendorDetail(this.vendorIds).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();
   
        this.vendorDetailPatch = response.data
        this.imageId = response.data.vendorId
        this.shopDetailPatch = this.vendorDetailPatch.salonResponses
        this.addressStreet = this.shopDetailPatch[0]?.salonAddress
        this.bankDetailPatch = this.vendorDetailPatch.bankResponses
        this.upiDetailPatch = this.vendorDetailPatch.upiResponses
        this.editImages = this.rootUrl + this.vendorDetailPatch?.profilePic;
        this.imageUrl = this.rootUrl + this.shopDetailPatch[0]?.salonImage;
        this.QrimageUrl = this.rootUrl + this.upiDetailPatch[0]?.qrcode;
        this.lati = this.shopDetailPatch[0].addressLatitude
        this.long = this.shopDetailPatch[0].addressLongitude
        this.getCountry();
        this.patchShopDetail();
        this.patchBankDetail();
        this.getlocation();
        console.log(this.addressStreet)
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
              this.clearFormArray(this.List1());
          this.vendorDetailPatch.upiResponses.forEach((element: any) => {
            var listGroup = this.upiDetails();
            listGroup.patchValue({ upiid: element.upiid, accountHolderName: element.accountHolderName,
              isActive:element.isActive , qrcode:element.qrcode});
            this.List1().push(listGroup)
          });
        }
      }
      this.spinner.hide();
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
        salonType:this.shopDetailPatch[0]?.salonType,
        salonDescription: this.shopDetailPatch[0]?.salonDescription,
        salonAddress: this.shopDetailPatch[0]?.salonAddress,
        landmark: this.shopDetailPatch[0]?.landmark,
        city: this.shopDetailPatch[0]?.city,
        zip: this.shopDetailPatch[0]?.zip,
        gstnumber: this.shopDetailPatch[0]?.gstnumber,
        businessPAN: this.shopDetailPatch[0]?.businessPAN,
        addressLatitude: this.addressLat?.toString(),
        addressLongitude: this.addressLong?.toString(),

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
        // confirmbankAccountNumber: this.bankDetailPatch[0]?.bankAccountNumber,
        // confirmbankAccountNumber = this.addBank.bankAccountNumber

      }]
    }
    this.form.patchValue(data)
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

    } else {
      // Condition when toggleValue is false
   
    }
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
            salonType:this.form.value.salonDetail[0]?.salonType,
            salonDescription: this.form.value.salonDetail[0]?.salonDescription,
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
            upiid: this.form.value.upiDetail[0]?.upiid,
            bankName: this.form.value.upiDetail[0]?.bankName,
            accountHolderName: this.form.value.upiDetail[0]?.accountHolderName,
            isActive: data1.status  
          }]  
        }
        this.spinner.show();
        this.contentService.updateVendorProfile(payload).subscribe(response => {

         
          if (response.isSuccess) {
            this.imageId = this.vendorDetailPatch.vendorId;
            this.Salon = response.data.salonResponses;
            this.SalonId = this.Salon[0];
            this.upidetail = response.data.upiResponses;
            this.getItemById();
            this.ids = this.getItemById();
            this.fileQrChangeEvents();
            this.fileChangeEvent();
            this.fileChangeEvents();
            this.spinner.hide();
            this.toaster.success(response.messages);
            // this.router.navigateByUrl('/salon-list');
          } else {
            this.spinner.hide();
            this.toaster.error(response.messages);
          }
        });
      }
    }
  // Shop Image 
  handleFileInput(event: any) {
    const fileType = event.target.files[0].type;
    if ((fileType === 'image/jpeg' || fileType === 'image/png') && fileType !== 'image/jfif') {
    const files = event.target.files;
    for (let e = 0; e < files.length; e++) {
      const file = files[e];
      this.image1 = file
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const imageDataUrl1 = reader.result as string;
        this.imageUrl = imageDataUrl1;
        this.urls1.push(imageDataUrl1);
      };
    }
  }
  else {
    this.errorMessage = 'Please select a valid JPEG or PNG image.';
      }
  }


  fileChangeEvents() {
    
    const formData = new FormData();
    for (let e = 0; e < this.urls1.length; e++) {
      const imageDataUrl1 = this.urls1[e];
      const blob = this.dataURItoBlob1(imageDataUrl1);
      formData.append('SalonImage', blob, `image_${e}.png`);
    }
    // formData.append("SalonImage", this.imageFiles?.file);
    formData.append("SalonId", this.SalonId.salonId);
    this.contentService.salonImage(formData).subscribe(response => {
    });
  }
  private dataURItoBlob1(dataURI: string): Blob {

    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let e = 0; e < byteString.length; e++) {
      ia[e] = byteString.charCodeAt(e);
    }
    return new Blob([ab], { type: mimeString });
  }

  
  
  
    /*** Image Upload ***/
    // image upload 
    imagesUpload(event: any) {
      const fileType = event.target.files[0].type;
    if ((fileType === 'image/jpeg' || fileType === 'image/png') && fileType !== 'image/jfif') {
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (_event: any) => {
          this.imageFile = {
            link: _event.target.result,
            file: event.srcElement.files[0],
            name: event.srcElement.files[0].name,
            type: event.srcElement.files[0].type
          }
        
        };
        // this.name = this.imageFile.link
        reader.readAsDataURL(event.target.files[0]);
      }
    } else {
      this.errorMessage = 'Please select a valid JPEG or PNG image.';
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
    //     this.image = file
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onload = () => {
    //       const imageDataUrl = reader.result as string;
    //       this.urls.push(imageDataUrl);
    //     };
    //   }
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
  
  

  
  // cancel(){
  //   this.router.navigateByUrl('/vendor-product-list')
  //   .then(() => {
  //     window.location.reload();
  //   });
  // }

  cancel() {
    this.router.navigateByUrl('/vendor-profile')
      .then(() => {
        window.location.reload();
      });
  }
}