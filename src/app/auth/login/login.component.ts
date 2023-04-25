import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public loginForm = this.fb.group({
    username: ['prueba@prueba.com', [Validators.required]],
    password: ['prueba', Validators.required],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  login() {
    this.userService.login(this.loginForm.value).subscribe(
      (resp) => {
        this.router.navigateByUrl('/admin');
      },
      (error) => {
        alert(`${error.error.detail}`);
      }
    );
  }
}
