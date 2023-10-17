import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/Shared/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() collapseSideNav = new EventEmitter();
  show: boolean = false;
  showToggle!: boolean;
  constructor(private auth: AuthService) { }


  sideNav() {

    this.show = !this.show;
    this.collapseSideNav.emit(this.show);
  }


  onToggle() {
    this.showToggle = !this.showToggle;
}


  ngOnInit(): void {
  }

 
  /* log-out */
  logouts() {
    localStorage.clear();
    this.auth.logout();
  }
}
