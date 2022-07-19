import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';
@Component({
  selector: 'app-confirm-registration',
  templateUrl: './confirm-registration.component.html',
  styleUrls: ['./confirm-registration.component.css']
})
export class ConfirmRegistrationComponent implements OnInit {
  confirmForm: FormGroup;


  errorMessage = '';
  isLoggedIn = false;
  isSignUpFailed = false;
  currentUserEmail?: string;
  user:any;

  constructor(private authService: AuthService,
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      this.user = this.tokenStorageService.getUser();
      this.currentUserEmail=this.user.email;
    }

    this.confirmForm = this.formBuilder.group({
      code: [null, Validators.required]
    });

  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'OK', {
       duration: 5000,
       horizontalPosition:'center',
       verticalPosition:'top',
       panelClass:["snackbar-style"]
    });
 }

 openSuccessSnackBar(message: string) {
  this._snackBar.open(message, 'OK', {
     duration: 5000,
     horizontalPosition:'center',
     verticalPosition:'top',
     panelClass:["snackbar-success-style"]
  });
}

  submit(): void {
    if (!this.confirmForm.valid) {
      return;
    }

    this.userService.confirm(this.user.id,this.user.username,this.user.password,this.confirmForm.value.code)
      .subscribe(
        response => {
          this.tokenStorageService.saveToken(response.accessToken);
          this.tokenStorageService.saveUser(response);
          this.redirect();
          this.openSuccessSnackBar('Félicitations ! Votre compte est maintenant validé.');
        },
        error => {
          this.errorMessage = 'Le code que vous avez donné est incorrecte!';
          this.openSnackBar(this.errorMessage);

        });
  }

  mail():void {
    this.openSuccessSnackBar('Un code de confirmation a été envoyé de nouveau à votre adresse électronique!');
    this.authService.sendmail(this.currentUserEmail).subscribe();
  }

  redirect() {
    this.router.navigate(['/home']);
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.router.navigate(['/login']);
  }

}
