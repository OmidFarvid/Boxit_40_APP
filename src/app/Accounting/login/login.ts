import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import {environment} from '../../../environments/environment';
import {App} from '../../app';
import {Api} from '../../api';
import {LoginRequest} from '../models/login-request.model';
import {AuthApi} from '../auth-api';
import {CustomResponseType} from '../../models/custom-response-type.model';
import {LoginResponse} from '../models/login-response.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  styleUrls: ['./login.less']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  public loginRequest: LoginRequest = new LoginRequest();


  constructor(public app:App,
    public authApi:AuthApi,
    private fb: FormBuilder, private http: HttpClient, private router: Router) {
    // this.loginForm = this.fb.group({
    //   username: ['', Validators.required],
    //   password: ['', Validators.required]
    // });
  }

  login() {
    //if (this.loginForm.invalid) return;

    //const payload = this.loginForm.value;

    this.app.CallService(this.authApi.Login(this.loginRequest),((data:CustomResponseType<LoginResponse>)=>{
      localStorage.setItem('token', data.data.token);
            localStorage.setItem('firstName', data.data.firstName);
            localStorage.setItem('userId', data.data.userId);
            this.router.navigate(['/']); // بعد از Login، صفحه اصلی
    }));
    // this.http.post<{ token: string,firstName:string,userId:string }>(`${environment.baseUrl}/auth/login`, payload)
    //   .subscribe({
    //     next: (res) => {
    //       // ذخیره توکن در localStorage
    //       localStorage.setItem('token', res.token);
    //       localStorage.setItem('firstName', res.firstName);
    //       localStorage.setItem('userId', res.userId);
    //       this.router.navigate(['/']); // بعد از Login، صفحه اصلی
    //     },
    //     error: (err) => {
    //       this.errorMessage = err.error?.message || 'Login failed';
    //     }
    //   });
  }
}
