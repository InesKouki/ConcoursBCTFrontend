import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class IsAdminGuard implements CanActivate {
    isLoggedIn = false;
    isAdmin=false;
    private roles: string[] = [];

  constructor(private tokenService: TokenStorageService, private router: Router) {
  }
  canActivate(next: ActivatedRouteSnapshot): boolean {
    this.isLoggedIn = !!this.tokenService.getToken();
    

    if (this.isLoggedIn) {
        const user = this.tokenService.getUser();
        this.roles = user.roles;
        if (this.roles.includes('ROLE_ADMIN')) {
          this.isAdmin = true;
        }
        
    }
        
    if (this.isAdmin) {
        return true;
    }

    this.router.navigate(['/homeAdmin']);
    return false;
  }
}