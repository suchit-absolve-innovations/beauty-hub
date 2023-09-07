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
   
    AdminUserDetail = "api/Admin/GetAdminUserDetail",
    AddAdminUser = "api/Admin/AddAdminUser",
    UpdateAdminUser = "api/Admin/UpdateAdminUser",
    deleteVendor = "api/Admin/DeleteVendor",
    deleteAdminUser = "api/Admin/DeleteAdminUser",
   
    
    
    getProductCategoryRequestList = "api/Category/GetProductCategoryRequests",
    acceptRejectCategory = "/api/Category/SetCategoryStatus",
    categoryStatus = "api/Vendor/SetVendorCategoryStatus",
   
  
   
    
    
    addBrand = "api/Brand/AddBrand",
    updateBrand = "api/Brand/UpdateBrand",
    deleteBrand = "api/Brand/DeleteBrand",
    brandDetail = "api/Brand/GetBrandDetail",
    brandImage = "api/Upload/UploadBrandImage",
    QRImage = "/api/Upload/UploadQRCode",
    getBrandList = "api/Brand/GetBrandList",
  
   
    productContainerType = "api/Content/GetProductContainerTypeList",
    productQunatity = "api/Content/GetProductQuantityTypeList",
    addProduct = "api/Product/AddProduct",
    updateProduct = "api/Product/UpdateProduct",
    productImage = "api/Upload/UploadProductImage",
    base64 = "api/Upload/GetProductImageInBase64",
    salonImage = "api/Upload/UploadaSlonImage",
   
    
    postStatus = "api/Product/SetProductStatus",
    productList = "api/Product/GetProductList",
    productStock = "api/Product/updateBasicProductInfo",
    deleteProduct = "api/Product/DeleteProduct",
    addShopBanner = "api/Vendor/AddShopBanner",

    getCollectionList = "api/Product/GetCollectionList",
    getCollectionNameList = "api/Product/GetCollectionNameList",
    productDetail = "api/Product/GetProductDetail",
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
   getBuyMemberShipPlan= "api/Admin/getMembershipPlanList",
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
  addCategory = "api/Category/AddCategory",
  categoryDetail = "api/Category/GetCategoryDetail",
  updateCategory = "api/Category/UpdateCategory",
  deleteMainCategory = "api/Category/DeleteCategory",
  deleteSubCategory = "api/Category/DeleteCategory",
  categoryImageUpload = "/api/Upload/UploadCategoryImage",
  UpdateVendor = "api/Admin/UpdateVendor",
  getcategoryVendor = "api/Vendor/GetVendorCategoryList",
  getcategoryListSuper = "api/Vendor/GetVendorCategoryList",
  getSalonBannerList = "api/Vendor/GetSalonBannerList",
  getSalonBannerDetail = "api/Vendor/GetSalonBannerDetail",
  deleteShopBanners = "api/Vendor/DeleteSalonBanner",
  AdminUserList = "api/Admin/GetAdminUserList" ,
}
