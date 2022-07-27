import { AfterViewInit,Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { ConcoursService } from '../_services/concours.service';
import { MatTableDataSource } from '@angular/material/table';
import {MatCard} from '@angular/material/card'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,AfterViewInit {
  private roles: string[] = [];
  isLoggedIn = false;
  //stats:Stats=new Stats;
  //percentage:number;
  isAdmin = false;
  isUser=false;
  concours:any[];
  postes:any[];
  dataSource: MatTableDataSource<any>;
  
  constructor(private userService: UserService,
    private ConcoursService: ConcoursService,
    private authService:AuthService,
    private tokenStorageService: TokenStorageService,
    private router:Router) { }

  @ViewChild("myDiv") divView: ElementRef;

    ngAfterViewInit(): void {
      this.divView.nativeElement.scrollIntoView();
    }
  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      if (this.roles.includes('ROLE_ADMIN') || this.roles.includes('ROLE_RH')) {
        this.isAdmin = true;
      }
    
      this.isUser=this.roles.includes('ROLE_USER');
    }
    this.getConcours();
    

  }
redirect() {
  this.router.navigate(['/login']);
}

getConcours() {
  this.ConcoursService.getConcoursList().subscribe((data: any) => {
    this.concours=data;
    this.dataSource.data = data;
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    return data;
    });
}

// getPostes(concourId:number) {
//   this.ConcoursService.getNonPostes(concourId).subscribe(data => {
//     this.postes = data;
//   });
//   }

refresh(): void {
  window.location.reload();
}

scroll(el: HTMLElement) {
  el.scrollIntoView({behavior: 'smooth'});
}
}
