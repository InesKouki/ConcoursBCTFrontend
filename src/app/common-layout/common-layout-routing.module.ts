import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsAdminGuard } from '../_guard/is-admin-guard';
import { CommonLayoutComponent } from './common-layout.component';


export const commonLayoutRoutes: Routes = [
  
      {
        path: 'userlist',
        canActivate:[IsAdminGuard],
        loadChildren: () => import(`../user-list/user-list.module`)
          .then(m => m.UserListModule)
      },
 
      {
        path: 'concours',
        canActivate:[IsAdminGuard],
        loadChildren: () => import(`../concours/concours.module`)
          .then(m => m.ConcoursModule)
      },

      {
        path: 'postes',
        canActivate:[IsAdminGuard],
        loadChildren: () => import(`../postes/postes.module`)
          .then(m => m.PostesModule)
      },

      {
        path: 'home',
        loadChildren: () => import(`../home/home.module`)
          .then(m => m.HomeModule)
      },
      { 
        path: 'profile',  
        loadChildren: () => import('../profile/profile.module')
        .then(mod => mod.ProfileModule) },


    ];

