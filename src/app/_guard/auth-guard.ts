import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    isLoggedIn = false;
    isConfirmed=false;

  constructor(private tokenService: TokenStorageService, private router: Router) {
  }
  canActivate(next: ActivatedRouteSnapshot): boolean {
    this.isLoggedIn = !!this.tokenService.getToken();
    
    if (this.isLoggedIn) {
      const user = this.tokenService.getUser();
      this.isConfirmed = user.confirmed;

      if (this.isConfirmed) {
        return true;
      }
      else {
        this.router.navigate(['/confirm']);
        return false;
      }      
    }
    // Check if user is logged in
    this.router.navigate(['/login']);
    return false;
  }
}