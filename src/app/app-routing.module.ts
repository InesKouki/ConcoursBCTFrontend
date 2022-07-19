import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonLayoutComponent } from './common-layout/common-layout.component';
import { AuthGuard } from './_guard/auth-guard';
import { ConfirmGuard } from './_guard/confirm-guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((mod) => mod.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then((mod) => mod.RegisterModule),
  },
  {
    path: 'confirm',
    canActivate: [ConfirmGuard],
    loadChildren: () =>
      import('./confirm-registration/confirm-registration.module').then(
        (mod) => mod.ConfirmRegistrationModule
      ),
  },
  {
    path: '',
    component:CommonLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path:'',
        loadChildren:() => import('src/app/common-layout/common-layout.module').then(m=>m.CommonLayoutModule)
      }
    ]
  },
  {
    path: 'forgot-pw',
    loadChildren: () =>
      import('./forgot-password/forgot-password.module').then(
        (mod) => mod.ForgotPasswordModule
      ),
  },
 
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
