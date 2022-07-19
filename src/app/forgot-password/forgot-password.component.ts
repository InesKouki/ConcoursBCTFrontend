import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  errorMessage='';
  loginForm: FormGroup;
  emailRegx = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  isLoading=false;

  constructor(  private formBuilder: FormBuilder,
    private router:Router,
    private authService: AuthService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(this.emailRegx)]]});
  }
  openSuccessSnackBar(message: string) {
    this._snackBar.open(message, '', {
       duration: 4000,
       horizontalPosition:'center',
       verticalPosition:'top',
       panelClass:["snackbar-success-style"]
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'OK', {
       duration: 4000,
       horizontalPosition:'center',
       verticalPosition:'top',
       panelClass:["snackbar-style"]
    });
 }

  submit() {
    if (!this.loginForm.valid) {
      return;
    }
    this.isLoading=true;
    this.authService.resetpw(this.loginForm.value.email).subscribe(
      data => {
        this.router.navigate(['/login']);
        this.openSuccessSnackBar('Vous devez reçevoir un email contenant le nouveau mot de passe dans quelques instants.')

      // This is intentional
      },
      err => {
        this.errorMessage = err.error.message;
        this.openSnackBar(this.errorMessage);
        this.isLoading=false;
      }
    );

  }
}
