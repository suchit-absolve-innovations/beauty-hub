import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiEndPoint } from '../enums/api-end-point';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http: HttpClient,
    public router: Router) { }


  // Image upload 

  uploadImage(data: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const options = {
      headers: headers
    };
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.ImageUpload, data, options).pipe(map((data: any) => {
      localStorage.setItem('File', data);
      return data;
    }));
  }

   // Image convertor to update 
   imageConvert(productId:any){
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.base64 + '?productId=' + productId)
  }


 

  // Category Image upload 



  // Add Form Api //

  getAllCountries() {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getCountry)
  }


  // get all states
  getAllStates(countryId: any) {

    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getState + '?countryId=' + countryId)
  }



  // Add vendor 

  addVendor(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.addVendor, data)
  }

  // Edit Vendor


  











  // Add Admin User

  postAdminUser(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.AddAdminUser, data)
  }

  // Update Admin User

  updateAdminUser(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.UpdateAdminUser, data)
  }

  // delete vendor 

  deleteVendor(VendorId: any) {
    return this.http.delete<any>(environment.apiUrl + ApiEndPoint.deleteVendor + '?VendorId=' + VendorId)
  }

  // delete Admin User

  deleteAdminUser(Id: any) {
    return this.http.delete<any>(environment.apiUrl + ApiEndPoint.deleteAdminUser + '?Id=' + Id)
  }

  // Category List 

  getcategory() {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getcategoryList)

  }




  productCategoryRequestList(){
    return this.http.get<any>(environment.apiUrl + ApiEndPoint. getProductCategoryRequestList)
  }

  acceptRejectCategorys(data:any){
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.acceptRejectCategory, data)
  }

  // category status 

  statusPostCategory(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.categoryStatus, data)

  }

  getFilterMaincategory(id: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.productList + '?pageNumber=' + id.pageNumber + '&pageSize=' + id.pageSize + '&mainProductCategoryId=' + id.mainProductCategoryId)

  }






  getFilterSubCategory(id: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.productList + '?pageNumber=' + id.pageNumber + '&pageSize=' + id.pageSize + '&subProductCategoryId=' + id.subProductCategoryId)
  }

  // Sub  Sub Category List 

  SubSubCategory(SubProductCategoryId: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getcategoryList + '?SubProductCategoryId=' + SubProductCategoryId)
  }

  getFilterSubSubCategory(id: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.productList + '?pageNumber=' + id.pageNumber + '&pageSize=' + id.pageSize + '&subSubProductCategoryId=' + id.subSubProductCategoryId)
  }


  
  SubSubcategoryDetail(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.categoryDetail + '?MainProductCategoryId=' + data.MainProductCategoryId + '&SubSubProductCategoryId=' + data.SubSubProductCategoryId)
  }

  UpdateSubSubCategory(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.updateCategory + '?subSubProductCategoryId=' + data.subSubProductCategoryId, data)

  }


  // Update Sub Category 

  UpdateSubCategory(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.updateCategory + '?subProductCategoryId=' + data.subProductCategoryId, data)

  }






  






  SubSubCategorys(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getcategoryListSuper + '?SubProductCategoryId=' + data.SubProductCategoryId + '&ShopId=' + data.ShopId)
  }

  subsubCategoryDelete(SubSubProductCategoryId: any) {
    return this.http.delete<any>(environment.apiUrl + ApiEndPoint.deleteSubCategory + '?SubSubProductCategoryId=' + SubSubProductCategoryId)
  }

  
  SubCategorySupers(SubProductCategoryId: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getcategoryList + '?SubProductCategoryId=' + SubProductCategoryId )
  }


  // Brand

  // brand Add 

  addBrand(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.addBrand, data)
  }

  deletebrand(brandId: any) {
    return this.http.delete<any>(environment.apiUrl + ApiEndPoint.deleteBrand + '?brandId=' + brandId)
  }


  // update brand 
  updateBrand(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.updateBrand, data)
  }


  // Brand Detail

  brandDetail(brandId: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.brandDetail + '?brandId=' + brandId)
  }

  // Brand Image upload 

  brandImage(data: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const options = {
      headers: headers
    };
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.brandImage, data, options).pipe(map((data: any) => {
      localStorage.setItem('File', data);
      return data;
    }));
  }

  // Brand List
  getBrand(data: any) {

    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getBrandList + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize)
  }

  getFilterBrand(id: any) {

    return this.http.get<any>(environment.apiUrl + ApiEndPoint.productList + '?pageNumber=' + id.pageNumber + '&pageSize=' + id.pageSize + '&brandId=' + id.brandId)
  }


  // Banner Detail
  bannerDetail(bannerId: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getBannerDetail + '?bannerId=' + bannerId)
  }


  addBanner(data: any) {
    // return this.http.post<any>(environment.apiUrl + ApiEndPoint.addBanner, data)
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const options = {
      headers: headers
    };
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.addBanner, data, options).pipe(map((data: any) => {
      localStorage.setItem('File', data);
      return data;
    }));
  }
  updateBanner(data: any) {
    // return this.http.post<any>(environment.apiUrl + ApiEndPoint.updateBanner, data)
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const options = {
      headers: headers
    };
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.updateBanner, data, options).pipe(map((data: any) => {
      localStorage.setItem('File', data);
      return data;
    }));

  }

  // Delete Banners
  deleteBanners(bannerId: any) {
    return this.http.delete<any>(environment.apiUrl + ApiEndPoint.deleteHomeBanners + '?bannerId=' + bannerId)
  }










  

  // Container Type List 

  getContainerList() {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.productContainerType)
  }


  // Product Qunatity List 

  getProductQuantityList() {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.productQunatity)
  }


  // Add Product

  postProduct(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.addProduct, data)
  }

  updateProduct(data:any){
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.updateProduct, data)
  }


  uploadProductImage(data: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const options = {
      headers: headers
    };
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.productImage, data, options).pipe(map((data: any) => {
      localStorage.setItem('File', data);
      return data;
    }));

  }


  // get product list 

  getProductlist(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.productList + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize);
  }

  // Product Stock Update 

  updateStock(data:any){
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.productStock,data)
  }


  getProductDetail(productId:any){
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.productDetail + '?productId=' + productId);
  }
  deleteProduts(productId: any) {
    return this.http.delete<any>(environment.apiUrl + ApiEndPoint.deleteProduct + '?productId=' + productId)
  }

  statusPost(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.postStatus, data)

  }

  getvendorProductlist(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.productList + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize + '&vendorId=' + data.vendorId);
  }

  getSupervendorProductlist(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.productList + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize + '&vendorId=' + data.vendorId);
  }

 

  // Collections

  getCollection(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getCollectionList + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize);

  }
  
  // get Collection Name List
  getCollectionList(){
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getCollectionNameList );

  }

    // Post Collection
  postCollection(data:any){
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.addCollection, data)

  }

  uploadCollectionImage(data: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const options = {
      headers: headers
    };
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.collectionImage, data, options).pipe(map((data: any) => {
      localStorage.setItem('File', data);
      return data;
    }));

  }

  deleteCollections(collectionId: any) {
    return this.http.delete<any>(environment.apiUrl + ApiEndPoint.deleteCollection + '?collectionId=' + collectionId )
  }

  // Product Detail

  detailProduct(productId:any){
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.productDetail + '?productId=' + productId )
  }
  collectionDetail(collectionId:any){
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getCollectionDetail + '?collectionId=' + collectionId + [])

  }


  // Order List

  orderList(data:any){

    return this.http.get<any>(environment.apiUrl + ApiEndPoint.orderList  + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize + '&vendorId=' + data.vendorId)

  }

  orderListType(data:any){

    return this.http.get<any>(environment.apiUrl + ApiEndPoint.orderList  + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize + '&vendorId=' + data.vendorId + '&deliveryType=' + data.deliveryType)

  }


  orderListStatus(data:any){

    return this.http.get<any>(environment.apiUrl + ApiEndPoint.orderList  + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize + '&vendorId=' + data.vendorId + '&orderStatus=' + data.orderStatus)

  }

  orderListPayment(data:any){

    return this.http.get<any>(environment.apiUrl + ApiEndPoint.orderList  + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize + '&vendorId=' + data.vendorId + '&paymentStatus=' + data.paymentStatus)

  }
  FormDate2ToDate(data:any){
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.orderList  + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize + '&vendorId=' + data.vendorId + '&fromDate=' + data.fromDate + '&toDate=' + data.toDate)

  }

  orderDetail(orderDetailId:any){
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.orderdetail + '?orderDetailId=' + orderDetailId )
  }


  orderStatus(data:any){
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.orderStatus,data)
  }


  orderPaymentStatus(data:any){
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.paymentStatus,data)
 }

 // broadcast notification
 getBroadNotification(data:any){
  return  this.http.get<any>(environment.apiUrl + ApiEndPoint.broadcastNotification  + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize)
}
postBroadNotification(data:any){
  return this.http.post<any>(environment.apiUrl + ApiEndPoint.addbroadcastNotification,data)
}
deleteNotification(notificationId:any){
  return this.http.delete<any>(environment.apiUrl + ApiEndPoint.deleteBroadcastNotification + '?notificationId=' + notificationId)
}



// SALON API //

  // Banner
  getBanner(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getBannerList + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize)
  }

 // Plans
 getPlansListAdmin(planType:any) {
  return this.http.get<any>(environment.apiUrl + ApiEndPoint.getPlanList + '?planType=' + planType)
}

getPlansList() {
  return this.http.get<any>(environment.apiUrl + ApiEndPoint.getPlanList)
}
getPlansListFilter(planType:any) {
  return this.http.get<any>(environment.apiUrl + ApiEndPoint.getPlanList + '?planType=' + planType)
}

getPlansListVendor(data: any) {
  return this.http.get<any>(environment.apiUrl + ApiEndPoint.getPlanList + '?vendorId=' + data.vendorId + '&planType=' + data.planType)
}

addPlan(data: any) {
  return this.http.post<any>(environment.apiUrl + ApiEndPoint.addUpdatePlan, data)
}

planDetail(membershipPlanId: any) {
  return this.http.get<any>(environment.apiUrl + ApiEndPoint.getPlanDetail + '?membershipPlanId=' + membershipPlanId)
}

deletePlan(membershipPlanId: any) {
  return this.http.delete<any>(environment.apiUrl + ApiEndPoint.deleteAddedPlan + '?membershipPlanId=' + membershipPlanId)
}

planUpdate(data: any) {
  return this.http.post<any>(environment.apiUrl + ApiEndPoint.updatePlan, data)
}

  // Super Admin Profile Update

  getSuperAdminDetail() {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.superProfileDetail)
  }

  updateSuperAdmimProfile(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.postSuperAdmimProfile, data)
  }

  getBuyMemberShipPlanList(){
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getBuyMemberShipPlan)
  }
    // Upload Receipt
    uploadReceiptImage(data: any) {
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      const options = {
        headers: headers
      };
      return this.http.post<any>(environment.apiUrl + ApiEndPoint.uploadReceipt, data, options).pipe(map((data: any) => {
        localStorage.setItem('File', data);
        return data;
      }));
  
    }
    buyMemberShipPlan(data:any){
      return this.http.post<any>(environment.apiUrl + ApiEndPoint.buyMemberShipPlan, data)
    }


    // vendor list 

    getVendorList(data: any) {
      return this.http.get<any>(environment.apiUrl + ApiEndPoint.vendorList + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize)
    }
  

  // Vendor accept reject 

  vendorAcceptReject(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.vendorStatus, data)
  }


  // salon image 

  salonImage(data: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const options = {
      headers: headers
    };
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.salonImage, data, options).pipe(map((data: any) => {
      localStorage.setItem('File', data);
      return data;
    }));
  }


   // OR Image upload 

   UploadQrImage(data: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const options = {
      headers: headers
    };
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.QRImage, data, options).pipe(map((data: any) => {
      localStorage.setItem('File', data);
      return data;
    }));
  }

  getFilterCategoryList(CategoryType:any){
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getcategoryList + '?CategoryType=' + CategoryType)
  }
    //  Add Category
    addCategory(data: any) {
      return this.http.post<any>(environment.apiUrl + ApiEndPoint.addCategory, data)

    }
    // Update Category 

  UpdateCategory(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.updateCategory, data)
  }
  // Category Detail
  categoryDetail(mainCategoryId: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.categoryDetail + '?mainCategoryId=' + mainCategoryId)
  }

    // Category Delete

    mainCategoryDelete(mainCategoryId: any) {
      return this.http.delete<any>(environment.apiUrl + ApiEndPoint.deleteMainCategory + '?mainCategoryId=' + mainCategoryId)
  
    }

      subCategorySuper(MainCategoryId: any) {
    debugger
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getcategoryList + '?MainCategoryId=' + MainCategoryId )
  }

    //  Add Sub Category
    addSubCategory(data: any) {
      return this.http.post<any>(environment.apiUrl + ApiEndPoint.addCategory, data)
  
    }

      // Sub  Category Detail

  SubcategoryDetail(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.categoryDetail + '?mainCategoryId=' + data.mainCategoryId + '&SubCategoryId=' + data.subCategoryId)
  }

    // Sub Category Delete

    subCategoryDelete(subCategoryId: any) {
      return this.http.delete<any>(environment.apiUrl + ApiEndPoint.deleteSubCategory + '?subCategoryId=' + subCategoryId)
    }
     // Category Image upload 

  categoryImage(data: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const options = {
      headers: headers
    };
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.categoryImageUpload, data, options).pipe(map((data: any) => {
      localStorage.setItem('File', data);
      return data;
    }));
  }

    // Vendor Detail 

    getVendorDetail(vendorId: any) {
      return this.http.get<any>(environment.apiUrl + ApiEndPoint.vendorDetail + '?vendorId=' + vendorId, {})
    }

    editVendor(data: any) {
      return this.http.post<any>(environment.apiUrl + ApiEndPoint.UpdateVendor, data)
    }
  
    updateVendorProfile(data: any) {
      return this.http.post<any>(environment.apiUrl + ApiEndPoint.UpdateVendor, data)
    }
     

  getcategoryVendor(SalonId:any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getcategoryVendor + '?SalonId=' + SalonId)

  }
  
  
      // Shop Banner
      getShopBanner(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getSalonBannerList + '?salonId=' + data.salonId + '&salonBannerType=' + data.salonBannerType)
  }

  getFilterShopMain(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getSalonBannerList + '?salonId=' + data.salonId + '&mainCategoryId=' + data.mainCategoryId)
  }

  getfilerShopSub(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getSalonBannerList + '?salonId=' + data.salonId + '&subCategoryId=' + data.subCategoryId)
  }

    // Sub Category List 

    SubCategory(MainCategoryId: any) {
      debugger
      return this.http.get<any>(environment.apiUrl + ApiEndPoint.getcategoryListSuper + '?MainCategoryId=' + MainCategoryId )
    }
  

  // getfilerShopSubSub(data: any) {
  //   return this.http.get<any>(environment.apiUrl + ApiEndPoint.getSalonBannerList + '?shopId=' + data.shopId + '&subSubProductCategoryId=' + data.subSubProductCategoryId)
  // }

  salonBannerDetail(salonBannerId: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getSalonBannerDetail + '?salonBannerId=' + salonBannerId + [])

  }
   // Shop Banner Upload 

   addSalonBanners(data: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const options = {
      headers: headers
    };
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.addSalonBanner, data, options).pipe(map((data: any) => {
      localStorage.setItem('File', data);
      return data;
    }));

  }
  updateSalonBanner(data:any){
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const options = {
      headers: headers
    };
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.updateSalonBanner, data, options).pipe(map((data: any) => {
      localStorage.setItem('File', data);
      return data;
    }));
  }

  
  deleteSalonBanner(salonBannerId: any) {
    return this.http.delete<any>(environment.apiUrl + ApiEndPoint.deleteSalonBanners + '?salonBannerId=' + salonBannerId)

  }

  
  // Admin User List 

  getAdminUserList(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.AdminUserList + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize)
  }

    // Admin User Detail

    UserAdminDetail(Id: any) {
      return this.http.get<any>(environment.apiUrl + ApiEndPoint.AdminUserDetail + '?Id=' + Id)
    }
  

}
