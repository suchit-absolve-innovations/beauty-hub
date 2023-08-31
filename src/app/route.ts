
export const RoleRoutes = {
  SuperAdmin: [
    {
      name: "Dashboard", value: "MANAGE_DASHBOARD", isEnabled: false, routerLink: "/super-Admin-Dashboard", acl: 'dashboard', subRoutes: []
    },
    {
      name: "Admin User", isEnabled: false, value: "MANAGE_TELE_TAB", routerLink: "admin-list", acl: '', subRoutes: []
    },
    // {
    //   name: "Distributor", isEnabled: false, value: "MANAGE_TELE_TAB", routerLink: "distributor-list", acl: '', subRoutes: []
    // },
    {
      name: "Salon", isEnabled: false, value: "MANAGE_APPOINTMENT_TAB", routerLink: "/salon-list", acl: '', subRoutes: []
    },

    // {
    //   name: "Product", value: "MANAGE_ReI", isEnabled: false, routerLink: "/product-list-inventory", acl: '', subRoutes: []
    // },
    {
      name: "Categories", value: "MANAGE_ReI", isEnabled: false, routerLink: "category-list", acl: '', subRoutes: []
    },
    // {
    //   name: "Brand", value: "MANAGE_ReI", isEnabled: false, routerLink: "brand-list", acl: 'dashboard', subRoutes: []
    // },
    {
      name: "Banners", value: "MANAGE_ReI", isEnabled: false, routerLink: "banner-list", acl: 'dashboard', subRoutes: []
    },
    {
      name: "Membership Plans", value: "MANAGE_ReI", isEnabled: false, routerLink: "plan-list", acl: 'dashboard', subRoutes: []
    },
    // {
    //   name: "Notification", value: "MANAGE_ReI", isEnabled: false, routerLink: "super-notification-list", acl: 'dashboard', subRoutes: []
    // },
    {
      name: "Profile", value: "MANAGE_ReI", isEnabled: false, routerLink: "super-admin-profile", acl: 'dashboard', subRoutes: []
    },
    // {
    //   name: "Generate Link", isEnabled: false, value: "MANAGE_APPOINTMENT_TAB", routerLink: "/generate-link", acl: '', subRoutes: []
    // },
  
    // {
    //   name: "Settings", value: "MANAGE_ReI", inactive_icon: "assets/images/settings.png", icon: "assets/images/settings1.png", isEnabled: false, routerLink: "setting", acl: 'dashboard', subRoutes: []
    // },

  ],
  Admin: [
    {
      name: "Dashboard", isEnabled: false, value: "MANAGE_APPOINTMENT_TAB", inactive_icon: "assets/images/appointment.png", icon: "assets/images/appointment1.png", routerLink: "/admin-user-dashboard", acl: '', subRoutes: []
    },
    {
      name: "Vendor", isEnabled: false, value: "MANAGE_APPOINTMENT_TAB", routerLink: "/super-vendor-list", acl: '', subRoutes: []
    },
    {
      name: "Product", value: "MANAGE_ReI", isEnabled: false, routerLink: "/vendor-product-list", acl: '', subRoutes: []
    },
    {
      name: "Categories", value: "MANAGE_ReI", isEnabled: false, routerLink: "category-list", acl: '', subRoutes: []
    },
    {
      name: "Brand", value: "MANAGE_ReI", isEnabled: false, routerLink: "brand-list", acl: 'dashboard', subRoutes: []
    },
    {
      name: "Profile", value: "MANAGE_ReI", isEnabled: false, routerLink: "update-profile", acl: 'dashboard', subRoutes: []
    },
    {
      name: "Generate Link", isEnabled: false, value: "MANAGE_APPOINTMENT_TAB", routerLink: "/generate-link", acl: '', subRoutes: []
    },

  ],
  Vendor: [

    // {
    //   name: "Product", value: "MANAGE_ReI", isEnabled: false, routerLink: "vendor-products-list", acl: '', subRoutes: []
    // },
    {
      name: "Banners", value: "MANAGE_ReI", isEnabled: false, routerLink: "shop-banner-list", acl: 'dashboard', subRoutes: []
    },
    {
      name: "Categories", value: "MANAGE_ReI", isEnabled: false, routerLink: "category-list", acl: '', subRoutes: []
    },

    // {
    //   name: "Orders", value: "MANAGE_ReI", isEnabled: false, routerLink: "orders-list", acl: '', subRoutes: []
    // },

    {
      name: "Profile", isEnabled: false, value: "MANAGE_APPOINTMENT_TAB", routerLink: "/vendor-profile", acl: '', subRoutes: []
    },
    {
      name: "Subscription", isEnabled: true, value: "MANAGE_APPOINTMENT_TAB", routerLink: "/membership-plan-list", acl: '', subRoutes: []

    },
    // {
    //   name: "Notification", value: "MANAGE_ReI", isEnabled: false, routerLink: "vendor-notification-list", acl: 'dashboard', subRoutes: []
    // },
    // {
    //   name: "Generate Link", isEnabled: false, value: "MANAGE_APPOINTMENT_TAB", routerLink: "/generate-link", acl: '', subRoutes: []
    // },
    // {
    //   name: "Dairy Service", value: "MANAGE_ReI",  isEnabled: false, routerLink: "Vendor/setting/appinfo", acl: '', subRoutes: []
    // },
  //    {
  //     name: "Settings",  isEnabled: false, value: "MANAGE_APPOINTMENT_TAB", routerLink: "setting", acl: '',
  //     subRoutes: [
  //       {name: "Dairy", value: "MANAGE_ReI",  isEnabled: false, routerLink: "Vendor/setting/appinfo"},
  //  ]
  //   }
  ],

  Distributor: [

    {
      name: "Vendor", value: "MANAGE_ReI", isEnabled: false, routerLink: "distributor-vendor-list", acl: '', subRoutes: []
    },
    {
      name: "Earning", isEnabled: false, value: "MANAGE_APPOINTMENT_TAB", routerLink: "/earning-list", acl: '', subRoutes: []
    },
    {
      name: "Profile", isEnabled: false, value: "MANAGE_APPOINTMENT_TAB", routerLink: "/distributor-profile", acl: '', subRoutes: []
    },
  ],




}
