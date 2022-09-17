import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/shared/services/pages/login.service';
import { ModalWindowComponent } from 'src/app/shared/utils/modal-window/modal-window.component';
import { Properties } from 'src/app/shared/utils/properties';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profile: any;
  encPassword: any = '';
  editOn = false;
  password1 = '';
  password2 = '';
  username = '';
  @ViewChild('userForm')
  public userForm!: NgForm;

  modalOptions: NgbModalOptions = {
    centered: true,
    windowClass: 'modalWindow',
    backdrop: 'static',
    keyboard: false,
    ariaLabelledBy: 'modal-basic-title',
  };

  constructor(
    private loginService: LoginService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginService.getProfile().subscribe((res: any) => {
      this.profile = res['result'];

      for (let i = 0; i < this.profile.password.length; i++) {
        this.encPassword = this.encPassword + '*';
      }
    });
  }

  editInfo() {
    this.editOn = true;
  }

  cancelInfo() {
    this.editOn = false;
    this.resetF();
  }

  msg = '';

  submitted() {
    console.log(this.userForm.controls['usernameEdit'].value);

    if (this.password1 != this.password2) {
      this.msg = 'Password and retype password are not same.';
      return;
    }
    let customer = {
      username: this.userForm.controls['usernameEdit'].value,
      password: this.password1,
    };

    this.loginService.updateCustomer(customer).subscribe((res) => {
      if (res['code'] == Properties.succesCode) {
        this.forceRelogin();
        this.resetF();
        this.editOn = false;
      } else {
        this.msg = res['message']
          ? res['message']
          : 'Update has failed. Please try later.';
      }
    });
    return false;
  }

  resetF() {
    this.msg = '';
    this.username = '';
  }

  forceRelogin() {
    sessionStorage.removeItem('accessToken');
    const modalRef = this.modalService.open(
      ModalWindowComponent,
      this.modalOptions
    );

    modalRef.componentInstance.modalData = {
      modalHeader: 'Need Relogin',
      modalText: 'Your information is updated. Please relogin.',
      actions: ['Ok'],
      hideClose: true,
    };

    modalRef.result
      .then(
        (data) => {
          this.loginService.logout();
          this.router.navigate(['/']);
        },
        () => {
          this.loginService.logout();
          this.router.navigate(['/']);
        }
      )
      .catch((error) => {
        console.log('error', error);
      });
  }
}
