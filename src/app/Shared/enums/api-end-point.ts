export enum ApiEndPoint {
    login = "api/Users/Login",
    signup = "api/Users/Register",
    ImageUpload = "api/Upload/UploadProfilePic",
    categoryImageUpload = "api/Upload/UploadProductCategoryImage",

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
    UpdateVendor = "api/Admin/UpdateVendor",
    vendorList = "api/Admin/GetVendorList",
    vendorDetail = "api/Admin/GetVendorDetail",
    vendorStatus = "api/Admin/SetVendorStatus",
    AdminUserList = "api/Admin/GetAdminUserList",
    AdminUserDetail = "api/Admin/GetAdminUserDetail",
    AddAdminUser = "api/Admin/AddAdminUser",
    UpdateAdminUser = "api/Admin/UpdateAdminUser",
    deleteVendor = "api/Admin/DeleteVendor",
    deleteAdminUser = "api/Admin/DeleteAdminUser",
    getcategoryList = "api/Category/GetProductCategoryList",
    getcategoryListSuper = "api/Vendor/GetVendorProductCategoryList",
    getcategoryVendor = "/api/Vendor/GetVendorProductCategoryList",
    getProductCategoryRequestList = "api/Category/GetProductCategoryRequests",
    acceptRejectCategory = "/api/Category/SetCategoryStatus",
    categoryStatus = "api/Vendor/SetVendorCategoryStatus",
    addCategory = "api/Category/AddProductCategory",
    updateCategory = "api/Category/UpdateProductCategory",
    categoryDetail = "api/Category/GetProductCategoryDetail",
    deleteMainCategory = "api/Category/DeleteProductCategory",
    deleteSubCategory = "api/Category/DeleteProductCategory",
    addBrand = "api/Brand/AddBrand",
    updateBrand = "api/Brand/UpdateBrand",
    deleteBrand = "api/Brand/DeleteBrand",
    brandDetail = "api/Brand/GetBrandDetail",
    brandImage = "api/Upload/UploadBrandImage",
    QRImage = "/api/Upload/UploadQRCode",
    getBrandList = "api/Brand/GetBrandList",
  
    getBannerDetail = "api/Content/GetBannerDetail",
    addBanner = "api/Admin/AddBanner",
    updateBanner = "api/Admin/UpdateBanner",
    deleteHomeBanners = "api/Admin/DeleteBanner",
    productContainerType = "api/Content/GetProductContainerTypeList",
    productQunatity = "api/Content/GetProductQuantityTypeList",
    addProduct = "api/Product/AddProduct",
    updateProduct = "api/Product/UpdateProduct",
    productImage = "api/Upload/UploadProductImage",
    base64 = "api/Upload/GetProductImageInBase64",
    shopImage = "api/Upload/UploadShopImage",
    getShopBannerList = "api/Vendor/GetShopBannerList",
    deleteShopBanners = "api/Vendor/DeleteShopBanner",
    postStatus = "api/Product/SetProductStatus",
    productList = "api/Product/GetProductList",
    productStock = "api/Product/updateBasicProductInfo",
    deleteProduct = "api/Product/DeleteProduct",
    addShopBanner = "api/Vendor/AddShopBanner",
    getShopBannerDetail = "api/Vendor/GetShopBannerDetail",
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



}
