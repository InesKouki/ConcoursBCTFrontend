import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-common-layout',
  templateUrl: './common-layout.component.html',
  styleUrls: ['./common-layout.component.css']
})
export class CommonLayoutComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  isAdmin = false;
  isAdminRH=false;
  isUser=false;
  username?: string;
  role:string;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      
      if (this.roles.includes('ROLE_ADMIN')) {
        this.role="Administrateur";
        this.isAdmin=true;
      }
      if (this.roles.includes('ROLE_RH')) {
        this.role="Employé RH";
        this.isAdminRH=true;
      } 
      if (this.roles.includes('ROLE_USER')) {
        this.role="Simple utilisateur";
        this.isUser=true;
      } 
      this.username = user.username;
    }

  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }


}
