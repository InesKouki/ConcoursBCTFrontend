import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ConfirmGuard implements CanActivate {
    isLoggedIn = false;
    isConfirmed=false;

  constructor(private tokenService: TokenStorageService, private router: Router) {
  }
  canActivate(next: ActivatedRouteSnapshot): boolean {
    this.isLoggedIn = !!this.tokenService.getToken();
    

    if (this.isLoggedIn) {
        const user = this.tokenService.getUser();
        this.isConfirmed = user.confirmed;
    } else {
      this.router.navigate(['/login']);
      return false;   
    }
        
    if (this.isConfirmed===false) {

        return true;
    }

    if (this.isConfirmed) {

        this.router.navigate(['/home']);
        return false;    
    }

    this.router.navigate(['/login']);
    return false;    

  }
}