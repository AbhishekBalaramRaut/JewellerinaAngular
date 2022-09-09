import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  editOn = false;

  constructor() { }

  ngOnInit(): void {
  }

  editInfo() {
    this.editOn = true;
  }

  confirmInfo() {
    this.editOn = false;
  }

  cancelInfo() {
    this.editOn = false;
  }
}
