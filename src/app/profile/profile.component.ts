import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { ProfileSnackbar } from './profile-snackbar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  editpwForm: FormGroup;
  errorMessage='';
  hide1 = true;
  hide2 = true;
  hide3 = true;
  step=1;
  @ViewChild('formDirective1') private formDirective1: NgForm;

  constructor(private token: TokenStorageService,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.editpwForm = this.formBuilder.group({
      passwordCurrent: [null, Validators.required],
      password: [null, [Validators.required,Validators.minLength(6)]],
      password2: [null, Validators.required]
    },{validator: passwordMatchValidator});
  }

  openSnackBar() {
    this._snackBar.openFromComponent(ProfileSnackbar, {
      duration: 5000,
    });
  }

  openFailureSnackBar() {
    this._snackBar.open('Erreur ! Vérifier les informations saisies', 'OK', {
       duration: 5000,
       panelClass:["snackbar-style"]
    });
  }

  submit() {
    if (!this.editpwForm.valid) {
      return;
    }
    this.authService.editpw(this.editpwForm.value.password,this.currentUser.id,this.editpwForm.value.passwordCurrent).subscribe(
    data => {
      this.openSnackBar();
    },
    err => {
      this.errorMessage = err.error.message;
      this.openFailureSnackBar();
    } );
    this.formDirective1.resetForm();
    this.editpwForm.reset();
    this.step=1;
  }

  setStep(index: number) {
    this.step = index;
  }

  get password() { return this.editpwForm.get('password'); }
  get password2() { return this.editpwForm.get('password2'); }

  onPasswordInput() {
    if (this.editpwForm.hasError('passwordMismatch'))
      this.password2.setErrors([{'passwordMismatch': true}]);
    else
      this.password2.setErrors(null);
  }

}

export const passwordMatchValidator: ValidatorFn = (editpwForm: FormGroup): ValidationErrors | null => {
  if (editpwForm.get('password').value === editpwForm.get('password2').value)
    return null;
  else
    return {passwordMismatch: true};
};
