import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.css']
})
export class EditServiceComponent implements OnInit {
  rootUrl: any;
  serviceId: any;
  submitted!: boolean;
  form: any;
  image: any;
  subCategoryList: any;
  categoryList: any;
  serviceDetailPatch: any;
  editImages: string = '';

  time2!: string;
  time1!: string;

  salonId: any;
  base64Image: any;
  selectedImageData: any[] = [];

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private contentService: ContentService,
    private toasterService: ToastrService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private http: HttpClient,
    private _location: Location,) { }

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;

    this.serviceId = this.route.snapshot.queryParams;
    // this.serviceIds = this.route.snapshot.paramMap.get('id2');

    this.salonId = this.route.snapshot.queryParams;
    this.serviceForm();
    this.getcategoryList();
    this.getServiceDetail()
  }

  serviceForm() {
    // this.submitted = true;
    this.form = this.formBuilder.group({
      serviceName: ['', [Validators.required]],
      basePrice: ['', [Validators.required]],
      discount: ['', [Validators.required]],
      listingPrice: ['', [Validators.required]],
      mainCategoryId: ['', [Validators.required]],
      subCategoryId: [''],
      ageRestrictions: ['', [Validators.required]],
      genderPreferences: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      totalCountPerDuration: ['', [Validators.required]],
      durationInMinutes: ['', [Validators.required]],
      lockTimeStart: ['', [Validators.required]],
      lockTimeEnd: ['', [Validators.required]],
      serviceDescription: ['', [Validators.required]],
    })
  }

  get f() {
    return this.form.controls;
  }

  backClicked() {
    this._location.back();
  }

  getcategoryList() {

    // this.spinner.show();
    this.contentService.getcategory().subscribe(response => {
      if (response.isSuccess) {
        this.categoryList = response.data;

        //  this.spinner.hide();
      } else {
        // this.spinner.hide();
        this.toaster.error(response.messages);
      }
    });
  }

  getSubcategoryList(mainCategoryId: any) {

    this.contentService.SuperSubCategory(mainCategoryId).subscribe(response => {
      if (response.isSuccess) {
        this.subCategoryList = response.data;

        // this.SubSubcategoryList = []
        var categoryListData = this.subCategoryList?.find((y: { subCategoryId: any; }) => y.subCategoryId == this.serviceDetailPatch.subCategoryId);
        this.form.patchValue({
       subCategoryId: categoryListData?.subCategoryId,
        })
        this.spinner.hide();
      } else {
        this.subCategoryList = [];
        this.toaster.error(response.messages);
      }
    });
  }

  getServiceDetail() {
    this.spinner.show();
    this.contentService.getServiceDetail(this.serviceId.id2).subscribe(response => {
      this.spinner.hide();
      if (response.isSuccess) {
        this.spinner.hide();
        this.imageConvert64();
        this.serviceDetailPatch = response.data

        this.form.patchValue({
          serviceName: this.serviceDetailPatch.serviceName,
          basePrice: this.serviceDetailPatch.basePrice,
          discount: this.serviceDetailPatch.discount,
          listingPrice: this.serviceDetailPatch.listingPrice,
          mainCategoryId: this.serviceDetailPatch.mainCategoryId,
          ageRestrictions: this.serviceDetailPatch.ageRestrictions,
          genderPreferences: this.serviceDetailPatch.genderPreferences,
          duration: this.serviceDetailPatch.duration,
          totalCountPerDuration: this.serviceDetailPatch.totalCountPerDuration,
          durationInMinutes: this.serviceDetailPatch.durationInMinutes,
          lockTimeStart: this.serviceDetailPatch.lockTimeStart,
          lockTimeEnd: this.serviceDetailPatch.lockTimeEnd,
          serviceDescription: this.serviceDetailPatch.serviceDescription,
        });
        this.getSubcategoryList(this.serviceDetailPatch?.mainCategoryId);
     

      }
    });
  }

 



  updateService() {
    
    let payload = {
      serviceId: parseInt(this.serviceId.id2),
      salonId: parseInt(this.salonId.id),
      serviceName: this.form.value.serviceName,
      basePrice: parseInt(this.form.value.basePrice),
      discount: parseInt(this.form.value.discount),
      listingPrice: parseInt(this.form.value.listingPrice),
      mainCategoryId: this.form.value.mainCategoryId,
      subCategoryId: this.form.value.subCategoryId,
      ageRestrictions: this.form.value.ageRestrictions,
      genderPreferences: this.form.value.genderPreferences,
      totalCountPerDuration: this.form.value.totalCountPerDuration,
      durationInMinutes: this.form.value.durationInMinutes,
      lockTimeStart: this.form.value.lockTimeStart,
      lockTimeEnd: this.form.value.lockTimeEnd,
      serviceDescription: this.form.value.serviceDescription
    }

    this.spinner.show();
    this.contentService.addNewService(payload).subscribe(response => {
      this.spinner.hide();
      // this.productId = response.data?.productId
      this.fileChangeEvent();
      if (response.isSuccess) {
        this.toaster.success(response.messages);
        // this._location.back();
      } else {
        this.toaster.error(response.messages);
      }
    });
  }

  





  imageConvert64() {

    this.contentService.imageConvert(this.serviceId.id2).subscribe(response => {
      if (response.isSuccess) {
        this.base64Image = response.data
        console.log(this.base64Image)
      }
    });
  }

  onselect(event: any) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const imageDataUrl = reader.result as string;
        this.base64Image.push(imageDataUrl);
      };
    }
  }

  convertImageToBase64(url: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.http.get(url, { responseType: 'blob' })
        .subscribe(response => {
          const reader = new FileReader();
          reader.onloadend = () => {
            if (reader.result !== null && reader.result !== undefined) {
              const base64data = reader.result.toString().split(',')[1];
              resolve(base64data);
            } else {
              reject(new Error('Error converting image to Base64.'));
            }
          };
          reader.onerror = () => {
            reject(new Error('Error converting image to Base64.'));
          };
          reader.readAsDataURL(response);
        }, error => {
          reject(error);
        });
    });
  }

  fileChangeEvent() {
    const formData = new FormData();
    for (let i = 0; i < this.base64Image.length; i++) {
      const imageDataUrl = this.base64Image[i];
      const blob = this.dataURItoBlob(imageDataUrl);
      formData.append('salonServiceImage', blob, `image_${i}.png`);
      formData.append('salonServiceImage', imageDataUrl);
    }
    formData.append('serviceId', this.serviceId.id2);
    this.contentService.uploadServiceImage(formData).subscribe(response => {
      var a = response;
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


  removeImage(index: any) {
    this.selectedImageData.splice(index, 1);
    this.base64Image.splice(index, 1);
  }

    cancel(){
      this.router.navigateByUrl('/salon-list')
      .then(() => {
        window.location.reload();
      });
    }
    
}
