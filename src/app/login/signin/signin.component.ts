import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/shared/services/pages/order.service';
import { LoginService } from '../../shared/services/pages/login.service';
import { Properties } from '../../shared/utils/properties';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  signUp = false;
  signupopen = false;
  credentials: any = { username: '', password: '' };
  submitted = false;
  termsCheckbox = false;
  errorMsg: any;

  emailSent: any = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {}

  signIn() {
    this.submitted = true;
    setTimeout(() => {
      this.submitted = false;
    }, 2000);

    this.loginService.signIn(this.credentials).subscribe((data: any) => {
      console.log(data);

      if (Properties.succesCode == data['code']) {
        sessionStorage.setItem('accessToken', data['result']['token']);
        this.router.navigate(['portal/home']);
      } else {
        this.handleErrorMsg(data['message']);
      }
    });
  }

  profile: any = {};

  signUpSubmit() {
    this.errorMsg = '';
    this.submitted = true;
    setTimeout(() => {
      this.submitted = false;
    }, 2000);

    if (this.credentials['password'] != this.credentials['repeatpassword']) {
      this.errorMsg = 'Password and repeat password must be same';
      return;
    }

    this.loginService.signUp(this.credentials).subscribe((data: any) => {
      console.log(data);

      if (Properties.succesCode == data['code']) {
        this.profile = this.loginService.getProfileNoCall();
        let email = this.profile['email'] + ',thakarerina13@gmail.com';
        this.orderService
          .sendEmail({
            to: email,
            subject: 'Account Created',
            message:
              'Dear ' +
              this.profile['name'] +
              ', \n\n Welcome from Jwellerina! \n\n ' +
              '\n\n Username : ' +
              this.profile['username'] +
              ' \n Password: ' +
              this.profile['password'] +
              '\n\n' +
              this.profile['name'] +
              ', Jewellery makes you look awesome!!! \n Go through our collection. Hurry, your Jewelleries are waiting for you!! \n\n Regards, \n Dhuna from Jwellerina Team',
          })
          .subscribe((data) => {});

        sessionStorage.setItem('accessToken', data['result']['token']);
        this.router.navigate(['portal/home']);
      } else {
        this.handleErrorMsg(data['message']);
      }
    });
  }

  handleErrorMsg(message: any) {
    this.errorMsg = message;
    setTimeout(() => {
      this.errorMsg = null;
    }, 5000);
  }

  otp: any = '';

  verifyEmail() {
    this.emailSent = true;
    let data = {
      to: this.credentials['email'],
    };
    this.loginService.sendOtp(data).subscribe((res: any) => {
      sessionStorage.setItem('otp', res['result']);
    });
  }

  verified: any = false;

  confirmOtp() {
    let otp = sessionStorage.getItem('otp');

    if (otp != this.credentials['otp']) {
      this.handleErrorMsg('Email OTP is incorrect. Please verify it again.');
      return;
    }
    this.verified = true;
  }
}
