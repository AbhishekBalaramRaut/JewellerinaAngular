import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-portal-sidebar',
  templateUrl: './portal-sidebar.component.html',
  styleUrls: ['./portal-sidebar.component.scss']
})
export class PortalSidebarComponent implements OnInit {
  @Output() 
  expansionChanged = new EventEmitter<boolean>();

  expand = true;
  constructor() { }

  ngOnInit(): void {
  }

  expandCollapse() {
    this.expand = !this.expand;
    this.expansionChanged.emit(this.expand);
  }

  routeSelected() {
    if (window.innerWidth <= 900) {
      this.expand = !this.expand;
      this.expansionChanged.emit(this.expand);
    }
   
  }
}
