import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-portal-layout',
  templateUrl: './portal-layout.component.html',
  styleUrls: ['./portal-layout.component.scss']
})
export class PortalLayoutComponent implements OnInit {
  expand = true;
  

  constructor() { 

     
  }

  ngOnInit(): void {
  }

  expansionChanged(expand: any) {
    this.expand = expand;
  }

}
