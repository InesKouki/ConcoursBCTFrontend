import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { LoginSnackbar } from './login-snackbar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;
  isLoggedIn = false;
  roles: string[] = [];

  constructor(private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router:Router,
    private _snackBar: MatSnackBar,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {

    this.isLoggedIn = !!this.tokenStorage.getToken();
    if (this.isLoggedIn) {
      this.redirect();
    }

    this.loginForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, [Validators.required,Validators.minLength(6)]]
    });
  }

  submit() {
    if (!this.loginForm.valid) {
      return;
    }

    this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoggedIn = true;
        this.redirect();
      },
      err => {
        this.openSnackBar();
      }
    );
  }

  openSnackBar() {
    
    this._snackBar.openFromComponent(LoginSnackbar, {
      duration: 3000,
    });
  }

  redirect() {
    this.router.navigate(['/home']);
  }
}
