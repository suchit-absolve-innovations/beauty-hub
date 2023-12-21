import { Component, OnInit, Input } from '@angular/core';
import { FilterService } from 'src/app/Shared/service/filter.service';
import { SearchService } from 'src/app/Shared/service/search.service';
import { RoleRoutes } from 'src/app/route';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Input() showSideNav: boolean = false;
  routes: Array<any> = [];
  permissions: Array<any> = [];
  user: any;
  classActives: any;
  userRole!: any;
  login = localStorage.getItem('user');
  showSubRoutes: boolean;
  constructor(
    private searchService: SearchService,
    private filterService: FilterService
  ) { 
    this.showSubRoutes = false;
  }
  onSidebarClick(): void {
    // Call the clearSearchCriteria method when the sidebar is clicked
    this.searchService.clearSearchCriteria();
    this.filterService.clearFilteredData();
  }

  ngOnInit(): void {
    this.getSubAdminPermissions();
    this.setRouts();
    this.userRole = localStorage.getItem('role');
    this.routes = this.routes.map(item => {
      item['isSelected'] = false;
      return item
    });
  }


  

  setRouts() {

    this.userRole = localStorage.getItem('role');
    if (this.userRole == 'SuperAdmin') {
      this.userRole = 'superAdmin'
    }
    if (this.userRole == 'Admin') {
      this.userRole = 'admin'
    } if (this.userRole == 'Vendor') {
      this.userRole = 'vendor'
    }
    if(this.userRole == 'Distributor'){
this.userRole = 'distributor'
    }

    switch (this.userRole) {
      case 'superAdmin':
        this.routes = RoleRoutes['SuperAdmin'];
        break;
      case 'admin':
        this.routes = RoleRoutes['Admin'];
        break;
      case 'vendor':
        this.routes = RoleRoutes['Vendor']
       
        break;
        case 'distributor':
          this.routes = RoleRoutes['Distributor']
         
          break; 
    }
  }

  private getSubAdminPermissions() {
    this.userRole = localStorage.getItem('role');
  }


  
  public openSection(selectedRoute: any) {
    this.routes = this.routes.map(item => {
      item.name == selectedRoute.name ? item['isSelected'] = !item['isSelected'] : item['isSelected'] = false
      return item
    });
  }

  classActive(data: any) {
    this.classActives = data;
  }
}
