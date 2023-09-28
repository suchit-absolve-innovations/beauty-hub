import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-shop-banner-list',
  templateUrl: './shop-banner-list.component.html',
  styleUrls: ['./shop-banner-list.component.css']
})
export class ShopBannerListComponent implements OnInit {
 // serach 
 public searchText: any = '';
 page: number = 0;
 itemsPerPage!: number;
 totalItems!: number;
 rootUrl: any;
 shopBannerList: any;
 vendorDetail: any;
 vendorId: any;
 shopId: any;
 id: any;
 form: any;
 SubSubcategoryList: any;
 subCategoryList: any;
 categoryList: any;
 salonBannerId: any;
  

 constructor(private toaster: ToastrService,
   private spinner: NgxSpinnerService,
   private content: ContentService,
   private router: Router,
   private route: ActivatedRoute,
   private ngZone: NgZone,
   private formBuilder: FormBuilder,) { }

 ngOnInit(): void {
   this.vendorId = localStorage.getItem('id');
   this.rootUrl = environment.rootPathUrl;
 
   this.getSalonBannerList();
   this.getcategoryList();

   this.form = this.formBuilder.group({
    MainCategoryId  : [''],
     subCategoryId : [''],
    //  brandId       : [''],
   

   });

 }

 get f() {
   return this.form['controls'];
 }

 get s() {
   return this.form['controls'];
 }

 get fb() {
   return this.form['controls'];
 }
 get ssb() {
   return this.form['controls'];
 }





 getSalonBannerList() {
   
   let payload = {
    salonId : localStorage.getItem('salonId'),
    salonBannerType: 'All'
   }
   this.spinner.show();
   this.content.getShopBanner(payload).subscribe(response => {
     if (response.isSuccess) {
       this.shopBannerList = response.data;

 
       this.spinner.hide();
     }
   });
 }



 delet(data:any){
   
this.salonBannerId = data.salonBannerId;


 }

 deleteSalonBanners() {
   this.spinner.show();
   
   this.content.deleteSalonBanner(this.salonBannerId).subscribe(response => {
     if (response.isSuccess) {
       this.spinner.hide();
       window.location.reload();
       // this.ngZone.run(() => { this.getShopBannerList(); })
       this.toaster.success(response.messages);
     } else {
       this.spinner.hide();
       this.toaster.error(response.messages)
     }
   });
 }


   getcategoryList(){
     // this.spinner.show();
       this.content.getcategory().subscribe(response => {
         if (response.isSuccess) {
           this.categoryList = response.data;
         
         //  this.spinner.hide();
         } else {
           // this.spinner.hide();
           this.toaster.error(response.messages);
         }
       });
     }
 
     getFilterMainCategoryList(data:any){
 
       // this.spinner.show();
 
       let payload = {
         salonId:localStorage.getItem('salonId'),
         mainCategoryId: data
       
       }
         this.content.getFilterShopMain(payload).subscribe(response => {
           if (response.isSuccess) {
           
              this.shopBannerList = response.data;
             
        
           } else {
       
          this.shopBannerList = [];
     
           }
         });
       }
 

 
    getSubcategoryList(MainCategoryId:any){
   

    this.content.SubCategory(MainCategoryId).subscribe(response => {
      if (response.isSuccess) {
        this.subCategoryList = response.data;
        console.log( this.subCategoryList)
      
        // this.SubSubcategoryList = []
        this.spinner.hide();
      } else {
        this.subCategoryList = [];
        this.toaster.error(response.messages);
      }
    });
  }
 
  getFilterSubCategoryList(data:any){
   this.spinner.show();
   let payload = {
  
     salonId:localStorage.getItem('salonId'),
     subCategoryId: data
   
   }
 
  this.content.getfilerShopSub(payload).subscribe(response => {
    if (response.isSuccess) {
     this.shopBannerList = response.data;
    this.spinner.hide();
   } else {
     this.spinner.hide();
     // this.data = response.isSuccess == 'false'
 
     // this.toaster.error(response.messages);
   }
  });
 }
 
 
  


}
