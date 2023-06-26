
export const RoleRoutes = {
    Vendor: [
      
        {
          name: "Product", value: "MANAGE_ReI", isEnabled: false, routerLink: "vendor-product-list", acl: '', subRoutes: []
        },
        {
          name: "Banners", value: "MANAGE_ReI",  isEnabled: false, routerLink: "shop-banner-list", acl: 'dashboard', subRoutes: []
        },
        {
          name: "Categories", value: "MANAGE_ReI",  isEnabled: false, routerLink: "category-list", acl: '', subRoutes: []
        },
        // {
        //   name: "Collection", value: "MANAGE_ReI",  isEnabled: false, routerLink: "collection-list", acl: '', subRoutes: []
        // },
        // {
        //   name: "Coupons", value: "MANAGE_ReI",  isEnabled: false, routerLink: "coupan-list", acl: '', subRoutes: []
        // },
        {
          name: "Orders", value: "MANAGE_ReI",  isEnabled: false, routerLink: "orders-list", acl: '', subRoutes: []
        },
        // {
        //   name: "Analytics", isEnabled: false, value: "MANAGE_APPOINTMENT_TAB", routerLink: "/dashboard", acl: '', subRoutes: []
        // },
        {
          name: "Profile", isEnabled: false, value: "MANAGE_APPOINTMENT_TAB", routerLink: "/vendor-profile", acl: '', subRoutes: []
        },
        {
          name: "Notification", isEnabled: false, value: "MANAGE_APPOINTMENT_TAB", routerLink: "/notification-list", acl: '', subRoutes: []
        },

        // {
        //   name: "My Profile", value: "MANAGE_ReI", inactive_icon: "assets/images/my-profile.png", icon: 'assets/images/my-profile1.png', isEnabled: false, routerLink: "hospital-profile", acl: '', subRoutes: []
        // },
        // {
        //   name: "Settings", value: "MANAGE_ReI", inactive_icon: "assets/images/settings.png", icon: "assets/images/settings1.png", isEnabled: false, routerLink: "hospital-setting", acl: '', subRoutes: []
        // },
        
      ],
  
  
    
  

}
