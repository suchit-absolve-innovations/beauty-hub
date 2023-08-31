import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentService } from 'src/app/Shared/service/content.service';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
declare var $: any;


@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.css']
})
export class AddEditCategoryComponent implements OnInit {
  form!: FormGroup;
  detail: any;
  rootUrl: any;
  editImages: any;
  submitted: boolean = false;
  imageFile!: { link: any; file: any; name: any; type: any; };
  id: any;
  mainId: any;
  categoryType : any;
  constructor(
    private formBuilder: FormBuilder,
    private contentService: ContentService,
    private route: ActivatedRoute,
    private toasterService: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private _location: Location,
  ) { }

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
    this.categoryForm();
debugger
    this.route.queryParams.subscribe((params: any) => {
      if (params.id) {
        this.getCategoryDetail(params.id);
    
      }
    });
  }
  backClicked() {
    this._location.back();
  }

 
  get f() {
    return this.form['controls'];
  }

 
  categoryForm() {
    this.form = this.formBuilder.group({
      categoryName: ['', [Validators.required]],
      categoryDescription: [''],
      categoryType:['',[Validators.required]]
    });
  }

  postCategory() {
    debugger
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    if (this.detail) {
      let payload = {
        mainCategoryId: this.detail.mainCategoryId,
        categoryName: this.form.value.categoryName,
        categoryDescription: this.form.value.categoryDescription,
        categoryType : this.form.value.categoryType
      }
      this.contentService.UpdateCategory(payload).subscribe(response => {
        this.mainId = response.data?.mainCategoryId
        this.fileChangeEvent();
        this.afterResponse(response);
      });
    } else {
      let payload = {
        categoryName: this.form.value.categoryName,
        categoryDescription: this.form.value.categoryDescription,
        categoryType : this.form.value.categoryType
      }
      this.contentService.addCategory(payload).subscribe(response => {

        this.mainId = response.data?.mainCategoryId
        this.fileChangeEvent();
        this.afterResponses(response);

      });
    }
  }

  
  afterResponse(response: any) {
    if (response && response.statusCode == 200) {
      if (response.isSuccess) {
        this.showModal();
        this.form.reset();
      
      }
      else {
        this.toasterService.error(response.messages);
      }
    }
  }


  afterResponses(response: any) {
    if (response && response.statusCode == 200) {
      if (response.isSuccess) {
        this.showModal();
        this.form.reset();
        // this.toasterService.success('Thanks for placing category request. Your request will be processed in 24hrs');
        // this.router.navigate(['/category-list']);
      }
      else {
        this.toasterService.error(response.messages);
      }
    }
  }

  ok(){
     this.router.navigate(['/category-list'])
     .then(() => {
      window.location.reload();
    });

  }
  showModal() {
    $('#myModal').modal('show');
  }



  getCategoryDetail(id: string) {
    this.contentService.categoryDetail(id).subscribe(response => {
      if (response.isSuccess) {
        this.detail = response.data;
        this.id = this.detail.mainCategoryId

        this.editImages = this.rootUrl + this.detail?.categoryImage;
        this.form.patchValue({
          categoryName: this.detail.categoryName,
          categoryDescription: this.detail.categoryDescription,
          categoryType : this.detail.categoryType
        });
      }

    });
  }



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
    debugger
    let formData = new FormData();
    formData.append("CategoryImage", this.imageFile?.file);
    formData.append("MainCategoryId", this.mainId);
    this.contentService.categoryImage(formData).subscribe(response => {

    });
  }


   
    onGenderChange(event: any) {
      debugger
      const selectedGender = event.target.value;
      if (selectedGender === '1') {
      this.categoryType =  this.form.patchValue({ male: true, female: false });
      } else if (selectedGender === '2') {
     this.categoryType =   this.form.patchValue({ male: false, female: true });
      } else if (selectedGender === '3') {
      this.categoryType =  this.form.patchValue({ male: true, female: true });
      }
    }


} 
