import { Injectable } from "@angular/core";
import { MenuItem } from "primeng/api";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class BreadcrumbService {
    
    menuItems: MenuItem[] = [];
    breadcumbUpdated = new Subject();

    constructor() {
        this.menuItems = JSON.parse(unescape(sessionStorage.getItem('menuItems') as string));

        if(!this.menuItems) {
            this.menuItems = [
                { label: 'Home', routerLink: 'portal/home', disabled: false }
            ];
        }
    }

    addBreadcumb(breadcrumb: any) {
        let level = breadcrumb['level'];

        if(level == 1) {
            this.menuItems = [];
        }

        if(this.menuItems.length < level) {

            if(this.menuItems.length == (level - 1)) {
                this.menuItems.forEach(item => {
                    item['disabled'] = false;
                });
                this.menuItems.push(breadcrumb);
            }
        } else {
            if(this.menuItems.length == level) {
                this.menuItems[level -1] = breadcrumb;
            } else if(this.menuItems.length < level) {
                this.menuItems = this.menuItems.splice(0,level);
            }
        }
        sessionStorage.setItem('menuItems', escape(JSON.stringify(this.menuItems)));
        this.breadcumbUpdated.next(this.menuItems);
    }
}