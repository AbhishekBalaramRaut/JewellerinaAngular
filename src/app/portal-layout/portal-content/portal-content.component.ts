import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { of } from 'rxjs';
import { BreadcrumbService } from '../../shared/services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-portal-content',
  templateUrl: './portal-content.component.html',
  styleUrls: ['./portal-content.component.scss']
})
export class PortalContentComponent implements OnInit {
    expand = true;
    menuItems: MenuItem[] = [];
    selectedPage: String = 'Home';
    home = {icon: 'home'};
    onHomePage = false;
    breadcrumbUpdated: any;
  
    constructor(private router: Router,
      private route: ActivatedRoute,
      private breadcumbService: BreadcrumbService) { 
  
        const routerSubscriptions = this.router.events.subscribe((event) => {
  
          if(event instanceof NavigationEnd) {
            if(event.url != '/') {
              const urlElements = event.url.split("/");
  
              if(urlElements.indexOf('features') != -1) {
                this.onHomePage = true;
              } else {
                this.onHomePage = false;
              }
  
              of(event).subscribe(() => {
                this.route.firstChild?.data.subscribe(ele => {
                  if(ele['breadcrumb']) {
                    this.selectedPage = ele['breadcrumb']['label'];
                    this.breadcumbService.addBreadcumb(ele['breadcrumb']);
                  }
                });
              });
            }
          }
        });
  
        this.breadcrumbUpdated = this.breadcumbService.breadcumbUpdated.subscribe((breadcrumbs: any) => {
          this.menuItems = [];
          this.menuItems = this.menuItems.concat(breadcrumbs);
        });
    }
  
    ngOnInit(): void {
    }
  
    itemClicked(item: any) {
      
    }
  }
  
