import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/pages/login.service';

@Component({
  selector: 'app-portal-sidebar',
  templateUrl: './portal-sidebar.component.html',
  styleUrls: ['./portal-sidebar.component.scss'],
})
export class PortalSidebarComponent implements OnInit {
  @Output()
  expansionChanged = new EventEmitter<boolean>();

  expand = true;
  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {}

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

  logout() {
    this.loginService.logout();
    this.router.navigate(['/']);
  }
}
