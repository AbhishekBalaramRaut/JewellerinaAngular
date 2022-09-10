import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  signIn() {
    this.submitted = true;
    setTimeout(() => {
      this.submitted = false;
    }, 1200);

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

  handleErrorMsg(message: any) {
    this.errorMsg = message;
    setTimeout(() => {
      this.errorMsg = null;
    }, 5000);
  }
}
