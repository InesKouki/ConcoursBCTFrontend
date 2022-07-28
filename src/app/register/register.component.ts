import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  nomRegx=/^[a-zA-Z]+$/;
  CINRegx=/^[0-9]+$/;
  errorMessage = '';
  hide = true;
  isLoading=false;
  sexes: string[] = ["Homme", "Femme"];
  constructor(private authService: AuthService,
    private router:Router,
    private _snackBar: MatSnackBar,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      username: [null, [Validators.required,Validators.minLength(5)]],
      email: [null, [Validators.required, Validators.pattern(this.emailPattern)]],
      password: [null, [Validators.required,Validators.minLength(6)]],
      sexe:[null, [Validators.required]],
      nom:[null, [Validators.required,Validators.pattern(this.nomRegx)]],
      prenom:[null, [Validators.required,Validators.pattern(this.nomRegx)]],
      dateNaissance:[null, [Validators.required]],
      cin:[null, [Validators.required,Validators.pattern(this.CINRegx),Validators.maxLength(8),Validators.minLength(8)]]
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

 openSuccessSnackBar() {
  this._snackBar.open('Inscription réussie ! Un email contenant le code de confirmation a été envoyé. Vous en aurez besoin lors de la prochaine connexion.', 'OK', {
     duration: 8000,
     horizontalPosition:'center',
     verticalPosition:'top',
     panelClass:["snackbar-success-style"]
  });
}

  submit() {
    if (!this.registerForm.valid) {
      return;
    }
    this.isLoading=true;
    this.authService.register(
      this.registerForm.value.username,
      this.registerForm.value.email,
      this.registerForm.value.nom,
      this.registerForm.value.prenom,
      this.registerForm.value.sexe,
      this.registerForm.value.dateNaissance,
      this.registerForm.value.cin,
      this.registerForm.value.password,
  
      ).subscribe(
      data => {
        this.redirect();
        this.openSuccessSnackBar();
      },
      err => {
        this.errorMessage = err.error.message;
        this.openSnackBar(this.errorMessage);
        this.isLoading=false;
      }
    );
  }

  redirect() {
    this.router.navigate(['/login']);
  }
}
