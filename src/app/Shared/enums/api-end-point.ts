export enum ApiEndPoint {
    login = "api/Users/Login",
    signup = "api/Users/Register",
    ImageUpload = "api/Upload/UploadProfilePic",
    

    // for notification 
    tockenFcm = 'api/Notification/updateFCMToken',
    getNotificationList = 'api/Notification/getNotificationList',
    broadcastNotification ='api/Notification/getBroadcastNotificationList',
    deleteBroadcastNotification ='api/Notification/deleteBroadcastNotification',
    addbroadcastNotification = 'api/Notification/broadcastNotification',
    getReadNotiction = 'api/Notification/readNotification',
    getNotifictionCount = 'api/Notification/getNotificationCount',
    deleteAllNotification ='api/Notification/deleteNotification',

    // Add Vendor Form Api 
    getCountry = "api/Content/GetCountries",
    getState = "api/Content/GetStates",
    addVendor = "api/Admin/AddVendor",
   
    vendorList = "api/Admin/GetVendorList",
 
    vendorStatus = "api/Admin/SetVendorStatus",

   
    
    // AddAdminUser = "api/Admin/AddAdminUser",
    // UpdateAdminUser = "api/Admin/UpdateAdminUser",
    deleteVendor = "api/Admin/DeleteVendor",
    deleteAdminUser = "api/Admin/DeleteAdminUser",
   
    
    
    
    
   
   
  
   
    
    
    addBrand = "api/Brand/AddBrand",
    updateBrand = "api/Brand/UpdateBrand",
    deleteBrand = "api/Brand/DeleteBrand",
    brandDetail = "api/Brand/GetBrandDetail",
    brandImage = "api/Upload/UploadBrandImage",
    QRImage = "/api/Upload/UploadQRCode",
    getBrandList = "api/Brand/GetBrandList",
  
   
    productContainerType = "api/Content/GetProductContainerTypeList",
    productQunatity = "api/Content/GetProductQuantityTypeList",
   
    updateProduct = "api/Product/UpdateProduct",
    productImage = "api/Upload/UploadProductImage",
    base64 = "api/Upload/GetProductImageInBase64",
    salonImage = "api/Upload/UploadaSlonImage",
   
    
    postStatus = "api/Product/SetProductStatus",
    productList = "api/Product/GetProductList",
    productStock = "api/Product/updateBasicProductInfo",
    deleteProduct = "api/Product/DeleteProduct",
   

    getCollectionList = "api/Product/GetCollectionList",
    getCollectionNameList = "api/Product/GetCollectionNameList",
    
    getCollectionDetail = "api/Product/GetCollectionDetail",
    addCollection = "api/Product/AddCollection",
    collectionImage = "api/Upload/UploadCollectionImage",
    deleteCollection = "api/Product/DeleteCollection",
    orderList = "api/Vendor/GetVendorOrderList",
    orderdetail = "api/Vendor/GetVendorOrderDetail",
    orderStatus = "api/Vendor/SetOrderStatus",
    paymentStatus = "api/Vendor/SetPaymentStatus",

   // SALON API

   getBannerList = "api/Content/GetBannerList",
   getBannerDetail = "api/Content/GetBannerDetail",
   addBanner = "api/Admin/AddBanner",
   updateBanner = "api/Admin/UpdateBanner",
   deleteHomeBanners = "api/Admin/DeleteBanner",
   getPlanList = "api/Admin/getMembershipPlanList",
  
   uploadReceipt = "api/Upload/UploadPaymentReceipt",
   addUpdatePlan = "/api/Admin/addUpdateMembershipPlan",
   getPlanDetail = "api/Admin/getMembershipPlanDetail",
   deleteAddedPlan = "api/Admin/deleteMembershipPlan",
   updatePlan = "/api/Admin/addUpdateMembershipPlan",
   superProfile = "UpdateSuperAdminDetail",
  superProfileDetail = "api/Admin/GetSuperAdminDetail",
  postSuperAdmimProfile = "/api/Admin/UpdateSuperAdminDetail",
  buyMemberShipPlan = "api/Vendor/buyMembershipPlan",
  vendorDetail = "api/Admin/GetVendorDetail",
  getcategoryList = "api/Category/GetCategoryList",
  getCategoryRequestList = "api/Category/GetCategoryRequests",
  acceptRejectCategory = "api/Category/SetCategoryStatus",
  categoryStatus = "api/Vendor/SetVendorCategoryStatus",
  addCategory = "api/Category/AddCategory",
  categoryDetail = "api/Category/GetCategoryDetail",
  updateCategory = "api/Category/UpdateCategory",
  deleteMainCategory = "api/Category/DeleteCategory",
  deleteSubCategory = "api/Category/DeleteCategory",
  categoryImageUpload = "/api/Upload/UploadCategoryImage",
  UpdateVendor = "api/Admin/UpdateVendor",
  getcategoryVendor = "api/Vendor/GetVendorCategoryList",
  getcategoryListVendor = "api/Vendor/GetVendorCategoryList",

  getSalonBannerList = "api/Vendor/GetSalonBannerList",
  getSalonBannerDetail = "api/Vendor/GetSalonBannerDetail",
  deleteSalonBanners = "api/Vendor/DeleteSalonBanner",
  addSalonBanner = "api/Vendor/AddSalonBanner",
  updateSalonBanner = "api/Vendor/UpdateSalonBanner",

  deleteShopBanners = "api/Vendor/DeleteSalonBanner",
  AdminUserList = "api/Admin/GetAdminUserList" ,
  AddAdminUser = "api/Admin/AddAdminUser",    
 
  UpdateAdminUser = "api/Admin/UpdateAdminUser",
  AdminUserDetail = "api/Admin/GetAdminUserDetail",
  getBuyMemberShipPlan= "/api/Admin/getMembershipPlanList",
  serviceList = "api/Service/GetSalonServiceList",
  serviceDetail = "api/Service/GetSalonServiceDetail",
  getScheduleDayTimes = "api/Service/getScheduledDaysTime",
  addSchedule = "api/Service/addUpdateSalonSchedule",
  addService = "api/Service/AddUpdateSalonService",
  serviceImage ="api/Upload/UploadServiceImage"
}
