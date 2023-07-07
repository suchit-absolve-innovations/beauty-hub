import { Component, OnInit, Output, ViewChild, EventEmitter, Input  } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Input() showSideNav: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
