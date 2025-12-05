import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {User} from '../models/user.model';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-users-management',
  imports: [ReactiveFormsModule, CommonModule,
    FormsModule],
  templateUrl: './users-management.html',
  styleUrl: './users-management.less',
})
export class UsersManagement implements OnInit {
  userForm: FormGroup;
  message: string = '';
  success: boolean = false;
  users: User[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      mobile: [''],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  onSubmit() {
    if (this.userForm.invalid) return;

    const payload = this.userForm.value;

    this.http.post(environment.baseUrl+ '/users/create', payload).subscribe({
      next: (res: any) => {
        this.message = 'کاربر با موفقیت ایجاد شد.';
        this.success = true;
        this.userForm.reset();
        this.loadUsers();
      },
      error: (err) => {
        this.message = err.error?.message || 'خطا در ایجاد کاربر';
        this.success = false;
      }
    });
  }

  loadUsers() {
    this.http.get<User[]>('/api/users').subscribe({
      next: (res) => this.users = res,
      error: () => this.users = []
    });
  }
}
