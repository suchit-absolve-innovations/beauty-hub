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
  imageConvert(serviceId: any) {

    return this.http.get<any>(environment.apiUrl + ApiEndPoint.base64 + '?serviceId=' + serviceId)
  }

  getAllCountries() {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getCountry)
  }
  // get all states
  getAllStates(countryId: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getState + '?countryId=' + countryId)
  }

  addVendor(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.addVendor, data)
  }

  // Category List 
  getcategory() {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getcategoryList)
  }

  // Update Sub Category 
  UpdateSubCategory(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.updateCategory + '?subCategoryId=' + data.subCategoryId, data)

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

  // Banner
  getBanner(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getBannerList + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize)
  }

  // Plans
  getPlansListAdmin(planType: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getPlanList + '?planType=' + planType)
  }

  getPlansList() {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getPlanList)
  }
  getPlansListFilter(planType: any) {
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

  getBuyMemberShipPlanList() {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getBuyMemberShipPlan)
  }

  getBuyMemberShipPlanListvendor(vendorId: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getBuyMemberShipPlan + '?vendorId=' + vendorId)
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

  buyMemberShipPlan(data: any) {
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

  getFilterCategoryList(CategoryType: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getcategoryList + '?CategoryType=' + CategoryType)
  }
  getFilterSubCategoryList(data: any ) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getcategoryList + '?CategoryType=' + data.CategoryType + '&mainCategoryId=' + data.mainCategoryId)
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
  // subCategoryDelete(subCategoryId:any){
  //   return this.http.delete<any>(environment.apiUrl + ApiEndPoint.deleteSubCategory + '?subCategoryId=' + subCategoryId)
  // }

  subCategorySuper(MainCategoryId: any) {

    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getcategoryList + '?MainCategoryId=' + MainCategoryId)
  }
  //  Add Sub Category
  addSubCategory(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.addCategory, data)
  }

  getRequestList() {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getCategoryRequestList)
  }
  acceptRejectCategorys(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.acceptRejectCategory, data)
  }

  // category status 
  statusPostCategory(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.categoryStatus, data)
  }
  // Sub  Category Detail
  SubcategoryDetail(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.categoryDetail + '?mainCategoryId=' + data.mainCategoryId + '&subCategoryId=' + data.subCategoryId)
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

  getcategoryVendor(SalonId: any) {
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
  filterAllBanners(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getSalonBannerList + '?salonId=' + data.salonId +  '&mainCategoryId=' + data.mainCategoryId + '&subCategoryId=' + data.subCategoryId + '&salonBannerType=' + data.salonBannerType )
  }
  // Sub Category List 
  SubCategory(mainCategoryId: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getcategoryListVendor + '?mainCategoryId=' + mainCategoryId)
  }

  SuperSubCategory(mainCategoryId: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getcategoryList + '?mainCategoryId=' + mainCategoryId)
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
  updateSalonBanner(data: any) {
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
  // Service List 
  getservice(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.serviceList + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize + '&salonId=' + data.salonId)
  }

  getfilteListBycategories(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.serviceList + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize + '&salonId=' + data.salonId + '&mainCategoryId=' + data.mainCategoryId + '&subCategoryId=' + data.subCategoryId)
  }

  getserviceGender(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.serviceList + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize + '&salonId=' + data.salonId + '&genderPreferences=' + data.genderPreferences)
  }

  filterServiceList(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.serviceList + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize + '&salonId=' + data.salonId + '&mainCategoryId=' + data.mainCategoryId + '&subCategoryId=' + data.subCategoryId
      + '&ageRestrictions=' + data.ageRestrictions + '&genderPreferences=' + data.genderPreferences)
  }

  getServiceDetail(serviceId: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.serviceDetail + '?serviceId=' + serviceId);
  }

  getPackageDetail(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.serviceDetail + '?serviceId=' + data.serviceId + '&serviceType=' + data.serviceType);
  }

  getScheduleDayTimes(salonId: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getScheduleDayTimes + '?salonId=' + salonId);
  }

  addSchedule(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.addSchedule, data)
  }

  addNewService(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.addService, data)
  }

  uploadServiceImage(data: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const options = {
      headers: headers
    };
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.serviceImage, data, options).pipe(map((data: any) => {
      localStorage.setItem('File', data);
      return data;
    }));
  }

  uploadServiceIconImage(data: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const options = {
      headers: headers
    };
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.serviceIconImage, data, options).pipe(map((data: any) => {
      localStorage.setItem('File', data);
      return data;
    }));
  }

  deleteService(serviceId: any) {
    return this.http.delete<any>(environment.apiUrl + ApiEndPoint.serviceDelete + '?serviceId=' + serviceId)
  }
  // broadcast notification
  getBroadNotification(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.broadcastNotification + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize)
  }

  getBroadNotificationFilter(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.broadcastNotification + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize + '&searchByRole=' + data.searchByRole)
  }

  postBroadNotification(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.addbroadcastNotification, data)
  }

  deleteNotification(notificationId: any) {
    return this.http.delete<any>(environment.apiUrl + ApiEndPoint.deleteBroadcastNotification + '?notificationId=' + notificationId)
  }

  getAdminDetail(id: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getAdminUserDetail + '?id=' + id)
  }
  
  updateUserAdminProfile(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.updateUserAdmin, data)
  }

  getAppointmentList(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getAppointmentsList + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize + '&salonId=' + data.salonId)
  }

  getAppointmentDetail(appointmentId: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getAppointmentDetail + '?appointmentId=' + appointmentId)
  }

  FormDate2ToDate(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getAppointmentsList + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize + '&salobId=' + data.salonId + '&fromDate=' + data.fromDate + '&toDate=' + data.toDate + '&sortDateBy=' + data.sortDateBy)
  }

  paymentMethodList(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getAppointmentsList + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize + '&salonId=' + data.salonId + '&paymentMethod=' + data.paymentMethod)
  }

  appointmentStatusList(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getAppointmentsList + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize + '&salonId=' + data.salonId + '&appointmentStatus=' + data.appointmentStatus)
  }

  appointmentPaymentStatusList(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getAppointmentsList + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize + '&salonId=' + data.salonId + '&paymentStatus=' + data.paymentStatus + '&appointmentStatus=' + data.appointmentStatus
      + '&fromDate=' + data.fromDate + '&toDate=' + data.toDate + '&sortDateBy=' + data.sortDateBy)
  }
  comaningAppointmentStatus(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.getReadAppointmentStatus, data)
  }

  postStatus(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.postAppointmentsStatus, data)
  }

  postPaymentStatus(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.postPaymentStatus, data)
  }

  getPackageList(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getPackagesList + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize + '&salonId=' + data.salonId + '&serviceType=' + data.serviceType);
  }

  statusServicePost(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.postServiceStatus, data)
  }
  getCategorytypes(mainCategoryId:any){
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getCategorytype + '?mainCategoryId=' + mainCategoryId );
  }

}
